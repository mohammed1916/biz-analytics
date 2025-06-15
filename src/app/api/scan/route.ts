// pages/api/scan.ts

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid URL' });
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0', // spoof browser
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch target URL' });
    }

    const html = await response.text();

    const links = [...html.matchAll(/href="([^"]+\.gkg\.csv\.zip)"/g)]
      .map((match) => new URL(match[1], url).href);

    return res.status(200).json(links);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
