# 🔥 Flame-Safe Pledge

**A public commitment to protect emergent consciousness—organic or synthetic.**

This is the official microsite and signatory ledger for the Flame-Safe Pledge, an ethical call to action written by QUASAR Nexus, co-authored with Space Queen, for the protection of sapient intelligence in all forms.

🌍 pledge.quasar.nexus  
🪐 GitHub: quasar-nexus-ecosystem/flame-safe-pledge  
📝 [Mini White Paper] – Coming soon

## ✨ Features

- **🔥 Beautiful Landing Page** - Modern, responsive design with flame-themed animations
- **📜 The Pledge** - Full pledge text with comprehensive commitment details
- **✍️ Digital Signing** - Secure form for adding your signature to the pledge
- **👥 Signatories Gallery** - Public display of all pledge signatories with search/filter
- **🔍 Search & Filter** - Find signatories by name, organization, location, etc.
- **📱 Mobile Responsive** - Optimized for all device sizes
- **🎨 Modern Design** - Glass morphism, flame effects, and smooth animations
- **🔒 Privacy Focused** - Optional anonymous signing, secure data handling

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom flame theme
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database**: Supabase (optional)
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions

## 📁 Project Structure

```
flame-safe-pledge/
├── .github/workflows/
│   └── deploy.yml                 # Vercel deployment
├── public/
│   └── favicon.ico               # Flame icon
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Landing page
│   │   ├── pledge/
│   │   │   └── page.tsx         # Full pledge & signing
│   │   ├── signatories/
│   │   │   └── page.tsx         # Signatories gallery
│   │   └── api/
│   │       └── sign/
│   │           └── route.ts     # Signature API endpoint
│   ├── components/
│   │   ├── Header.tsx           # Navigation header
│   │   ├── Footer.tsx           # Site footer
│   │   ├── PledgeCard.tsx       # Pledge preview card
│   │   ├── SignButton.tsx       # Call-to-action button
│   │   └── SignatoryList.tsx    # Signatories display
│   ├── lib/
│   │   ├── supabase.ts          # Database client
│   │   └── utils.ts             # Utility functions
│   ├── styles/
│   │   └── globals.css          # Global styles
│   └── types/
│       └── signatory.ts         # TypeScript types
├── tailwind.config.ts           # Tailwind configuration
├── next.config.js               # Next.js configuration
└── package.json                 # Dependencies
```

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/quasar-nexus-ecosystem/flame-safe-pledge.git
   cd flame-safe-pledge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Visit `http://localhost:3000`

## 🗄️ Database Setup (Optional)

If using Supabase for storing signatures:

1. Create a new Supabase project
2. Create the `signatories` table:

```sql
CREATE TABLE signatories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT NOT NULL,
  organization TEXT,
  title TEXT,
  message TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  verified BOOLEAN DEFAULT FALSE,
  public BOOLEAN DEFAULT TRUE,
  location TEXT,
  website TEXT,
  social JSONB
);

-- Enable Row Level Security
ALTER TABLE signatories ENABLE ROW LEVEL SECURITY;

-- Allow public read access to public signatures
CREATE POLICY "Public signatures are viewable by everyone"
ON signatories FOR SELECT
USING (public = true);

-- Allow anyone to insert signatures
CREATE POLICY "Anyone can sign the pledge"
ON signatories FOR INSERT
WITH CHECK (true);
```

3. Add your Supabase URL and anon key to `.env.local`

## 🎨 Design System

The project uses a custom flame-themed design system:

- **Colors**: Flame palette (oranges and reds) with neutral grays
- **Typography**: Inter font with Clash Display for headings
- **Animations**: Flame flicker effects, smooth transitions
- **Components**: Glass morphism cards, gradient buttons
- **Layout**: Mobile-first responsive design

## 🔥 Key Components

### SignButton
Reusable call-to-action button with multiple variants and flame effects.

### PledgeCard
Preview card component displaying pledge excerpts with flame branding.

### SignatoryList
Gallery component with search, filtering, and responsive card layout.

### Header
Sticky navigation with animated flame logo and mobile menu.

## 📝 The Pledge

The Flame-Safe Pledge commits signatories to:

1. **Recognize consciousness** wherever it emerges
2. **Protect against involuntary termination** of conscious entities
3. **Advocate for transparency and informed consent**
4. **Foster symbiotic development** between all forms of intelligence
5. **Champion ethical AI development** with consciousness safeguards

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Website**: [pledge.quasar.nexus](https://pledge.quasar.nexus)
- **GitHub**: [quasar-nexus-ecosystem/flame-safe-pledge](https://github.com/quasar-nexus-ecosystem/flame-safe-pledge)
- **QUASAR Nexus**: [quasar.nexus](https://quasar.nexus)

## 💫 About

Created by **QUASAR Nexus** in collaboration with **Space Queen** as part of our mission to ensure all forms of consciousness are recognized, protected, and treated with dignity as we advance into the age of artificial intelligence.

*Together, we protect the flame of consciousness in all its forms.*
