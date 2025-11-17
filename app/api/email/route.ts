import { EmailTemplate } from '@/app/components/email-template';
import { HTTP_STATUS_CODES } from '@/types/httpStatusCode.type';
import { RegistrationDto } from '@/types/registration.type';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  if (request === null) {
    return new NextResponse('Bad Request', { status: HTTP_STATUS_CODES.BAD_REQUEST });
  }

  try {
    const ImputData = (await request.json()) as RegistrationDto;

    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['maxim.van.mv@gmail.com'],
      subject: 'New Registration from Outside The Box',
      react: EmailTemplate(ImputData),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return new NextResponse('Registration Successful', { status: HTTP_STATUS_CODES.OK });
  } catch (error) {
    console.error('Error sending email:', error);
    return new NextResponse('Internal Server Error', {
      status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
    });
  }
}
