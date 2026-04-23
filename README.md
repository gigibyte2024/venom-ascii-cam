# VENOM CAM

Turn your camera into ASCII art in real-time.

VENOM CAM is a web app that converts live webcam feed or uploaded images into customizable ASCII art. It focuses on real-time rendering, clean UI, and an interactive experience.

---

## 🚀 Features

- 🎥 Live Camera Mode (real-time ASCII conversion)
- 🖼️ Image Upload Support
- ⚡ Real-time processing using Canvas API
- 🎛️ Adjustable controls (brightness, contrast, density)
- 🎨 Multiple ASCII styles and visual presets
- 💾 Export output as PNG
- 🌑 Dark cyberpunk-themed UI

---

##  Tech Stack

- React (Functional Components)
- JavaScript
- Tailwind CSS
- HTML5 Canvas API

---

##  How It Works

1. Capture image from webcam or upload
2. Convert image into grayscale
3. Map brightness values to ASCII characters
4. Render output on screen in real-time

---

##  Project Structure


src/
├── components/
├── utils/
├── App.jsx


---

##  Getting Started

Clone the repository:

```bash
git clone https://github.com/gigibyte2024/venom-ascii-cam.git 
cd venom-ascii-cam
npm install
npm run dev