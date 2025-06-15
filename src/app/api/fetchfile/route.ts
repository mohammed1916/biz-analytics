// pages/api/fetchfile.ts
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { url } = req.body;
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch file' });
    }

    const buffer = await response.arrayBuffer();
    return res.status(200).json({ message: 'Fetched', size: buffer.byteLength });
  } catch (err) {
    return res.status(500).json({ error: 'Internal error' });
  }
}
