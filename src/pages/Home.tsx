import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Calendar, Clock, MapPin, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ministriesData } from '../data/ministryData';
import { dbService } from '../services/db';
import type { Sermon, ChurchEvent, GalleryItem } from '../data/churchData';
import Newsletter from '../components/Newsletter';
import homepageImg from '../assets/homepage.jpg';
import banner from '../assets/banner.png';
import heroWorship from '../assets/hero_worship.jpg';
import heroPreacher from '../assets/hero_preacher.jpg';
import heroMentoring from '../assets/hero_mentoring.jpg';
import Img1 from '../assets/Img1.jpg';
import Img2 from '../assets/Img2.jpg';

export default function Home() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [sermonsList, setSermonsList] = useState<Sermon[]>([]);
  const [eventsList, setEventsList] = useState<ChurchEvent[]>([]);
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);
  const [loadingSermons, setLoadingSermons] = useState(true);

  useEffect(() => {
    const fetchSermons = async () => {
      try {
        const data = await dbService.getSermons();
        setSermonsList(data);
      } catch (err) {
        console.error('Error fetching sermons in Home:', err);
      } finally {
        setLoadingSermons(false);
      }
    };

    const fetchOtherData = async () => {
      try {
        const [fetchedEvents, fetchedGallery] = await Promise.all([
          dbService.getUpcomingEvents(),
          dbService.getGalleryItems()
        ]);
        if (fetchedEvents) setEventsList(fetchedEvents);
        if (fetchedGallery) setGalleryList(fetchedGallery);
      } catch (err) {
        console.error('Error loading events/gallery in Home:', err);
      }
    };

    fetchSermons();
    fetchOtherData();
  }, []);

  const openVideo = (url: string) => setActiveVideo(url);
  const closeVideo = () => setActiveVideo(null);

  // Take first 3 ministries and up to 3 sermons
  const featuredMinistries = ministriesData.slice(0, 3);
  const featuredSermons = sermonsList.slice(0, 3);
  const nextUpcomingEvent = eventsList[0] || null;

  // Gallery slider states
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [galleryPaused, setGalleryPaused] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(4);
      }
    };
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const maxGalleryIndex = Math.max(0, galleryList.length - itemsPerPage);

  const handleNextGallery = useCallback(() => {
    setGalleryIndex((prev) => (prev >= maxGalleryIndex ? 0 : prev + 1));
  }, [maxGalleryIndex]);

  const handlePrevGallery = useCallback(() => {
    setGalleryIndex((prev) => (prev === 0 ? maxGalleryIndex : prev - 1));
  }, [maxGalleryIndex]);

  useEffect(() => {
    if (galleryPaused) return;
    const interval = setInterval(() => {
      handleNextGallery();
    }, 3000);
    return () => clearInterval(interval);
  }, [galleryPaused, handleNextGallery]);

  // Common Tailwind button styles
  const btnPrimaryClass = "inline-flex items-center justify-center px-7 py-3 rounded-full font-heading font-semibold cursor-pointer transition-all duration-300 text-[0.95rem] gap-2 bg-primary text-text-white shadow-[0_4px_12px_rgba(140,82,255,0.3)] hover:bg-primary-hover hover:shadow-[0_6px_18px_rgba(140,82,255,0.5)] hover:-translate-y-[2px] active:translate-y-0";

  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <header
        className="relative bg-cover bg-center bg-no-repeat min-h-[85vh] lg:min-h-[90vh] flex items-center py-20 px-6 sm:px-12 md:px-16 overflow-hidden"
        style={{ backgroundImage: `url(${homepageImg})` }}
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-bg-dark via-bg-dark/75 to-bg-dark/40 z-10"></div>

        {/* Giant Diagonal Background Cut Shape (as in design) */}
        {/* <div className="absolute right-[-15%] top-[-25%] w-[850px] h-[850px] rotate-45 bg-[#090213] border-l border-t border-white/5 shadow-[-25px_25px_60px_rgba(0,0,0,0.85)] z-10 hidden lg:block pointer-events-none select-none"></div> */}

        <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-20 animate-fade-in">
          {/* Left Column: Text Content */}
          <div className="flex flex-col gap-6 items-start text-left max-w-[600px] z-20">
            <h1 className="text-white font-heading font-extrabold text-[2.5rem] sm:text-[3.2rem] lg:text-[3rem] leading-[1.1] tracking-tight">
              <span className="text-gradient-orange">Igniting</span> Hearts.
              <br />
              <span className="text-gradient-orange">Transforming</span> Lives.
              <br />
              <span className="text-gradient-orange">Raising</span> Kingdom
              Ambassadors.
            </h1>
            <p className="text-text-dimmed text-[0.9rem] leading-relaxed max-w-[500px]">
              A Christ-centered ministry dedicated to raising believers through
              prayer, biblical teaching, mentorship and impactful gatherings
              that inspire lives and strengthen faith.
            </p>
            <div className="mt-4">
              <a
                href="#ministries"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full font-heading font-semibold text-text-white border border-white hover:bg-white/10 transition-all duration-300 text-[0.95rem] hover:-translate-y-[2px] active:translate-y-0"
              >
                Explore the Ministry
              </a>
            </div>
          </div>

          {/* Right Column: Diamond Picture Layout */}
          <div className="relative w-full h-[450px] md:h-[500px] flex items-center justify-center mt-12 lg:mt-0 z-20">
            {/* Top-Right Diamond: Worship (underneath) */}
            <div className="absolute top-[-10%] md:top-[-62%] right-[20%] w-64 h-64 md:w-[450px] md:h-[450px] rotate-45 overflow-hidden rounded-[1rem] border-[6px] border-[#5e4b76] shadow-[0_15px_40px_rgba(0,0,0,0.65)] z-10 transition-all duration-300 hover:scale-105 hover:z-30 hover:border-primary/50">
              <img
                src={heroWorship}
                alt="Worship"
                className="w-full h-full object-cover object-bottom md:mt-44 md:ml-32 -rotate-45 scale-[1.5]"
              />
            </div>

            {/* Bottom-Left Diamond: Preacher (overlaps bottom-left of worship) */}
            <div className="absolute bottom-[10%] md:bottom-[-10%] left-[4%] md:left-[-10%] w-40 h-40 md:w-[300px] md:h-[300px] rotate-45 overflow-hidden rounded-[1rem] border-[6px] border-[#5e4b76] shadow-[0_15px_40px_rgba(0,0,0,0.65)] z-20 transition-all duration-300 hover:scale-105 hover:z-30 hover:border-primary/50">
              <img
                src={heroPreacher}
                alt="Preacher"
                className="w-full h-full object-cover -rotate-45 scale-[1.5]"
              />
            </div>

            {/* Middle-Right Diamond: Mentoring (overlaps bottom-right of worship) */}
            <div className="absolute bottom-[20%] md:bottom-[8%] md:bottom-[20%] right-[-2%] md:right-[-10%] w-40 h-40 md:w-[300px] md:h-[300px] rotate-45 overflow-hidden rounded-[1rem] border-[6px] border-[#5e4b76] shadow-[0_15px_40px_rgba(0,0,0,0.65)] z-20 transition-all duration-300 hover:scale-105 hover:z-30 hover:border-primary/50">
              <img
                src={heroMentoring}
                alt="Mentoring"
                className="w-full h-full object-cover -rotate-45 scale-[1.5]"
              />
            </div>
          </div>
        </div>
      </header>

      {/* 2. About Us snippet */}
      <section className="py-24 bg-[#EEE7FE] text-text-dark">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="grid grid-cols-12 relative h-[500px] w-full">
            <div className="col-start-1 col-end-9 row-start-1 z-10 rounded-lg overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.15)] w-[250px] md:w-[300px] h-[400px]">
              <img
                src={Img1}
                alt="Worshippers gathering"
                className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
              />
            </div>
            <div className="col-start-5 col-end-13 row-start-1 mt-[100px] z-20 rounded-lg overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.2)] w-[250px] md:w-[300px] h-[400px]">
              <img
                src={Img2}
                alt="Ambassadors learning"
                style={{ filter: "hue-rotate(25deg)" }}
                className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
              />
            </div>
          </div>
          <div className="flex flex-col gap-6 items-start">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-text-dark leading-tight">
              ABOUT US
            </h2>
            <p className="text-text-muted text-[1.05rem] leading-relaxed">
              LightUp International Christian Network is a mission-driven,
              spirit-led community dedicated to raising ambassadors for God's
              Kingdom. Through solid biblical teachings, active discipleship,
              and fellowship, we empower believers to discover their calling and
              shine Christ's light in their societies.
            </p>
            <p className="text-text-muted text-[1.05rem] leading-relaxed">
              Whether through prayer meditation, missions, or community
              development outposts, we provide the platform for you to grow
              spiritually and serve purposefully.
            </p>
            <Link
              to="/about"
              className="mt-4 border-2 border-purple-300 py-2 px-4 rounded-md hover:bg-purple-200 transition-all duration-300 cursor-pointer"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Our Ministries snippet */}
      <section className="py-24 bg-bg-dark" id="ministries">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="text-center max-w-[700px] mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-text-white mt-2 mb-4 leading-tight">
              OUR MINISTRIES
            </h2>
            <p className="text-text-dimmed">
              {/* Empowering the body of Christ through three main spiritual offices
              and outposts. */}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-14 mb-14">
            {featuredMinistries.map((min) => (
              <div
                className="bg-card-dark-lighter rounded-lg overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.2)] border border-primary/20 transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_15px_35px_rgba(140,82,255,0.2)] flex flex-col"
                key={min.id}
              >
                <div className="h-[400px] relative">
                  <img
                    src={min.image}
                    alt={min.title}
                    className="w-full h-full object-cover"
                  />
                  {/* <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-card-dark-lighter to-transparent"></div> */}
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  {/* <span className="text-[0.8rem] font-bold tracking-[0.1em] text-primary mb-2">
                    {min.office}
                  </span> */}
                  <h3 className="text-2xl font-heading font-bold mb-4 text-text-white">
                    {min.title}
                  </h3>
                  {/* <p className="text-[0.95rem] text-text-dimmed mb-6 flex-1 leading-relaxed">
                    {min.description}
                  </p> */}
                  {/* <Link
                    to="/about"
                    className={`${btnOutlinePrimaryClass} mt-auto self-start px-5 py-2 text-sm`}
                  >
                    Read details
                  </Link> */}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/about" className={btnPrimaryClass}>
              Explore All Ministries <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Join Our Upcoming Events teaser */}
      <section className="py-24 bg-[#EEE7FE] text-text-dark">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8 text-center">
          {/* <span className="font-heading font-bold text-[0.9rem] uppercase tracking-[0.15em] text-primary">
            UPCOMING
          </span> */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-text-dark mt-2 mb-6 leading-tight">
            JOIN OUR UPCOMING EVENTS
          </h2>
          <p className="text-text-muted mb-10 max-w-[800px] mx-auto text-lg leading-relaxed">
            Stay connected with our latest gatherings, retreats, prayer
            meetings, and conferences. We look forward to worshipping, learning,
            and growing together with you in His presence.
          </p>

          {/* Display one event teaser */}
          {nextUpcomingEvent && (
            <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden border border-primary/20 transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_10px_30px_rgba(0,0,0,0.4)] text-left mx-auto mb-12 max-w-[750px]">
              <div className="w-full md:w-[220px] h-[200px] md:h-auto relative shrink-0">
                <img
                  src={nextUpcomingEvent.image}
                  alt={nextUpcomingEvent.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col md:flex-row flex-1 justify-between items-start md:items-center gap-6">
                <div>
                  <div className="font-heading font-bold text-[0.9rem] text-primary mb-2 flex gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> {nextUpcomingEvent.date}
                    </span>
                    <span>{nextUpcomingEvent.time}</span>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-text-dark mb-2">
                    {nextUpcomingEvent.title}
                  </h3>
                  <p className="text-text-muted text-[0.95rem] mb-4">
                    {nextUpcomingEvent.description}
                  </p>
                  <div className="flex items-center gap-2 text-text-muted text-[0.9rem]">
                    <MapPin size={12} /> {nextUpcomingEvent.location}
                  </div>
                </div>
                <div className="flex gap-3 w-full md:w-auto shrink-0">
                  <Link
                    to="/events"
                    className={`${btnPrimaryClass} px-5 py-2 text-sm w-full md:w-auto`}
                  >
                    More
                  </Link>
                </div>
              </div>
            </div>
          )}

          <Link to="/events" className={btnPrimaryClass}>
            View All Events <Calendar size={16} />
          </Link>
        </div>
      </section>

      {/* 5. Grow Through God's Word */}
      <section className="py-24 bg-bg-black">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="text-center max-w-[700px] mx-auto mb-16">
            {/* <span className="font-heading font-bold text-[0.9rem] uppercase tracking-[0.15em] text-primary">
              SERMONS
            </span> */}
            <h2 className="text-3xl sm:text-3xl md:text-4xl uppercase font-heading font-bold text-text-white mt-2 mb-4 leading-tight">
              Grow Through God's Word
            </h2>
            <p className="text-text-dimmed">
              Keep yourself updated in the Word of God with sermons from God's
              servant.
            </p>
          </div>

          {loadingSermons ? (
            <div className="text-center py-16 text-text-dimmed">Loading sermons...</div>
          ) : featuredSermons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
              {featuredSermons.map((sermon) => (
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
            <div className="text-center py-16 text-text-dimmed">No sermons available at this time.</div>
          )}

          <div className="text-center mt-16">
            <Link to="/sermons" className={btnPrimaryClass}>
              View All Sermons
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Moments That Inspire */}
      <section className="py-24 bg-bg-dark">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="text-center max-w-[700px] mx-auto mb-8">
            {/* <span className="font-heading font-bold text-[0.9rem] uppercase tracking-[0.15em] text-primary">
              GALLERY
            </span> */}
            <h2 className="text-3xl sm:text-4xl uppercase md:text-5xl font-heading font-bold text-text-white mt-2 mb-4 leading-tight">
              Moments That Inspire
            </h2>
            <p className="text-text-dimmed">
              Explore custom photos from our recent meetings, conferences, and
              community gatherings.
            </p>
          </div>

          {/* Slider Horizontal Carousel Gallery */}
          <div className="relative overflow-hidden w-full my-16 px-12 group">
            {/* Left Prev Arrow Button */}
            <button 
              onClick={handlePrevGallery}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-black/60 hover:bg-primary text-text-white p-3 rounded-full border-none cursor-pointer focus:outline-none transition-all hover:scale-110 opacity-0 group-hover:opacity-100 duration-300"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Right Next Arrow Button */}
            <button 
              onClick={handleNextGallery}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-black/60 hover:bg-primary text-text-white p-3 rounded-full border-none cursor-pointer focus:outline-none transition-all hover:scale-110 opacity-0 group-hover:opacity-100 duration-300"
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>

            <div 
              className="overflow-hidden w-full"
              onMouseEnter={() => setGalleryPaused(true)}
              onMouseLeave={() => setGalleryPaused(false)}
            >
              <div 
                className="flex -mx-3 transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${galleryIndex * (100 / itemsPerPage)}%)` }}
              >
                {galleryList.map((item) => (
                  <div 
                    className="px-3 w-full sm:w-1/2 lg:w-1/4 shrink-0" 
                    key={item.id}
                  >
                    <div className="rounded-lg overflow-hidden h-[300px] shadow-lg relative group/item cursor-pointer">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-all duration-300 group-hover/item:scale-105" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/item:opacity-100 flex items-center justify-center transition-all duration-300">
                        <span className="text-white font-heading font-semibold text-lg">{item.title}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/gallery" className={btnPrimaryClass}>
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Partner Snippet */}
      <section className="py-24 bg-gradient-to-b from-bg-black to-bg-dark">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
          <div className="flex flex-col gap-6 items-start">
            {/* <span className="font-heading font-bold text-[0.9rem] uppercase tracking-[0.15em] text-primary">
              PARTNERSHIP
            </span> */}
            <h2 className="text-3xl sm:text-4xl uppercase md:text-5xl font-heading font-bold text-text-white leading-tight">
              Partner in Transforming Lives
            </h2>
            <p className="text-lg text-text-dimmed leading-relaxed">
              Your partnership helps us share the gospel, disciple believers,
              support local outreach outposts, and create opportunities for
              lives to be transformed through the love and power of Jesus
              Christ. Join hands with us today to touch lives globally.
            </p>
            <Link to="/partner" className={`${btnPrimaryClass} mt-4`}>
              Partner with us
            </Link>
          </div>
          <div className="flex justify-center relative order-first lg:order-none">
            <img
              src={banner}
              alt="Ambassador planting flag"
              className="max-h-[500px] object-contain filter drop-shadow-[0_15px_30px_rgba(140,82,255,0.4)]"
            />
          </div>
        </div>
      </section>

      {/* Newsletter signup */}
      <Newsletter />

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
              aria-label="Close video player"
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
