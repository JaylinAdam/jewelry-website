# Kim Thu Jewelry - Luxury Diamond Website

A modern, responsive jewelry website featuring Shopify integration skeleton, enhanced contact forms, and performance optimizations. Currently running in **mock mode** for development and testing.

## 🚀 Features

- **Shopify Integration Skeleton** (Three modes)
  - **Mock Mode** - Local product data for development
  - **Buy Button Mode** - Simple Shopify Buy Button embed
  - **Storefront API Mode** - Advanced cart functionality
- **Enhanced Contact Form** with Netlify Forms and Formspree support
- **Performance Optimizations** with Web Vitals monitoring
- **Accessibility** compliant (WCAG 2.1 AA)
- **Responsive Design** for all devices
- **SEO Optimized** with sitemap and robots.txt

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Shopify store (for e-commerce features)
- Netlify account (for form handling)

## 🛠️ Setup

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd jewelry_landing
npm install
```

### 2. Environment Configuration

Copy `.env.example` to `.env` and configure your settings:

```bash
cp .env.example .env
```

Edit `.env` with your actual values:

```env
# Shopify Configuration
SHOP_MODE=buy-button
SHOPIFY_STORE_DOMAIN=yourstore.myshopify.com
SHOPIFY_STOREFRONT_TOKEN=your_storefront_access_token
SHOPIFY_COLLECTION_ID=your_collection_id

# Contact Form Configuration
CONTACT_SINK=netlify
FORMSPREE_ID=your_formspree_id

# Development
NODE_ENV=development
```

### 3. Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your site.

## 🛍️ Shopify Setup

### Mode 1: Mock Mode (Current - Development)

The site currently runs in **mock mode** using local product data. No Shopify setup required for development.

```env
SHOP_MODE=mock
```

### Mode 2: Buy Button (Simple)

1. **Get your Shopify store domain:**
   - Go to your Shopify admin
   - Settings → General
   - Copy your "Shop domain" (e.g., `mystore.myshopify.com`)

2. **Get collection ID (optional):**
   - Go to Products → Collections
   - Click on your collection
   - Copy the ID from the URL

3. **Update configuration:**
   ```env
   SHOP_MODE=buy-button
   SHOPIFY_STORE_DOMAIN=mystore.myshopify.com
   SHOPIFY_COLLECTION_ID=123456789
   ```

### Mode 3: Storefront API (Advanced)

1. **Create a Storefront API access token:**
   - Go to Apps → App and sales channel settings
   - Develop apps → Create an app
   - Configure Storefront API scopes
   - Install and get the access token

2. **Update configuration:**
   ```env
   SHOP_MODE=storefront
   SHOPIFY_STORE_DOMAIN=mystore.myshopify.com
   SHOPIFY_STOREFRONT_TOKEN=your_access_token
   ```

## 📧 Contact Form Setup

### Option 1: Netlify Forms (Recommended)

1. Deploy to Netlify
2. Forms are automatically detected
3. No additional configuration needed

### Option 2: Formspree

1. Sign up at [Formspree.io](https://formspree.io)
2. Create a new form
3. Copy your form ID
4. Update configuration:
   ```env
   CONTACT_SINK=formspree
   FORMSPREE_ID=your_form_id
   ```

## 🔄 Switching Modes

### From Mock to Buy Button

1. Update `.env`:

   ```env
   SHOP_MODE=buy-button
   SHOPIFY_STORE_DOMAIN=yourstore.myshopify.com
   SHOPIFY_COLLECTION_ID=your_collection_id
   ```

2. Test the following:
   - Buy button rendering
   - Collection display
   - Shopify SDK loading

### From Mock to Storefront

1. Update `.env`:

   ```env
   SHOP_MODE=storefront
   SHOPIFY_STORE_DOMAIN=yourstore.myshopify.com
   SHOPIFY_STOREFRONT_TOKEN=your_token
   ```

2. Test the following:
   - Product loading from Storefront API
   - Cart functionality
   - Checkout process

## 🚀 Deployment

### Netlify (Recommended)

1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.` (root)
4. Add environment variables in Netlify dashboard

### Vercel

1. Import your GitHub repository
2. Build command: `npm run build`
3. Output directory: `.`
4. Add environment variables

### Manual Deployment

1. Run `npm run build`
2. Upload all files to your web server
3. Ensure `.env` variables are set on your server

## 📊 Performance

The site is optimized for:

- **Lighthouse Performance**: ≥ 90
- **Lighthouse Accessibility**: ≥ 95
- **Core Web Vitals**: All green

### Performance Features

- Image lazy loading
- Font optimization with `font-display: swap`
- Critical resource preloading
- Web Vitals monitoring (dev mode)
- Script optimization

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- Focus management
- ARIA labels and descriptions
- Color contrast compliance

## 🧪 Testing

### Manual Testing Checklist

- [ ] Homepage loads correctly
- [ ] Navigation works on mobile/desktop
- [ ] Contact form validation works
- [ ] Contact form submits successfully
- [ ] Shopify integration loads (both modes)
- [ ] Cart functionality works (storefront mode)
- [ ] All images load properly
- [ ] Performance scores meet targets

### Automated Testing

```bash
# Lint code
npm run lint

# Type check
npm run typecheck

# Build test
npm run build
```

## 📁 Project Structure

```
jewelry_landing/
├── assets/
│   ├── css/
│   │   └── styles.css          # Main stylesheet
│   ├── js/
│   │   ├── main.js            # Main JavaScript
│   │   └── performance.js     # Performance monitoring
│   └── img/                   # Images
├── public/
│   ├── favicon.ico           # Site favicon
│   └── og.jpg               # Open Graph image
├── .github/
│   └── workflows/
│       └── ci.yml            # GitHub Actions CI
├── .env.example              # Environment variables template
├── .gitignore               # Git ignore rules
├── .prettierrc              # Prettier configuration
├── .eslintrc.json           # ESLint configuration
├── index.html               # Main HTML file
├── package.json             # Dependencies and scripts
├── README.md               # This file
├── LICENSE                 # MIT License
├── robots.txt              # SEO robots file
└── sitemap.xml             # SEO sitemap
```

## 🔧 Configuration

### Environment Variables

| Variable                   | Description                  | Required        | Default   |
| -------------------------- | ---------------------------- | --------------- | --------- |
| `SHOP_MODE`                | Shopify integration mode     | Yes             | `mock`    |
| `SHOPIFY_STORE_DOMAIN`     | Your Shopify store domain    | Buy/Storefront  | -         |
| `SHOPIFY_STOREFRONT_TOKEN` | Storefront API token         | Storefront mode | -         |
| `SHOPIFY_COLLECTION_ID`    | Collection ID for buy button | Buy button mode | -         |
| `CONTACT_SINK`             | Contact form handler         | Yes             | `netlify` |
| `FORMSPREE_ID`             | Formspree form ID            | Formspree mode  | -         |

## 🐛 Troubleshooting

### Common Issues

1. **Shopify products not loading**
   - Check your store domain and token
   - Verify CORS settings in Shopify
   - Check browser console for errors

2. **Contact form not working**
   - Verify Netlify Forms is enabled
   - Check form name attribute matches
   - Test with different email addresses

3. **Performance issues**
   - Check image sizes and formats
   - Verify lazy loading is working
   - Monitor Core Web Vitals

### Getting Help

- Check the browser console for errors
- Verify all environment variables are set
- Test in incognito mode
- Check network tab for failed requests

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support, email thuluu08@yahoo.com or create an issue in the repository.

---

**Kim Thu Jewelry** - Luxury Diamond Jewelry Website
