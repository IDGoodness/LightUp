import { useState, useEffect } from 'react';
import { Play, Search, X, Calendar, Clock } from 'lucide-react';
import sermonImg from '../assets/sermonImg.jpg';
import { dbService } from '../services/db';
import type { Sermon } from '../data/mockData';

export default function Sermons() {
  const [sermonsList, setSermonsList] = useState<Sermon[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSermons = async () => {
      try {
        const data = await dbService.getSermons();
        setSermonsList(data);
      } catch (err) {
        console.error('Error fetching sermons:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSermons();
  }, []);

  const openVideo = (url: string) => setActiveVideo(url);
  const closeVideo = () => setActiveVideo(null);

  // Filter sermons based on search query
  const filteredSermons = sermonsList.filter(sermon => 
    sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sermon.speaker.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="sermons-page">
      {/* 1. Hero Section */}
      <header
        className="relative bg-cover bg-center bg-no-repeat min-h-[100vh] flex items-center justify-center text-center py-24 px-6"
        style={{ backgroundImage: `url(${sermonImg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/70 to-bg-dark/95 z-10"></div>
        <div className="relative z-20 max-w-[850px] animate-fade-in">
          <h1 className="text-white mb-6 font-heading font-extrabold text-[2.5rem] sm:text-[2rem] md:text-[3rem] leading-tight">
            MESSAGES THAT{" "}
            <span className="text-gradient-orange">INSPIRES FAITH</span>
          </h1>
          <p className="max-w-[750px] mx-auto text-[1.1rem] text-text-dimmed leading-relaxed">
            Every message shared at Light Up International Christian Network is
            rooted in Scripture and focused on helping believers grow in their
            relationship with God. Whether you're seeking encouragement, wisdom,
            or spiritual direction, our sermon library is here to support your
            journey.
          </p>
        </div>
      </header>

      {/* 2. Search & Sermon Grid */}
      <section className="py-24 bg-bg-dark">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12 border-b border-white/5 pb-6">
            <h2 className="text-3xl font-heading font-bold text-text-white">
              Browse our sermons
            </h2>

            {/* Search Input */}
            <div className="relative w-full max-w-[350px]">
              <input
                type="text"
                placeholder="Search by title or speaker..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-10 pr-5 text-text-white text-sm focus:outline-none focus:border-primary focus:bg-white/8 transition-all duration-150"
              />
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dimmed"
              />
            </div>
          </div>

          {/* Grid display */}
          {loading ? (
            <div className="text-center py-16 text-text-dimmed">Loading sermons...</div>
          ) : filteredSermons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
              {filteredSermons.map((sermon) => (
                <div
                  className="bg-bg-black rounded-lg overflow-hidden relative cursor-pointer shadow-[0_5px_15px_rgba(0,0,0,0.4)] border border-white/5 h-[250px] group animate-fade-in"
                  key={sermon.id}
                  onClick={() => openVideo(sermon.videoUrl)}
                >
                  <img
                    src={sermon.thumbnail}
                    alt={sermon.title}
                    className="w-full h-full object-cover opacity-65 transition-all duration-300 group-hover:opacity-85 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end h-full">
                    <h3 className="text-[1.2rem] font-bold text-text-white mb-1">
                      {sermon.title}
                    </h3>
                    <span className="text-[0.85rem] text-accent-orange mb-3">
                      by {sermon.speaker}
                    </span>
                    <div className="flex justify-between items-center border-t border-white/15 pt-3">
                      <div className="flex gap-4 text-[0.8rem] text-text-dimmed">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} /> {sermon.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {sermon.duration}
                        </span>
                      </div>
                      <span className="text-[0.85rem] font-bold text-primary flex items-center gap-1 group-hover:text-text-white transition-colors duration-150">
                        <Play size={12} fill="currentColor" /> WATCH
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-text-dimmed">
              <h3 className="text-xl font-semibold mb-2">
                No sermons found matching "{searchQuery}"
              </h3>
              <p className="text-sm">
                Try checking your spelling or looking for other keywords.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Video Modal Overlay */}
      {activeVideo && (
        <div
          className="fixed inset-0 bg-black/85 z-[2000] flex items-center justify-center p-8"
          onClick={closeVideo}
        >
          <div
            className="bg-bg-dark rounded-lg max-w-[800px] w-full overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-primary/20 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 bg-transparent border-none text-text-white cursor-pointer z-10"
              onClick={closeVideo}
              aria-label="Close sermon player"
            >
              <X size={24} />
            </button>
            <div className="relative pb-[56.25%] h-0">
              <iframe
                src={activeVideo}
                title="Sermon Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-none"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
