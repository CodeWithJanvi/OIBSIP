# 💻 Developer Portfolio | Lumbhani Janvi

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Responsive](https://img.shields.io/badge/Responsive-Yes-success?style=for-the-badge)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://personalporfoliowebsite-six.vercel.app/)
![Oasis Infobyte](https://img.shields.io/badge/Oasis%20Infobyte-Task%202%20(Level%201)-blueviolet?style=for-the-badge)

A modern, responsive and animated **personal portfolio website** with a developer-style (terminal and code editor) theme. Built with pure **HTML5, CSS3 and JavaScript** and no frameworks or build tools.

This project is **Task 2, Level 1 (Personal Portfolio)** of my **Oasis Infobyte (OIBSIP) Web Development Internship**.

🔗 **Live Demo:** [https://personalporfoliowebsite-six.vercel.app](https://personalporfoliowebsite-six.vercel.app/)
📂 **Repository:** [CodeWithJanvi/OIBSIP](https://github.com/CodeWithJanvi/OIBSIP)

---

## 📸 Screenshots

### 🌙 Dark Theme

| Home | About |
|------|-------|
| ![Home](ScreenShots/Dark%20Theme/home%20Screen.png) | ![About](ScreenShots/Dark%20Theme/About%20Screen.png) |

| Skills | Services |
|--------|----------|
| ![Skills](ScreenShots/Dark%20Theme/Skill%20Screen.png) | ![Services](ScreenShots/Dark%20Theme/Skill%20Screen1.png) |

| Journey | Projects |
|---------|----------|
| ![Journey](ScreenShots/Dark%20Theme/Journey%20Screen.png) | ![Projects](ScreenShots/Dark%20Theme/Project%20Screen.png) |

| Contact | Footer |
|---------|--------|
| ![Contact](ScreenShots/Dark%20Theme/Contact%20Screen.png) | ![Footer](ScreenShots/Dark%20Theme/Footer%20Screen.png) |

### 📱 Responsive Design (Laptop, Tablet and Mobile)

![Responsive Showcase](ScreenShots/Dark%20Theme/responsive-showcase-dark.png)

### ☀️ Light Theme

The site also has a **light theme**. Use the 🌙 / ☀️ button in the navbar to switch. Your choice is saved in the browser.

<!-- Add light theme screenshots here after you upload them to ScreenShots/Light Theme/
| Home (Light) | Projects (Light) |
|--------------|------------------|
| ![Home Light](ScreenShots/Light%20Theme/home%20Screen.png) | ![Projects Light](ScreenShots/Light%20Theme/Project%20Screen.png) |
-->

---

## ✨ Features

- 🚀 **Boot screen** with a loading log and a Skip button
- 🌗 **Dark / Light theme toggle**, saved in the browser (no flash on reload)
- ⌨️ **Typing animation** in the hero section
- 🧑‍💻 **Code editor card** showing my developer profile
- ✨ **Cursor glow** effect and animated canvas background
- 🎞️ **Tech stack marquee** (auto scrolling ticker)
- 🖼️ **Animated avatar ring** in the About section
- 📊 **Skill bars with % counters** that animate when they scroll into view
- 🛠️ **Services** and 🧭 **Journey (timeline)** sections
- 🗂️ **Project cards** with tech tags and GitHub links
- 📬 **Working contact form** (Web3Forms, with Gmail compose as fallback)
- 📋 **Copy email** button
- ⭕ **Scroll progress ring** on the right side (click to go to top)
- 🖥️ **Terminal-style footer** with a live clock
- 📱 **Fully responsive** with a mobile burger menu
- 🔍 **SEO ready**: meta description, keywords, Open Graph and Twitter card tags
- 🎨 Custom **logo and favicons**

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| HTML5 | Page structure and semantic sections |
| CSS3 | Styling, theme variables, animations, responsive layout |
| JavaScript (ES6) | Typing effect, theme toggle, scroll effects, counters, form handling |
| Google Fonts | JetBrains Mono and Space Grotesk |
| Web3Forms | Free contact form email service |

---

## 📁 Project Structure

```
PersonalPortfolio/
│
├── index.html          # Main page (all sections)
├── README.md           # Project documentation
├── css/
│   └── style.css       # All styles and theme colours (:root)
├── js/
│   └── main.js         # All JavaScript (typing words, form key, animations)
├── assets/
│   ├── janvi.jpg           # Profile photo
│   ├── logo.svg            # Logo
│   ├── favicon.svg         # Favicon
│   ├── favicon-32.png      # Favicon (PNG)
│   ├── apple-touch-icon.png
│   └── og-image.png        # Social media link preview image
└── ScreenShots/        # Project screenshots used in this README
```

---

## 🚀 Getting Started

No build step needed.

1. **Clone the repository**
   ```bash
   git clone https://github.com/CodeWithJanvi/OIBSIP.git
   ```
2. **Open the project folder**
   ```bash
   cd OIBSIP/OIBSIP-WebDev-L1-PersonalPortfolio
   ```
3. **Run it**
   Double click `index.html` or open it with **Live Server** in VS Code.

> 🌐 An internet connection is needed only for Google Fonts.

---

## 🎨 Customization

| What to change | Where |
|----------------|-------|
| Name, email, social links | Search `Your Name`, `you@example.com`, `yourusername` in `index.html` |
| Profile photo | Replace `assets/janvi.jpg` |
| Skill levels | `data-level` values in `index.html` |
| Colours (dark and light) | `:root` in `css/style.css` |
| Typing words and code editor text | Top of `js/main.js` |
| Project cards and GitHub links | Projects section in `index.html` |

---

## 📧 Make the Contact Form Send Real Emails (Free)

1. Go to [web3forms.com](https://web3forms.com), enter your email and get your **Access Key**.
2. Open `js/main.js` and paste it:
   ```js
   const WEB3FORMS_KEY = 'your-key';
   ```
3. Upload the site online (GitHub Pages / Netlify) and test the form.

Without a key, the form opens **Gmail compose** instead.

---

## 🌍 Deployment

You can host this site for free:

- **GitHub Pages:** Repository → *Settings* → *Pages* → choose the branch and folder.
- **Netlify:** Drag and drop the project folder at [netlify.com](https://www.netlify.com).
- **Vercel:** Import the repository at [vercel.com](https://vercel.com).

🔖 **Branding tip:** after deploying, change the `og:image` content in `index.html` to the full URL (for example `https://your-site/assets/og-image.png`) so link previews show the image correctly.

---

## 🧩 Sections Overview

1. **Home**: intro, typing animation, code editor card
2. **About**: photo, short bio, quick facts
3. **Skills**: HTML5, CSS3, JavaScript, Bootstrap, PHP with animated bars
4. **Services**: responsive websites, PHP development, Bootstrap UI, animation
5. **Journey**: work and education timeline
6. **Projects**: Lusso Cafe Website, Rakhi Special Website, HexSoftware Music Player Website
7. **Contact**: email, GitHub, LinkedIn, Instagram and message form

---

## 📞 Contact

**Lumbhani Janvi**, BCA Student and Web Developer at Webcare Infoway

- 📧 Email: [lumbhanijanvi59@gmail.com](mailto:lumbhanijanvi59@gmail.com)
- 🐙 GitHub: [CodeWithJanvi](https://github.com/codeWithJanvi)
- 💼 LinkedIn: [Janvi Lumbhani](https://www.linkedin.com/in/janvi-lumbhani-1580ab2a9/)
- 📸 Instagram: [@janvi_soni_0610](https://www.instagram.com/janvi_soni_0610/)

---

## 🙏 Acknowledgement

Thanks to **Oasis Infobyte** for the internship opportunity and the task that inspired this project.

---

## 🔗 Live Preview

<p align="center">
  <a href="https://personalporfoliowebsite-six.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/🌐_Visit_My_Portfolio-Live_Demo-7C5CFF?style=for-the-badge&logoColor=white" alt="Visit Lumbhani Janvi Portfolio Live Website">
  </a>
</p>

<p align="center">
  <b>Experience CodeWithJanvi — Developer Portfolio</b>
  <br>
  Explore my skills, services, journey and projects, switch between dark and light theme, and get in touch.
  <br><br>
  <a href="https://personalporfoliowebsite-six.vercel.app/">🌐 Open Live Website →</a>
</p>

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

⭐ If you like this project, please give it a star on GitHub!

Made with ❤️ by **Lumbhani Janvi**
