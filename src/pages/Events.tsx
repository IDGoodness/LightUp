import { useState, useEffect } from 'react';
import { Calendar, MapPin, Play, X, Check, ArrowRight } from 'lucide-react';
import eventImg from '../assets/events.jpg';
import { dbService } from '../services/db';
import type { ChurchEvent } from '../data/mockData';

export default function Events() {
  const [eventsList, setEventsList] = useState<ChurchEvent[]>([]);
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await dbService.getEvents();
        setEventsList(data);
      } catch (err) {
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();

    const storedRegs = localStorage.getItem('lightup_registrations');
    if (storedRegs) {
      try {
        const parsed = JSON.parse(storedRegs);
        const eventIds = parsed.map((r: any) => r.event_id);
        setRegisteredEvents(eventIds);
      } catch {}
    }
  }, []);

  const handleRegister = async (eventId: string) => {
    if (registeredEvents.includes(eventId)) {
      setRegisteredEvents(registeredEvents.filter(id => id !== eventId));
      return;
    }

    const name = prompt("Please enter your name:");
    if (!name) return;
    const email = prompt("Please enter your email address:");
    if (!email) return;

    try {
      await dbService.registerForEvent(eventId, name, email);
      setRegisteredEvents([...registeredEvents, eventId]);
      alert("Registration successful! We look forward to having you.");
    } catch (err) {
      console.error('Registration error:', err);
      alert("Failed to register. Please try again.");
    }
  };

  const openVideo = (url: string) => setActiveVideo(url);
  const closeVideo = () => setActiveVideo(null);

  // Common Tailwind button styles
  const btnPrimaryClass = "inline-flex items-center justify-center px-6 py-2.5 rounded-full font-heading font-semibold cursor-pointer transition-all duration-300 text-[0.95rem] gap-2 bg-primary text-text-white shadow-[0_4px_12px_rgba(140,82,255,0.3)] hover:bg-primary-hover hover:shadow-[0_6px_18px_rgba(140,82,255,0.5)] hover:-translate-y-[2px] active:translate-y-0";
  const btnSecondaryClass = "inline-flex items-center justify-center px-6 py-2.5 rounded-full font-heading font-semibold cursor-pointer transition-all duration-300 text-[0.95rem] gap-2 bg-transparent text-text-white border border-white/60 hover:bg-white/10 hover:-translate-y-[2px] active:translate-y-0";

  const upcomingEvents = eventsList.filter(e => e.isUpcoming);
  const pastEvents = eventsList.filter(e => !e.isUpcoming);

  return (
    <div className="events-page">
      {/* 1. Hero Section */}
      <header
        className="relative bg-cover bg-center bg-no-repeat min-h-[50vh] flex items-center justify-center text-center py-24 px-6"
        style={{ backgroundImage: `url(${eventImg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/70 to-bg-dark/95 z-10"></div>
        <div className="relative z-20 max-w-[850px] animate-fade-in">
          <h1 className="text-white mb-6 font-heading font-extrabold text-[2.5rem] sm:text-[3.5rem] md:text-[4rem] leading-tight">
            Gather, Grow, and Experience{" "}
            <span className="text-gradient-orange">God's Presence</span>
          </h1>
          <p className="max-w-[750px] mx-auto text-[1.1rem] text-text-dimmed leading-relaxed">
            Stay informed about our upcoming conferences, prayer gatherings,
            worship services, and special ministry events. Join us as we grow in
            faith, build meaningful connections, and encounter God together.
          </p>
        </div>
      </header>

      {/* 2. Upcoming Events List */}
      <section className="py-24 bg-bg-dark">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8">
          <h2 className="text-3xl font-heading font-bold mb-10 pb-4 border-b border-white/5 text-text-white">
            Upcoming events
          </h2>

          {loading ? (
            <div className="text-center py-12 text-text-dimmed">Loading events...</div>
          ) : upcomingEvents.length === 0 ? (
            <div className="text-center py-12 text-text-dimmed">No upcoming events scheduled.</div>
          ) : (
            <div className="flex flex-col gap-6">
              {upcomingEvents.map((event) => {
                const isRegistered = registeredEvents.includes(event.id);
                return (
                  <div
                    className="flex flex-col md:flex-row bg-card-dark-lighter rounded-lg overflow-hidden border border-primary/20 transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                    key={event.id}
                  >
                    <div className="w-full md:w-[260px] h-[200px] md:h-auto min-h-[180px] relative shrink-0">
                      <img
                        src={event.image.startsWith('http') || event.image.startsWith('data:') ? event.image : event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-transparent to-card-dark-lighter"></div>
                    </div>
                    <div className="p-6 md:p-8 flex flex-col md:flex-row flex-1 justify-between items-start md:items-center gap-6 md:gap-8">
                      <div className="max-w-[500px]">
                        <div className="font-heading font-bold text-sm text-primary mb-2 flex gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} /> {event.date}
                          </span>
                          {event.time && (
                            <>
                              <span>•</span>
                              <span>{event.time}</span>
                            </>
                          )}
                        </div>
                        <h3 className="text-2xl font-heading font-bold text-text-white mb-2">
                          {event.title}
                        </h3>
                        <p className="text-text-dimmed text-[0.95rem] mb-4 leading-relaxed">
                          {event.description}
                        </p>
                        <div className="flex items-center gap-2 text-text-dimmed text-[0.9rem]">
                          <MapPin size={14} /> <span>{event.location}</span>
                        </div>
                      </div>
                      <div className="flex flex-row md:flex-col gap-3 w-full md:w-[150px] shrink-0">
                        <button
                          onClick={() => handleRegister(event.id)}
                          className={`${isRegistered ? btnSecondaryClass : btnPrimaryClass} w-full`}
                        >
                          {isRegistered ? (
                            <>
                              <Check size={16} /> Registered
                            </>
                          ) : (
                            "Attend"
                          )}
                        </button>
                        <button
                          onClick={() =>
                            alert(
                              `Details for "${event.title}":\nThis hybrid event will take place live at the ${event.location} and stream globally on our media channels. Registration is free.`,
                            )
                          }
                          className={`${btnSecondaryClass} w-full`}
                        >
                          See Details
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

      {/* 3. Past Events */}
      <section className="py-24 bg-bg-black">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8">
          <h2 className="text-3xl font-heading font-bold mb-10 pb-4 border-b border-white/5 text-text-white">
            Past Events
          </h2>

          {loading ? (
            <div className="text-center py-12 text-text-dimmed">Loading events...</div>
          ) : pastEvents.length === 0 ? (
            <div className="text-center py-12 text-text-dimmed">No past events recorded.</div>
          ) : (
            <div className="flex flex-col gap-6">
              {pastEvents.map((event) => (
                <div
                  className="flex flex-col md:flex-row bg-card-dark-lighter rounded-lg overflow-hidden border border-primary/20 transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_10px_30px_rgba(0,0,0,0.4)] opacity-85"
                  key={event.id}
                >
                  <div className="w-full md:w-[260px] h-[200px] md:h-auto min-h-[180px] relative shrink-0">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover grayscale-[30%]"
                    />
                    {/* <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-transparent to-card-dark-lighter"></div> */}
                  </div>
                  <div className="p-6 md:p-8 flex flex-col md:flex-row flex-1 justify-between items-start md:items-center gap-6 md:gap-8">
                    <div className="max-w-[500px]">
                      <div className="font-heading font-bold text-sm text-text-dimmed mb-2">
                        <span>{event.monthYear}</span>
                      </div>
                      <h3 className="text-2xl font-heading font-bold text-text-white mb-2">
                        {event.title}
                      </h3>
                      <p className="text-text-dimmed text-[0.95rem] mb-4 leading-relaxed">
                        {event.description}
                      </p>
                      <div className="flex items-center gap-2 text-text-dimmed text-[0.9rem]">
                        <MapPin size={14} /> <span>{event.location}</span>
                      </div>
                    </div>
                    <div className="flex gap-3 w-full md:w-[150px] shrink-0 justify-center">
                      {event.videoUrl && (
                        <button
                          onClick={() => openVideo(event.videoUrl!)}
                          className={`${btnSecondaryClass} w-full flex gap-2 border-white/20`}
                        >
                          <Play size={14} fill="currentColor" /> View highlights
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Never Miss An Event CTA Banner */}
      <section className="py-24 bg-gradient-to-br from-accent-deep-purple to-bg-dark text-center">
        <div className="w-full max-w-[800px] mx-auto px-6 md:px-8">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-white mb-5 leading-tight">
            NEVER MISS AN EVENT
          </h2>
          <p className="text-text-dimmed mb-10 text-lg leading-relaxed">
            Don't miss the moments that matter. Stay up to date with our latest
            events, conferences, worship gatherings, prayer meetings, and
            biblical teachings. We invite you to journey with us as we continue
            to share God's love, strengthen believers, and impact lives through
            Christ-centered ministry.
          </p>
          <div className="flex justify-center">
            <button
              onClick={async () => {
                const email = prompt(
                  "Enter your email to receive event notifications:",
                );
                if (email) {
                  try {
                    await dbService.subscribeNewsletter(email);
                    alert(`Thank you! ${email} has been subscribed to Event Alerts.`);
                  } catch (err) {
                    console.error('Subscription error:', err);
                  }
                }
              }}
              className={btnPrimaryClass}
            >
              Subscribe now <ArrowRight size={16} />
            </button>
          </div>
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
              aria-label="Close highlights player"
            >
              <X size={24} />
            </button>
            <div className="relative pb-[56.25%] h-0">
              <iframe
                src={activeVideo}
                title="Highlights Player"
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
