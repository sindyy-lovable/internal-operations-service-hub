# Week 4 Production AI

## Capability

The Internal Operations Service Hub now includes AI-assisted request intake.

An employee can enter a free-text internal request and ask the system for an AI suggestion before creating the request.

The AI returns:

- `category`: `IT`, `HR`, or `UNKNOWN`
- `summary`: a concise description of the request
- `needsClarification`: whether more information is required

The employee can review the suggestion and choose whether to use the AI-generated summary.

## AI Integration

The backend integrates with Requesty and uses the `google/gemma-4-31b-it` model.

The AI provider is isolated behind an `AiIntakeProvider` contract so the rest of the application does not depend directly on a specific AI provider.

The Requesty API key is loaded from the local `.env` file and is not committed to Git.

## Product Authority

AI output is advisory.

The backend validates the AI result before accepting it. The allowed product-owned categories are:

- `IT`
- `HR`
- `UNKNOWN`

Invalid AI output is rejected by the backend.

AI does not make lifecycle, authorization, or final request decisions.

## Conditional Behavior

Unclear or insufficient requests return `UNKNOWN` with `needsClarification: true`.

Requests containing both IT and HR concerns also return `UNKNOWN` and require clarification instead of selecting a department arbitrarily.

## Evaluation

The AI evaluation set contains seven representative cases:

1. Clear IT request
2. Clear HR request
3. Thin input
4. Ambiguous input
5. Mixed IT and HR request
6. Invalid AI provider output
7. AI provider failure

Run the evaluations with:

```bash
npm run eval:ai