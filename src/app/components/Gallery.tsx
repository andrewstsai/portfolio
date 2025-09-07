'use client'

import { motion } from 'motion/react';
import GalleryScroll from './GalleryScroll';
import { useEffect } from 'react'
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
      <GalleryScroll images={tripImages} height="50vh" description="Japan/Taiwan via 2024 UTokyo Exchange" />
      <GalleryScroll images={foodImages} height="50vh" description="Food" />
      <GalleryScroll images={dogImages} height="50vh" description="Biscuit" />
    </div>
  );
}