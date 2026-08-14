import { useState, useEffect } from 'react';
import { Calendar, MapPin, Play, X, Check, ArrowRight, User, Mail, Sparkles, Clock, Info } from 'lucide-react';
import eventImg from '../assets/events.jpg';
import { dbService } from '../services/db';
import type { ChurchEvent } from '../data/churchData';

export default function Events() {
  const [eventsList, setEventsList] = useState<ChurchEvent[]>([]);
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Registration Modal State
  const [selectedEventForReg, setSelectedEventForReg] = useState<ChurchEvent | null>(null);
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regLoading, setRegLoading] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);
  const [regError, setRegError] = useState('');

  // Event Details Modal State
  const [selectedEventForDetails, setSelectedEventForDetails] = useState<ChurchEvent | null>(null);

  // Never Miss An Event CTA State
  const [ctaEmail, setCtaEmail] = useState('');
  const [ctaLoading, setCtaLoading] = useState(false);
  const [ctaSuccess, setCtaSuccess] = useState(false);
  const [ctaError, setCtaError] = useState('');

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

  const openRegModal = (event: ChurchEvent) => {
    setSelectedEventForReg(event);
    setRegName('');
    setRegEmail('');
    setRegError('');
    setRegSuccess(false);
  };

  const closeRegModal = () => {
    setSelectedEventForReg(null);
    setRegError('');
    setRegSuccess(false);
  };

  const handleRegSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEventForReg) return;
    if (!regName.trim() || !regEmail.trim()) {
      setRegError('Please provide both your name and email address.');
      return;
    }

    setRegLoading(true);
    setRegError('');

    try {
      await dbService.registerForEvent(selectedEventForReg.id, regName.trim(), regEmail.trim());
      setRegisteredEvents(prev => [...prev, selectedEventForReg.id]);
      setRegSuccess(true);
      setTimeout(() => {
        closeRegModal();
      }, 2000);
    } catch (err: any) {
      console.error('Registration error:', err);
      setRegError(err?.message || 'Failed to register. Please try again.');
    } finally {
      setRegLoading(false);
    }
  };

  const handleCtaSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ctaEmail.trim()) return;

    setCtaLoading(true);
    setCtaError('');
    setCtaSuccess(false);

    try {
      await dbService.subscribeNewsletter(ctaEmail.trim());
      setCtaSuccess(true);
      setCtaEmail('');
      setTimeout(() => setCtaSuccess(false), 5000);
    } catch (err: any) {
      setCtaError(err?.message || 'Failed to subscribe. Please try again.');
    } finally {
      setCtaLoading(false);
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
                    className="flex flex-col md:flex-row bg-card-dark-lighter rounded-2xl overflow-hidden border border-primary/20 transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                    key={event.id}
                  >
                    <div className="w-full md:w-[260px] h-[200px] md:h-auto min-h-[180px] relative shrink-0">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-transparent to-card-dark-lighter/40"></div>
                    </div>
                    <div className="p-6 md:p-8 flex flex-col md:flex-row flex-1 justify-between items-start md:items-center gap-6 md:gap-8">
                      <div className="max-w-[500px]">
                        <div className="font-heading font-bold text-sm text-primary mb-2 flex flex-wrap gap-2 items-center">
                          <span className="flex items-center gap-1.5 bg-primary/20 text-purple-300 px-3 py-1 rounded-full text-xs font-semibold">
                            <Calendar size={13} /> {event.date}
                          </span>
                          {event.time && (
                            <span className="flex items-center gap-1 bg-white/10 text-white px-3 py-1 rounded-full text-xs">
                              <Clock size={13} /> {event.time}
                            </span>
                          )}
                        </div>
                        <h3 className="text-2xl font-heading font-bold text-text-white mb-2">
                          {event.title}
                        </h3>
                        <p className="text-text-dimmed text-[0.95rem] mb-4 leading-relaxed line-clamp-2">
                          {event.description}
                        </p>
                        <div className="flex items-center gap-2 text-text-dimmed text-[0.9rem]">
                          <MapPin size={14} className="text-accent-orange" /> <span>{event.location}</span>
                        </div>
                      </div>
                      <div className="flex flex-row md:flex-col gap-3 w-full md:w-[160px] shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            if (isRegistered) {
                              setRegisteredEvents(prev => prev.filter(id => id !== event.id));
                            } else {
                              openRegModal(event);
                            }
                          }}
                          className={`${isRegistered ? 'bg-green-600/20 text-green-400 rounded-full p-3 border border-green-500/40 hover:bg-green-600/30' : btnPrimaryClass} w-full`}
                        >
                          {isRegistered ? (
                            <span className="flex items-center justify-center gap-1.5 font-bold text-xs">
                              <Check size={15} /> Registered
                            </span>
                          ) : (
                            "Attend Event"
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedEventForDetails(event)}
                          className={`${btnSecondaryClass} w-full text-xs`}
                        >
                          <Info size={14} /> See Details
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
            Past Events & Conferences
          </h2>

          {loading ? (
            <div className="text-center py-12 text-text-dimmed">Loading events...</div>
          ) : pastEvents.length === 0 ? (
            <div className="text-center py-12 text-text-dimmed">No past events recorded.</div>
          ) : (
            <div className="flex flex-col gap-6">
              {pastEvents.map((event) => (
                <div
                  className="flex flex-col md:flex-row bg-card-dark-lighter rounded-2xl overflow-hidden border border-primary/20 transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_10px_30px_rgba(0,0,0,0.4)] opacity-90"
                  key={event.id}
                >
                  <div className="w-full md:w-[260px] h-[200px] md:h-auto min-h-[180px] relative shrink-0">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:p-8 flex flex-col md:flex-row flex-1 justify-between items-start md:items-center gap-6 md:gap-8">
                    <div className="max-w-[500px]">
                      <div className="font-heading font-bold text-xs text-accent-orange mb-2 uppercase tracking-wider">
                        <span>{event.monthYear}</span>
                      </div>
                      <h3 className="text-2xl font-heading font-bold text-text-white mb-2">
                        {event.title}
                      </h3>
                      <p className="text-text-dimmed text-[0.95rem] mb-4 leading-relaxed">
                        {event.description}
                      </p>
                      <div className="flex items-center gap-2 text-text-dimmed text-[0.9rem]">
                        <MapPin size={14} className="text-primary" /> <span>{event.location}</span>
                      </div>
                    </div>
                    <div className="flex gap-3 w-full md:w-[160px] shrink-0 justify-center">
                      {event.videoUrl && (
                        <button
                          type="button"
                          onClick={() => openVideo(event.videoUrl!)}
                          className={`${btnSecondaryClass} w-full flex gap-2 border-white/20 text-xs`}
                        >
                          <Play size={14} fill="currentColor" /> View Highlights
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

      {/* 4. Never Miss An Event CTA Banner with clean Inline Form */}
      <section className="py-24 bg-gradient-to-br from-accent-deep-purple to-bg-dark text-center relative overflow-hidden">
        <div className="w-full max-w-[800px] mx-auto px-6 md:px-8 relative z-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-purple-300 text-xs font-semibold mb-6">
            <Sparkles size={14} /> Stay Connected
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-white mb-5 leading-tight">
            NEVER MISS AN EVENT
          </h2>
          <p className="text-text-dimmed mb-10 text-base sm:text-lg leading-relaxed max-w-[650px] mx-auto">
            Stay up to date with our latest conferences, prayer retreats, and ministry gatherings. Receive direct reminders so you never miss a moment of spiritual growth.
          </p>

          <form onSubmit={handleCtaSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-[520px] mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
              <input
                type="email"
                placeholder="Enter your email address..."
                value={ctaEmail}
                onChange={(e) => setCtaEmail(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3.5 bg-black/50 border border-white/20 rounded-full text-white placeholder-white/40 text-sm focus:outline-none focus:border-primary transition-all shadow-inner"
              />
            </div>
            <button
              type="submit"
              disabled={ctaLoading}
              className={`${btnPrimaryClass} px-8 py-3.5 whitespace-nowrap shadow-lg`}
            >
              {ctaLoading ? 'Subscribing...' : (
                <>
                  Subscribe Now <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {ctaSuccess && (
            <div className="mt-4 p-3 bg-green-500/20 border border-green-500/40 rounded-xl text-green-300 text-xs max-w-[520px] mx-auto animate-fade-in flex items-center justify-center gap-2">
              <Check size={16} /> You're subscribed! We'll notify you of upcoming events.
            </div>
          )}
          {ctaError && (
            <div className="mt-4 p-3 bg-red-500/20 border border-red-500/40 rounded-xl text-red-300 text-xs max-w-[520px] mx-auto animate-fade-in">
              {ctaError}
            </div>
          )}
        </div>
      </section>

      {/* --- EVENT REGISTRATION MODAL --- */}
      {selectedEventForReg && (
        <div
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-[3000] flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={closeRegModal}
        >
          <div
            className="bg-[#120824] border border-primary/30 rounded-3xl max-w-[500px] w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-purple-300 text-xs font-semibold mb-2">
                  Event RSVP
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
                  {selectedEventForReg.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeRegModal}
                className="p-2 text-white/50 hover:text-white rounded-full hover:bg-white/10 transition-all cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Event Summary Pill */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6 flex flex-col gap-2 text-xs text-text-dimmed">
              <div className="flex items-center gap-2 text-white font-medium">
                <Calendar size={14} className="text-primary" /> {selectedEventForReg.date} {selectedEventForReg.time && `• ${selectedEventForReg.time}`}
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-accent-orange" /> {selectedEventForReg.location}
              </div>
            </div>

            {/* Registration Form */}
            {regSuccess ? (
              <div className="py-8 text-center animate-fade-in">
                <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/40 animate-bounce">
                  <Check size={32} />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Registration Confirmed!</h4>
                <p className="text-sm text-text-dimmed max-w-[320px] mx-auto">
                  We look forward to seeing you at {selectedEventForReg.title}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegSubmit} className="flex flex-col gap-4">
                {regError && (
                  <div className="p-3 bg-red-500/20 border border-red-500/40 rounded-xl text-red-300 text-xs">
                    {regError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-text-dimmed mb-1.5 uppercase tracking-wider">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                    <input
                      type="text"
                      placeholder="e.g. Grace Johnson"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      required
                      className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-dimmed mb-1.5 uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                    <input
                      type="email"
                      placeholder="e.g. grace@example.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      required
                      className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={regLoading}
                  className="w-full mt-2 py-3.5 bg-primary hover:bg-primary-hover text-white font-heading font-semibold rounded-xl transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2"
                >
                  {regLoading ? 'Registering...' : (
                    <>
                      Confirm Attendance <Check size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* --- EVENT DETAILS MODAL --- */}
      {selectedEventForDetails && (
        <div
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-[3000] flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={() => setSelectedEventForDetails(null)}
        >
          <div
            className="bg-[#120824] border border-primary/30 rounded-3xl max-w-[550px] w-full overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-48 sm:h-56 w-full">
              <img
                src={selectedEventForDetails.image}
                alt={selectedEventForDetails.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120824] via-black/40 to-transparent"></div>
              <button
                type="button"
                onClick={() => setSelectedEventForDetails(null)}
                className="absolute top-4 right-4 p-2 bg-black/60 text-white rounded-full hover:bg-black/80 transition-all cursor-pointer z-10"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-purple-300 text-xs font-semibold">
                  <Calendar size={13} /> {selectedEventForDetails.date} {selectedEventForDetails.time && `• ${selectedEventForDetails.time}`}
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs">
                  <MapPin size={13} className="text-accent-orange" /> {selectedEventForDetails.location}
                </span>
              </div>

              <h3 className="text-2xl font-heading font-bold text-white mb-3">
                {selectedEventForDetails.title}
              </h3>

              <p className="text-text-dimmed text-sm leading-relaxed mb-6">
                {selectedEventForDetails.description}
              </p>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-text-dimmed mb-6">
                <strong>Format:</strong> Hybrid Event (In-Person & Online Live Stream). Admission is free and open to all believers.
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const event = selectedEventForDetails;
                    setSelectedEventForDetails(null);
                    openRegModal(event);
                  }}
                  className={`${btnPrimaryClass} flex-1 py-3`}
                >
                  Register Now
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedEventForDetails(null)}
                  className={`${btnSecondaryClass} px-5 py-3`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
