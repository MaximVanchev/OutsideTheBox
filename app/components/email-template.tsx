'use server';

import { RegistrationDto } from '@/types/registration.type';

export async function EmailTemplate(data: RegistrationDto) {
  return (
    <div>
      <h1>New Registration from {data.name}!</h1>
      <p>Email: {data.email}</p>
      <p>Phone: {data.phone}</p>
    </div>
  );
}
