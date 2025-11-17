import { RegistrationDto } from '@/types/registration.type';

export function EmailTemplate(data: RegistrationDto) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: '#333', borderBottom: '2px solid #d7df23', paddingBottom: '10px' }}>
        New Registration for Outside The Box Event
      </h1>
      <div
        style={{
          backgroundColor: '#f9f9f9',
          padding: '20px',
          borderRadius: '8px',
          margin: '20px 0',
        }}
      >
        <h2 style={{ color: '#555', marginTop: '0' }}>Registration Details:</h2>
        <p>
          <strong>Name:</strong> {data.name}
        </p>
        <p>
          <strong>Email:</strong> {data.email}
        </p>
        <p>
          <strong>Phone:</strong> {data.phone}
        </p>
      </div>
      <p style={{ color: '#666', fontSize: '12px', marginTop: '30px' }}>
        This email was sent from the Outside The Box event registration form.
      </p>
    </div>
  );
}
