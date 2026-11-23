# Thermo - Temperature Converter

**Oasis Infobyte Web Development Internship | Level 1, Task 3**

An interactive web tool that converts temperature values between **Celsius, Fahrenheit and Kelvin**, with real-time input validation.

## Features
- Numeric input field that rejects non-numeric text with an error message
- Unit selector (Celsius / Fahrenheit / Kelvin) for the input unit
- Convert button, plus Enter key support
- All three units shown at the same time in the result area
- Absolute zero check (below -273.15 °C, -459.67 °F or 0 K) with a friendly message
- **Loader screen** with a rising thermometer, progress percentage and status messages
- Modern glass UI with an animated background that changes colour with the temperature
- Animated thermometer, count-up numbers, sliding unit selector, shake animation on errors
- Click any result to copy it to the clipboard
- Custom favicon, SEO and social meta tags
- Responsive layout, keyboard friendly, respects "reduce motion" settings

## Tech Stack
HTML5, CSS3, JavaScript (Vanilla)

## Formulas Used
| Conversion | Formula |
|---|---|
| Celsius to Fahrenheit | F = C × 9/5 + 32 |
| Fahrenheit to Celsius | C = (F − 32) × 5/9 |
| Celsius to Kelvin | K = C + 273.15 |
| Kelvin to Celsius | C = K − 273.15 |

## How to Run
1. Download or clone this folder.
2. Open `index.html` in any web browser. No installation is needed.

## Project Structure
```
WebDev-L1-TemperatureConverter/
├── index.html
├── style.css
├── script.js
├── favicon.svg
├── favicon-32.png
├── apple-touch-icon.png
├── README.md
└── screenshots/
```

## Screenshots
![Loader](screenshots/loader.png)
![Home](screenshots/home.png)
![Result](screenshots/result.png)
![Error](screenshots/error.png)
