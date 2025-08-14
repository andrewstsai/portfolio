'use client'

import { motion } from 'motion/react';
import GalleryScroll from '../components/GalleryScroll';
import {useEffect, useState} from 'react'

export default function GalleryPage() {
  const [dogImages, setDogImages] = useState<string[]>([]);
  const [foodImages, setFoodImages] = useState<string[]>([]);
  const [tripImages, setTripImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const [dogRes, foodRes, tripRes] = await Promise.all([
          fetch('/api/gallery?folder=dog'),
          fetch('/api/gallery?folder=food'), 
          fetch('/api/gallery?folder=trips')
        ]);

        const [dogData, foodData, tripData] = await Promise.all([
          dogRes.json(),
          foodRes.json(),
          tripRes.json()
        ]);
        setDogImages(dogData || []);
        setFoodImages(foodData || []);
        setTripImages(tripData || []);
      } catch (error) {
        console.error('Error fetching images:', error);
        setDogImages([]);
        setFoodImages([]);
        setTripImages([]);
      }
    };

    fetchImages();
  }, []);
  
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