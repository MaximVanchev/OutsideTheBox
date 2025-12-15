import { EmailTemplate } from '@/app/components/email-template';
import { HTTP_STATUS_CODES } from '@/types/httpStatusCode.type';
import { RegistrationDto } from '@/types/registration.type';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  if (request === null) {
    return NextResponse.json({ message: 'Bad Request' }, { status: HTTP_STATUS_CODES.BAD_REQUEST });
  }

  try {
    const inputData = (await request.json()) as RegistrationDto;

    // Validate input data
    if (!inputData.name || !inputData.email || !inputData.phone) {
      return NextResponse.json(
        { message: 'Missing required fields: name, email, and phone are required' },
        { status: HTTP_STATUS_CODES.BAD_REQUEST },
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputData.email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: HTTP_STATUS_CODES.BAD_REQUEST },
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Outside The Box Events <noreply@otb-events.com>',
      to: ['alexander.georgiev@digitas.com'],
      subject: 'New Event Registration - Outside The Box',
      react: EmailTemplate(inputData),
      headers: {
        'X-Entity-Ref-ID': new Date().getTime().toString(),
      },
    });

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json(
        { message: 'Failed to send email notification' },
        { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR },
      );
    }

    return NextResponse.json(
      { message: 'Registration Successful' },
      { status: HTTP_STATUS_CODES.OK },
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      {
        status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      },
    );
  }
}
