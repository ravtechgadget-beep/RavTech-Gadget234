import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import Stripe from 'stripe';

dotenv.config();

let stripe: Stripe | null = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Stripe Checkout API
  app.post('/api/create-checkout-session', async (req, res) => {
    if (!stripe) {
      return res.status(501).json({ error: 'Stripe is not configured on the server.' });
    }
    const { priceId, userId } = req.body;
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{ price: priceId, quantity: 1 }],
        mode: 'subscription',
        success_url: `${req.headers.origin}/?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/pricing`,
        metadata: { userId },
      });
      res.json({ id: session.id, url: session.url });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Stripe Subscription Status
  app.get('/api/subscription-status/:userId', async (req, res) => {
    // This would typically involve looking up the user in a DB or querying Stripe
    // For now, returning a mock based on the environment or just successful 'pro' for demo if set
    res.json({ tier: 'basic' }); 
  });

  // ElevenLabs TTS Proxy
  app.post('/api/tts', async (req, res) => {
    const { text, voiceId } = req.body;
    const apiKey = process.env.ELEVENLABS_API_KEY;
    const resolvedVoiceId = voiceId || process.env.ELEVENLABS_VOICE_ID || 'nPczCjzI2devNBz1zQgj'; // Default 'Adam' voice

    if (!apiKey) {
      return res.status(500).json({ error: 'ELEVENLABS_API_KEY is not configured on the server.' });
    }

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${resolvedVoiceId}`, {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
          'accept': 'audio/mpeg',
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`ElevenLabs API error: ${errorText}`);
      }

      const audioBuffer = await response.arrayBuffer();
      const base64Audio = Buffer.from(audioBuffer).toString('base64');
      
      res.json({ audioData: base64Audio });
    } catch (error: any) {
      console.error('ElevenLabs Proxy Error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', elevenlabs: !!process.env.ELEVENLABS_API_KEY });
  });

  // Vite middleware setup
  const isProd = process.env.NODE_ENV === 'production' || process.env.PRODUCTION === 'true';
  
  if (!isProd) {
    try {
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
      console.log('Vite development middleware active');
    } catch (e) {
      console.warn('Vite not found, falling back to static serving even in non-production mode');
      serveStatic(app);
    }
  } else {
    serveStatic(app);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Neural Server initializing on http://localhost:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
}

function serveStatic(app: express.Express) {
  const distPath = path.join(process.cwd(), 'dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
     res.sendFile(path.join(distPath, 'index.html'));
  });
}

startServer();
