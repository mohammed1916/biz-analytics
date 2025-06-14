import { parseGKGData } from '../src/lib/gkgParser';
import connectDB from '../src/lib/mongodb';
import { Analytics } from '../src/lib/models/Analytics';
import fs from 'fs';
import path from 'path';

async function seedData() {
  try {
    // Connect to MongoDB
    await connectDB();

    // Read sample GKG data
    const filePath = path.join(process.cwd(), 'data', 'sample_gkg.csv');
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Parse GKG data
    const records = parseGKGData(fileContent);

    // Process and store the data
    const analyticsData = {
      revenue: records.length * 100,
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

    console.log('Data seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seedData(); 