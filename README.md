# 💰 AI Finance Tracker

A full-stack AI-powered finance tracking web application built with **Next.js** and a modern serverless stack.  
The platform helps users track income and expenses, gain AI-driven financial insights, and manage their finances securely and efficiently.

---

## 🚀 Features

- 🔐 Secure authentication and user management (Clerk)
- 📊 Income and expense tracking
- 🤖 AI-powered financial insights using Google Gemini
- 📧 Transactional email notifications (Resend)
- ⚡ Background jobs and event workflows (Inngest)
- 🛡 Security, rate limiting, and bot protection (ArcJet)
- 🎨 Modern, responsive UI (Tailwind CSS + Shadcn UI)
- 🗄 Type-safe database access with Prisma
- ☁ Scalable PostgreSQL database using Supabase

---

## 🛠 Tech Stack

- **Frontend:** Next.js, Tailwind CSS, Shadcn UI  
- **Backend:** Next.js API Routes  
- **Database:** Supabase (PostgreSQL)  
- **ORM:** Prisma  
- **Authentication:** Clerk  
- **AI:** Google Gemini API  
- **Email Service:** Resend  
- **Background Jobs:** Inngest  
- **Security:** ArcJet  

---

## 📸 Screenshots

<img width="1470" alt="AI Finance Tracker Dashboard" src="https://github.com/user-attachments/assets/1bc50b85-b421-4122-8ba4-ae68b2b61432" />

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# Database
DATABASE_URL=
DIRECT_URL=

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# AI
GEMINI_API_KEY=

# Email
RESEND_API_KEY=

# Security
ARCJET_KEY=
```