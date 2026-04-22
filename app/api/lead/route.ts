import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Lead from '../../../models/Lead';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, code, country } = body;

    // Validation Rules
    if (!name || !email || !phone || !code || !country) {
      return NextResponse.json(
        { error: 'Name, email, phone, code, and country are required fields.' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await dbConnect();

    // Save data to database
    const newLead = new Lead(body);
    await newLead.save();

    // Send to Google Sheets Webhook if configured
    if (process.env.GOOGLE_SHEET_WEBHOOK_URL) {
      try {
        await fetch(process.env.GOOGLE_SHEET_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
      } catch (sheetError) {
        console.error('Error saving to Google Sheets:', sheetError);
      }
    }

    return NextResponse.json({ success: true, message: 'Lead saved successfully' }, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
