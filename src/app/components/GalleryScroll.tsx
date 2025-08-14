import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

const GalleryScroll = ({ images, height = "h-56", description = "Gallery" }: { images: { src: string; blurDataURL: string }[]; height?: string; description?: string; }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [imageAspectRatio, setImageAspectRatio] = useState<number>(1);

    const doubled = [...images, ...images];

    useEffect(() => {
    const el = ref.current;
    if (!el || !images.length) return;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      startX.current = e.pageX - el.offsetLeft;
      scrollLeft.current = el.scrollLeft;
    };

    const handleMouseUp = () => isDragging.current = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      el.scrollLeft = scrollLeft.current - walk;
      
      const sectionWidth = el.scrollWidth / 2;
      if (el.scrollLeft <= 0) {
        el.scrollLeft = sectionWidth;
        scrollLeft.current = sectionWidth;
        startX.current = e.pageX - el.offsetLeft;
      } else if (el.scrollLeft >= sectionWidth) {
        el.scrollLeft = 0;
        scrollLeft.current = 0;
        startX.current = e.pageX - el.offsetLeft;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      el.scrollLeft += e.deltaY;
      const sectionWidth = el.scrollWidth / 2;
      if (el.scrollLeft <= 0) el.scrollLeft = sectionWidth;
      else if (el.scrollLeft >= sectionWidth) el.scrollLeft = 0;
    };

    el.addEventListener("mousedown", handleMouseDown);
    el.addEventListener("mouseup", handleMouseUp);
    el.addEventListener("mouseleave", handleMouseUp);
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("wheel", handleWheel, { passive: false });
    el.scrollLeft = 0;

    return () => {
      el.removeEventListener("mousedown", handleMouseDown);
      el.removeEventListener("mouseup", handleMouseUp);
      el.removeEventListener("mouseleave", handleMouseUp);
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("wheel", handleWheel);
    };
    }, [images]);

    const handleImageClick = (src: string) => {
    if (!isDragging.current) {
      setSelectedImage(src);
      
      const img = new window.Image();
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        setImageAspectRatio(aspectRatio);
      };
      img.src = src;
    }
    };

    const closeModal = () => {
    setSelectedImage(null);
    setImageAspectRatio(1);
    };

    useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
    }, [selectedImage]);

    if (!images.length) {
    return (
      <div className="p-4 rounded-2xl shadow-lg bg-white/60">
        <h3 className="text-lg font-semibold">Loading...</h3>
      </div>
    );
    }

    return (
    <>
      <div className="w-full">
        <div className="flex mx-auto justify-between mb-4 mt-10 px-2">
          <h2 className="text-xl font-semibold">{description}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors">Drag or use wheel to scroll • Click to enlarge</p>
        </div>
        <div ref={ref} className="relative min-h-[${height}] min-w-[${height}] rounded-2xl shadow-2xl bg-[var(--color-light)] dark:bg-[var(--color-dark)] transition-colors p-3 overflow-x-scroll cursor-grab active:cursor-grabbing" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
          <div className="flex gap-3">
            {doubled.map((img, i) => (
              <div 
                key={i} 
                className={`flex-shrink-0 rounded-2xl min-w-[40vh] min-h-[50vh] overflow-hidden h- [${height}] relative cursor-pointer hover:shadow-lg transition-shadow duration-200`} 
                style={{ aspectRatio: 'auto' }}
                onClick={() => handleImageClick(img.src)}
              >
                <Image 
                  src={img.src} 
                  alt={`gallery-${i}`} 
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-200" 
                  placeholder="blur"
                  blurDataURL={img.blurDataURL}
                  draggable={false}
                  style={{ objectPosition: 'center' }}
                  quality={90}
                />
              </div>
            ))}
          </div>
        </div>
        <style>{`.overflow-x-scroll::-webkit-scrollbar { display: none; }`}</style>
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="relative bg-white rounded-2xl overflow-hidden shadow-2xl"
            style={{
              width: imageAspectRatio > 1 
                ? 'min(95vw, 90vh * ' + imageAspectRatio + ')' 
                : 'min(95vh * ' + imageAspectRatio + ', 90vw)',
              height: imageAspectRatio > 1 
                ? 'min(95vw / ' + imageAspectRatio + ', 90vh)' 
                : 'min(95vh, 90vw / ' + imageAspectRatio + ')',
              aspectRatio: imageAspectRatio
            }}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
            >
              ✕
            </button>
            <div className="relative w-full h-full">
              <Image
                src={selectedImage}
                alt="Enlarged view"
                fill
                className="object-contain"
                sizes="95vw"
                quality={100}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}


export default GalleryScroll;