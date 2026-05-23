
import { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import { generateTTS } from './geminiService';
import { storageService } from './storageService';

async function hashString(str: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function simpleDebounce(fn: Function, delay: number) {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export function useHotMic(topic: string, state: Record<string, any>, isEnabled: boolean) {
  const [feedback, setFeedback] = useState<string>('');
  const lastStateRef = useRef<string>('');
  
  const generateFeedback = useCallback(async (currentState: Record<string, any>) => {
    const stateStr = JSON.stringify(currentState);
    if (stateStr === lastStateRef.current) return;
    lastStateRef.current = stateStr;
    const cacheKey = `hotmic_v1_${topic}_${await hashString(stateStr)}`;

    try {
      const cached = await storageService.get<string>(cacheKey);
      if (cached) {
        setFeedback(cached);
        const audio = await generateTTS(cached, 'Harvey');
        if (audio) {
          const snd = new Audio(`data:audio/wav;base64,${audio}`);
          snd.play();
        }
        return;
      }
    } catch (e) {}

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [{ role: 'user', parts: [{ text: `You are Harvey, a sonography tutor. Briefly (1 short sentence) comment on these live ultrasound simulator settings for the ${topic} lab: ${stateStr}. Be dry, observational, and helpful.` }] }],
        config: {
            maxOutputTokens: 50
        }
      });

      const text = response.text || "";
      if (text) {
        setFeedback(text);
        await storageService.set(cacheKey, text);
        const audio = await generateTTS(text, 'Harvey');
        if (audio) {
          const snd = new Audio(`data:audio/wav;base64,${audio}`);
          snd.play();
        }
      }
    } catch (error) {
      console.error("Hot-Mic error:", error);
    }
  }, [topic]);

  const debouncedFeedback = useRef(simpleDebounce(generateFeedback, 3000)).current;

  useEffect(() => {
    if (isEnabled) {
      debouncedFeedback(state);
    }
  }, [state, isEnabled, debouncedFeedback]);

  return { feedback };
}
