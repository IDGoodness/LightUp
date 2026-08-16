import { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  X, Download, Filter, ArrowUpDown, Grid, LayoutGrid, 
  Search, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { dbService } from '../services/db';
import type { GalleryItem } from '../data/churchData';
import Img3 from '../assets/Img3.jpg';

type SortOption = 'default' | 'title-asc' | 'title-desc' | 'random';
type FilterOption = 'all' | 'vertical' | 'horizontal' | 'square';
type ViewMode = 'masonry' | 'grid';

export default function Gallery() {
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Sorting, Filtering & Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>('all');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Pagination / Load More States
  const [visibleCount, setVisibleCount] = useState(24);
  const [currentPage, setCurrentPage] = useState(1);
  const [usePagination, setUsePagination] = useState(false); // Toggle between 'Load More' and 'Page Numbers'
  const itemsPerPage = 24;

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

  // Filter and Sort gallery items
  const filteredAndSortedList = useMemo(() => {
    let list = [...galleryList];

    // 1. Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(item => 
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.id && item.id.toLowerCase().includes(q))
      );
    }

    // 2. Aspect Ratio / Format Filter
    if (selectedFilter !== 'all') {
      list = list.filter(item => item.aspectRatio === selectedFilter);
    }

    // 3. Sorting
    if (sortBy === 'title-asc') {
      list.sort((a, b) => a.title.localeCompare(b.title, undefined, { numeric: true }));
    } else if (sortBy === 'title-desc') {
      list.sort((a, b) => b.title.localeCompare(a.title, undefined, { numeric: true }));
    } else if (sortBy === 'random') {
      // Deterministic pseudo-shuffle for render stability
      list.sort((a, b) => (a.id.charCodeAt(0) % 5) - (b.id.charCodeAt(0) % 5));
    }

    return list;
  }, [galleryList, searchQuery, selectedFilter, sortBy]);

  // Total pages for pagination mode
  const totalPages = Math.ceil(filteredAndSortedList.length / itemsPerPage) || 1;

  // Displayed items based on pagination or load more mode
  const displayedItems = useMemo(() => {
    if (usePagination) {
      const start = (currentPage - 1) * itemsPerPage;
      return filteredAndSortedList.slice(start, start + itemsPerPage);
    } else {
      return filteredAndSortedList.slice(0, visibleCount);
    }
  }, [filteredAndSortedList, usePagination, currentPage, itemsPerPage, visibleCount]);

  // Reset pagination counters when filters change
  useEffect(() => {
    setVisibleCount(24);
    setCurrentPage(1);
  }, [searchQuery, selectedFilter, sortBy]);

  // Lightbox Navigation Handlers
  const activeItem = activeItemIndex !== null ? displayedItems[activeItemIndex] : null;

  const handleNextPhoto = useCallback(() => {
    if (activeItemIndex === null) return;
    setActiveItemIndex((prev) => (prev! + 1 >= displayedItems.length ? 0 : prev! + 1));
  }, [activeItemIndex, displayedItems.length]);

  const handlePrevPhoto = useCallback(() => {
    if (activeItemIndex === null) return;
    setActiveItemIndex((prev) => (prev! - 1 < 0 ? displayedItems.length - 1 : prev! - 1));
  }, [activeItemIndex, displayedItems.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (activeItemIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveItemIndex(null);
      if (e.key === 'ArrowRight') handleNextPhoto();
      if (e.key === 'ArrowLeft') handlePrevPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItemIndex, handleNextPhoto, handlePrevPhoto]);

  const openPhoto = (index: number) => setActiveItemIndex(index);
  const closePhoto = () => setActiveItemIndex(null);

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

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 24, filteredAndSortedList.length));
  };

  const handleShowAll = () => {
    setVisibleCount(filteredAndSortedList.length);
  };

  return (
    <div className="gallery-page bg-[#0a0314] min-h-screen text-text-white">
      {/* 1. Hero Banner Display */}
      <section className="relative z-10">
        <div className="w-full text-center">
          <img
            src={Img3}
            alt="LightUp Gallery Banner"
            className="w-full h-auto block max-h-[450px] object-cover"
          />
        </div>
      </section>

      {/* 2. Gallery Main Container */}
      <section className="py-12 px-4 sm:px-6 md:px-8 max-w-[1300px] mx-auto">
        {/* Title & Stats */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 pb-6 border-b border-white/10">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-2">
              Media Archive
            </span>
            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
              Moments That Inspire
            </h1>
            <p className="text-text-dimmed text-sm mt-1 max-w-xl">
              Capturing vibrant moments from our ARISE conferences, weekly fellowships, prayer retreats, and community gatherings.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-3 text-xs text-text-dimmed">
            <span className="text-primary font-bold text-base">{filteredAndSortedList.length}</span>
            <span>Photos Available</span>
          </div>
        </div>

        {/* 3. Interactive Toolbar: Search, Filters, Sorting & View Toggle */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 mb-8 shadow-xl flex flex-col gap-4 backdrop-blur-md">
          {/* Row 1: Search & Filter Tabs */}
          <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search photos (e.g. ARISE, photo 45)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-black/40 border border-white/15 rounded-xl text-white placeholder-white/40 text-xs sm:text-sm focus:outline-none focus:border-primary transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <span className="text-xs text-text-dimmed mr-1 flex items-center gap-1 shrink-0">
                <Filter size={13} /> Filter:
              </span>
              {(
                [
                  { id: 'all', label: 'All' },
                  { id: 'vertical', label: 'Portraits' },
                  { id: 'horizontal', label: 'Landscapes' },
                  { id: 'square', label: 'Square' },
                ] as const
              ).map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    selectedFilter === tab.id
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white/5 hover:bg-white/10 text-text-dimmed hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Row 2: Sort Controls, View Mode & Batch Switcher */}
          <div className="flex flex-wrap justify-between items-center gap-3 pt-3 border-t border-white/5 text-xs text-text-dimmed">
            {/* Sort Dropdown & Randomizer */}
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                <ArrowUpDown size={13} /> Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-black/40 border border-white/15 rounded-lg px-2.5 py-1.5 text-white text-xs focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="default">Default Order</option>
                <option value="title-asc">Photo Number (Ascending)</option>
                <option value="title-desc">Photo Number (Descending)</option>
                <option value="random">Shuffle Order</option>
              </select>
            </div>

            {/* View Mode & Mode Switcher */}
            <div className="flex items-center gap-3">
              {/* Pagination Mode Toggle */}
              <button
                type="button"
                onClick={() => setUsePagination(!usePagination)}
                className={`px-3 py-1 rounded-lg border text-xs transition-all cursor-pointer ${
                  usePagination
                    ? 'border-primary/50 text-purple-300 bg-primary/10'
                    : 'border-white/10 text-text-dimmed hover:text-white bg-white/5'
                }`}
              >
                {usePagination ? 'Paged Mode (1,2,3)' : 'Scroll & Load More'}
              </button>

              {/* View Layout Toggle */}
              <div className="flex items-center bg-black/40 p-1 rounded-lg border border-white/10">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded transition-all cursor-pointer ${
                    viewMode === 'grid' ? 'bg-primary text-white shadow' : 'text-white/40 hover:text-white'
                  }`}
                  title="Uniform Grid"
                >
                  <Grid size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('masonry')}
                  className={`p-1.5 rounded transition-all cursor-pointer ${
                    viewMode === 'masonry' ? 'bg-primary text-white shadow' : 'text-white/40 hover:text-white'
                  }`}
                  title="Masonry Layout"
                >
                  <LayoutGrid size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Gallery Grid Display */}
        {loading ? (
          <div className="text-center py-24 text-text-dimmed flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span>Loading gallery photos...</span>
          </div>
        ) : filteredAndSortedList.length === 0 ? (
          <div className="text-center py-20 bg-white/5 border border-white/10 rounded-2xl p-8">
            <h3 className="text-lg font-bold text-white mb-2">No photos found</h3>
            <p className="text-xs text-text-dimmed mb-4">
              Try adjusting your search query or removing active filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedFilter('all');
                setSortBy('default');
              }}
              className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-full transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            {/* Grid vs Masonry View */}
            {viewMode === 'grid' ? (
              /* Balanced Compact Grid Mode (2 columns on mobile, 3 on sm, 4 on md, 6 on lg) */
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                {displayedItems.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => openPhoto(idx)}
                    className="group relative aspect-square rounded-xl overflow-hidden bg-black/40 border border-white/10 shadow-md cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:border-primary/50 hover:shadow-primary/20"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    />

                    {/* Dark gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-2.5 sm:p-3">
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadPhoto(item.image, item.title);
                          }}
                          className="p-1.5 bg-primary/90 hover:bg-primary rounded-full text-white shadow-md transition-transform hover:scale-110"
                          title="Download photo"
                        >
                          <Download size={13} />
                        </button>
                      </div>
                      <div className="truncate">
                        <span className="text-[11px] font-semibold text-white truncate block">
                          {item.title}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Responsive Masonry View (2 columns on mobile, 3 on sm, 4 on lg) */
              <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 sm:gap-4">
                {displayedItems.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => openPhoto(idx)}
                    className="break-inside-avoid mb-3 sm:mb-4 rounded-xl overflow-hidden bg-black/40 border border-white/10 shadow-md cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-primary/50 group relative"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-auto block transition-all duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3">
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadPhoto(item.image, item.title);
                          }}
                          className="p-2 bg-primary/90 hover:bg-primary rounded-full text-white shadow-md transition-transform hover:scale-110"
                          title="Download photo"
                        >
                          <Download size={14} />
                        </button>
                      </div>
                      <div className="truncate">
                        <span className="text-xs font-semibold text-white truncate block">
                          {item.title}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 5. Pagination & Load More Controls */}
            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col items-center gap-4">
              {usePagination ? (
                /* Numbered Pagination */
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => {
                      setCurrentPage(prev => Math.max(prev - 1, 1));
                      window.scrollTo({ top: 350, behavior: 'smooth' });
                    }}
                    className="px-3 py-2 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl text-xs font-semibold text-white transition-all flex items-center gap-1"
                  >
                    <ChevronLeft size={14} /> Prev
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                      let pageNum = i + 1;
                      if (totalPages > 7 && currentPage > 4) {
                        pageNum = Math.min(currentPage - 3 + i, totalPages);
                      }
                      return (
                        <button
                          key={pageNum}
                          type="button"
                          onClick={() => {
                            setCurrentPage(pageNum);
                            window.scrollTo({ top: 350, behavior: 'smooth' });
                          }}
                          className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                            currentPage === pageNum
                              ? 'bg-primary text-white shadow-lg'
                              : 'bg-white/5 hover:bg-white/10 text-text-dimmed hover:text-white'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    disabled={currentPage >= totalPages}
                    onClick={() => {
                      setCurrentPage(prev => Math.min(prev + 1, totalPages));
                      window.scrollTo({ top: 350, behavior: 'smooth' });
                    }}
                    className="px-3 py-2 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl text-xs font-semibold text-white transition-all flex items-center gap-1"
                  >
                    Next <ChevronRight size={14} />
                  </button>
                </div>
              ) : (
                /* Load More Button & Stats */
                <div className="flex flex-col items-center gap-3">
                  <div className="text-xs text-text-dimmed">
                    Showing <strong className="text-white">{displayedItems.length}</strong> of{' '}
                    <strong className="text-white">{filteredAndSortedList.length}</strong> photos
                  </div>

                  {displayedItems.length < filteredAndSortedList.length && (
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleLoadMore}
                        className="px-7 py-3 bg-primary hover:bg-primary-hover text-white rounded-full font-heading font-semibold text-xs sm:text-sm shadow-[0_4px_15px_rgba(140,82,255,0.35)] transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
                      >
                        Load More Photos ({filteredAndSortedList.length - displayedItems.length} remaining)
                      </button>

                      <button
                        type="button"
                        onClick={handleShowAll}
                        className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-heading font-semibold text-xs transition-all cursor-pointer"
                      >
                        Show All
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </section>

      {/* 6. Upgraded Lightbox Modal with Carousel Navigation */}
      {activeItem && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-[3000] flex flex-col justify-between p-3 sm:p-6 animate-fade-in select-none"
          onClick={closePhoto}
        >
          {/* Top Control Bar */}
          <div className="w-full max-w-[1200px] mx-auto flex justify-between items-center z-20 pb-3 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-full bg-white/10 text-white text-xs font-semibold">
                {activeItemIndex! + 1} / {displayedItems.length}
              </span>
              <h3 className="text-white font-heading font-semibold text-sm sm:text-base truncate max-w-[200px] sm:max-w-[400px]">
                {activeItem.title}
              </h3>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  downloadPhoto(activeItem.image, activeItem.title);
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-primary hover:bg-primary-hover rounded-full text-white text-xs font-semibold transition-all cursor-pointer shadow-lg"
              >
                <Download size={14} /> Download
              </button>

              <button
                type="button"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white cursor-pointer transition-all"
                onClick={closePhoto}
                aria-label="Close image viewer"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Main Carousel Image with Left/Right Navigation */}
          <div
            className="flex-1 flex items-center justify-center my-2 relative w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Nav Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevPhoto();
              }}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/60 hover:bg-primary text-white rounded-full transition-all hover:scale-110 shadow-2xl cursor-pointer"
              title="Previous photo (Left Arrow)"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Main Picture */}
            <div className="max-h-[75vh] sm:max-h-[80vh] max-w-[90vw] flex items-center justify-center">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="max-h-[75vh] sm:max-h-[80vh] max-w-[85vw] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] object-contain border border-white/10"
              />
            </div>

            {/* Right Nav Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNextPhoto();
              }}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/60 hover:bg-primary text-white rounded-full transition-all hover:scale-110 shadow-2xl cursor-pointer"
              title="Next photo (Right Arrow)"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Bottom Bar: Instructions & Quick Counter */}
          <div
            className="w-full max-w-[1200px] mx-auto text-center text-xs text-text-dimmed pt-2 flex justify-between items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="hidden sm:inline">Use Left/Right arrow keys or click arrows to navigate</span>
            <span className="sm:hidden text-[10px]">Tap arrows to navigate</span>
            <span className="text-purple-300 font-semibold">LightUp Christian Network</span>
          </div>
        </div>
      )}
    </div>
  );
}
