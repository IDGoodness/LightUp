import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Mail, LogOut, Plus, Trash2, Edit2, Users, FileText, CheckCircle } from 'lucide-react';
import { dbService } from '../services/db';
import type { ContactSubmission, NewsletterSubscriber, EventRegistration } from '../services/db';
import type { Sermon, ChurchEvent, GalleryItem } from '../data/mockData';
import homepageImg from '../assets/homepage.jpg';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab: 'submissions' | 'events' | 'sermons' | 'gallery'
  const [activeTab, setActiveTab] = useState<'submissions' | 'events' | 'sermons' | 'gallery'>('submissions');

  // Database Data States
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [events, setEvents] = useState<ChurchEvent[]>([]);
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);

  // Loading States
  const [dataLoading, setDataLoading] = useState(false);

  // Form Modals / Edit States
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<ChurchEvent | null>(null);
  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    image: homepageImg,
    isUpcoming: true,
    monthYear: ''
  });

  const [isSermonModalOpen, setIsSermonModalOpen] = useState(false);
  const [editingSermon, setEditingSermon] = useState<Sermon | null>(null);
  const [sermonForm, setSermonForm] = useState({
    title: '',
    speaker: '',
    date: '',
    duration: '',
    thumbnail: homepageImg,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  });

  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    image: homepageImg,
    aspectRatio: 'horizontal' as 'horizontal' | 'vertical' | 'square'
  });

  const [viewingRegistrationsEventId, setViewingRegistrationsEventId] = useState<string | null>(null);

  // Auth checking on load
  useEffect(() => {
    const checkAuth = async () => {
      const auth = await dbService.isAdminAuthenticated();
      setIsAuthenticated(auth);
      setAuthChecking(false);
    };
    checkAuth();
  }, []);

  // Fetch data when authenticated or tab changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, activeTab]);

  const fetchData = async () => {
    setDataLoading(true);
    try {
      if (activeTab === 'submissions') {
        const subs = await dbService.getContactSubmissions();
        const news = await dbService.getNewsletterSubscribers();
        setSubmissions(subs);
        setSubscribers(news);
      } else if (activeTab === 'events') {
        const evs = await dbService.getEvents();
        const regs = await dbService.getEventRegistrations();
        setEvents(evs);
        setRegistrations(regs);
      } else if (activeTab === 'sermons') {
        const sers = await dbService.getSermons();
        setSermons(sers);
      } else if (activeTab === 'gallery') {
        const gals = await dbService.getGalleryItems();
        setGallery(gals);
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setDataLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const res = await dbService.loginAdmin(email, password);
    if (res.success) {
      setIsAuthenticated(true);
    } else {
      setAuthError(res.error || 'Authentication failed.');
    }
  };

  const handleLogout = async () => {
    await dbService.logoutAdmin();
    setIsAuthenticated(false);
  };

  // --- EVENT CRUD ---
  const openNewEventModal = () => {
    setEditingEvent(null);
    setEventForm({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      image: homepageImg,
      isUpcoming: true,
      monthYear: ''
    });
    setIsEventModalOpen(true);
  };

  const openEditEventModal = (event: ChurchEvent) => {
    setEditingEvent(event);
    setEventForm({
      title: event.title,
      date: event.date,
      time: event.time || '',
      location: event.location,
      description: event.description,
      image: event.image,
      isUpcoming: event.isUpcoming,
      monthYear: event.monthYear || ''
    });
    setIsEventModalOpen(true);
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        await dbService.updateEvent(editingEvent.id, eventForm);
      } else {
        await dbService.createEvent(eventForm);
      }
      setIsEventModalOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Failed to save event.');
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      await dbService.deleteEvent(id);
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Failed to delete event.');
    }
  };

  // --- SERMON CRUD ---
  const openNewSermonModal = () => {
    setEditingSermon(null);
    setSermonForm({
      title: '',
      speaker: '',
      date: '',
      duration: '',
      thumbnail: homepageImg,
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    });
    setIsSermonModalOpen(true);
  };

  const openEditSermonModal = (sermon: Sermon) => {
    setEditingSermon(sermon);
    setSermonForm({
      title: sermon.title,
      speaker: sermon.speaker,
      date: sermon.date,
      duration: sermon.duration,
      thumbnail: sermon.thumbnail,
      videoUrl: sermon.videoUrl
    });
    setIsSermonModalOpen(true);
  };

  const handleSermonSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingSermon) {
        await dbService.updateSermon(editingSermon.id, sermonForm);
      } else {
        await dbService.createSermon(sermonForm);
      }
      setIsSermonModalOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Failed to save sermon.');
    }
  };

  const handleDeleteSermon = async (id: string) => {
    if (!confirm('Are you sure you want to delete this sermon?')) return;
    try {
      await dbService.deleteSermon(id);
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Failed to delete sermon.');
    }
  };

  // --- GALLERY CRUD ---
  const handleGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dbService.createGalleryItem(galleryForm);
      setIsGalleryModalOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Failed to add photo.');
    }
  };

  const handleDeleteGalleryItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this photo from the gallery?')) return;
    try {
      await dbService.deleteGalleryItem(id);
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Failed to delete photo.');
    }
  };

  // --- VIEWS ---
  if (authChecking) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center text-text-dimmed">
        Loading admin workspace...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0e031c] flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[450px] bg-[#150a24] border border-primary/20 rounded-2xl p-8 shadow-2xl animate-fade-in text-white">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading font-extrabold mb-2 text-white">
              ADMIN CONTROL
            </h1>
            <p className="text-sm text-text-dimmed leading-relaxed">
              Login to manage events, sermons, and form submissions.
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {authError && (
              <div className="bg-red-500/10 border border-red-500/25 text-red-400 p-3 rounded-lg text-sm text-center">
                {authError}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-text-dimmed uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                required
                className="bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm w-full text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                placeholder="admin@lightup.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-text-dimmed uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                required
                className="bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm w-full text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="mt-4 py-3 rounded-full font-heading font-semibold bg-primary text-white shadow-[0_4px_12px_rgba(140,82,255,0.3)] hover:bg-primary-hover hover:shadow-[0_6px_18px_rgba(140,82,255,0.5)] transition-all cursor-pointer"
            >
              Sign In
            </button>
          </form>
          <div className="text-center mt-6 text-xs text-text-dimmed">
            No Supabase configured? Use <code className="text-primary font-bold">admin@lightup.org</code> and <code className="text-primary font-bold">admin123</code>.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-dark text-text-white flex flex-col font-body">
      {/* Header bar */}
      <header className="bg-[#150a24]/90 backdrop-blur-md border-b border-white/5 h-20 flex justify-between items-center px-6 md:px-12 sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-primary flex items-center justify-center rounded-xl font-heading font-bold text-white text-xl">
            L
          </div>
          <div>
            <h1 className="text-lg font-heading font-bold text-white tracking-wider">LIGHT-UP ADMINISTRATION</h1>
            <span className="text-xs text-text-dimmed font-medium">Control Board</span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full text-sm text-text-dimmed hover:bg-white/5 hover:text-white cursor-pointer transition-all"
        >
          <LogOut size={14} /> Log out
        </button>
      </header>

      {/* Main Workspace layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-card-dark border-r border-white/5 p-6 flex flex-col gap-2">
          <button
            onClick={() => setActiveTab('submissions')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all cursor-pointer w-full text-left ${
              activeTab === 'submissions'
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : 'text-text-dimmed hover:bg-white/5 hover:text-white'
            }`}
          >
            <Mail size={16} /> Submissions & Subscribers
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all cursor-pointer w-full text-left ${
              activeTab === 'events'
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : 'text-text-dimmed hover:bg-white/5 hover:text-white'
            }`}
          >
            <Calendar size={16} /> Events Manager
          </button>
          <button
            onClick={() => setActiveTab('sermons')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all cursor-pointer w-full text-left ${
              activeTab === 'sermons'
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : 'text-text-dimmed hover:bg-white/5 hover:text-white'
            }`}
          >
            <FileText size={16} /> Sermons Library
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all cursor-pointer w-full text-left ${
              activeTab === 'gallery'
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : 'text-text-dimmed hover:bg-white/5 hover:text-white'
            }`}
          >
            <Plus size={16} /> Gallery Album
          </button>
        </aside>

        {/* Content Body */}
        <main className="flex-1 p-6 md:p-12 overflow-x-hidden">
          {dataLoading ? (
            <div className="text-center py-24 text-text-dimmed">Syncing content workspace...</div>
          ) : (
            <>
              {/* Tab 1: Submissions & Subscribers */}
              {activeTab === 'submissions' && (
                <div className="flex flex-col gap-10 animate-fade-in">
                  <div>
                    <h2 className="text-2xl font-heading font-bold mb-6">Contact & Prayer Inquiries</h2>
                    {submissions.length === 0 ? (
                      <div className="bg-card-dark p-8 text-center rounded-xl border border-white/5 text-text-dimmed text-sm">
                        No contact submissions received yet.
                      </div>
                    ) : (
                      <div className="overflow-x-auto bg-card-dark border border-white/5 rounded-xl">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-white/5 text-xs text-text-dimmed uppercase tracking-wider font-semibold bg-white/5">
                              <th className="p-4">Name</th>
                              <th className="p-4">Email</th>
                              <th className="p-4">Message</th>
                              <th className="p-4">Received At</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 text-sm">
                            {submissions.map((sub) => (
                              <tr key={sub.id} className="hover:bg-white/2 transition-colors">
                                <td className="p-4 font-bold text-white">{sub.name}</td>
                                <td className="p-4 text-primary font-medium">{sub.email}</td>
                                <td className="p-4 max-w-[400px] whitespace-pre-wrap leading-relaxed text-text-dimmed">{sub.message}</td>
                                <td className="p-4 text-xs text-text-dimmed">{new Date(sub.created_at).toLocaleString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  <div>
                    <h2 className="text-2xl font-heading font-bold mb-6">Newsletter Subscribers</h2>
                    {subscribers.length === 0 ? (
                      <div className="bg-card-dark p-8 text-center rounded-xl border border-white/5 text-text-dimmed text-sm">
                        No email subscribers recorded.
                      </div>
                    ) : (
                      <div className="max-w-[500px] overflow-x-auto bg-card-dark border border-white/5 rounded-xl">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-white/5 text-xs text-text-dimmed uppercase tracking-wider font-semibold bg-white/5">
                              <th className="p-4">Subscriber Email</th>
                              <th className="p-4">Subscribed At</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 text-sm">
                            {subscribers.map((sub) => (
                              <tr key={sub.id} className="hover:bg-white/2">
                                <td className="p-4 font-bold text-white">{sub.email}</td>
                                <td className="p-4 text-xs text-text-dimmed">{new Date(sub.created_at).toLocaleDateString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 2: Events */}
              {activeTab === 'events' && (
                <div className="flex flex-col gap-6 animate-fade-in">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-heading font-bold">Manage Calendar Events</h2>
                    <button
                      onClick={openNewEventModal}
                      className="flex items-center gap-2 bg-primary hover:bg-primary-hover px-4 py-2 rounded-full text-sm font-semibold cursor-pointer transition-all"
                    >
                      <Plus size={16} /> Add Event
                    </button>
                  </div>

                  {events.length === 0 ? (
                    <div className="bg-card-dark p-8 text-center rounded-xl border border-white/5 text-text-dimmed text-sm">
                      No events registered in system.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {events.map((event) => {
                        const eventRegs = registrations.filter(r => r.event_id === event.id);
                        return (
                          <div
                            key={event.id}
                            className="bg-card-dark border border-white/5 rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                          >
                            <div className="flex items-start gap-4">
                              <img
                                src={event.image}
                                alt=""
                                className="h-16 w-16 object-cover rounded-lg shrink-0"
                              />
                              <div>
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                  event.isUpcoming ? 'bg-green-500/10 text-green-400' : 'bg-white/10 text-text-dimmed'
                                }`}>
                                  {event.isUpcoming ? 'Upcoming' : 'Past'}
                                </span>
                                <h3 className="text-lg font-bold text-white mt-1.5">{event.title}</h3>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-dimmed mt-1">
                                  {event.isUpcoming ? (
                                    <>
                                      <span className="flex items-center gap-1"><Calendar size={12} /> {event.date}</span>
                                      <span className="flex items-center gap-1"><Clock size={12} /> {event.time}</span>
                                    </>
                                  ) : (
                                    <span>Month: {event.monthYear}</span>
                                  )}
                                  <span className="flex items-center gap-1"><MapPin size={12} /> {event.location}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 w-full md:w-auto shrink-0 justify-end">
                              {event.isUpcoming && (
                                <button
                                  onClick={() => setViewingRegistrationsEventId(viewingRegistrationsEventId === event.id ? null : event.id)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 border border-primary/20 rounded-lg text-xs font-semibold text-primary hover:bg-primary/5 transition-all cursor-pointer"
                                >
                                  <Users size={12} /> RSVPs ({eventRegs.length})
                                </button>
                              )}
                              <button
                                onClick={() => openEditEventModal(event)}
                                className="p-2 border border-white/10 rounded-lg text-text-dimmed hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                              >
                                <Edit2 size={14} />
                              </button>
                              <button
                                onClick={() => handleDeleteEvent(event.id)}
                                className="p-2 border border-red-500/10 rounded-lg text-red-400 hover:bg-red-500/5 transition-all cursor-pointer"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Registered RSVP List for Selected Event */}
                  {viewingRegistrationsEventId && (
                    <div className="mt-6 bg-card-dark p-6 rounded-xl border border-primary/20 animate-fade-in">
                      <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
                        <h3 className="font-bold text-white">
                          Attendees for: {events.find(e => e.id === viewingRegistrationsEventId)?.title}
                        </h3>
                        <button
                          onClick={() => setViewingRegistrationsEventId(null)}
                          className="text-xs text-text-dimmed hover:text-white cursor-pointer"
                        >
                          Close List
                        </button>
                      </div>
                      {registrations.filter(r => r.event_id === viewingRegistrationsEventId).length === 0 ? (
                        <div className="text-sm text-text-dimmed">No attendee RSVPs submitted.</div>
                      ) : (
                        <div className="flex flex-col gap-2.5">
                          {registrations
                            .filter(r => r.event_id === viewingRegistrationsEventId)
                            .map((reg) => (
                              <div key={reg.id} className="flex justify-between items-center text-sm py-1">
                                <span className="font-semibold text-white">{reg.name}</span>
                                <span className="text-primary font-medium text-xs">{reg.email}</span>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Sermons */}
              {activeTab === 'sermons' && (
                <div className="flex flex-col gap-6 animate-fade-in">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-heading font-bold">Manage Sermon Library</h2>
                    <button
                      onClick={openNewSermonModal}
                      className="flex items-center gap-2 bg-primary hover:bg-primary-hover px-4 py-2 rounded-full text-sm font-semibold cursor-pointer transition-all"
                    >
                      <Plus size={16} /> Add Sermon
                    </button>
                  </div>

                  {sermons.length === 0 ? (
                    <div className="bg-card-dark p-8 text-center rounded-xl border border-white/5 text-text-dimmed text-sm">
                      No sermons recorded in library.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {sermons.map((sermon) => (
                        <div
                          key={sermon.id}
                          className="bg-card-dark border border-white/5 rounded-xl p-5 flex items-start justify-between gap-4"
                        >
                          <div className="flex items-start gap-4">
                            <img
                              src={sermon.thumbnail}
                              alt=""
                              className="h-16 w-24 object-cover rounded-lg shrink-0 border border-white/5 bg-black"
                            />
                            <div>
                              <h3 className="font-bold text-white line-clamp-1 leading-snug">{sermon.title}</h3>
                              <span className="text-xs text-accent-orange block mt-1">Speaker: {sermon.speaker}</span>
                              <div className="flex gap-3 text-[10px] text-text-dimmed mt-1">
                                <span>{sermon.date}</span>
                                <span>•</span>
                                <span>{sermon.duration}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 shrink-0">
                            <button
                              onClick={() => openEditSermonModal(sermon)}
                              className="p-2 border border-white/10 rounded-lg text-text-dimmed hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                            >
                              <Edit2 size={13} />
                            </button>
                            <button
                              onClick={() => handleDeleteSermon(sermon.id)}
                              className="p-2 border border-red-500/10 rounded-lg text-red-400 hover:bg-red-500/5 transition-all cursor-pointer"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 4: Gallery */}
              {activeTab === 'gallery' && (
                <div className="flex flex-col gap-6 animate-fade-in">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-heading font-bold">Manage Gallery Images</h2>
                    <button
                      onClick={() => setIsGalleryModalOpen(true)}
                      className="flex items-center gap-2 bg-primary hover:bg-primary-hover px-4 py-2 rounded-full text-sm font-semibold cursor-pointer transition-all"
                    >
                      <Plus size={16} /> Upload Photo
                    </button>
                  </div>

                  {gallery.length === 0 ? (
                    <div className="bg-card-dark p-8 text-center rounded-xl border border-white/5 text-text-dimmed text-sm">
                      No gallery photos found.
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                      {gallery.map((item) => (
                        <div
                          key={item.id}
                          className="bg-card-dark border border-white/5 rounded-xl overflow-hidden shadow-lg relative group"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-40 object-cover"
                          />
                          <div className="p-3 flex justify-between items-center gap-2">
                            <span className="text-xs font-semibold truncate text-white leading-none">{item.title}</span>
                            <button
                              onClick={() => handleDeleteGalleryItem(item.id)}
                              className="p-1.5 border border-red-500/10 rounded-lg text-red-400 hover:bg-red-500/5 transition-all cursor-pointer shrink-0"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* --- FORM MODALS --- */}

      {/* Event Modal */}
      {isEventModalOpen && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-[#150a24] border border-primary/20 rounded-2xl w-full max-w-[550px] p-8 shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto text-white">
            <h3 className="text-2xl font-heading font-extrabold mb-6">
              {editingEvent ? 'Edit Calendar Event' : 'Schedule New Event'}
            </h3>
            <form onSubmit={handleEventSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-dimmed uppercase">Event Title</label>
                <input
                  type="text"
                  required
                  className="bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/10 transition-all"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  placeholder="Sunday Convergence Service"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-text-dimmed uppercase">Date Line</label>
                  <input
                    type="text"
                    required
                    className="bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    placeholder="Sun, 18 Oct"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-text-dimmed uppercase">Time Line</label>
                  <input
                    type="text"
                    className="bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                    value={eventForm.time}
                    onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                    placeholder="9:00 AM"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-dimmed uppercase">Location</label>
                <input
                  type="text"
                  required
                  className="bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                  value={eventForm.location}
                  onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                  placeholder="Main Hall / Prayer Office"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-dimmed uppercase">Event Status</label>
                <div className="flex gap-6 mt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="radio"
                      checked={eventForm.isUpcoming === true}
                      onChange={() => setEventForm({ ...eventForm, isUpcoming: true })}
                      className="accent-primary"
                    />
                    Upcoming
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="radio"
                      checked={eventForm.isUpcoming === false}
                      onChange={() => setEventForm({ ...eventForm, isUpcoming: false })}
                      className="accent-primary"
                    />
                    Past Event
                  </label>
                </div>
              </div>

              {!eventForm.isUpcoming && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-text-dimmed uppercase">Month & Year (For Past Events)</label>
                  <input
                    type="text"
                    required={!eventForm.isUpcoming}
                    className="bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                    value={eventForm.monthYear}
                    onChange={(e) => setEventForm({ ...eventForm, monthYear: e.target.value })}
                    placeholder="June 2026"
                  />
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-dimmed uppercase">Description / Details</label>
                <textarea
                  required
                  rows={3}
                  className="bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white focus:outline-none focus:border-primary resize-y"
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  placeholder="Enter short event detail summary..."
                ></textarea>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-dimmed uppercase">Cover Image (URL or path)</label>
                <input
                  type="text"
                  required
                  className="bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white focus:outline-none"
                  value={eventForm.image}
                  onChange={(e) => setEventForm({ ...eventForm, image: e.target.value })}
                />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsEventModalOpen(false)}
                  className="px-5 py-2.5 border border-white/10 rounded-full text-sm text-text-dimmed hover:text-white transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-primary hover:bg-primary-hover rounded-full text-sm font-semibold text-white shadow-lg transition-all cursor-pointer"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sermon Modal */}
      {isSermonModalOpen && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-[#150a24] border border-primary/20 rounded-2xl w-full max-w-[550px] p-8 shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto text-white">
            <h3 className="text-2xl font-heading font-extrabold mb-6">
              {editingSermon ? 'Edit Sermon Details' : 'Register New Sermon'}
            </h3>
            <form onSubmit={handleSermonSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-dimmed uppercase">Sermon Title</label>
                <input
                  type="text"
                  required
                  className="bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white focus:outline-none"
                  value={sermonForm.title}
                  onChange={(e) => setSermonForm({ ...sermonForm, title: e.target.value })}
                  placeholder="Building your life by the Word"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-dimmed uppercase">Preacher / Speaker</label>
                <input
                  type="text"
                  required
                  className="bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white focus:outline-none"
                  value={sermonForm.speaker}
                  onChange={(e) => setSermonForm({ ...sermonForm, speaker: e.target.value })}
                  placeholder="Julianah Olu-Ajadi"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-text-dimmed uppercase">Release Date</label>
                  <input
                    type="text"
                    required
                    className="bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white focus:outline-none"
                    value={sermonForm.date}
                    onChange={(e) => setSermonForm({ ...sermonForm, date: e.target.value })}
                    placeholder="01.07.2026"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-text-dimmed uppercase">Duration</label>
                  <input
                    type="text"
                    required
                    className="bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white focus:outline-none"
                    value={sermonForm.duration}
                    onChange={(e) => setSermonForm({ ...sermonForm, duration: e.target.value })}
                    placeholder="17:13 mins"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-dimmed uppercase">Video Stream URL (YouTube Embed Link)</label>
                <input
                  type="text"
                  required
                  className="bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white focus:outline-none"
                  value={sermonForm.videoUrl}
                  onChange={(e) => setSermonForm({ ...sermonForm, videoUrl: e.target.value })}
                  placeholder="https://www.youtube.com/embed/..."
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-dimmed uppercase">Thumbnail Image (URL or path)</label>
                <input
                  type="text"
                  required
                  className="bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white focus:outline-none"
                  value={sermonForm.thumbnail}
                  onChange={(e) => setSermonForm({ ...sermonForm, thumbnail: e.target.value })}
                />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsSermonModalOpen(false)}
                  className="px-5 py-2.5 border border-white/10 rounded-full text-sm text-text-dimmed hover:text-white transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-primary hover:bg-primary-hover rounded-full text-sm font-semibold text-white shadow-lg transition-all cursor-pointer"
                >
                  Save Sermon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Modal */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-[#150a24] border border-primary/20 rounded-2xl w-full max-w-[450px] p-8 shadow-2xl animate-fade-in text-white">
            <h3 className="text-2xl font-heading font-extrabold mb-6">
              Add Photo to Gallery
            </h3>
            <form onSubmit={handleGallerySubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-dimmed uppercase">Photo Title / Caption</label>
                <input
                  type="text"
                  required
                  className="bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white focus:outline-none"
                  value={galleryForm.title}
                  onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                  placeholder="Worship Convergence"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-dimmed uppercase">Image URL or path</label>
                <input
                  type="text"
                  required
                  className="bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white focus:outline-none"
                  value={galleryForm.image}
                  onChange={(e) => setGalleryForm({ ...galleryForm, image: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-dimmed uppercase">Aspect Ratio Layout</label>
                <select
                  className="bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white focus:outline-none focus:bg-[#150a24]"
                  value={galleryForm.aspectRatio}
                  onChange={(e) => setGalleryForm({ ...galleryForm, aspectRatio: e.target.value as any })}
                >
                  <option value="horizontal">Horizontal (Landscape)</option>
                  <option value="vertical">Vertical (Portrait)</option>
                  <option value="square">Square</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsGalleryModalOpen(false)}
                  className="px-5 py-2.5 border border-white/10 rounded-full text-sm text-text-dimmed hover:text-white transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-primary hover:bg-primary-hover rounded-full text-sm font-semibold text-white shadow-lg transition-all cursor-pointer"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
