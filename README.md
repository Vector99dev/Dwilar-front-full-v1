# LiveKit Voice Real Estate Agent Frontend

## Overview

This frontend is a Next.js application that provides a modern, responsive web interface for the AI-powered voice real estate agent. It integrates with LiveKit for real-time voice communication and displays property search results with detailed modals and contact forms.

## Features

- **Real-time Voice Communication**: Seamless audio calls with AI agent
- **Multi-language Support**: English and Japanese interface with language switching
- **Property Display**: Interactive property cards with detailed modal views
- **Contact Collection**: Integrated contact forms for lead capture
- **Responsive Design**: Modern UI that works on desktop and mobile devices
- **Real-time Updates**: Live property search results and UI state synchronization

## Technology Stack

- **Framework**: Next.js 15.4.1 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **Real-time Communication**: LiveKit Client SDK
- **UI Components**: Custom React components with LiveKit Components
- **State Management**: React Hooks (useState, useEffect)

## Setup Instructions

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager
- LiveKit Cloud account
- Backend agent running (see backend README)

### Environment Variables

Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_LIVEKIT_URL=wss://your-livekit-url
LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_API_SECRET=your_livekit_api_secret
```

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Application Structure

### Core Components

1. **Main Page (`src/app/page.tsx`)**: Primary interface with voice controls
2. **Property Card (`src/components/PropertyCard.tsx`)**: Individual property display
3. **Property Modal (`src/components/PropertyModal.tsx`)**: Detailed property view
4. **Token API (`src/app/api/token/route.ts`)**: LiveKit authentication
5. **Layout (`src/app/layout.tsx`)**: Application wrapper and metadata

### File Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── api/token/         # LiveKit token generation
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Main application page
│   └── components/
│       ├── PropertyCard.tsx   # Property display component
│       └── PropertyModal.tsx  # Property detail modal
├── public/                    # Static assets
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── next.config.ts            # Next.js configuration
```

## Key Features

### Voice Communication

The application uses LiveKit for real-time voice communication:

```typescript
// Room connection with audio tracks
const room = new Room({ adaptiveStream: true, dynacast: true });
await room.connect(livekit_url, token);

// Publish microphone audio
const tracks = await createLocalTracks({ audio: true, video: false });
await room.localParticipant.publishTrack(tracks[0]);
```

### Language Support

Users can switch between English and Japanese:

```typescript
const handleLanguageChange = async (newLanguage: string) => {
  setCurrentLanguage(newLanguage);
  if (room.localParticipant) {
    await room.localParticipant.setAttributes({ language: newLanguage });
  }
};
```

### Property Display

Properties are displayed using responsive cards:

```typescript
interface Property {
  title: string;
  imgs: Array<string>;
  price: string;
  bedrooms: string;
  address: string;
  // ... additional property fields
}
```

### Real-time Data Updates

The frontend receives property data via LiveKit RPC:

```typescript
// Register RPC method to receive property data
room.localParticipant.registerRpcMethod("initData", (rpcInvocation) => {
  const properties = JSON.parse(rpcInvocation.payload);
  setResult(properties);
});
```

## User Interface

### Main Interface

- **Language Selector**: Dropdown for English/Japanese selection
- **Connection Status**: Visual indicator for voice call status
- **Voice Controls**: Start/End call buttons
- **Property Grid**: Responsive grid of property cards

### Property Cards

Each property card displays:
- Property image
- Title and price
- Bedroom/bathroom count
- Address and status
- Click-to-expand functionality

### Property Modal

The detailed modal includes:
- Image gallery with navigation
- Comprehensive property details
- Floor plans and virtual tours
- Property specifications and restrictions

### Contact Forms

Integrated forms for lead capture:
- Email and phone collection
- Form validation
- Success confirmation
- Agent integration via RPC

## API Integration

### Token Generation

The `/api/token` endpoint generates LiveKit access tokens:

```typescript
export async function GET(req: NextRequest) {
  const room = req.nextUrl.searchParams.get('room');
  const username = req.nextUrl.searchParams.get('username');
  
  const at = new AccessToken(apiKey, apiSecret, { identity: username });
  at.addGrant({ room, roomJoin: true, canPublish: true, canSubscribe: true });
  
  return NextResponse.json({ token: await at.toJwt() });
}
```

### RPC Methods

The frontend registers several RPC methods for backend communication:

- `initData`: Receive property search results
- `showContactForm`: Display contact collection UI
- `submitContactInfo`: Process contact form data
- `getContactInfo`: Provide stored contact information

## Styling and Responsive Design

### Tailwind CSS

The application uses Tailwind CSS for styling:

```css
/* Responsive design example */
<div className="min-h-screen flex flex-col items-center justify-center bg-white">
  <h1 className="text-3xl md:text-6xl font-bold text-gray-800 mb-3 md:mb-4">
    Welcome to Dwilar
  </h1>
</div>
```

### Brand Design

- **Color Scheme**: Purple gradient branding with gray accents
- **Typography**: Geist font family for modern appearance
- **Icons**: Custom SVG icons and Unicode symbols
- **Layout**: Centered, card-based design with proper spacing

## State Management

### React Hooks

The application uses React hooks for state management:

```typescript
const [joined, setJoined] = useState(false);
const [currentLanguage, setCurrentLanguage] = useState("en");
const [result, setResult] = useState<Property[]>([]);
const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
const [showContactForm, setShowContactForm] = useState(false);
```

### Real-time Synchronization

State updates are synchronized with the backend agent through LiveKit RPC calls, ensuring the UI reflects the current conversation state.

## Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

### Configuration Files

- **TypeScript**: Configured with strict mode and path mapping
- **ESLint**: Next.js recommended configuration with TypeScript support
- **Tailwind**: Optimized for production with custom configuration
- **PostCSS**: Integrated with Tailwind processing

## Deployment

### Build Process

```bash
npm run build
npm run start
```

### Environment Setup

Ensure all environment variables are properly configured:
- LiveKit connection URL
- API keys for authentication
- Any additional service credentials

### Performance Optimization

- **Code Splitting**: Automatic via Next.js App Router
- **Image Optimization**: Next.js Image component for property photos
- **Bundle Analysis**: Use `@next/bundle-analyzer` for optimization
- **Caching**: Appropriate cache headers for static assets

## Troubleshooting

### Common Issues

1. **LiveKit Connection Failed**: 
   - Check environment variables
   - Verify LiveKit URL format
   - Ensure backend agent is running

2. **Audio Not Working**:
   - Check browser permissions for microphone
   - Verify audio device availability
   - Test with different browsers

3. **Property Data Not Loading**:
   - Confirm backend agent is running
   - Check RPC method registration
   - Verify property data format

4. **Styling Issues**:
   - Clear browser cache
   - Check Tailwind CSS compilation
   - Verify responsive breakpoints

### Debug Mode

Enable debug logging in development:

```typescript
// Add to page.tsx for debugging
console.log('Room state:', room.state);
console.log('Participants:', room.participants);
console.log('RPC methods:', room.localParticipant.rpcMethods);
```

## Browser Compatibility

- **Chrome**: Full support (recommended)
- **Firefox**: Full support
- **Safari**: Full support with WebRTC limitations
- **Edge**: Full support
- **Mobile browsers**: Responsive design optimized

## Contributing

### Code Style

- Use TypeScript for type safety
- Follow ESLint configuration
- Use Tailwind for styling
- Component-based architecture

### Adding Features

1. Create new components in `src/components/`
2. Update TypeScript interfaces as needed
3. Add RPC methods for backend communication
4. Test responsive design on multiple devices

## License

This project is part of the Dwilar Company real estate platform.
