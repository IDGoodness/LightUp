import { useState, useEffect } from 'react';
import { X, ZoomIn, Download } from 'lucide-react';
import { dbService } from '../services/db';
import type { GalleryItem } from '../data/churchData';
import Img3 from '../assets/Img3.jpg';

export default function Gallery() {
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
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

  const openPhoto = (item: GalleryItem) => setActiveItem(item);
  const closePhoto = () => setActiveItem(null);

  const downloadPhoto = async (imageUrl: string, title?: string) => {
    try {
      const filename = `${(title || 'lightup-gallery-photo').toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`;
      if (imageUrl.startsWith('data:')) {
        const a = document.createElement('a');
        a.href = imageUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        return;
      }

      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error('Blob download failed, falling back:', err);
      const a = document.createElement('a');
      a.href = imageUrl;
      a.target = '_blank';
      a.download = `${(title || 'gallery-photo').toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="gallery-page">
      {/* 1. Hero Banner Display */}
      {/* <header className="h-[80vh] bg-cover bg-center relative" style={{ backgroundImage: `url(${Img3})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/40 to-bg-dark/95"></div>
      </header> */}

      {/* 2. Masonry Gallery Grid */}
      <section className="py-8 bg-bg-dark -mt-8 relative z-10">
        <div className="text-center mb-10 animate-fade-in">
          <img
            src={Img3}
            alt=""
            className="w-full h-auto block transition-all duration-300"
          />
        </div>
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8">
          {loading ? (
            <div className="text-center py-12 text-text-dimmed">
              Loading gallery...
            </div>
          ) : galleryList.length === 0 ? (
            <div className="text-center py-12 text-text-dimmed">
              No gallery photos uploaded yet.
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 md:columns-3 gap-6 mt-16">
              {galleryList.map((item, idx) => {
                // Apply variations in hue-rotate and contrast to make default baseline congregation image look different
                const isPlaceholderImage =
                  item.image.includes("homepage.jpg") ||
                  item.image.includes("worship") ||
                  item.image.includes("mentoring");
                const hueOffset = (idx * 35) % 360;
                const filterStyle = isPlaceholderImage
                  ? `hue-rotate(${hueOffset}deg) saturate(${1 + (idx % 2) * 0.15}) contrast(${1.05})`
                  : "none";

                return (
                  <div
                    className="break-inside-avoid mb-6 rounded-lg overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.3)] border border-primary/20 transition-all duration-300 hover:scale-105 cursor-pointer relative group animate-fade-in"
                    key={item.id}
                    onClick={() => openPhoto(item)}
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
                      {/* Hover Overlay — active on desktop hover only to prevent accidental mobile download taps */}
                      <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center gap-4">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openPhoto(item);
                          }}
                          className="p-3 bg-black/60 hover:bg-black/80 rounded-full text-white transition-all transform hover:scale-110 cursor-pointer"
                          title="Zoom In"
                        >
                          <ZoomIn size={22} />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadPhoto(item.image, item.title);
                          }}
                          className="p-3 bg-primary hover:bg-primary-hover rounded-full text-white transition-all transform hover:scale-110 shadow-lg cursor-pointer"
                          title="Download Photo"
                        >
                          <Download size={22} />
                        </button>
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
      {activeItem && (
        <div
          className="fixed inset-0 bg-black/95 z-[2500] flex flex-col items-center justify-between p-4 sm:p-8 animate-fade-in"
          onClick={closePhoto}
        >
          {/* Top Control Bar */}
          <div className="w-full max-w-[1200px] flex justify-between items-center z-10">
            <h3 className="text-white font-heading font-semibold text-lg sm:text-xl truncate max-w-[70%]">
              {activeItem.title}
            </h3>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  downloadPhoto(activeItem.image, activeItem.title);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover rounded-full text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-lg"
              >
                <Download size={16} /> Download
              </button>
              <button
                type="button"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-text-white cursor-pointer transition-all"
                onClick={closePhoto}
                aria-label="Close image viewer"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Main Image Container */}
          <div
            className="flex-1 flex items-center justify-center my-4 relative max-h-[80vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeItem.image}
              alt={activeItem.title || "Fullscreen preview"}
              className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-[0_15px_50px_rgba(0,0,0,0.7)] object-contain border border-white/10"
            />
          </div>

          {/* Bottom Bar */}
          <div
            className="w-full max-w-[1200px] text-center text-xs text-text-dimmed pb-2"
            onClick={(e) => e.stopPropagation()}
          >
            LightUp International Christian Network Gallery
          </div>
        </div>
      )}
    </div>
  );
}
