/* eslint-disable import/prefer-default-export */

import { generateChallengeLetter } from '@/app/actions';

// longer duration to account for openai api calls
export const maxDuration = 30;

export const POST = async (req: Request) => {
  const { ticketId } = await req.json();

  await generateChallengeLetter(ticketId);

  return Response.json(
    { success: true },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Content-Type': 'application/json',
      },
      status: 200,
    },
  );
};
