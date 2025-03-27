import React from 'react';
import { motion } from 'framer-motion';

interface BlurImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}

export function BlurImage({ src, alt, className = '', sizes = '100vw' }: BlurImageProps) {
  const [isLoading, setIsLoading] = React.useState(true);
  
  // Generate thumbnail URL - assuming your images are in the public folder
  const thumbnailSrc = src.replace('.jpg', '-thumb.jpg');

  return (
    <div className="relative overflow-hidden">
      {/* Thumbnail image that shows while main image loads */}
      <img
        src={thumbnailSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'block' : 'hidden'} filter blur-lg scale-105`}
      />
      
      {/* Main image */}
      <motion.img
        src={src}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        sizes={sizes}
        srcSet={`
          ${src.replace('.jpg', '-sm.jpg')} 300w,
          ${src.replace('.jpg', '-md.jpg')} 768w,
          ${src.replace('.jpg', '-lg.jpg')} 1280w,
          ${src} 1920w
        `}
      />
    </div>
  );
}