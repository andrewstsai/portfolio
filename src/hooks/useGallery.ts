import { useState, useCallback } from 'react';

export const useGallery = () => {
  const [cache, setCache] = useState<Record<string, string[]>>({});

  const fetchGallery = useCallback(async (folder: string): Promise<string[]> => {
    if (cache[folder]) {
      return cache[folder];
    }

    try {
      const res = await fetch(`/api/gallery?folder=${folder}`);
      const data = await res.json();
      const images = data || [];
      
      setCache(prev => ({ ...prev, [folder]: images }));
      return images;
    } catch (error) {
      console.error(`Error fetching ${folder} images:`, error);
      return [];
    }
  }, [cache]);

  const getImages = (folder: string): string[] => {
    return cache[folder] || [];
  };

  return { fetchGallery, getImages };
};