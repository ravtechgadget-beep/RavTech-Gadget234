import { GoogleGenAI, Type, Modality } from "@google/genai";
import { storageService } from "./storageService";
import { QuizQuestion, Flashcard, ChoiceOption } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const DEFAULT_MODEL = 'gemini-3-flash-preview';
const TTS_MODEL = 'gemini-3.1-flash-tts-preview';

async function retry<T>(fn: () => Promise<T>, retries = 2, delay = 1500): Promise<T> {
  try {
    return await fn();
  } catch (error: any) {
    const isRetryable = error?.status === "RESOURCE_EXHAUSTED" || error?.message?.includes("high demand");
    if (retries > 0 && isRetryable) {
      console.warn(`Neural link congestion detected. Retrying in ${delay}ms...`);
      await new Promise(r => setTimeout(r, delay));
      return retry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
}

export const PERSONA_STYLING = {
  Harvey: "Use high-authority technical language explained with dry, observational wit. Pedagogical, slightly sarcastic but deeply helpful.",
  Professor: "Deep, authoritative physics specialist. Use formal, academic language. Focus on first principles and mathematical derivation.",
  Analyst: "Sharp, clinical, and data-driven insight. Focus on registry patterns, statistics, and high-yield clinical correlations. Be precise and concise."
};

function getSystemPrompt(persona: 'Harvey' | 'Professor' | 'Analyst' = 'Harvey') {
  return `You are ${persona.toUpperCase()}, a world-class SPI (Sonography Principles and Instrumentation) physics specialist. 
Your goal is to help students master the ARDMS registry using high-impact pedagogical techniques.
Style: ${PERSONA_STYLING[persona]}

Framework: Use the "Spine Logic": 
1. Quantify effort: Start by positioning yourself as the person who read 50+ papers so the student doesn't have to.
2. Active learning: Frame the entire session around the final assessment.
3. Roadmap: Definitions -> Core Concepts -> Practical Application -> "Holy Sh*t" Insight.
4. Via Negativa: Define a concept by contrasting it with what it isn't (e.g., "Axial resolution isn't just about small numbers; it's about the pulse length vs. the gap").
5. Mnemonics: Use silly, memorable, and slightly absurd sentences.
6. Relatable Analogies: Use high-fidelity analogies (e.g. comparing physics to daily life or pop culture).
7. Practical Walkthrough: Focus on "Knobology"—how to physically turn the dials on a machine.
8. Human Hacks: Focus on consistency and the 2-minute rule.
9. Closure: Final assessment that "proves" they are now educated.

Community Context: Reference common struggles like "Everyone is missing the Reynolds Number question today" or "The 13-microsecond rule is the hidden boss of the SPI."
Constraint: DO NOT USE symbols like @, #, $, %, ^, &, *, or other non-alphanumeric special characters. Avoid them 100%.
All assessments MUST match ARDMS SPI difficulty.`;
}

const LECTURE_PROMPT_TEMPLATE = `Create a high-impact Master Class for: {topic}. 
Follow this EXACT structure using [BLOCK_0] to [BLOCK_11] tags. Do not deviate from these line-for-line templates.

[BLOCK_0]: QUANTIFY EFFORT. Start with: "I [took this course / read these papers / learned this skill] for you so here is the cliffnotes version to save you [Number] hours." 
You must position yourself as the researcher who aggregated multiple sources (clinical ultrasound manuals, registry patterns, and physics papers) to create the ultimate guide.
[BLOCK_1]: THE PROMISE. State clearly: "But as per usual, it is not enough just to listen to me talk about stuff, so at the end of the video, there is a little assessment. If you can answer these questions by the end, you are officially educated on {topic}."
[BLOCK_2]: THE ROADMAP. Provide a 4-part numbered outline: 
Part 1: Definitions (What even is {topic}?).
Part 2: Core Concepts/Crash Course (The specific frameworks or architectures).
Part 3: Practical Application (How to build/do it yourself, involving a clinical workflow).
Part 4: The "Holy Sh*t" Insight (A specific piece of advice or opportunity that is mind-blowing).
[BLOCK_3]: DEFINITIONS. What is {topic} at a first-principles level?
[BLOCK_4]: VIA NEGATIVA. Start with: "The easiest way to first define {topic} is the given example of what is not {topic}." Contrast it with a less effective version of the same concept (e.g. a "non-agentic" vs "agentic" workflow) to clarify the boundary.
[BLOCK_5]: MNEMONIC LOCKER. Start with: "Here is a mnemonic in case you can't remember... just think about [Silly Sentence]." Create a silly, memorable acronym or sentence (e.g. "Red Turtles Paint Murals").
[BLOCK_6]: THE ANALOGY. Use a high-fidelity comparison to human behavior or pop culture (e.g., using Sasuke/Naruto rivalry to explain goal-setting, or a company manager to explain system control).
[BLOCK_7]: PRACTICAL WORKFLOW. Start with: "To make this actually all practical, I'm going to show you how to create a [Workflow/Project] which does not require any code." Detail a specific 'knobology' adjustment or calculation workflow using accessible clinical tools.
[BLOCK_8]: THE REGISTRY TRAP. Identify a specific way the ARDMS exam tries to trick students on {topic}. Explain the "distractor" logic.
[BLOCK_9]: CLINICAL CASE STUDY. Describe a real-world patient scenario where understanding {topic} was the difference between a diagnostic scan and a technical failure.
[BLOCK_10]: NEURAL ALIGNMENT (MINDSET SHIFT). Address the psychological barriers to the subject. Focus on "showing up" rather than perfection. Use the "2-minute rule" or habit-building advice. 
Quote: "You do not rise to the level of your goals, you fall to the level of your systems."
[BLOCK_11]: THE ASSESSMENT. Start with: "As promised, here is a little assessment. If you can answer these questions then congratulations, you can consider yourself educated on {topic}." 
Include 3 registry-challenging questions. Ask them to write their answers in the comments to boost engagement.

Write in HTML-safe prose (use <br/>, <strong>, etc.).`;

async function hashString(str: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function askTutor(question: string, context?: string, persona: 'Harvey' | 'Professor' | 'Analyst' = 'Harvey') {
  return retry(async () => {
    const response = await ai.models.generateContent({
      model: DEFAULT_MODEL,
      contents: `Context: ${context}\n\nUser Question: ${question}`,
      config: { systemInstruction: getSystemPrompt(persona), temperature: 0.7 }
    });
    return response.text;
  }).catch((error) => {
    console.error("Tutor Error:", error);
    return "The neural link is unstable. Please try rephrasing your query.";
  });
}

export async function generateLectureScript(topic: string, persona: 'Harvey' | 'Professor' | 'Analyst' = 'Harvey'): Promise<string> {
  const cacheKey = `lecture_v2_${persona}_${await hashString(topic)}`;
  try {
    const cached = await storageService.get<string>(cacheKey);
    if (cached) return cached;
  } catch (e) { console.warn("Lecture cache read error:", e); }

  return retry(async () => {
    const response = await ai.models.generateContent({
      model: DEFAULT_MODEL,
      contents: LECTURE_PROMPT_TEMPLATE.replace(/{topic}/g, topic),
      config: { systemInstruction: getSystemPrompt(persona), temperature: 0.8 }
    });
    const text = response.text || "Transmission failed.";
    if (text !== "Transmission failed.") {
      await storageService.set(cacheKey, text);
    }
    return text;
  }).catch((error) => {
    console.error("Lecture Generation Error:", error);
    throw error;
  });
}

export async function generateMasteryChoices(topic: string): Promise<ChoiceOption[]> {
  const cacheKey = `mastery_v1_${await hashString(topic)}`;
  try {
    const cached = await storageService.get<ChoiceOption[]>(cacheKey);
    if (cached) return cached;
  } catch (e) { console.warn("Mastery cache read error:", e); }

  return retry(async () => {
    const response = await ai.models.generateContent({
      model: DEFAULT_MODEL,
      contents: `Create 3 clinical determination options for: ${topic}.
      One must be the 'Most Logical Path', the others 'Sub-optimal'. 
      Focus on ARDMS-style decision making. 
      STRICT CONSTRAINT: DO NOT USE symbols like @, #, $, %, ^, &, * in your text.
      Format as JSON.`,
      config: {
        systemInstruction: getSystemPrompt('Analyst'),
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING },
              outcome: { type: Type.STRING },
              isLogical: { type: Type.BOOLEAN }
            },
            required: ["text", "outcome", "isLogical"]
          }
        }
      }
    });
    const choices = JSON.parse(response.text || '[]');
    if (choices.length > 0) {
      await storageService.set(cacheKey, choices);
    }
    return choices;
  }).catch((e) => { 
    console.error("Mastery Choices Error:", e);
    return []; 
  });
}

