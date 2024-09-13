import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb'; // Adjust the path if needed

// Define the Job type
interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  skills: string[];
  salaryRange: string;
  experienceLevel: string;
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('cuvette'); // Replace with your database name
    const jobsCollection = db.collection<Job>('jobs'); // Replace 'jobs' with your collection name
    
    const jobs = await jobsCollection.find({}).toArray();
    
    return NextResponse.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}