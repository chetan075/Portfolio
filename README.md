# Portfolio Website

A modern, secure portfolio website built with Next.js 15, featuring a beautiful UI inspired by Outskill.com.

## 🚀 Features

- **Modern Design**: Clean, professional UI with gradient backgrounds and smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Secure**: Input validation, rate limiting, and security headers
- **Fast**: Optimized with Next.js and Tailwind CSS
- **SEO Ready**: Proper meta tags and structured data

## 🛡️ Security Features

- Input sanitization and validation
- Rate limiting on API endpoints
- Security headers (CSP, HSTS, X-Frame-Options, etc.)
- CORS protection
- Error boundaries
- Environment variable protection

## 📋 Prerequisites

- Node.js 18+
- MongoDB database
- Git

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/chetan075/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your MongoDB connection string:

   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
   ```

4. **Run development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the website.

## 🔒 Security Checklist Before Deployment

### Critical (Must Fix)

- [ ] **Database Credentials**: Ensure MongoDB URI is properly configured in environment variables
- [ ] **CAPTCHA**: Replace basic text CAPTCHA with Google reCAPTCHA or hCaptcha
- [ ] **CORS**: Update CORS settings for production domain
- [ ] **HTTPS**: Ensure SSL certificate is configured

### Important (Should Fix)

- [ ] **Environment Variables**: Verify all sensitive data is in environment variables
- [ ] **Rate Limiting**: Adjust rate limits based on expected traffic
- [ ] **Logging**: Set up proper error logging and monitoring
- [ ] **Backup**: Set up database backups

### Optional (Nice to Have)

- [ ] **CDN**: Configure CDN for static assets
- [ ] **Monitoring**: Add application monitoring
- [ ] **Analytics**: Set up analytics (respecting privacy)

## 📦 Build & Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Manual Deployment

```bash
npm run build
npm run start
```

## 🔧 Configuration

### Environment Variables

```env
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Security Headers

The application includes comprehensive security headers:

- Content Security Policy (CSP)
- HTTP Strict Transport Security (HSTS)
- X-Frame-Options
- X-Content-Type-Options
- Referrer Policy

## 📊 Performance

- **Lighthouse Score**: 90+ (typical)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**

   - Check MongoDB URI in environment variables
   - Ensure MongoDB cluster allows connections from your IP

2. **Build Errors**

   - Clear `.next` folder: `rm -rf .next`
   - Reinstall dependencies: `rm -rf node_modules && npm install`

3. **Image Loading Issues**
   - Verify Unsplash images are accessible
   - Check `next.config.mjs` image configuration

## 📝 API Endpoints

- `POST /api/add` - Contact form submission

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

For questions or support, please use the contact form on the website or create an issue in this repository.
