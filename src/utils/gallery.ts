import fs from 'fs';
import path from 'path';

export function getImagesFromFolder(folderPath: string) {
  try {
    const fullPath = path.join(process.cwd(), 'public', folderPath);
    const files = fs.readdirSync(fullPath);
    
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'];
    const imageFiles = files.filter(file => 
      imageExtensions.some(ext => file.toLowerCase().endsWith(ext))
    );
    
    return imageFiles.map(file => `/${folderPath}/${file}`);
  } catch (error) {
    console.error(`Error reading folder ${folderPath}:`, error);
    return [];
  }
}