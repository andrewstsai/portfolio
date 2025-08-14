import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder');
    
    if (!folder) {
      return NextResponse.json({ error: 'Folder parameter required' }, { status: 400 });
    }
    
    const fullPath = path.join(process.cwd(), 'public', 'gallery', folder);
    
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json([]);
    }
    
    const files = fs.readdirSync(fullPath);
    
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
}