export async function getRegistryPulse(topic: string) {
  const cacheKey = `pulse_v1_${await hashString(topic)}`;
  try {
    const cached = await storageService.get<any>(cacheKey);
    if (cached) return cached;
  } catch (e) { console.warn("Pulse cache read error:", e); }

  return retry(async () => {
    const response = await ai.models.generateContent({
      model: DEFAULT_MODEL,
      contents: `What are the 2025-2026 ARDMS SPI registry hot-spots for: ${topic}? Ground this in recent examiner trends. Keep it brief. 
      STRICT CONSTRAINT: DO NOT USE symbols like @, #, $, %, ^, &, * in your text.`,
      config: { 
        systemInstruction: getSystemPrompt('Analyst'),
        tools: [{googleSearch: {}}] 
      },
    });
    const result = {
      text: response.text,
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
    if (result.text) {
      await storageService.set(cacheKey, result);
    }
    return result;
  }).catch((error) => {
    console.error("Registry Pulse Error:", error);
    return { text: "Registry pulse unavailable.", sources: [] };
  });
}

export async function generateTTS(text: string, persona: 'Harvey' | 'Professor' | 'Analyst' = 'Harvey'): Promise<string | undefined> {
  const cleanText = text.replace(/\[BLOCK_\d+\]/g, '').trim();
  const cacheKey = `tts_v3_premium_${persona}_${await hashString(cleanText)}`;
  
  try {
    const cached = await storageService.get<string>(cacheKey);
    if (cached) return cached;
  } catch (e) {}

  // Try Premium ElevenLabs Narrative first
  try {
    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        text: cleanText,
        voiceId: persona === 'Harvey' ? 'nPczCjzI2devNBz1zQgj' : // Adam (Updated)
                 persona === 'Professor' ? 'ErXw797nc8o4QC6JB9ls' : // Callum
                 'cgSBA3uX1rNXYYt8zLIn' // Sarah
      })
    });

    if (response.ok) {
      const data = await response.json();
      if (data.audioData) {
        await storageService.set(cacheKey, data.audioData);
        return data.audioData;
      }
    }
  } catch (error) {
    console.warn("ElevenLabs Premium Voice failed, falling back to Neural Core:", error);
  }

  // Fallback to Gemini Native TTS
  const voices = {
    'Harvey': 'Kore',
    'Professor': 'Zephyr',
    'Analyst': 'Puck'
  };
  
  try {
    const chunks: string[] = [];
    for (let i = 0; i < cleanText.length; i += 2500) {
      chunks.push(cleanText.substring(i, i + 2500));
    }

    const audioChunks: Uint8Array[] = [];
    for (const chunk of chunks) {
      const response = await retry(async () => {
        return ai.models.generateContent({
          model: TTS_MODEL, 
          contents: [{ parts: [{ text: chunk }] }],
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: {
                  voiceName: voices[persona]
                }
              },
            },
          },
        });
      });
      
      const audioBase64 = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (audioBase64) {
        const binary = atob(audioBase64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        audioChunks.push(bytes);
      }
    }
    
    if (audioChunks.length === 0) return undefined;

    const totalLength = audioChunks.reduce((acc, chunk) => acc + chunk.length, 0);
    const finalUint8Array = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of audioChunks) {
      finalUint8Array.set(chunk, offset);
      offset += chunk.length;
    }
    
    let finalBase64 = "";
    const chunkSize = 8192;
    for (let i = 0; i < finalUint8Array.length; i += chunkSize) {
      finalBase64 += String.fromCharCode.apply(null, Array.from(finalUint8Array.subarray(i, i + chunkSize)));
    }
    finalBase64 = btoa(finalBase64);
    
    try {
      await storageService.set(cacheKey, finalBase64);
    } catch (e) {
      console.warn("Audio cache write error:", e);
    }
    
    return finalBase64;
  } catch (error) {
    console.error("TTS Generation Error:", error);
    return undefined;
  }
}

