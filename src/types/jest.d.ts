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

export {} 