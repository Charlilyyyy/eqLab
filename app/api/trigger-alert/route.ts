import { NextResponse } from 'next/server';
import { inngest } from '@/lib/inngest/client';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await inngest.send({
      name: 'alert/price.triggered',
      data: body,
    });

    return NextResponse.json({
      success: true,
      message: 'Price alert event queued',
    });
  } catch (error) {
    console.error('Error triggering price alert:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to trigger price alert' },
      { status: 500 }
    );
  }
}
