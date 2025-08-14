import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';
import { readdir } from 'fs/promises';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder');
    
    if (!folder) {
      return NextResponse.json({ error: 'Folder parameter required' }, { status: 400 });
    }
    
    const fullPath = join(process.cwd(), 'public', 'gallery', folder);
    
    try {
      const files = await readdir(fullPath);
      if (!files.length) {
        return NextResponse.json([]);
      }
    
      const imageExtensions = ['.jpg', '.jpeg', '.png','.webp','.HEIC', '.JPG'];
      const imageFiles = files.filter(file => 
        imageExtensions.some(ext => file.toLowerCase().endsWith(ext))
      );
      
      const imagePaths = imageFiles.map(file => `/gallery/${folder}/${file}`);
      
      return NextResponse.json(imagePaths);
    } catch (error) {
      console.error('Error reading gallery folder:', error);
      return NextResponse.json([]);
    }
  } catch (error) {
    console.error('Error reading gallery folder:', error);
    return NextResponse.json([]);
  }
}
