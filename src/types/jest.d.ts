/// <reference types="jest" />

declare global {
  var jest: typeof import('jest')
  var describe: typeof import('jest').describe
  var it: typeof import('jest').it
  var expect: typeof import('jest').expect
  var beforeEach: typeof import('jest').beforeEach
  var afterEach: typeof import('jest').afterEach
  var beforeAll: typeof import('jest').beforeAll
  var afterAll: typeof import('jest').afterAll
  
  namespace jest {
    interface Matchers<R> {
      toHaveGreenCheckmark(): R
    }
  }
}

declare module '@/lib/supabase' {
  export const supabase: {
    from: jest.Mock<any, any>;
  };
  export const mockMaybeSingle: jest.Mock<any, any>;
  export const mockUpsert: jest.Mock<any, any>;
  export const mockSingle: jest.Mock<any, any>;
  export const mockUpdate: jest.Mock<any, any>;
  export const getSignatories: jest.Mock<any, any>;
  export const getSignatoryStats: jest.Mock<any, any>;
}

declare module '@/lib/resend' {
    export const sendVerificationEmail: jest.Mock<any, any>;
}

export {} 