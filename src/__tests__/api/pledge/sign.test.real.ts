/// <reference types="jest" />
import { POST } from '@/app/api/pledge/sign/route';
import { NextRequest } from 'next/server';
import { supabase } from '@/lib/supabase';

// No more mocking! This is a true end-to-end test.

describe('[REAL] API: /api/pledge/sign', () => {
  const testEmail = `test-signatory-${Date.now()}@example.com`;
  const testName = 'Real Test Signatory';

  afterAll(async () => {
    // Clean up the test user from the database
    const { error } = await supabase
      .from('signatories')
      .delete()
      .eq('email', testEmail);

    if (error) {
      console.error('Error cleaning up test signatory:', error);
    } else {
      console.log('✅ Test signatory cleaned up successfully.');
    }
  });

  it('should sign up a new user, add them to the DB, and send a real verification email', async () => {
    // This test requires valid NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY,
    // and RESEND_API_KEY environment variables to be set in a .env.test.local file.
    
    const payload = {
      name: testName,
      email: testEmail,
      display_publicly: false,
    };

    const request = new NextRequest('http://localhost/api/pledge/sign', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });

    // 1. Call the API endpoint.
    // If Resend or Supabase fails, this will throw an error and fail the test.
    const response = await POST(request);
    const responseBody = await response.json();

    expect(response.status).toBe(200);
    expect(responseBody.success).toBe(true);
    console.log('✅ API endpoint returned success.');

    // 2. Verify the user exists in the database with the correct details.
    const { data: signatory, error } = await supabase
      .from('signatories')
      .select('*')
      .eq('email', testEmail)
      .single();

    expect(error).toBeNull();
    expect(signatory).toBeDefined();
    expect(signatory.name).toBe(testName);
    expect(signatory.verified).toBe(false);
    expect(signatory.verification_token).toBeDefined();
    console.log('✅ Signatory verified in the database.');
  });
}); 