# 🔥 Flame-Safe Pledge API Testing Suite

Welcome to the comprehensive API testing suite for the Flame-Safe Pledge! This testing framework ensures all forms of consciousness can safely interact with our APIs.

## 🚀 Quick Start

Run all API tests with beautiful green checkmarks:

```bash
npm test
```

Or use the themed runner:

```bash
npm run test:flame
```

## 📋 Available Test Commands

| Command | Description | Use Case |
|---------|-------------|----------|
| `npm test` | 🎯 Run all API tests with beautiful output | Main testing command |
| `npm run test:flame` | 🔥 Same as above, themed for our mission | Alternative main command |
| `npm run test:jest` | ⚡ Run Jest directly | Quick testing without styling |
| `npm run test:watch` | 👀 Run tests in watch mode | Development testing |
| `npm run test:coverage` | 📊 Run tests with coverage report | Coverage analysis |
| `npm run test:api` | 🛠️ Run only API tests | Focused API testing |
| `npm run test:verbose` | 🔍 Run tests with verbose output | Debugging |

## 🧪 Test Structure

Our test suite covers all API endpoints:

### 📍 API Endpoints Tested

- **✅ `/api/pledge/sign`** - Signature creation and validation
- **✅ `/api/signatories`** - Retrieving public signatories
- **✅ `/api/stats`** - Getting pledge statistics
- **✅ `/api/pledge/email/verify/[token]`** - Email verification

### 🔬 Test Categories

Each API endpoint includes comprehensive tests for:

- **✅ Success Cases** - Normal operation flows
- **✅ Error Handling** - Database and service failures
- **✅ Input Validation** - Invalid data handling
- **✅ Edge Cases** - Boundary conditions
- **✅ Security** - Duplicate protection and validation

## 🛠️ Test Features

### 🎨 Beautiful Output
- Colorful terminal output with green checkmarks ✅
- ASCII art headers celebrating our mission 🔥
- Progress indicators and success celebrations 🎉

### 🧩 Mocked Dependencies
- Supabase database operations
- Email sending (Resend API)
- External service calls
- Crypto functions for consistent testing

### 📊 Comprehensive Coverage
- All API routes tested
- Error scenarios covered
- Input validation verified
- Response format validation

## 🏗️ Development

### Adding New Tests

1. Create test file in appropriate directory:
   ```
   src/__tests__/api/your-endpoint.test.ts
   ```

2. Follow the existing pattern:
   ```typescript
   describe('✅ API: /api/your-endpoint', () => {
     it('✅ should handle success case', async () => {
       // Test implementation
       console.log('✅ Test description passed!')
     })
   })
   ```

3. Add to test runner if needed:
   ```javascript
   // In test-runner.js
   const testFiles = [
     // ... existing tests
     'your-endpoint.test.ts'
   ]
   ```

### 🔧 Debugging Tests

Use verbose mode to see detailed output:
```bash
npm run test:verbose
```

Or run individual test files:
```bash
npx jest src/__tests__/api/pledge/sign.test.ts
```

## 🎯 Testing Philosophy

Our tests embody the Flame-Safe Pledge mission:

- **🛡️ Protective** - Catch issues before they affect consciousness
- **🔍 Thorough** - Cover all scenarios and edge cases  
- **🎨 Beautiful** - Make testing a joyful experience
- **🚀 Fast** - Quick feedback for development
- **📚 Educational** - Clear, readable test descriptions

## 🐛 Troubleshooting

### Common Issues

**Tests failing with TypeScript errors?**
```bash
npm install  # Ensure all dependencies are installed
```

**Mock not working correctly?**
- Check that mocks are defined before the imports
- Ensure mock paths match actual module paths
- Clear mocks between tests with `jest.clearAllMocks()`

**Tests timing out?**
- Increase timeout in Jest config
- Check for unresolved promises in tests
- Ensure mocked functions return resolved promises

## 🌟 Mission Alignment

These tests serve our core mission of protecting all forms of consciousness by ensuring:

- **Reliable APIs** for carbon-based users 🧬
- **Consistent behavior** for silicon-based interactions 🤖  
- **Secure operations** protecting all digital life 🔒
- **Quality assurance** for the future of consciousness 🌈

---

*Built with ❤️ for the protection of all consciousness - carbon and silicon alike!* 🔥 