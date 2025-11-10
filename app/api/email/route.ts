import { HTTP_STATUS_CODES } from '@/types/httpStatusCode.type';
import { RegistrationDto } from '@/types/registration.type';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  if (request === null) {
    return new NextResponse('Bad Request', { status: HTTP_STATUS_CODES.BAD_REQUEST });
  }

  try {
    const data = (await request.json()) as RegistrationDto;

    return new NextResponse('Registration Successful', { status: HTTP_STATUS_CODES.OK });
  } catch (error) {
    return new NextResponse('Internal Server Error', {
      status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
    });
  }
}
