'use client'

import { motion, AnimatePresence } from 'motion/react';
import GalleryScroll from '../components/GalleryScroll';
import { useEffect, useState } from 'react'
import { useGallery } from '@/hooks/useGallery';
import { staggerContainer, fadeInUp } from '@/utils/animations';

export default function Gallery() {
  const { fetchGallery, getImages } = useGallery();
  const tripImages = getImages('trips');
  const foodImages = getImages('food');
  const dogImages = getImages('dog');
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (tripImages.length > 0 && foodImages.length > 0 && dogImages.length > 0) {
      setShouldAnimate(true);
      return;
    }
  
    const loadGallery = async () => {
      try {
        await Promise.all([
          fetchGallery('dog'),
          fetchGallery('food'), 
          fetchGallery('trips')
        ]);
        setShouldAnimate(true);
      } catch (error) {
        console.error('Error fetching galleries:', error);
      }
    };
    loadGallery();
  }, [fetchGallery, tripImages, foodImages, dogImages]);

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
        Some photos showcasing my life and passions outside of work
      </motion.p>
      <AnimatePresence>
      {shouldAnimate && (
        <motion.div 
          variants={staggerContainer} 
          initial="initial" 
          animate="animate"
        >
          <motion.div variants={fadeInUp}>
            <GalleryScroll images={tripImages} height="50vh" description="Japan/Taiwan via 2024 UTokyo Exchange" />
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <GalleryScroll images={foodImages} height="50vh" description="Food" />
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <GalleryScroll images={dogImages} height="50vh" description="Biscuit" />
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}