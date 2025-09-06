'use client'

import { motion } from 'motion/react';
import GalleryScroll from '../components/GalleryScroll';
import { useEffect, useMemo } from 'react'
import { useGallery } from '@/hooks/useGallery';

export default function Gallery() {
  const { fetchGallery, getImages } = useGallery();
  const tripImages = getImages('trips');
  const foodImages = getImages('food');
  const dogImages = getImages('dog');
  
  useEffect(() => {
    const loadGallery = async () => {
      try {
        await Promise.all([
          fetchGallery('dog'),
          fetchGallery('food'), 
          fetchGallery('trips')
        ]);
      } catch (error) {
        console.error('Error fetching galleries:', error);
      }
    };
    loadGallery();
  }, [fetchGallery]);
  
  return (
    <div className="container max-w-7xl mx-auto py-12">
      <motion.h1 
        className="text-4xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Gallery
      </motion.h1>
      <motion.p 
        className="text-lg text-gray-600 dark:text-gray-300 mb-24 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Some of my recent photos showcasing my passions outside of software development.
      </motion.p>
      <GalleryScroll images={tripImages} height="60vh" description="Japan/Taiwan via 2024 UTokyo Exchange" />
      <GalleryScroll images={foodImages} height="60vh" description="Food" />
      <GalleryScroll images={dogImages} height="60vh" description="Biscuit" />
    </div>
  );
}