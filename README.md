# Business Analytics Platform

A modern business analytics platform built with Next.js 15, MongoDB, and AI-powered insights. This platform helps businesses understand their data through interactive visualizations and AI-generated insights.

## Features

- Real-time business analytics dashboard
- AI-powered insights using Google's Generative AI
- MongoDB integration for data storage
- Interactive data visualizations
- Responsive design for all devices

## Prerequisites

- Node.js 18.0 or later
- MongoDB database
- Google Cloud account with Vertex AI enabled
- OpenAI API key

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd business-analytics
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:
```
MONGODB_URI=your_mongodb_uri
GOOGLE_CLOUD_PROJECT=your_project_id
GOOGLE_APPLICATION_CREDENTIALS=path_to_your_credentials.json
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `/src/app` - Next.js app router pages and API routes
- `/src/components` - React components
- `/src/lib` - Utility functions and database models
- `/public` - Static assets

## Technologies Used

- Next.js 15
- TypeScript
- MongoDB
- Google Vertex AI
- OpenAI
- Tremor (UI components)
- Tailwind CSS

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
