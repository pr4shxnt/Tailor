"use client"

import React, { useState } from 'react'
import { MessageCircle } from 'lucide-react'

const SlidingIcon = ({ text, icon }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className={`
        inline-flex items-center cursor-pointer overflow-hidden
        transition-all duration-300 ease-in-out
        ${isHovered ? 'w-full' : 'w-8'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground shrink-0">
        {icon || <MessageCircle className="w-5 h-5" />}
      </div>
      <div 
        className={`
           whitespace-nowrap
          transition-all duration-300 ease-in-out
          ${isHovered ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0'}
        `}
      >
        <span className="text-sm font-medium">
          {text}
        </span>
      </div>
    </div>
  )
}

export default SlidingIcon
