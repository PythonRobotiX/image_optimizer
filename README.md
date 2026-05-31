# imgopt — High‑Performance AVIF/WebP Image Optimizer

`imgopt` is a TypeScript + Sharp–powered CLI that transforms a single input image into a complete responsive image set (AVIF + WebP) with a JSON manifest ready for Next.js `<picture>` or `<Image />`.

This project is built for photographers, developers, and high‑performance websites that need perfect image delivery across all devices.

---

## ✨ Features

- ⚡ **Parallel processing** (multi‑core queue)
- 🧠 **Smart cropping** using Sharp’s attention model
- 🎨 **AVIF + WebP** output for all device widths
- 📦 **Global CLI**: `imgopt input/photo.jpg`
- 🧩 **Next.js `<picture>` component included**
- 🔌 **Plugin system** (filters, watermarks, presets)
- 🗂️ **Batch mode** for hundreds of images
- 📄 **Manifest generator** for srcset/sizes

---

## 🚀 Installation

```bash
npm install -g image_optimizer
