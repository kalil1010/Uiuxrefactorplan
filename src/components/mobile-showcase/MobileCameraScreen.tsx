import React from 'react';
import { Button } from '../ui/button';
import { Camera, ChevronLeft, Image, Star, Lightbulb } from 'lucide-react';

export default function MobileCameraScreen() {
  return (
    <div className="h-screen bg-black flex flex-col overflow-hidden max-w-md mx-auto border-x">
      {/* Top Bar */}
      <div className="bg-black/50 backdrop-blur-md px-4 py-3 flex items-center justify-between z-10">
        <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <h1 className="font-semibold text-lg text-white">Hair Stylist</h1>
        <div className="w-10" />
      </div>

      {/* Camera View */}
      <div className="flex-1 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
        {/* Mock Camera Preview */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white/50 p-6">
            <Camera className="w-20 h-20 mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">Camera Preview</p>
            <p className="text-sm opacity-75">Position yourself in the frame</p>
          </div>
        </div>

        {/* Camera Guide Frame */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-64 h-80 border-2 border-white/30 rounded-3xl relative">
            {/* Corner Markers */}
            <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-white rounded-tl-lg" />
            <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-white rounded-tr-lg" />
            <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-white rounded-bl-lg" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-white rounded-br-lg" />
          </div>
        </div>

        {/* Tip Banner */}
        <div className="absolute top-6 left-6 right-6">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 flex items-center gap-3">
            <Lightbulb className="w-5 h-5 text-white flex-shrink-0" />
            <p className="text-sm text-white">Face forward with hair visible</p>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="bg-black/80 backdrop-blur-md text-white p-6">
        {/* Main Capture Button */}
        <div className="flex items-center justify-center mb-4">
          <Button size="lg" className="w-20 h-20 rounded-full gradient-bg shadow-2xl relative">
            <Camera className="w-8 h-8" />
            <div className="absolute -inset-2 border-4 border-white/30 rounded-full" />
          </Button>
        </div>

        <p className="text-center text-sm mb-4 text-white/80 font-medium">Take Photo</p>

        {/* Secondary Actions */}
        <div className="flex items-center justify-center gap-4">
          <Button variant="ghost" className="flex-col gap-1 h-auto py-2 text-white hover:bg-white/10">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Image className="w-5 h-5" />
            </div>
            <span className="text-xs">Gallery</span>
          </Button>

          <Button variant="ghost" className="flex-col gap-1 h-auto py-2 text-white hover:bg-white/10">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Star className="w-5 h-5" />
            </div>
            <span className="text-xs">Sample</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
