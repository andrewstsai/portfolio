import { useState, useCallback } from 'react';

const globalCache: Record<string, string[]> = {};
const fetchedFolders: Set<string> = new Set();

export const useGallery = () => {
  const [, forceUpdate] = useState({});
  
  const fetchGallery = useCallback(async (folder: string): Promise<string[]> => {
    if (fetchedFolders.has(folder)) {
      return globalCache[folder] || [];
    }
    try {
      const res = await fetch(`/api/gallery?folder=${folder}`);
      const data = await res.json();
      const images = data || [];
      fetchedFolders.add(folder);
      globalCache[folder] = images;
      forceUpdate({});
      return images;
    } catch (error) {
      console.error(`Error fetching ${folder} images:`, error);
      fetchedFolders.add(folder);
      globalCache[folder] = [];
      return [];
    }
  }, []);

  const getImages = (folder: string): string[] => {
    return globalCache[folder] || [];
  };

  return { fetchGallery, getImages };
};