import { useState, useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { dbService } from '../services/db';
import type { GalleryItem } from '../data/mockData';

export default function Gallery() {
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);
  const [activePhoto, setActivePhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await dbService.getGalleryItems();
        setGalleryList(data);
      } catch (err) {
        console.error('Error fetching gallery:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const openPhoto = (image: string) => setActivePhoto(image);
  const closePhoto = () => setActivePhoto(null);

  return (
    <div className="gallery-page">
      {/* 1. Hero Banner Display */}
      <header className="h-[40vh] bg-cover bg-center relative" style={{ backgroundImage: `url(${galleryList[0]?.image || ''})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/40 to-bg-dark/95"></div>
      </header>

      {/* 2. Masonry Gallery Grid */}
      <section className="py-24 bg-bg-dark -mt-8 relative z-10">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="text-center max-w-[700px] mx-auto mb-10 animate-fade-in">
            <span className="font-heading font-bold text-[0.9rem] uppercase tracking-[0.15em] text-primary">MEMORIES</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-text-white mt-2 mb-4 leading-tight">Moments That Inspire</h2>
            <p className="text-text-dimmed">A visual record of our worship services, global conferences, and community outposts.</p>
          </div>

          {loading ? (
            <div className="text-center py-12 text-text-dimmed">Loading gallery...</div>
          ) : galleryList.length === 0 ? (
            <div className="text-center py-12 text-text-dimmed">No gallery photos uploaded yet.</div>
          ) : (
            <div className="columns-1 sm:columns-2 md:columns-3 gap-6 mt-16">
              {galleryList.map((item, idx) => {
                // Apply variations in hue-rotate and contrast to make default baseline congregation image look different
                const isPlaceholderImage = item.image.includes('homepage.jpg') || item.image.includes('worship') || item.image.includes('mentoring');
                const hueOffset = (idx * 35) % 360;
                const filterStyle = isPlaceholderImage 
                  ? `hue-rotate(${hueOffset}deg) saturate(${1 + (idx % 2) * 0.15}) contrast(${1.05})`
                  : 'none';

                return (
                  <div 
                    className="break-inside-avoid mb-6 rounded-lg overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.3)] border border-primary/20 transition-all duration-300 hover:scale-105 cursor-pointer relative group animate-fade-in" 
                    key={item.id}
                    onClick={() => openPhoto(item.image)}
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        style={{ 
                          filter: filterStyle, 
                        }} 
                        className="w-full h-auto block transition-all duration-300"
                      />
                      {/* Hover Overlay using Tailwind Group Hover */}
                      <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 pointer-events-none">
                        <ZoomIn size={32} className="text-text-white" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div 
          className="fixed inset-0 bg-black/92 z-[2500] flex items-center justify-center p-8"
          onClick={closePhoto}
        >
          <button 
            className="absolute top-6 right-6 bg-transparent border-none text-text-white cursor-pointer"
            onClick={closePhoto}
            aria-label="Close image viewer"
          >
            <X size={32} />
          </button>
          
          <img 
            src={activePhoto} 
            alt="Fullscreen preview" 
            className="max-h-[90vh] max-w-[90vw] rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.5)] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
