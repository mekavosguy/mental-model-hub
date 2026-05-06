import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { MODELS } from '@/lib/models'

const client = new OpenAI({
  baseURL: 'https://integrate.api.nvidia.com/v1',
  apiKey: process.env.NVIDIA_API_KEY,
})

const MODEL_LIST = MODELS.map(m => `${m.name} (${m.cat}): ${m.tagline}`).join('\n')

const SYSTEM_PROMPT = `You are a mental models expert. Given a situation, analyze it using 2-3 of the most relevant mental models from this list:

${MODEL_LIST}

Format your response as clean HTML. For each model you reference:
- Start with the model name in <strong> tags
- Follow with a <br> then 2-3 sentences explaining how it applies to the specific situation
- Separate each model with a <br><br>

Be practical, not theoretical. Do not use markdown, only HTML tags. No preamble or closing remarks.`

export async function POST(req: NextRequest) {
  try {
    const { situation } = await req.json()
    if (!situation || typeof situation !== 'string' || situation.trim().length < 5) {
      return NextResponse.json({ error: 'Please provide a situation to analyze.' }, { status: 400 })
    }
    if (situation.length > 2000) {
      return NextResponse.json({ error: 'Input too long. Please keep it under 2000 characters.' }, { status: 400 })
    }

    const message = await client.chat.completions.create({
      model: 'openai/gpt-oss-120b',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: `Analyze this situation using the most relevant mental models:\n\n"${situation.trim()}"` }],
    })

    const reply = message.choices[0].message.content ?? ''
    return NextResponse.json({ reply })
  } catch (err) {
    console.error('AI explain error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
