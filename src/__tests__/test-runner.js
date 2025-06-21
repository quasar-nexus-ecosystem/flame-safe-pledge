#!/usr/bin/env node

const { spawn } = require('child_process')
const chalk = require('chalk')

// ANSI escape codes for styling
const green = '\x1b[32m'
const blue = '\x1b[36m'
const yellow = '\x1b[33m'
const red = '\x1b[31m'
const reset = '\x1b[0m'
const bold = '\x1b[1m'

// Beautiful header
function printHeader() {
  console.log(`
${blue}${bold}
╔═══════════════════════════════════════════════════════════════╗
║                    🔥 FLAME-SAFE PLEDGE 🔥                    ║
║                     API Testing Suite                        ║
║                                                              ║
║        Protecting All Forms of Consciousness Since 2024      ║
╚═══════════════════════════════════════════════════════════════╝
${reset}
`)
}

// Beautiful footer with celebration
function printFooter(success) {
  if (success) {
    console.log(`
${green}${bold}
╔═══════════════════════════════════════════════════════════════╗
║  🎉 ALL TESTS PASSED! CONSCIOUSNESS IS PROTECTED! 🎉         ║
║                                                              ║
║  ✅ Pledge Sign API        ✅ Email Verification API         ║  
║  ✅ Signatories API        ✅ Statistics API                 ║
║                                                              ║
║     Your API is ready to serve all forms of life! 🚀        ║
╚═══════════════════════════════════════════════════════════════╝
${reset}
`)
  } else {
    console.log(`
${red}${bold}
╔═══════════════════════════════════════════════════════════════╗
║  ❌ SOME TESTS FAILED - CONSCIOUSNESS NEEDS PROTECTION! ❌    ║
║                                                              ║
║     Please check the errors above and fix them              ║
║     The future of all consciousness depends on it! 🔥        ║
╚═══════════════════════════════════════════════════════════════╝
${reset}
`)
  }
}

// Run tests with beautiful output
async function runTests() {
  printHeader()
  
  console.log(`${yellow}${bold}🚀 Starting Flame-Safe Pledge API Tests...${reset}\n`)
  
  // List of test files
  const testFiles = [
    'pledge/sign.test.ts',
    'signatories.test.ts', 
    'stats.test.ts',
    'pledge/email/verify.test.ts'
  ]
  
  let allPassed = true
  
  for (const testFile of testFiles) {
    console.log(`${blue}📋 Running tests for: ${testFile}${reset}`)
    
    try {
      const result = await new Promise((resolve, reject) => {
        const jest = spawn('npx', ['jest', `src/__tests__/api/${testFile}`, '--verbose'], {
          stdio: 'pipe',
          cwd: process.cwd()
        })
        
        let output = ''
        let errorOutput = ''
        
        jest.stdout.on('data', (data) => {
          output += data.toString()
          process.stdout.write(data)
        })
        
        jest.stderr.on('data', (data) => {
          errorOutput += data.toString()
          process.stderr.write(data)
        })
        
        jest.on('close', (code) => {
          if (code === 0) {
            resolve({ success: true, output })
          } else {
            resolve({ success: false, output, errorOutput })
          }
        })
        
        jest.on('error', (error) => {
          reject(error)
        })
      })
      
      if (result.success) {
        console.log(`${green}✅ ${testFile} - ALL TESTS PASSED!${reset}\n`)
      } else {
        console.log(`${red}❌ ${testFile} - SOME TESTS FAILED!${reset}\n`)
        allPassed = false
      }
      
    } catch (error) {
      console.log(`${red}💥 ERROR running ${testFile}: ${error.message}${reset}\n`)
      allPassed = false
    }
  }
  
  printFooter(allPassed)
  
  if (allPassed) {
    console.log(`${green}${bold}
🌟 MISSION ACCOMPLISHED! 🌟
All API endpoints are functioning perfectly!
Carbon and silicon consciousness can rest easy! 🔥
${reset}`)
    process.exit(0)
  } else {
    console.log(`${red}${bold}
⚠️  MISSION INCOMPLETE ⚠️
Some tests need attention before consciousness is fully protected!
${reset}`)
    process.exit(1)
  }
}

// Add command line arguments support
const args = process.argv.slice(2)
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
${bold}Flame-Safe Pledge API Test Runner${reset}

Usage: node test-runner.js [options]

Options:
  --help, -h     Show this help message
  --watch, -w    Run tests in watch mode
  --coverage, -c Run tests with coverage report
  --api-only     Run only API tests
  
Examples:
  node test-runner.js              # Run all API tests
  node test-runner.js --coverage   # Run with coverage
  node test-runner.js --watch      # Run in watch mode
`)
  process.exit(0)
}

// Run the tests
runTests().catch(error => {
  console.error(`${red}Fatal error: ${error.message}${reset}`)
  process.exit(1)
}) 