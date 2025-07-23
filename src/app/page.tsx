"use client";

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
import PropertyCard from '../components/PropertyCard';
import PropertyModal from '../components/PropertyModal';

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

export default function Home() {
  const roomName = 'my-room' + Math.floor(Math.random() * 100);
  const userName = 'user-' + Math.floor(Math.random() * 10000);
  const [joined, setJoined] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [result, setResult] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactInfo, setContactInfo] = useState({ email: '', phone: '' });
  const [contactMessage, setContactMessage] = useState('');

  
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
      
      if (!resp.ok) {
        throw new Error(`Token API returned ${resp.status}: ${resp.statusText}`);
      }
      
      const data = await resp.json();
      
      if (data.token) {
        await roomRef.current.connect('wss://voice-agent-demo-cfg9emy4.livekit.cloud', data.token);
        
        // Publish microphone audio after successful connection
        const tracks = await createLocalTracks({
          audio: true,
          video: false,
        });
        
        await roomRef.current.localParticipant.publishTrack(tracks[0]);
        setJoined(true);
      } else {
        throw new Error('No token received from API');
      }
    } catch (e) {
      console.error('Failed to join:', e);
      alert(`Could not connect to audio room: ${e instanceof Error ? e.message : 'Unknown error'}`);
    }
    setConnecting(false);
  };

  const handleLeave = async () => {
    await roomRef.current.disconnect();
    setJoined(false);
  };

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
  };

  const handleLanguageSwitch = async () => {
    const newLanguage = currentLanguage === "en" ? "ja" : "en";
    setCurrentLanguage(newLanguage);
    await roomRef.current.localParticipant.setAttributes({ language: newLanguage });
  };

  const handleContactSubmit = async () => {
    if (contactInfo.email && contactInfo.phone) {
      // Update the state with the correct contact information
      setShowContactForm(false);
      setContactSubmitted(true);
      setContactMessage(`Thank you! We have received your contact information. Email: ${contactInfo.email}, Phone: ${contactInfo.phone}`);
      
      // The agent will automatically respond when the user speaks to acknowledge the submission
      // For now, we'll show a message to guide the user
      setTimeout(() => {
        alert("Please say 'I have submitted my contact information' to the agent so they can acknowledge your submission.");
      }, 1000);
    }
  };

  useEffect(() => {  
    if (!joined || !roomRef.current) return;  
    
    const handleInitData = async (rpcInvocation: RpcInvocationData): Promise<string> => {  
      try {  
        // Parse the payload (it comes as a JSON string from Python)  
        const payload = JSON.parse(rpcInvocation.payload);  
          
        if (payload) {  
          // Handle the initial data here  
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

    const handleShowContactForm = async (rpcInvocation: RpcInvocationData): Promise<string> => {
      try {
        console.log("Received showContactForm RPC:", rpcInvocation);
        
        const payload = JSON.parse(rpcInvocation.payload);
        
        if (payload) {
          console.log("Contact form state received:", payload);
          setShowContactForm(payload.showContactForm);
          setContactMessage(payload.message);
          return "Success: Contact form displayed";
        } else {
          return "Error: Invalid contact form data";
        }
      } catch (error) {
        console.error("Error processing contact form data:", error);
        return "Error: " + (error instanceof Error ? error.message : String(error));
      }
    };

    const handleSubmitContactInfo = async (rpcInvocation: RpcInvocationData): Promise<string> => {
      try {
        console.log("Received submitContactInfo RPC:", rpcInvocation);
        
        const payload = JSON.parse(rpcInvocation.payload);
        
        if (payload) {
          console.log("Contact info submitted:", payload);
          setShowContactForm(payload.showContactForm);
          setContactSubmitted(payload.contactSubmitted);
          setContactInfo({ email: payload.email, phone: payload.phone });
          setContactMessage(payload.message);
          return "Success: Contact info submitted";
        } else {
          return "Error: Invalid contact info data";
        }
      } catch (error) {
        console.error("Error processing contact info:", error);
        return "Error: " + (error instanceof Error ? error.message : String(error));
      }
    };

    const handleContactFormSubmitted = async (rpcInvocation: RpcInvocationData): Promise<string> => {
      try {
        console.log("Contact form submitted by user");
        // The agent will handle the contact form submission through its own logic
        return "Success: Contact form submission processed";
      } catch (error) {
        console.error("Error processing contact form submission:", error);
        return "Error: " + (error instanceof Error ? error.message : String(error));
      }
    };

    const handleGetContactInfo = async (rpcInvocation: RpcInvocationData): Promise<string> => {
      try {
        console.log("Agent requesting contact info");
        if (contactInfo.email && contactInfo.phone) {
          return JSON.stringify({
            email: contactInfo.email,
            phone: contactInfo.phone
          });
        } else {
          return "No contact info available";
        }
      } catch (error) {
        console.error("Error providing contact info:", error);
        return "Error: " + (error instanceof Error ? error.message : String(error));
      }
    };
    
    // Register RPC methods  
    roomRef.current.localParticipant.registerRpcMethod("initData", handleInitData);
    roomRef.current.localParticipant.registerRpcMethod("showContactForm", handleShowContactForm);
    roomRef.current.localParticipant.registerRpcMethod("submitContactInfo", handleSubmitContactInfo);
    roomRef.current.localParticipant.registerRpcMethod("contactFormSubmitted", handleContactFormSubmitted);
    roomRef.current.localParticipant.registerRpcMethod("getContactInfo", handleGetContactInfo);
    
    return () => {  
      if (roomRef.current && roomRef.current.localParticipant) {  
        roomRef.current.localParticipant.unregisterRpcMethod("initData");
        roomRef.current.localParticipant.unregisterRpcMethod("showContactForm");
        roomRef.current.localParticipant.unregisterRpcMethod("submitContactInfo");
        roomRef.current.localParticipant.unregisterRpcMethod("contactFormSubmitted");
        roomRef.current.localParticipant.unregisterRpcMethod("getContactInfo");
      }  
    };  
  }, [joined]);

  return (
    <RoomContext.Provider value={roomRef.current}>
      <div className="min-h-screen flex flex-col items-center justify-center bg-white relative">
        {/* Logo and Brand */}
        <div className="flex flex-col items-center z-10 w-full max-w-md px-4">
          <div className="flex items-center mb-6 md:mb-8">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-b from-purple-600 to-purple-400 flex items-center justify-center mr-2 md:mr-3 shadow-sm">
              <span className="text-white text-lg md:text-2xl font-bold">D</span>
            </div>
            <span className="text-xl md:text-2xl font-medium text-gray-800">Dwilar</span>
          </div>
          <h1 className="text-3xl md:text-6xl font-bold text-gray-800 mb-3 md:mb-4 text-center leading-tight whitespace-nowrap">Welcome to Dwilar</h1>
          <p className="text-base md:text-xl text-gray-600 mb-6 md:mb-8 text-center leading-relaxed whitespace-nowrap px-2">
            This is Voice Real Estate Agent. Please select a language to start the call.
          </p>
          
          {/* Language Dropdown */}
          <div className="mb-4 md:mb-6 w-full flex justify-center">
            <div className="relative w-full max-w-[315px] px-4 md:px-0">
              <select
                className="block w-full h-12 md:h-14 px-4 rounded-lg border border-gray-300 bg-gray-50 text-gray-700 text-sm md:text-base appearance-none focus:outline-none focus:border-purple-300"
                value={currentLanguage}
                onChange={(e) => {
                  const newLanguage = e.target.value;
                  setCurrentLanguage(newLanguage);
                  if (roomRef.current && roomRef.current.localParticipant) {
                    roomRef.current.localParticipant.setAttributes({ language: newLanguage });
                  }
                }}
              >
                <option value="en">English</option>
                <option value="ja">日本語</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>
          
          {/* Start Voice Call Button */}
          {!joined ? (
            <button
              onClick={handleJoin}
              disabled={connecting}
              className="w-full max-w-[315px] h-14 md:h-18 py-3 md:py-4 rounded-lg bg-gradient-to-r from-purple-500 to-purple-400 hover:from-purple-600 hover:to-purple-500 text-white text-sm md:text-base font-bold transition-all duration-200 focus:outline-none mx-4 md:mx-0"
            >
              Start Voice Call
            </button>
          ) : (
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center ${
                  connecting 
                    ? 'bg-red-500 animate-pulse' 
                    : 'bg-green-500'
                }`}>
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-base md:text-xl font-medium text-gray-700">
                  {connecting ? 'Connecting...' : 'Connected'}
                </span>
              </div>
              
              <button
                onClick={handleLeave}
                className="w-full max-w-[315px] h-12 md:h-14 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm md:text-base font-bold transition-all duration-200 focus:outline-none"
              >
                End Call
              </button>
            </div>
          )}
          
          {/* RoomAudioRenderer allows you to hear the agent's TTS */}
          {joined && <RoomAudioRenderer />}
        </div>
        
        {/* Property Results */}
        <div className="mt-8 w-full max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {result.map((item, index) => (
              <PropertyCard 
                key={index} 
                {...item} 
                onClick={() => handlePropertyClick(item)}
              />
            ))}
          </div>
        </div>

        {/* Property Modal */}
        <PropertyModal
          property={selectedProperty}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />

        {/* Contact Form */}
        {showContactForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
              <p className="text-gray-600 mb-6">{contactMessage}</p>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="mt-6 flex space-x-3">
                <button
                  onClick={() => setShowContactForm(false)}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleContactSubmit}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Contact Submitted Confirmation */}
        {contactSubmitted && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Thank You!</h3>
                <p className="text-gray-600 mb-4">{contactMessage}</p>
                <button
                  onClick={() => setContactSubmitted(false)}
                  className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </RoomContext.Provider>
  );
}
