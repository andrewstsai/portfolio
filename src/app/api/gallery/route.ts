import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';
import { readdir } from 'fs/promises';

const cache: Record<string, string[]> = {};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const folder = searchParams.get('folder');

  if (!folder) {
    return NextResponse.json({ error: 'Folder parameter required' }, { status: 400 });
  }

  if (cache[folder]) {
    return NextResponse.json(cache[folder]);
  }

  const fullPath = join(process.cwd(), 'public', 'gallery', folder);

  try {
    const files = await readdir(fullPath);

    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.heic', '.JPG'];
    const imageFiles = files.filter(file =>
      imageExtensions.some(ext => file.toLowerCase().endsWith(ext))
    );

    const imagePaths = imageFiles.map(file => `/gallery/${folder}/${file}`);

    cache[folder] = imagePaths;

    return NextResponse.json(imagePaths);
  } catch (error) {
    console.error('Error reading gallery folder:', error);
    return NextResponse.json([], { status: 500 });
  }
}