import { uploadImage } from '@/app/actions';

// longer duration to account for openai api calls
export const maxDuration = 30;

export const POST = async (req: Request) => {
  // account for image upload via form data or as base64 string
  let data: FormData | string;

  const contentType = req.headers.get('Content-Type') || '';

  // handle form data and base64 string
  if (contentType.includes('multipart/form-data')) {
    data = await req.formData();
  } else if (contentType.includes('application/json')) {
    const json = await req.json();
    data = json.image;
  } else {
    // return error for unsupported content type i.e. not form data or json
    return new Response(
      JSON.stringify({ success: false, message: 'Unsupported content type' }),
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Content-Type': 'application/json',
        },
        status: 400,
      },
    );
  }

  // upload image for processing
  await uploadImage(data);

  // return success response
  return new Response(JSON.stringify({ success: true }), {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'application/json',
    },
    status: 200,
  });
};