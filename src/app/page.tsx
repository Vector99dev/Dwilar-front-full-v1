"use client";

import { useState } from 'react';
import VoiceAgent from '../components/VoiceAgent';

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const handleStartCall = () => {
    setIsConnected(true);
    setIsListening(true);
    // Here you would integrate with your LiveKit backend
  };

  const handleEndCall = () => {
    setIsConnected(false);
    setIsListening(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Voice Real Estate Agent
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light">
            Demo
          </p>
        </div>

        {/* Main Card */}
        <div className="w-full max-w-2xl">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/50 p-8 md:p-12">
            {/* Status Indicator */}
            {/* <div className="flex items-center justify-center mb-8">
              <div className={`w-4 h-4 rounded-full mr-3 ${
                isConnected 
                  ? 'bg-green-500 animate-pulse' 
                  : 'bg-gray-400'
              }`}></div>
              <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                {isConnected ? 'Connected' : 'Ready to Connect'}
              </span>
            </div> */}
            <VoiceAgent />
            {/* Call Controls */}
            {/* <div className="flex flex-col items-center space-y-6">
              {!isConnected ? (
                <button
                  onClick={handleStartCall}
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
                      isListening 
                        ? 'bg-red-500 animate-pulse' 
                        : 'bg-green-500'
                    }`}>
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-xl font-medium text-gray-700 dark:text-gray-300">
                      {isListening ? 'Listening...' : 'Connected'}
                    </span>
                  </div>
                  
                  <button
                    onClick={handleEndCall}
                    className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span>End Call</span>
                  </button>
                </div>
              )}
            </div> */}

            {/* Instructions */}
            {/* <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {!isConnected 
                  ? "Click 'Start Voice Call' to begin your conversation with our AI real estate agent. Ask about properties, locations, prices, and more!"
                  : "You're now connected! Speak naturally to ask about real estate properties, locations, prices, and features."
                }
              </p>
            </div> */}
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20 dark:border-slate-700/50">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Location Search</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Find properties in specific areas and neighborhoods</p>
          </div>

          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20 dark:border-slate-700/50">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Price Range</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Search properties within your budget</p>
          </div>

          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20 dark:border-slate-700/50">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Smart Matching</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">AI-powered property recommendations</p>
          </div>
        </div>
      </div>
    </div>
  );
}
