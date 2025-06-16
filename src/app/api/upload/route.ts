import { NextRequest, NextResponse } from 'next/server';
import { parseGKGData } from '@/lib/gkgParser';
import connectDB from '@/lib/mongodb';
import { Analytics } from '@/lib/models/Analytics';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const text = await file.text();
    const records = parseGKGData(text);

    // Connect to MongoDB
    await connectDB();

    // Process and store the data
    const analyticsData = {
      revenue: records.length * 100, // Example calculation
      customers: records.length,
      growth: 15.5,
      topProducts: records.slice(0, 3).map(record => ({
        name: record.SourceCommonName,
        value: parseInt(record.Counts) || 0,
      })),
      monthlyTrend: records.slice(0, 6).map(record => ({
        date: new Date(parseInt(record.DATE)).toLocaleDateString(),
        value: parseInt(record.Counts) || 0,
      })),
    };

    // Save to MongoDB
    await Analytics.create(analyticsData);

    return NextResponse.json({
      message: 'File uploaded and processed successfully',
      recordsProcessed: records.length,
    });
  } catch (error) {
    console.error('Error processing upload:', error);
    return NextResponse.json(
      { error: 'Failed to process upload' },
      { status: 500 }
    );
  }
} 