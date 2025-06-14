import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize MongoDB client
const client = new MongoClient(process.env.MONGODB_URI || "");

// Initialize Google AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function GET() {
  try {
    await client.connect();
    const db = client.db("business_analytics");
    
    // Fetch data from MongoDB
    const analyticsData = await db.collection("analytics").findOne({});
    
    // Use Google AI to generate insights
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Analyze this business data and provide insights: ${JSON.stringify(analyticsData)}`;
    const result = await model.generateContent(prompt);
    const insights = result.response.text();

    return NextResponse.json({
      data: analyticsData,
      insights,
    });
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics data" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
} 