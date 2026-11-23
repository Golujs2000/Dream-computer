import React, { useState } from 'react';
import { ZoomIn, Play } from 'lucide-react';

export const ProductGallery = ({ images = [], productName = 'Product' }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

  const displayImages = images && images.length > 0 ? images : ['/favicon.svg'];
  const activeImage = displayImages[activeIndex] || displayImages[0];

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="space-y-4">
      {/* Main Image Stage */}
      <div
        className="relative bg-[#0A101E] border border-[#303746] rounded-xl overflow-hidden pt-[80%] cursor-crosshair group"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={activeImage}
          alt={productName}
          className={`absolute inset-0 w-full h-full object-contain p-6 transition-transform duration-200 ${
            isZoomed ? 'scale-150' : 'scale-100'
          }`}
          style={
            isZoomed
              ? {
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                }
              : undefined
          }
        />

        <div className="absolute bottom-3 right-3 bg-[#121826]/80 px-2.5 py-1 rounded text-[11px] text-[#8B929E] flex items-center gap-1 pointer-events-none">
          <ZoomIn className="w-3.5 h-3.5 text-[#BEF8A1]" />
          <span>Hover to Zoom</span>
        </div>
      </div>

      {/* Thumbnails Strip */}
      {displayImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-20 h-20 rounded-lg bg-[#0A101E] border-2 p-1.5 shrink-0 transition-all ${
                activeIndex === idx
                  ? 'border-[#BEF8A1] shadow-glow-subtle'
                  : 'border-[#303746] hover:border-[#8B929E]'
              }`}
            >
              <img
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
