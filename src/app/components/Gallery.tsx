'use client'

import { motion } from 'motion/react';
import GalleryScroll from './GalleryScroll';
import { useEffect, useMemo } from 'react'
import { useGallery } from '@/hooks/useGallery';

export default function Gallery() {
  const { fetchGallery, getImages } = useGallery();

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

  const tripImages = useMemo(() => getImages('trips'), [getImages('trips').length]);
  const foodImages = useMemo(() => getImages('food'), [getImages('food').length]);
  const dogImages = useMemo(() => getImages('dog'), [getImages('dog').length]);
  
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
      <GalleryScroll images={tripImages} height="60vh" description="Japan/Taiwan via 2024 UTokyo Exchange" />
      <GalleryScroll images={foodImages} height="60vh" description="Food" />
      <GalleryScroll images={dogImages} height="60vh" description="Biscuit" />
    </div>
  );
}