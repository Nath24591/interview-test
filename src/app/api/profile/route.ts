export async function GET(request: Request) {
  const token = request.headers.get('Authorization');

  if (token === 'Bearer 123') {
    const profile = {
      name: 'John Doe',
      email: 'john.doe@example.com',
    };

    return new Response(JSON.stringify(profile), { status: 200 });
  }

  return new Response('Unauthorized', { status: 401 });
}