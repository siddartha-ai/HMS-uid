# Medical Theme Desktop Application

A professionally restructured Electron.js desktop application built with HTML, Vanilla CSS, and JavaScript.

## New Folder Structure

The project has been organized into a modular, clean, and scalable structure:

```
project-name/
├── assets/
│   ├── css/          # Modular CSS files renamed to kebab-case
│   ├── js/           # Third-party libraries (JQuery, Bootstrap)
│   ├── images/       # All general content images
│   ├── icons/        # Hospital and medical specialty icons
│   └── videos/       # Project mp4 media clips
├── src/
│   ├── pages/        # HTML page components
│   ├── renderer/     # Page-specific JS handlers
│   ├── main/         # Electron main-process script
│   └── preload/      # Electron preload script
├── data/             # JSON database files loaded via fetch
├── package.json      # Node dependency and scripts configuration
├── main.js           # Root Electron main-process entry
├── preload.js        # Root Electron preload entry
└── README.md
```

## Getting Started

### Prerequisites

You will need [Node.js](https://nodejs.org) installed on your system.

### Installation

Install the necessary dependencies (specifically `electron`):

```bash
npm install
```

### Running the App

To run the application in development mode:

```bash
npm start
```

## Architecture and File Roles

1. **Main Process (`main.js` & `src/main/main-process.js`)**: Coordinates window lifecycle and loads page content.
2. **Preload Script (`preload.js` & `src/preload/preload-process.js`)**: Safely exposes APIs to render processes.
3. **Renderer Process (`src/renderer/*`)**: Page-specific DOM events and logic.
4. **Pages (`src/pages/*`)**: Semantic HTML markup for each views.
5. **Assets (`assets/*`)**: Static stylesheets, libraries, images, icons, and videos.
6. **Data (`data/*`)**: Local data sources used by the medical specialties catalog.
