# 🌍 Travel Blog v2

A modern, feature-rich travel blog platform built with Next.js 14, offering a seamless content management experience with real-time editing capabilities.

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![License](https://img.shields.io/badge/license-Private-red)

## ✨ Features

- 🔐 **Authentication** - Secure user authentication powered by Clerk
- 📝 **Rich Text Editor** - Advanced content editing with TipTap
- 🎨 **Modern UI** - Beautiful components using shadcn/ui and Tailwind CSS
- 🔍 **Search Functionality** - Real-time content search capabilities
- 📊 **Admin Dashboard** - Comprehensive admin panel for content management
- 🌓 **Dark/Light Mode** - Theme customization with next-themes
- 📱 **Responsive Design** - Mobile-first approach for all screen sizes
- 🖼️ **Image Upload** - Integrated file upload system with Vercel Blob
- 💾 **Database** - Powered by Vercel Postgres with Drizzle ORM
- 🚀 **Performance** - Built with Next.js App Router and Server Components

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Database**: Vercel Postgres
- **ORM**: Drizzle
- **Authentication**: Clerk
- **Editor**: TipTap
- **Storage**: Vercel Blob
- **Forms**: React Hook Form, Zod
- **Animation**: Framer Motion
- **State Management**: Server Actions

## 📦 Installation

1. Clone the repository:
\`\`\`bash
git clone [repository-url]
cd travelblogv2
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
bun install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Initialize the database:
\`\`\`bash
npm run push
\`\`\`

## 🚀 Development

Start the development server:

\`\`\`bash
npm run dev
# or with turbo
npm run turbo
\`\`\`

Other available scripts:
- \`npm run build\`: Build the production application
- \`npm run start\`: Start the production server
- \`npm run lint\`: Run ESLint
- \`npm run studio\`: Launch Drizzle Studio
- \`npm run push\`: Push database schema changes

## 📁 Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── (landing)/         # Landing page routes
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   └── dashboard/         # User dashboard
├── components/            # React components
│   ├── editor/           # Rich text editor components
│   ├── ui/               # UI components
│   └── defaultcompo/     # Default components
├── lib/                  # Utility functions
├── public/               # Static assets
└── hooks/               # Custom React hooks
\`\`\`

## 🔧 Configuration Files

- \`next.config.mjs\`: Next.js configuration
- \`tailwind.config.ts\`: Tailwind CSS configuration
- \`drizzle.config.ts\`: Drizzle ORM configuration
- \`tsconfig.json\`: TypeScript configuration
- \`middleware.ts\`: Next.js middleware
- \`components.json\`: shadcn/ui configuration

## 🤝 Contributing

This is a private project. Contact the maintainers for contribution guidelines.

## 📝 License

Private - All rights reserved

---

*Built with ❤️ using Next.js and TypeScript*
