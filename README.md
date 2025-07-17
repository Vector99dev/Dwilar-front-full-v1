# Voice Real Estate Agent - Frontend

A modern, sophisticated Next.js frontend for the Voice Real Estate Agent demo application.

## Features

- **Modern UI Design**: Clean, sophisticated interface with gradient backgrounds and glass-morphism effects
- **Responsive Design**: Optimized for desktop and mobile devices
- **Dark Mode Support**: Automatic dark/light mode switching
- **Interactive Voice Controls**: Start/stop voice call functionality
- **Real-time Status Indicators**: Visual feedback for connection and listening states

## Tech Stack

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React Hooks**: State management with useState

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
frontend/
├── src/
│   └── app/
│       ├── page.tsx          # Main voice agent interface
│       ├── layout.tsx        # Root layout component
│       └── globals.css       # Global styles and custom CSS
├── public/                   # Static assets
└── package.json             # Dependencies and scripts
```

## UI Components

### Main Interface
- **Header**: "Voice Real Estate Agent - Demo" with gradient text
- **Connection Card**: Glass-morphism card with call controls
- **Status Indicators**: Visual feedback for connection state
- **Feature Cards**: Three feature highlights (Location Search, Price Range, Smart Matching)

### Interactive Elements
- **Start Call Button**: Initiates voice connection
- **End Call Button**: Terminates voice connection
- **Status Indicators**: Real-time connection and listening states

## Styling

The application uses a sophisticated design system with:

- **Gradient Backgrounds**: Subtle blue-to-indigo gradients
- **Glass-morphism Effects**: Translucent cards with backdrop blur
- **Smooth Animations**: Hover effects and transitions
- **Custom Grid Pattern**: Subtle background texture
- **Responsive Typography**: Scalable text sizes

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Customization

The UI can be easily customized by modifying:
- `src/app/page.tsx` - Main component and layout
- `src/app/globals.css` - Global styles and custom CSS
- Tailwind classes in components for styling

## Integration

This frontend is designed to integrate with the LiveKit backend voice agent. The call controls are prepared for WebRTC integration with the backend voice processing system.

## Browser Support

- Chrome/Edge (recommended for WebRTC)
- Firefox
- Safari
- Mobile browsers

## License

This project is part of the Voice Real Estate Agent demo application.
