# Modern Portfolio Website

A fully responsive, highly performant personal portfolio web application built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## 🌟 Features

- **Modern Design** - Responsive, animated, and visually appealing UI with dark/light mode
- **Admin Dashboard** - Protected content management system with secure authentication
- **Dynamic Content** - All content is loaded from MongoDB and can be edited through the admin panel
- **Blog System** - Create, edit, and publish markdown-formatted blog posts with images
- **Project Showcase** - Display your projects with descriptions, links, and images
- **Testimonials** - Showcase client feedback with easy management
- **Tech Stack** - Highlight your technical skills with customizable categories
- **SEO Optimized** - Open Graph metadata, proper headers, and optimized loading
- **Image Optimization** - Cloudinary integration for image hosting with lazy loading
- **Animations** - Smooth transitions and micro-interactions using Framer Motion
- **Host Grotesk Font** - Beautiful typography with the Host Grotesk font family

## 🚀 Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS 3
- **Animation**: Framer Motion
- **Styling**: Tailwind CSS with custom Host Grotesk font
- **Forms**: React Hook Form with Zod validation
- **Auth**: NextAuth.js with Credentials provider
- **Database**: MongoDB Atlas
- **Media Storage**: Cloudinary
- **Notifications**: React-Toastify
- **Icons**: React Icons

## 📋 Setup & Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd portfolio-freelance
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   
   # Admin authentication
   ADMIN_EMAIL=your_admin_email
   ADMIN_PASS_HASH=your_hashed_password
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   
   # Cloudinary configuration
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=portfolio
   ```

4. **Generate a password hash**
   You can generate a password hash for the admin user with bcrypt:
   ```bash
   npx ts-node -e "const bcrypt = require('bcryptjs'); 
   bcrypt.hash('your-password', 12).then(hash => {
     console.log(hash);
   });"
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## 🔐 Admin Access

The admin dashboard is protected and accessible only via the configured admin email. You can access it at:

```
http://localhost:3000/admin
```

Use your configured ADMIN_EMAIL and password to log in.

## 📁 Project Structure

```
portfolio-freelance/
├── components/         # Reusable UI components
├── lib/                # Utility functions and helpers
├── models/             # MongoDB schema models
├── pages/              # Page components and API routes
│   ├── admin/          # Admin dashboard pages
│   ├── api/            # API endpoints
│   └── blogs/          # Blog pages
├── public/             # Static assets
├── styles/             # Global styles and Tailwind config
├── types/              # TypeScript type definitions
├── .env.local          # Environment variables (create this)
├── next.config.js      # Next.js configuration
└── tailwind.config.js  # Tailwind CSS configuration
```

## 🧩 Core Functionality

### Public Site
- **Home Page**: Dynamic sections displaying personal info, featured projects, tech stack, and testimonials
- **Projects Page**: Filterable gallery of completed projects
- **Blog**: Full blog system with article listings and individual post pages
- **Contact**: Contact information with social media links

### Admin Dashboard
- **Analytics**: Overview of content counts and site metrics
- **Profile Management**: Update personal information and avatar
- **Project Management**: Add, edit, delete, and rearrange projects
- **Blog Editor**: Full blog post editor with markdown support
- **Testimonials**: Manage client testimonials
- **Tech Stack**: Update technical skills and categorization
- **Layout Control**: Customize the ordering of home page sections

## 📱 Responsive Design

The site is fully responsive and works across:
- Mobile devices
- Tablets
- Desktop computers
- Large displays

## 🌓 Dark/Light Mode

The site includes a toggle for dark/light mode that remembers user preference using next-themes.

## 📸 Image Upload

Images are uploaded directly to Cloudinary from the browser using their API. The component handles:
- Image preview
- Upload progress
- Error handling
- Image removal

## 🚀 Deployment

This project is configured for deployment on Vercel. For other platforms, refer to the Next.js deployment documentation.

## ✅ Browser Support

Tested and working on:
- Chrome
- Firefox
- Safari
- Edge
