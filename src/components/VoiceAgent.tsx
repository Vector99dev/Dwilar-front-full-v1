'use client';

import {
  RoomAudioRenderer,
  RoomContext,
  useDataChannel,
  useRoomContext
} from '@livekit/components-react';
import { Room, LocalTrackPublication, createLocalTracks, RpcError, RpcInvocationData } from 'livekit-client';
import '@livekit/components-styles';
import { useEffect, useRef, useState } from 'react';
import { env } from 'process';
import PropertyCard from './PropertyCard';

interface Property {
  title: string;
  imgs: Array<string>;
  videos: string;
  floor_plan: Array<string>;
  virtual_tutor: Array<string>;
  property_id: string;
  price: string;
  property_type: string;
  marketed_by: string;
  status: string;
  county: string;
  total_sqft: string;
  lot_size_unit: string;
  lot_size: string;
  full_bathrooms: string;
  bedrooms: string;
  right: string;
  address: string;
  access: Array<string>;
  structure: string;
  lot_category: string;
  area_designation: string;
  area_of_use: string;
  building_ratio_and_floor_area_ratio: string;
  fire_protection_designation: string;
  other_restrictions: string;
  living_area: string;
  year_built: string;
  current_status: string;
  delivery_date: string;
  mode_of_transaction: string;
}

export default function VoiceAgent() {
  const roomName = 'my-room' + Math.floor(Math.random() * 100);
  const userName = 'user-' + Math.floor(Math.random() * 10000);
  const [joined, setJoined] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [result, setResult] = useState<Property[]>([]);

  
  // 'room' instance should be constant for the component's lifetime
  const roomRef = useRef(new Room({ adaptiveStream: true, dynacast: true }));

  useEffect(() => {
    // cleanup on unmount
    return () => {
      roomRef.current.disconnect();
    };
  }, []);

  const handleJoin = async () => {
    setConnecting(true);
    try {
      const resp = await fetch(`/api/token?room=${roomName}&username=${userName}`);
      const data = await resp.json();
      console.log(userName);
      if (data.token) {
        await roomRef.current.connect('wss://japan-voice-1zixfsjd.livekit.cloud', data.token);
        // Publish microphone audio after successful connection
        const tracks = await createLocalTracks({
          audio: true,
          video: false,
        });
        await roomRef.current.localParticipant.publishTrack(tracks[0]);
        setJoined(true);
      }
    } catch (e) {
      console.error('Failed to join:', e);
      alert('Could not connect to audio room.');
    }
    setConnecting(false);
  };

  const handleLeave = async () => {
    await roomRef.current.disconnect();
    setJoined(false);
  };

  const handleLanguageSwitch = async () => {
    const newLanguage = currentLanguage === "en" ? "ja" : "en";
    setCurrentLanguage(newLanguage);
    await roomRef.current.localParticipant.setAttributes({ language: newLanguage });
  };

  useEffect(() => {  
    if (!joined || !roomRef.current) return;  
    
    const handleInitData = async (rpcInvocation: RpcInvocationData): Promise<string> => {  
      try {  
        console.log("Received initData RPC:", rpcInvocation);  
          
        // Parse the payload (it comes as a JSON string from Python)  
        const payload = JSON.parse(rpcInvocation.payload);  
          
        if (payload) {  
          // Handle the initial data here  
          console.log("Initial data received:", payload);
          setResult(payload); 
          // You can set state or perform other actions with the data  
          return "Success: Initial data received";  
        } else {  
          return "Error: Invalid data format";  
        }  
      } catch (error) {  
        console.error("Error processing initial data:", error);  
        return "Error: " + (error instanceof Error ? error.message : String(error));  
      }
    };
    
    // Register RPC method  
    roomRef.current.localParticipant.registerRpcMethod("initData", handleInitData);  
    
    return () => {  
      if (roomRef.current && roomRef.current.localParticipant) {  
        roomRef.current.localParticipant.unregisterRpcMethod("initData");  
      }  
    };  
  }, [joined]);


  return (
    <RoomContext.Provider value={roomRef.current}>
      <button 
        onClick={handleLanguageSwitch}
        className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2 text-sm"
      >
        <span>{currentLanguage === "en" ? "English" : "日本語"}</span>
      </button>
      <div className="flex flex-col items-center space-y-6">
              {!joined ? (
                <button
                  onClick={handleJoin}
                  disabled={connecting}
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-3"
                >
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <span>Start Voice Call</span>
                </button>
              ) : (
                <div className="text-center space-y-6">
                  <div className="flex items-center justify-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      connecting 
                        ? 'bg-red-500 animate-pulse' 
                        : 'bg-green-500'
                    }`}>
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-xl font-medium text-gray-700 dark:text-gray-300">
                      {connecting ? 'Connecting...' : 'Connected'}
                    </span>
                  </div>
                  
                  <button
                    onClick={handleLeave}
                    className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span>End Call</span>
                  </button>
                </div>
              )}
            
        {/* RoomAudioRenderer allows you to hear the agent's TTS */}
        {joined && <RoomAudioRenderer />}
      </div>
      <div>
        {result.map((item, index) => (
          <PropertyCard key={index} {...item} />
        ))}
      </div>
    </RoomContext.Provider>
  );
}
