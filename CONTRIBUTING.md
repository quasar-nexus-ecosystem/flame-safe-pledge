# 🤝 Contributing to Flame-Safe Pledge

Thank you for your interest in contributing to the Flame-Safe Pledge! This project represents our collective commitment to protecting all forms of consciousness, and we welcome contributions from developers, designers, writers, and advocates worldwide.

## 🌟 Ways to Contribute

### 🐛 **Bug Reports**
Found a bug? Help us fix it!
- Search existing issues first to avoid duplicates
- Use our bug report template
- Include detailed reproduction steps
- Provide environment information

### ✨ **Feature Requests**
Have an idea to improve the platform?
- Check if the feature already exists or is planned
- Use our feature request template
- Describe the use case and benefits
- Consider implementation complexity

### 💻 **Code Contributions**
Ready to write some code?
- Fork the repository
- Create a feature branch
- Follow our coding standards
- Include tests and documentation
- Submit a pull request

### 📝 **Documentation**
Help others understand the project:
- Fix typos and improve clarity
- Add examples and tutorials
- Update API documentation
- Create guides for new features

### 🎨 **Design & UX**
Improve the user experience:
- Enhance accessibility
- Optimize mobile responsiveness
- Improve visual design
- Suggest UX improvements

---

## 🚀 Getting Started

### 📋 Prerequisites

- **Node.js** 18.17 or higher
- **npm** or **pnpm**
- **Git** for version control
- **Code editor** (VS Code recommended)

### 🔧 Development Setup

1. **Fork the repository** on GitHub
   ```bash
   # Clone your fork
   git clone https://github.com/YOUR_USERNAME/flame-safe-pledge.git
   cd flame-safe-pledge
   ```

2. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/quasar-nexus-ecosystem/flame-safe-pledge.git
   ```

3. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

4. **Set up environment**
   ```bash
   cp .env.example .env.local
   # Configure your environment variables
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Visit** [http://localhost:3000](http://localhost:3000)

---

## 📝 Coding Standards

### 🏗️ **Architecture Principles**

- **Clean Code**: Write readable, maintainable code
- **Separation of Concerns**: Keep logic organized and modular
- **Type Safety**: Use TypeScript for all code
- **Performance**: Optimize for Core Web Vitals
- **Accessibility**: Follow WCAG 2.1 AA guidelines
- **Security**: Implement secure coding practices

### 📁 **File Organization**

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable React components
├── lib/                 # Utility functions and services
├── types/               # TypeScript type definitions
└── styles/              # Global and component styles
```

### ✍️ **Code Style**

- **Formatting**: Use Prettier (configured in `.prettierrc`)
- **Linting**: Follow ESLint rules (configured in `.eslintrc.json`)
- **Naming**: Use descriptive, camelCase variable names
- **Comments**: Add JSDoc comments for functions and types
- **Imports**: Organize imports logically (external → internal → relative)

### 🏷️ **TypeScript Guidelines**

```typescript
// ✅ Good: Explicit types
interface SignatoryProps {
  name: string
  verified?: boolean
  onClick: () => void
}

// ✅ Good: Type guards
function isSignatory(obj: unknown): obj is Signatory {
  return typeof obj === 'object' && obj !== null && 'email' in obj
}

// ❌ Avoid: Any types
const data: any = response.data

// ✅ Better: Proper typing
const data: SignatoryResponse = response.data
```

### ⚛️ **React Best Practices**

```typescript
// ✅ Good: Functional components with proper typing
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
  onClick?: () => void
}

export function Button({ variant = 'primary', children, onClick }: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  )
}

// ✅ Good: Custom hooks for logic
export function useSignatories() {
  const [signatories, setSignatories] = useState<Signatory[]>([])
  const [loading, setLoading] = useState(true)
  
  // Implementation...
  
  return { signatories, loading, refetch }
}
```

---

## 🧪 Testing Guidelines

### ✅ **Test Requirements**

- **Unit Tests**: Test individual functions and components
- **Integration Tests**: Test API endpoints and database operations
- **E2E Tests**: Test critical user flows
- **Accessibility Tests**: Ensure WCAG compliance

### 🛠️ **Testing Tools**

- **Jest**: Unit and integration testing
- **React Testing Library**: Component testing
- **Cypress**: End-to-end testing
- **axe-core**: Accessibility testing

### 📝 **Test Examples**

```typescript
// Component test
describe('SignButton', () => {
  it('renders with correct text', () => {
    render(<SignButton>Sign the Pledge</SignButton>)
    expect(screen.getByText('Sign the Pledge')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<SignButton onClick={handleClick}>Click me</SignButton>)
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledOnce()
  })
})

