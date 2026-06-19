# Cybersecurity Portfolio

A modern, responsive portfolio website showcasing cybersecurity expertise, projects, and certifications. Built with React and optimized for professional presentation.

## 🚀 Features

- **Responsive Design**: Seamless experience across all devices
- **Dark Theme**: Cybersecurity-focused design with navy/blue accents
- **Component-Based Architecture**: Clean, modular React components
- **Data-Driven**: Centralized content management for easy updates
- **Performance Optimized**: Fast loading and smooth animations
- **Accessibility**: WCAG compliant with semantic HTML

## 🛠 Tech Stack

- React 18.2
- CSS3 (No frameworks)
- JavaScript ES6+
- React Scripts 5.0

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/M-Mousa366/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## 🏗 Build for Production

```bash
npm run build
```

Creates an optimized production build in the `build/` folder ready for deployment.

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Hero.js         # Landing section with typing animation
│   ├── About.js        # About section
│   ├── Skills.js       # Skills grid
│   ├── Experience.js   # Work experience & certifications
│   ├── Projects.js     # Project showcase
│   └── Contact.js      # Contact information
├── data/
│   └── portfolioData.js # Centralized content (single source of truth)
├── App.js              # Main app with navigation
├── index.js            # Entry point
└── styles.css          # Global styles
```

## ✏️ Customization

All content is centralized in `src/data/portfolioData.js`. Update this file to customize:

- Personal information
- Skills and categories
- Work experience
- Certifications
- Projects
- Contact details

No need to touch component files for content updates.

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository on [vercel.com](https://vercel.com)
3. Deploy automatically

### Netlify

```bash
npm run build
# Drag and drop the build/ folder to Netlify
```

### GitHub Pages

```bash
npm install gh-pages --save-dev
# Add to package.json: "homepage": "https://yourusername.github.io/Portfolio"
npm run build
npx gh-pages -d build
```

## 📄 License

MIT License - Free to use for personal portfolios

## 👤 Contact

**Mohamed Adel Mousa**  
Cybersecurity & IT Infrastructure Engineer

- 📧 Email: mohamed.adel.mousa.2004@gmail.com
- 💼 LinkedIn: [mohamed-adel-bb903126a](https://www.linkedin.com/in/mohamed-adel-bb903126a/)
- 🐙 GitHub: [M-Mousa366](https://github.com/M-Mousa366)
- 📍 Location: Giza, Egypt
