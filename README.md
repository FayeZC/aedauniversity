# AeDA University Website

Modern landing page for AeDA University - Attainable Education for All

## Quick Start

### Prerequisites
- Node.js 14+ 
- Modern browser

### Installation & Development

```bash
# Clone the repository
git clone <repository-url>
cd aedaWebsite

# Install dependencies (optional for static preview)
npm install

# Start development server
npm run dev
```

### Direct Preview
Open `index.html` directly in your browser for immediate preview.

## Project Structure

```
aedaWebsite/
├── index.html          # Main page
├── styles.css          # Purple theme design system
├── script.js           # Interactive scripts
├── package.json        # Project configuration
└── README.md          # Documentation
```

## Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Variables, Flexbox, Grid
- **JavaScript ES6+**: DOM manipulation, API integration
- **Design**: Purple tech theme with animations

## Backend Integration

The website integrates with:
- **Backend API**: http://localhost:8081 (aeda_kp)
- **Frontend App**: http://localhost:5174 (AeDA_webfront)

### Button Actions
- "Get Started" buttons redirect to the main application
- "Learn More" opens relevant sections
- "Contact Sales" opens email client

## Configuration

Update service URLs in `script.js`:

```javascript
const CONFIG = {
    backend: {
        baseURL: 'http://localhost:8081',
        apiPath: '/api'
    },
    frontend: {
        baseURL: 'http://localhost:5174'
    }
};
```

## Deployment

### Static Hosting
Deploy to any static hosting platform:
- Netlify
- Vercel
- GitHub Pages
- AWS S3

### Required Files
- `index.html`
- `styles.css`
- `script.js`

## Features

- Responsive design for all devices
- Modern purple tech theme
- Smooth animations and transitions
- Service status monitoring
- Backend/frontend integration
- Performance optimized

## License

MIT License

---

**AeDA University** - Attainable Education for All