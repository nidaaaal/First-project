import React from 'react'

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* This div accounts for navbar height - adjust mt-16 to match your navbar height */}
      <div className="mt-16 flex-grow flex flex-col items-center justify-center gap-6 p-8">
        {/* Rotating circle with gradient */}
        <div className="relative w-20 h-20">
          {/* Static background circle */}
          <div className="absolute w-full h-full rounded-full border-4 border-gray-200"></div>
          
          {/* Rotating gradient segment */}
          <div className="absolute w-full h-full rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-500 animate-spin"></div>
          
          {/* Inner dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
        </div>

        {/* Pulsing text with dynamic dots */}
        <div className="flex items-center text-lg font-medium text-gray-700">
          <span className="animate-pulse">Loading</span>
          <div className="flex space-x-1 ml-1">
            {[0, 1, 2].map((i) => (
              <span 
                key={i}
                className="inline-block w-2 h-2 bg-current rounded-full opacity-0"
                style={{ animation: `pulse 1.5s ease-in-out infinite ${i * 0.3}s` }}
              ></span>
            ))}
          </div>
        </div>

        {/* Rotating text messages */}
        <div className="h-6 flex items-center justify-center">
          <div className="relative h-full overflow-hidden">
            <div className="animate-rotate-text">
              <p className="text-sm text-gray-500">Fetching products...</p>
              <p className="text-sm text-gray-500">Almost there...</p>
              <p className="text-sm text-gray-500">Just a moment...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}