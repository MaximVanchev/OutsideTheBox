import { RegistrationDto } from '@/types/registration.type';

export async function sendEmail(params: RegistrationDto): Promise<RegistrationDto | null> {
  validateParams(params);

  const response = await fetch(`/api/email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to send email');
  }

  return data as RegistrationDto;
}

function validateParams(params: RegistrationDto) {
  if (!params) {
    throw new Error('Registration data is required');
  }

  // Validate name
  if (!params.name || typeof params.name !== 'string' || params.name.trim().length === 0) {
    throw new Error('Name is required and must be a non-empty string');
  }

  if (params.name.trim().length < 2) {
    throw new Error('Name must be at least 2 characters long');
  }

  if (params.name.trim().length > 100) {
    throw new Error('Name must be less than 100 characters long');
  }

  // Validate email
  if (!params.email || typeof params.email !== 'string' || params.email.trim().length === 0) {
    throw new Error('Email is required and must be a non-empty string');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(params.email.trim())) {
    throw new Error('Email must be a valid email address');
  }

  if (params.email.trim().length > 254) {
    throw new Error('Email must be less than 254 characters long');
  }

  // Validate phone
  if (!params.phone || typeof params.phone !== 'string' || params.phone.trim().length === 0) {
    throw new Error('Phone number is required and must be a non-empty string');
  }

  // Remove all non-digit characters for validation
  const phoneDigits = params.phone.replace(/\D/g, '');

  if (phoneDigits.length < 7) {
    throw new Error('Phone number must contain at least 7 digits');
  }

  if (phoneDigits.length > 15) {
    throw new Error('Phone number must contain no more than 15 digits');
  }

  // Basic phone format validation (allows international formats)
  const phoneRegex = /^[\+]?[0-9\s\-\(\)\.]{7,20}$/;
  if (!phoneRegex.test(params.phone.trim())) {
    throw new Error('Phone number format is invalid');
  }
}
