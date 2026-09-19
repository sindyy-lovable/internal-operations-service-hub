import { AiIntakeProvider } from './ai-intake.provider';
import { AiIntakeResult } from './ai-intake.types';

export class AiIntakeModelProvider implements AiIntakeProvider {
  async analyze(freeText: string): Promise<AiIntakeResult> {
    const apiKey = process.env.REQUESTY_API_KEY;

    if (!apiKey) {
      throw new Error('REQUESTY_API_KEY is not configured');
    }

    const response = await fetch(
      'https://router.requesty.ai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
model: 'google/gemma-4-31b-it',
            messages: [
            {
              role: 'system',
              content:
'Classify an internal employee request. Allowed categories are IT, HR, or UNKNOWN. Return JSON only with category, summary, and needsClarification. Use UNKNOWN and needsClarification true when the request is unclear, does not fit IT or HR, or contains both IT and HR concerns that require the employee to clarify the primary request.',
            },
            {
              role: 'user',
              content: freeText,
            },
          ],
          response_format: { type: 'json_object' },
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`AI provider failed with status ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (typeof content !== 'string') {
      throw new Error('AI provider returned no content');
    }

    return JSON.parse(content) as AiIntakeResult;
  }
}