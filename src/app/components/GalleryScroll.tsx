import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useIsMobile";
import { IoMdClose } from "react-icons/io";

const GalleryScroll = ({ images = [] as string[], height = "h-56", description = "Gallery" }: { images?: string[]; height?: string; description?: string; }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageAspectRatio, setImageAspectRatio] = useState<number>(1);
  const isMobile = useIsMobile();
  const clickStartTime = useRef(0);
  const doubled = [...images, ...images];

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;
    
    requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      
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
    });
  }, []);
  
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    
    requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      
      const touch = e.touches[0];
      const x = touch.pageX - el.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      el.scrollLeft = scrollLeft.current - walk;
      
      const sectionWidth = el.scrollWidth / 2;
      if (el.scrollLeft <= 0) {
        el.scrollLeft = sectionWidth;
        scrollLeft.current = sectionWidth;
        startX.current = touch.pageX - el.offsetLeft;
      } else if (el.scrollLeft >= sectionWidth) {
        el.scrollLeft = 0;
        scrollLeft.current = 0;
        startX.current = touch.pageX - el.offsetLeft;
      }
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !images.length) return;
  
    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      startX.current = e.pageX - el.offsetLeft;
      scrollLeft.current = el.scrollLeft;
      clickStartTime.current = Date.now();
    };
  
    const handleMouseUp = () => {
      isDragging.current = false;
    };
  
    const handleTouchStart = (e: TouchEvent) => {
      isDragging.current = true;
      const touch = e.touches[0];
      startX.current = touch.pageX - el.offsetLeft;
      scrollLeft.current = el.scrollLeft;
    };
    
    const handleTouchEnd = () => {
      isDragging.current = false;
    };
  
    el.addEventListener("mousedown", handleMouseDown);
    el.addEventListener("mouseup", handleMouseUp);
    el.addEventListener("mouseleave", handleMouseUp);
    el.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchend", handleTouchEnd);
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    el.scrollLeft = 0;
  
    return () => {
      el.removeEventListener("mousedown", handleMouseDown);
      el.removeEventListener("mouseup", handleMouseUp);
      el.removeEventListener("mouseleave", handleMouseUp);
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchend", handleTouchEnd);
      el.removeEventListener("touchmove", handleTouchMove);
    };
  }, [images, handleMouseMove, handleTouchMove]);

  const handleImageClick = (src: string) => {
    const clickDuration = Date.now() - clickStartTime.current;
    if (!isDragging.current && clickDuration < 200) {
      const img = new window.Image();
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        setSelectedImage(src);
        setImageAspectRatio(aspectRatio);
      };
      img.src = src;
    }
  };

  const handleImageHover = useCallback((src: string) => {
    const img = new window.Image();
    img.src = src;
  }, []);

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

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  if (!images.length) {
    return null;
  }

  return (
  <>
    <div className="w-full">
      <div className="flex mx-auto justify-between mb-4 mt-10 px-2">
        <h2 className="text-xl font-semibold">{description}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors">
          {isMobile ? "Drag to scroll • Tap to enlarge" : "Drag to scroll • Click to enlarge"}
        </p>
      </div>
      <div 
        ref={ref} 
        className={`relative min-h-[${height}] min-w-[${height}] rounded-2xl shadow-2xl bg-[var(--color-light)] dark:bg-[var(--color-dark)] transition-colors p-3 overflow-x-scroll cursor-grab active:cursor-grabbing select-none`} 
        style={{scrollbarWidth: 'none', msOverflowStyle: 'none', minHeight: height, minWidth: height}}
        >
        <div className="flex gap-3">
          {doubled.map((src, i) => (
            <div 
              key={i} 
              className={`flex-shrink-0 rounded-2xl min-w-[40vh] min-h-[50vh] overflow-hidden h-[${height}] relative cursor-pointer transition-shadow duration-200`} 
              style={{ aspectRatio: 'auto' }}
              onClick={() => handleImageClick(src)}
              onMouseEnter={() => handleImageHover(src)}
              onTouchStart={() => handleImageHover(src)}
            >
              <Image 
                src={src} 
                alt={`gallery-${(i+1)% images.length}`} 
                fill
                className="object-cover transition-transform duration-200" 
                draggable={false}
                style={{ objectPosition: 'center' }}
                sizes="40vw"
                loading={i < 6 ? "eager" : "lazy"}
                priority={i < 6}
                quality={85}
              />
            </div>
          ))}
        </div>
      </div>
      <style>{`.overflow-x-scroll::-webkit-scrollbar { display: none; }`}</style>
    </div>
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="relative max-w-[95vw] max-h-[95vh] bg-transparent rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{
              aspectRatio: imageAspectRatio,
              width: imageAspectRatio > 1 
                ? `min(95vw, ${90 * imageAspectRatio}vh)` 
                : `min(${95 * imageAspectRatio}vh, 90vw)`,
              height: imageAspectRatio > 1 
                ? `min(95vw / ${imageAspectRatio}, 90vh)` 
                : `min(95vh, ${90 / imageAspectRatio}vw)`
            }}
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 z-20 bg-black/60 hover:bg-black/80 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <IoMdClose size={20}/>
            </button> 
            <div className="relative w-full h-full bg-transparent rounded-2xl overflow-hidden">
              <Image
                src={selectedImage}
                alt="Enlarged view"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 95vw, (max-width: 1200px) 90vw, 85vw"
                quality={100}
                priority
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}


export default GalleryScroll;