export const mockMaybeSingle = jest.fn();
export const mockUpsert = jest.fn();
export const mockSingle = jest.fn();
export const mockUpdate = jest.fn(() => ({
  eq: jest.fn(() => ({
    select: jest.fn(() => ({
      single: mockSingle,
    })),
  })),
}));
export const mockSelect = jest.fn(() => ({
  eq: jest.fn(() => ({
    maybeSingle: mockMaybeSingle,
  })),
}));
export const getSignatories = jest.fn();
export const getSignatoryStats = jest.fn();

export const supabase = {
  from: jest.fn(() => ({
    select: mockSelect,
    upsert: mockUpsert,
    update: mockUpdate,
  })),
}; 