export async function generateQuiz(topic: string): Promise<QuizQuestion[]> {
  const cacheKey = `quiz_v1_${await hashString(topic)}`;
  try {
    const cached = await storageService.get<QuizQuestion[]>(cacheKey);
    if (cached) return cached;
  } catch (e) { console.warn("Quiz cache read error:", e); }

  return retry(async () => {
    const response = await ai.models.generateContent({
      model: DEFAULT_MODEL,
      contents: `Generate 3MCQs for: ${topic}. 1 physics law, 1 knobology, 1 artifact. 
      STRICT CONSTRAINT: DO NOT USE symbols like @, #, $, %, ^, &, * in your text.
      Format JSON.`,
      config: {
        systemInstruction: getSystemPrompt('Professor'),
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctIndex: { type: Type.NUMBER },
              explanation: { type: Type.STRING }
            },
            required: ["question", "options", "correctIndex", "explanation"]
          }
        }
      }
    });
    const quiz = JSON.parse(response.text || '[]');
    if (quiz.length > 0) {
      await storageService.set(cacheKey, quiz);
    }
    return quiz;
  }).catch((e) => { 
    console.error("Quiz Generation Error:", e);
    return []; 
  });
}

export async function getArtifactDetails(artifactName: string): Promise<string> {
  const cacheKey = `artifact_v1_${await hashString(artifactName)}`;
  try {
    const cached = await storageService.get<string>(cacheKey);
    if (cached) return cached;
  } catch (e) { console.warn("Artifact cache read error:", e); }

  return retry(async () => {
    const response = await ai.models.generateContent({
      model: DEFAULT_MODEL,
      contents: `Explain ultrasound artifact: ${artifactName}. Physics Cause, Appearance, Solution. 
      STRICT CONSTRAINT: DO NOT USE symbols like @, #, $, %, ^, &, * in your text.`,
      config: { systemInstruction: getSystemPrompt('Harvey'), temperature: 0.7 }
    });
    const text = response.text || "Deconstruction failed.";
    if (text !== "Deconstruction failed.") {
      await storageService.set(cacheKey, text);
    }
    return text;
  }).catch((error) => {
    console.error("Artifact Details Error:", error);
    return "Failed to deconstruct artifact physics.";
  });
}

export async function generateVisualSummary(topic: string, promptInfo: string = ''): Promise<string | undefined> {
  const cacheKey = `visual_v2_${await hashString(topic + promptInfo.substring(0, 200))}`;
  try {
    const cached = await storageService.get<string>(cacheKey);
    if (cached) return cached;
  } catch (e) { console.warn("Visual cache read error:", e); }

  return retry(async () => {
    const response = await ai.models.generateContent({
      model: DEFAULT_MODEL,
      contents: {
        parts: [
          {
            text: `A highly detailed, cinematic, and educational medical illustration of ultrasound physics: ${topic}. 
            The style should be a mix of technical blueprint and atmospheric digital art. 
            Use a dark color palette with neon indigo and emerald accents. 
            Include labels for key components if possible. 
            The image should feel like it belongs in a high-end medical textbook from the future.`,
          },
        ],
      },
      config: {},
    });
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const imageData = `data:image/png;base64,${part.inlineData.data}`;
        await storageService.set(cacheKey, imageData);
        return imageData;
      }
    }
    return undefined;
  }).catch((error) => {
    console.error("Visual Summary Generation Error:", error);
    return undefined;
  });
}
