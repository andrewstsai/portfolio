import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

const cache = new Map<string, { data: string[], timestamp: number }>();
const CACHE_TTL = 2678400;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder');
    
    if (!folder) {
      return NextResponse.json({ error: 'Folder parameter required' }, { status: 400 });
    }

    const cacheKey = `gallery:${folder}`;
    const cached = cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      const response = NextResponse.json(cached.data);
      return response;
    }

    const fullPath = path.join(process.cwd(), 'public', 'gallery', folder);
    
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json([]);
    }
    
    const files = fs.readdirSync(fullPath);
    const imageExtensions = ['.jpg', '.jpeg', '.JPG'];
    const imageFiles = files.filter(file => 
      imageExtensions.some(ext => file.toLowerCase().endsWith(ext))
    );
    
    const imagePaths = imageFiles.map(file => `/gallery/${folder}/${file}`);
    
    cache.set(cacheKey, {
      data: imagePaths,
      timestamp: Date.now()
    });
    
    const response = NextResponse.json(imagePaths);
    response.headers.set('Cache-Control', 'public, max-age=2678400');
    
    return response;
  } catch (error) {
    console.error('Error reading gallery folder:', error);
    return NextResponse.json([]);
  }
}