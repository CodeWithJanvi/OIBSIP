# 🌡️ Thermo | Temperature Converter

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Responsive](https://img.shields.io/badge/Responsive-Yes-success?style=for-the-badge)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://temperatureconverter-sigma.vercel.app/)
![Oasis Infobyte](https://img.shields.io/badge/Oasis%20Infobyte-Task%203%20(Level%201)-10B981?style=for-the-badge)

**Thermo** is a fast, modern and interactive **temperature converter** that converts between **Celsius, Fahrenheit and Kelvin** instantly, with real-time input validation, an animated thermometer and both **dark and light themes**. Built with pure **HTML5, CSS3 and JavaScript** and no frameworks or build tools.

This project is **Task 3, Level 1 (Temperature Converter)** of my **Oasis Infobyte (OIBSIP) Web Development Internship**.

🔗 **Live Demo:** [https://temperatureconverter-sigma.vercel.app](https://temperatureconverter-sigma.vercel.app/)

---

## 📸 Screenshots

### 🌙 Dark Theme

| Loader | Home |
|--------|------|
| ![Loader Dark](ScreenShots/Dark%20Theme/Loader%20Screen.png) | ![Home Dark](ScreenShots/Dark%20Theme/Home%20Screen.png) |

| History and Categories | Formulas and Facts |
|------------------------|--------------------|
| ![Converter Dark](ScreenShots/Dark%20Theme/Coverter%20Screen.png) | ![Formulas Dark](ScreenShots/Dark%20Theme/Formula%20Screen.png) |

### ☀️ Light Theme

| Loader | Home |
|--------|------|
| ![Loader Light](ScreenShots/Light%20Theme/Loader%20Screen.png) | ![Home Light](ScreenShots/Light%20Theme/Home%20Screen.png) |

| History and Categories | Formulas and Facts |
|------------------------|--------------------|
| ![Converter Light](ScreenShots/Light%20Theme/Coverter%20Screen.png) | ![Formulas Light](ScreenShots/Light%20Theme/Formula%20Screen.png) |

---

## ✨ Features

- 🔢 **Numeric input** that rejects non-numeric text and shows a clear error message
- 🔁 **Unit selector** (Celsius / Fahrenheit / Kelvin) with a sliding highlight
- ⚡ **Convert button** plus **Enter key** support
- 📊 **All three units shown at once** in the result area (rounded to 2 decimals)
- 🧊 **Absolute zero check** (below -273.15 °C, -459.67 °F or 0 K) with a friendly message
- 🎯 **Quick picks**: Freezing, Room, Body, Boiling and Absolute zero
- 🌡️ **Animated thermometer** and count-up numbers in the result
- 🎨 **Temperature categories** (Freezing, Cold, Mild, Warm, Hot, Extreme). The colour of the result and the background mood follows the category
- 🕘 **Recent conversions** history (last 6, saved in the browser, with a Clear button)
- 📋 **Click or press Enter on any result to copy it** to the clipboard, with a toast message
- 🚀 **Loader screen** with a rising thermometer, progress percentage and status messages
- 🌗 **Dark / Light theme toggle**. It follows your system theme on the first visit and remembers your choice
- 📈 **Scroll progress bar**, scroll cue, reveal animations and a back-to-top button
- 📚 **Formulas used** and **Good to know** sections (freezing, body, boiling and absolute zero values)
- 📱 **Fully responsive**, keyboard friendly and respects the "reduce motion" setting
- 🔍 Custom **favicon**, SEO and social media meta tags

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| HTML5 | Page structure and semantic sections |
| CSS3 | Glass UI, theme variables, animations, responsive layout |
| JavaScript (Vanilla) | Conversion logic, validation, history, copy, loader and theme |
| Google Fonts | Outfit |

---

## 🧮 Formulas Used

| Conversion | Formula |
|------------|---------|
| Celsius to Fahrenheit | F = C × 9/5 + 32 |
| Fahrenheit to Celsius | C = (F − 32) × 5/9 |
| Celsius to Kelvin | K = C + 273.15 |
| Kelvin to Celsius | C = K − 273.15 |

---

## 🌡️ Temperature Categories

| Category | Range |
|----------|-------|
| 🧊 Freezing | 0 °C and below |
| 🔵 Cold | 0 to 15 °C |
| 🟢 Mild | 15 to 25 °C |
| 🟡 Warm | 25 to 35 °C |
| 🟠 Hot | 35 to 45 °C |
| 🔴 Extreme | Above 45 °C |

---

## 📁 Project Structure

```
OIBSIP-WebDev-L1-Temperature Converter/
│
├── index.html           # Main page
├── style.css            # All styles, themes and animations
├── script.js            # Conversion logic and interactions
├── favicon.svg          # Favicon
├── favicon-32.png       # Favicon (PNG)
├── apple-touch-icon.png # Mobile home screen icon
├── README.md            # Project documentation
└── ScreenShots/
    ├── Dark Theme/      # Dark theme screenshots
    └── Light Theme/     # Light theme screenshots
```

---

## 🚀 Getting Started

No build step or installation needed.

1. **Clone the repository**
   ```bash
   git clone https://github.com/CodeWithJanvi/OIBSIP.git
   ```
2. **Open the project folder**
   ```bash
   cd "OIBSIP/OIBSIP-WebDev-L1-Temperature Converter"
   ```
3. **Run it**
   Double click `index.html` or open it with **Live Server** in VS Code.

> 🌐 An internet connection is needed only for Google Fonts.

---

## 🌍 Deployment

This project is deployed on **Vercel**. You can also host it free on:

- **GitHub Pages:** Repository → *Settings* → *Pages* → choose the branch and folder.
- **Netlify:** Drag and drop the project folder at [netlify.com](https://www.netlify.com).
- **Vercel:** Import the repository at [vercel.com](https://vercel.com).

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
  <a href="https://temperatureconverter-sigma.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/🌐_Visit_Thermo-Live_Demo-10B981?style=for-the-badge&logoColor=white" alt="Visit Thermo Temperature Converter Live Website">
  </a>
</p>

<p align="center">
  <b>Experience Thermo — Temperature Converter</b>
  <br>
  Convert Celsius, Fahrenheit and Kelvin instantly, explore temperature categories, and switch between dark and light theme.
  <br><br>
  <a href="https://temperatureconverter-sigma.vercel.app/">🌐 Open Live Website →</a>
</p>

---

## 📄 License

© 2026 Lumbhani Janvi. All rights reserved.

*Made with ❤️ by **Lumbhani Janvi***

⭐ If you like this project, please give it a star on GitHub!
