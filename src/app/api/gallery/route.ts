import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';
import { readdir } from 'fs/promises';
import sharp from 'sharp';

const cache: Record<string, { src: string; blurDataURL: string }[]> = {};

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

    const imageData = await Promise.all(
      imageFiles.map(async (file) => {
        const filePath = join(fullPath, file);

        const blurBuffer = await sharp(filePath)
          .resize(10)
          .toBuffer();
        const blurDataURL = `data:image/jpeg;base64,${blurBuffer.toString('base64')}`;

        return {
          src: `/gallery/${folder}/${file}`,
          blurDataURL,
        };
      })
    );

    cache[folder] = imageData;
    return NextResponse.json(imageData);
  } catch (error) {
    console.error('Error reading gallery folder:', error);
    return NextResponse.json([], { status: 500 });
  }
}
