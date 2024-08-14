import { getVideoTranscript } from './lib/captions.js';
import { generateContent, getSummerizeInstruction } from './lib/gemini.js';
import { z } from 'zod';

/**
 * @typedef {import('express').RequestHandler} Router
 */

/** @type {Router} */
export async function summerizeYoutubeVideo(req, res) {
  try {
    const params = z
      .object({ videoId: z.string(), lang: z.enum(Object.keys(languages)) })
      .safeParse(req.query);

    if (!params.success) return res.status(400).json({ type: 'INVALID_DATA' });

    const transcript = await getVideoTranscript(params.data.videoId, params.data.lang);
    const summary = await generateContent(
      getSummerizeInstruction(languages[params.data.lang], transcript),
    );

    res.status(200).end(summary);
  } catch (error) {
    if (error.message) res.status(400).json({ type: error.message });
    else res.status(500).json({ type: 'SERVER_ERROR' });
  }
}

const languages = {
  zh: 'Chinese',
  es: 'Spanish',
  en: 'English',
  fr: 'French',
  de: 'German',
  ko: 'Korean',
  ru: 'Russian',
  ar: 'Arabic',
  hi: 'Hindi',
  ja: 'Japanese',
};
