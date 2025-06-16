// pages/api/embed.ts
export async function POST(req: Request) {
  const { text } = await req.json();
  if (!text) return new Response(JSON.stringify({ error: 'Missing text' }), { status: 400 });

  // Dummy vector for test
  const embedding = Array(768).fill(Math.random());
  return new Response(JSON.stringify({ embedding }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