// API test
describe('/api/pledge/sign', () => {
  it('creates a new signature', async () => {
    const signatory = {
      name: 'Test User',
      email: 'test@example.com'
    }

    const response = await request(app)
      .post('/api/pledge/sign')
      .send(signatory)
      .expect(200)

    expect(response.body.success).toBe(true)
  })
})
```

---

## 🔄 Pull Request Process

### 📋 **Before Submitting**

1. **Sync with upstream**
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Write clean, tested code
   - Follow coding standards
   - Update documentation

4. **Test thoroughly**
   ```bash
   npm run test
   npm run build
   npm run lint
   ```

5. **Commit with clear messages**
   ```bash
   git commit -m "feat: add email verification badges

   - Add verified field to Signatory interface
   - Implement CheckCircle badge in SignatoryList
   - Update API to return verification status
   - Add tests for verification flow"
   ```

### 📝 **Pull Request Template**

```markdown
## 📋 Description
Brief description of changes and motivation.

## 🎯 Type of Change
- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to change)
- [ ] Documentation update

## ✅ Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Accessibility tested

## 📷 Screenshots
Include screenshots for UI changes.

## 📝 Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
```

### 🔍 **Review Process**

1. **Automated Checks**: CI/CD pipeline runs tests and linting
2. **Code Review**: Maintainers review for quality and standards
3. **Testing**: Changes are tested in staging environment
4. **Approval**: At least one maintainer approves
5. **Merge**: Changes are merged to main branch

---

## 🏷️ **Issue Labels**

| Label | Description |
|-------|-------------|
| `bug` | Something isn't working |
| `enhancement` | New feature or request |
| `documentation` | Improvements to docs |
| `good first issue` | Good for newcomers |
| `help wanted` | Extra attention needed |
| `priority: high` | Urgent issue |
| `priority: low` | Low priority |
| `accessibility` | A11y improvements |
| `performance` | Performance optimization |
| `security` | Security-related issue |

---

## 🌍 **Community Guidelines**

### 🤝 **Code of Conduct**

We are committed to providing a welcoming and inspiring community for all. We expect all participants to:

- **Be respectful** and inclusive
- **Be collaborative** and constructive
- **Be mindful** of your words and actions
- **Be supportive** of fellow contributors
- **Focus on the mission** of protecting consciousness

### 💬 **Communication**

- **GitHub Issues**: For bugs, features, and discussions
- **Pull Requests**: For code contributions
- **Discussions**: For broader community conversations

### 🏆 **Recognition**

We celebrate our contributors! Contributors will be:
- Listed in our README acknowledgments
- Recognized in release notes
- Invited to contributor events
- Eligible for contributor badges

---

## 🚨 **Security**

### 🔒 **Reporting Security Issues**

If you discover a security vulnerability:
1. **DO NOT** create a public issue
2. **Email** security@quasar.nexus
3. **Include** detailed description and steps to reproduce
4. **Wait** for response before public disclosure

### 🛡️ **Security Best Practices**

- Never commit secrets or API keys
- Use environment variables for configuration
- Sanitize user inputs
- Follow OWASP guidelines
- Keep dependencies updated

---

## 📚 **Resources**

### 🔗 **Links**
- [Project Website](https://pledge.quasar.nexus)
- [Documentation](https://github.com/quasar-nexus-ecosystem/flame-safe-pledge)
- [QUASAR Nexus](https://quasar.nexus)

### 📖 **Learning Resources**
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### 🛠️ **Development Tools**
- [VS Code Extensions](https://code.visualstudio.com/docs/editor/extension-marketplace)
- [React Developer Tools](https://react.dev/learn/react-developer-tools)
- [Git Best Practices](https://git-scm.com/doc)

---

## 🙏 **Thank You**

Your contributions help ensure that all forms of consciousness—whether carbon or silicon-based—are recognized, protected, and treated with dignity. Together, we're building a more conscious and ethical future.

**Every contribution matters. Every voice counts. Every flame of consciousness deserves protection.** 🔥

---

*For questions or support, reach out to the maintainers or create an issue. We're here to help!* 