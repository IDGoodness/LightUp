import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Mail, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit2, 
  Users, 
  FileText, 
  Image as ImageIcon,
  X,
  FileSpreadsheet,
  RefreshCw
} from 'lucide-react';
import { dbService } from '../services/db';
import type { ContactSubmission, NewsletterSubscriber, EventRegistration } from '../services/db';
import type { Sermon, ChurchEvent, GalleryItem } from '../data/mockData';
import homepageImg from '../assets/homepage.jpg';
import logo from '../assets/logo.png';

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
    monthYear: '',
    videoUrl: ''
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
  const [eventImagePreview, setEventImagePreview] = useState<string>('');
  const [eventDateRaw, setEventDateRaw] = useState<string>('');   // YYYY-MM-DD for date picker
  const [eventTimeRaw, setEventTimeRaw] = useState<string>('');   // HH:MM for time picker
  const eventImageInputRef = useRef<HTMLInputElement>(null);

  // Sermon-specific UI state
  const [sermonThumbnailPreview, setSermonThumbnailPreview] = useState<string>('');
  const [sermonDateRaw, setSermonDateRaw] = useState<string>('');
  const sermonThumbnailInputRef = useRef<HTMLInputElement>(null);

  // Gallery-specific UI state
  const [galleryImagePreview, setGalleryImagePreview] = useState<string>('');
  const galleryImageInputRef = useRef<HTMLInputElement>(null);

  // Modal feedback states
  const [modalSubmitting, setModalSubmitting] = useState(false);
  const [modalError, setModalError] = useState<string>('');
  const [modalSuccess, setModalSuccess] = useState<string>('');

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
      setAuthError(res.error || 'Authentication failed. Please check credentials.');
    }
  };

  const handleLogout = async () => {
    await dbService.logoutAdmin();
    setIsAuthenticated(false);
  };

  // --- EVENT CRUD ---
  const openNewEventModal = () => {
    setEditingEvent(null);
    setEventImagePreview('');
    setEventDateRaw('');
    setEventTimeRaw('');
    setEventForm({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      image: homepageImg,
      isUpcoming: true,
      monthYear: '',
      videoUrl: ''
    });
    setIsEventModalOpen(true);
  };

  const openEditEventModal = (event: ChurchEvent) => {
    setEditingEvent(event);
    setEventImagePreview(event.image || '');
    setEventDateRaw('');  // can't reverse-parse formatted string reliably
    setEventTimeRaw('');  // admin can re-pick if they want to change
    setEventForm({
      title: event.title,
      date: event.date,
      time: event.time || '',
      location: event.location,
      description: event.description,
      image: event.image,
      isUpcoming: event.isUpcoming,
      monthYear: event.monthYear || '',
      videoUrl: event.videoUrl || ''
    });
    setIsEventModalOpen(true);
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalSubmitting(true);
    setModalError('');
    setModalSuccess('');
    try {
      if (editingEvent) {
        await dbService.updateEvent(editingEvent.id, eventForm);
        setModalSuccess('Event updated successfully!');
      } else {
        await dbService.createEvent(eventForm);
        setModalSuccess('Event created successfully!');
      }
      setTimeout(() => {
        setIsEventModalOpen(false);
        setModalSuccess('');
        fetchData();
      }, 900);
    } catch (err: any) {
      console.error(err);
      setModalError(err?.message || 'Failed to save event. Please try again.');
    } finally {
      setModalSubmitting(false);
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
    setSermonThumbnailPreview('');
    setSermonDateRaw('');
    setSermonForm({
      title: '',
      speaker: '',
      date: '',
      duration: '',
      thumbnail: homepageImg,
      videoUrl: ''
    });
    setIsSermonModalOpen(true);
  };

  const openEditSermonModal = (sermon: Sermon) => {
    setEditingSermon(sermon);
    setSermonThumbnailPreview(sermon.thumbnail || '');
    setSermonDateRaw('');
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
    setModalSubmitting(true);
    setModalError('');
    setModalSuccess('');
    try {
      if (editingSermon) {
        await dbService.updateSermon(editingSermon.id, sermonForm);
        setModalSuccess('Sermon updated successfully!');
      } else {
        await dbService.createSermon(sermonForm);
        setModalSuccess('Sermon uploaded successfully!');
      }
      setTimeout(() => {
        setIsSermonModalOpen(false);
        setModalSuccess('');
        fetchData();
      }, 900);
    } catch (err: any) {
      console.error(err);
      setModalError(err?.message || 'Failed to save sermon. Please try again.');
    } finally {
      setModalSubmitting(false);
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
    setModalSubmitting(true);
    setModalError('');
    setModalSuccess('');
    try {
      if (galleryForm.image === homepageImg || !galleryImagePreview) {
        setModalError('Please select a photo to upload.');
        setModalSubmitting(false);
        return;
      }
      await dbService.createGalleryItem(galleryForm);
      setModalSuccess('Photo added to gallery!');
      setTimeout(() => {
        setIsGalleryModalOpen(false);
        setGalleryImagePreview('');
        setModalSuccess('');
        fetchData();
      }, 900);
    } catch (err: any) {
      console.error(err);
      // Surface the real error — large base64 images often exceed Supabase field limits
      const msg = err?.message || '';
      if (msg.includes('413') || msg.includes('too large') || msg.includes('payload')) {
        setModalError('Image is too large for the database. Please use a smaller photo (under 1 MB).');
      } else {
        setModalError(msg || 'Failed to upload photo. Please try again.');
      }
    } finally {
      setModalSubmitting(false);
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

  // --- EXPORT TO EXCEL (CSV) ---
  const exportContactsToExcel = () => {
    if (submissions.length === 0) {
      alert('No contact submissions available to export.');
      return;
    }
    const headers = ['Name', 'Email', 'Message', 'Submitted At'];
    const rows = submissions.map(s => [
      `"${(s.name || '').replace(/"/g, '""')}"`,
      `"${(s.email || '').replace(/"/g, '""')}"`,
      `"${(s.message || '').replace(/"/g, '""')}"`,
      `"${new Date(s.created_at).toLocaleString().replace(/"/g, '""')}"`
    ]);
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `contact_submissions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportSubscribersToExcel = () => {
    if (subscribers.length === 0) {
      alert('No newsletter subscribers available to export.');
      return;
    }
    const headers = ['Subscriber Email', 'Subscribed At'];
    const rows = subscribers.map(s => [
      `"${(s.email || '').replace(/"/g, '""')}"`,
      `"${new Date(s.created_at).toLocaleString().replace(/"/g, '""')}"`
    ]);
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `newsletter_subscribers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportRegistrationsToExcel = (eventId: string, eventTitle: string) => {
    const eventRegs = registrations.filter(r => r.event_id === eventId);
    if (eventRegs.length === 0) {
      alert('No RSVPs recorded for this event.');
      return;
    }
    const headers = ['Attendee Name', 'Attendee Email', 'RSVP Date'];
    const rows = eventRegs.map(r => [
      `"${(r.name || '').replace(/"/g, '""')}"`,
      `"${(r.email || '').replace(/"/g, '""')}"`,
      `"${new Date(r.created_at).toLocaleString().replace(/"/g, '""')}"`
    ]);
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    const safeTitle = eventTitle.toLowerCase().replace(/[^a-z0-9]/g, '_');
    link.setAttribute('download', `event_rsvps_${safeTitle}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- VIEWS ---
  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#0e031c] flex items-center justify-center text-gray-300">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span>Loading admin...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0e031c] flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-100 animate-fade-in">
          <div className="text-center mb-8">
            <img
              src={logo}
              alt="Light-Up"
              className="h-16 w-auto mx-auto mb-4 object-contain"
            />
            <h1 className="text-2xl font-heading font-extrabold text-gray-900">
              Admin Portal
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Sign in to manage your website content and form submissions.
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {authError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-600 p-3 rounded-lg text-xs">
                {authError}
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                required
                className="bg-gray-50 border border-gray-200 text-gray-900 rounded-xl py-3 px-4 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="admin@lightupinternational.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                required
                className="bg-gray-50 border border-gray-200 text-gray-900 rounded-xl py-3 px-4 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="mt-2 py-3.5 rounded-xl font-heading font-semibold bg-primary text-white shadow-md hover:bg-primary-hover transition-all cursor-pointer text-sm"
            >
              Sign In to Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-dark text-text-white flex flex-col font-body">
      {/* Header bar */}
      <header className="bg-white/95 backdrop-blur-md border-b border-black/10 h-20 flex justify-between items-center px-4 sm:px-8 md:px-12 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <img src={logo} alt="LightUp" className="h-9 w-auto object-contain" />
          <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-primary/20">
            Admin
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchData}
            disabled={dataLoading}
            title="Refresh data"
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-gray-700 rounded-full text-xs sm:text-sm font-medium border border-black/10 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw size={15} className={dataLoading ? 'animate-spin' : ''} />
            <span className="hidden sm:inline">{dataLoading ? 'Refreshing...' : 'Refresh'}</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-full text-xs sm:text-sm font-medium border border-primary/20 transition-all cursor-pointer"
          >
            <LogOut size={15} /> <span className="hidden sm:inline">Log out</span>
          </button>
        </div>
      </header>

      {/* Main Workspace layout */}
      <div className="flex-1 flex flex-col md:flex-row min-w-0">
        {/* Responsive Navigation Bar / Sidebar */}
        <aside className="w-full md:w-64 bg-card-dark border-b md:border-b-0 md:border-r border-white/10 p-3 sm:p-4 md:p-6 flex flex-row md:flex-col gap-2 overflow-x-auto shrink-0 scrollbar-none">
          <button
            onClick={() => setActiveTab("submissions")}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === "submissions"
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "text-text-dimmed hover:bg-white/5 hover:text-white"
            }`}
          >
            <Mail size={16} /> Submissions
          </button>
          <button
            onClick={() => setActiveTab("events")}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === "events"
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "text-text-dimmed hover:bg-white/5 hover:text-white"
            }`}
          >
            <Calendar size={16} /> Events Manager
          </button>
          <button
            onClick={() => setActiveTab("sermons")}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === "sermons"
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "text-text-dimmed hover:bg-white/5 hover:text-white"
            }`}
          >
            <FileText size={16} /> Sermons Library
          </button>
          <button
            onClick={() => setActiveTab("gallery")}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === "gallery"
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "text-text-dimmed hover:bg-white/5 hover:text-white"
            }`}
          >
            <ImageIcon size={16} /> Gallery Album
          </button>
        </aside>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 md:p-10 min-w-0 overflow-x-hidden">
          {dataLoading ? (
            <div className="flex items-center justify-center py-20 text-text-dimmed text-sm gap-3">
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span>Fetching dashboard data...</span>
            </div>
          ) : (
            <>
              {/* Tab 1: Submissions & Subscribers */}
              {activeTab === "submissions" && (
                <div className="flex flex-col gap-10 animate-fade-in">
                  <div>
                    <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                      <h2 className="text-xl sm:text-2xl font-heading font-bold">
                        Contact & Prayer Inquiries ({submissions.length})
                      </h2>
                      {submissions.length > 0 && (
                        <button
                          onClick={exportContactsToExcel}
                          className="flex items-center gap-2 px-3.5 py-1.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white rounded-xl text-xs font-semibold border border-emerald-500/30 transition-all cursor-pointer shadow-sm"
                        >
                          <FileSpreadsheet size={15} /> Export Contacts (Excel)
                        </button>
                      )}
                    </div>
                    {submissions.length === 0 ? (
                      <div className="bg-card-dark p-8 text-center rounded-xl border border-white/5 text-text-dimmed text-sm">
                        No contact submissions received.
                      </div>
                    ) : (
                      <div className="overflow-x-auto bg-card-dark border border-white/10 rounded-xl">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                          <thead>
                            <tr className="border-b border-white/10 text-xs text-text-dimmed uppercase tracking-wider font-semibold bg-white/5">
                              <th className="p-4">Name</th>
                              <th className="p-4">Email</th>
                              <th className="p-4">Message</th>
                              <th className="p-4">Received At</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 text-sm">
                            {submissions.map((sub) => (
                              <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4 font-bold text-white whitespace-nowrap">{sub.name}</td>
                                <td className="p-4 text-primary font-medium whitespace-nowrap">{sub.email}</td>
                                <td className="p-4 max-w-[350px] break-words text-text-dimmed">{sub.message}</td>
                                <td className="p-4 text-xs text-text-dimmed whitespace-nowrap">
                                  {new Date(sub.created_at).toLocaleString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                      <h2 className="text-xl sm:text-2xl font-heading font-bold">
                        Newsletter Subscribers ({subscribers.length})
                      </h2>
                      {subscribers.length > 0 && (
                        <button
                          onClick={exportSubscribersToExcel}
                          className="flex items-center gap-2 px-3.5 py-1.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white rounded-xl text-xs font-semibold border border-emerald-500/30 transition-all cursor-pointer shadow-sm"
                        >
                          <FileSpreadsheet size={15} /> Export Newsletter (Excel)
                        </button>
                      )}
                    </div>
                    {subscribers.length === 0 ? (
                      <div className="bg-card-dark p-8 text-center rounded-xl border border-white/5 text-text-dimmed text-sm">
                        No email subscribers recorded.
                      </div>
                    ) : (
                      <div className="max-w-xl overflow-x-auto bg-card-dark border border-white/10 rounded-xl">
                        <table className="w-full text-left border-collapse min-w-[400px]">
                          <thead>
                            <tr className="border-b border-white/10 text-xs text-text-dimmed uppercase tracking-wider font-semibold bg-white/5">
                              <th className="p-4">Subscriber Email</th>
                              <th className="p-4">Subscribed At</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 text-sm">
                            {subscribers.map((sub) => (
                              <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4 font-bold text-white whitespace-nowrap">{sub.email}</td>
                                <td className="p-4 text-xs text-text-dimmed whitespace-nowrap">
                                  {new Date(sub.created_at).toLocaleDateString()}
                                </td>
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
              {activeTab === "events" && (
                <div className="flex flex-col gap-6 animate-fade-in">
                  <div className="flex flex-wrap justify-between items-center gap-4 mb-2">
                    <h2 className="text-xl sm:text-2xl font-heading font-bold">
                      Manage Calendar Events ({events.length})
                    </h2>
                    <button
                      onClick={openNewEventModal}
                      className="flex items-center gap-2 bg-primary hover:bg-primary-hover px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold cursor-pointer transition-all shadow-md"
                    >
                      <Plus size={16} /> Add New Event
                    </button>
                  </div>

                  {events.length === 0 ? (
                    <div className="bg-card-dark p-8 text-center rounded-xl border border-white/5 text-text-dimmed text-sm">
                      No.events.registered in system.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {events.map((event) => {
                        const eventRegs = registrations.filter((r) => r.event_id === event.id);
                        return (
                          <div
                            key={event.id}
                            className="bg-card-dark border border-white/10 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                          >
                            <div className="flex items-start gap-4">
                              <img
                                src={event.image}
                                alt=""
                                className="h-16 w-16 object-cover rounded-lg shrink-0 border border-white/10"
                              />
                              <div>
                                <span
                                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-block ${
                                    event.isUpcoming
                                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                      : "bg-white/10 text-text-dimmed"
                                  }`}
                                >
                                  {event.isUpcoming ? "Upcoming" : "Past Event"}
                                </span>
                                <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                                  {event.title}
                                </h3>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-dimmed mt-1">
                                  {event.isUpcoming ? (
                                    <>
                                      <span className="flex items-center gap-1">
                                        <Calendar size={12} /> {event.date}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <Clock size={12} /> {event.time}
                                      </span>
                                    </>
                                  ) : (
                                    <span>Month: {event.monthYear}</span>
                                  )}
                                  <span className="flex items-center gap-1">
                                    <MapPin size={12} /> {event.location}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5">
                              {event.isUpcoming && (
                                <button
                                  onClick={() =>
                                    setViewingRegistrationsEventId(
                                      viewingRegistrationsEventId === event.id ? null : event.id
                                    )
                                  }
                                  className="flex items-center gap-1.5 px-3 py-1.5 border border-primary/30 rounded-lg text-xs font-semibold text-primary hover:bg-primary/10 transition-all cursor-pointer"
                                >
                                  <Users size={14} /> RSVPs ({eventRegs.length})
                                </button>
                              )}
                              <button
                                onClick={() => openEditEventModal(event)}
                                className="p-2 border border-white/10 rounded-lg text-text-dimmed hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                                title="Edit Event"
                              >
                                <Edit2 size={14} />
                              </button>
                              <button
                                onClick={() => handleDeleteEvent(event.id)}
                                className="p-2 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
                                title="Delete Event"
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
                    <div className="mt-4 bg-card-dark p-5 sm:p-6 rounded-xl border border-primary/30 animate-fade-in">
                      <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/10">
                        <h3 className="font-bold text-white text-base sm:text-lg">
                          RSVP List for:{" "}
                          <span className="text-primary">
                            {events.find((e) => e.id === viewingRegistrationsEventId)?.title}
                          </span>
                        </h3>
                        <div className="flex items-center gap-2">
                          {registrations.filter((r) => r.event_id === viewingRegistrationsEventId).length > 0 && (
                            <button
                              onClick={() => {
                                const ev = events.find((e) => e.id === viewingRegistrationsEventId);
                                if (ev) exportRegistrationsToExcel(ev.id, ev.title);
                              }}
                              className="flex items-center gap-1.5 text-xs bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white px-2.5 py-1 rounded-md border border-emerald-500/30 cursor-pointer transition-all font-medium"
                            >
                              <FileSpreadsheet size={13} /> Export RSVPs (Excel)
                            </button>
                          )}
                          <button
                            onClick={() => setViewingRegistrationsEventId(null)}
                            className="text-xs bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-md cursor-pointer transition-all"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                      {registrations.filter((r) => r.event_id === viewingRegistrationsEventId).length === 0 ? (
                        <div className="text-sm text-text-dimmed italic">
                          No.attendee.RSVPs registered.for this event.
                        </div>
                      ) : (
                        <div className="divide-y divide-white/5">
                          {registrations
                            .filter((r) => r.event_id === viewingRegistrationsEventId)
                            .map((reg) => (
                              <div key={reg.id} className="flex flex-wrap justify-between items-center text-sm py-2 gap-2">
                                <span className="font-semibold text-white">{reg.name}</span>
                                <span className="text-primary text-xs font-mono">{reg.email}</span>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Sermons */}
              {activeTab === "sermons" && (
                <div className="flex flex-col gap-6 animate-fade-in">
                  <div className="flex flex-wrap justify-between items-center gap-4 mb-2">
                    <h2 className="text-xl sm:text-2xl font-heading font-bold">
                      Manage Sermons ({sermons.length})
                    </h2>
                    <button
                      onClick={openNewSermonModal}
                      className="flex items-center gap-2 bg-primary hover:bg-primary-hover px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold cursor-pointer transition-all shadow-md"
                    >
                      <Plus size={16} /> Add New Sermon
                    </button>
                  </div>

                  {sermons.length === 0 ? (
                    <div className="bg-card-dark p-8 text-center rounded-xl border border-white/5 text-text-dimmed text-sm">
                      No sermons available.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      {sermons.map((sermon) => (
                        <div
                          key={sermon.id}
                          className="bg-card-dark border border-white/10 rounded-xl p-5 flex items-start justify-between gap-4"
                        >
                          <div className="flex items-start gap-4 min-w-0">
                            <img
                              src={sermon.thumbnail}
                              alt=""
                              className="h-16 w-20 sm:w-24 object-cover rounded-lg shrink-0 border border-white/10 bg-black"
                            />
                            <div className="min-w-0">
                              <h3 className="font-bold text-white text-base truncate">
                                {sermon.title}
                              </h3>
                              <span className="text-xs text-accent-orange block mt-1 truncate">
                                {sermon.speaker}
                              </span>
                              <div className="flex gap-2.5 text-xs text-text-dimmed mt-1">
                                <span>{sermon.date}</span>
                                <span>•</span>
                                <span>{sermon.duration}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-1.5 shrink-0">
                            <button
                              onClick={() => openEditSermonModal(sermon)}
                              className="p-2 border border-white/10 rounded-lg text-text-dimmed hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                              title="Edit"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteSermon(sermon.id)}
                              className="p-2 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 4: Gallery */}
              {activeTab === "gallery" && (
                <div className="flex flex-col gap-6 animate-fade-in">
                  <div className="flex flex-wrap justify-between items-center gap-4 mb-2">
                    <h2 className="text-xl sm:text-2xl font-heading font-bold">
                      Manage Gallery ({gallery.length})
                    </h2>
                    <button
                      onClick={() => {
                        setGalleryImagePreview('');
                        setGalleryForm({
                          title: '',
                          image: homepageImg,
                          aspectRatio: 'horizontal'
                        });
                        setIsGalleryModalOpen(true);
                      }}
                      className="flex items-center gap-2 bg-primary hover:bg-primary-hover px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold cursor-pointer transition-all shadow-md"
                    >
                      <Plus size={16} /> Upload Photo
                    </button>
                  </div>

                  {gallery.length === 0 ? (
                    <div className="bg-card-dark p-8 text-center rounded-xl border border-white/5 text-text-dimmed text-sm">
                      No.photos.in.gallery.
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {gallery.map((item) => (
                        <div
                          key={item.id}
                          className="bg-card-dark border border-white/10 rounded-xl overflow-hidden shadow-lg group relative flex flex-col justify-between"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-36 sm:h-44 object-cover"
                          />
                          <div className="p-3 flex justify-between items-center gap-2 bg-slate-900/60 backdrop-blur-sm">
                            <span className="text-xs font-semibold truncate text-white">
                              {item.title}
                            </span>
                            <button
                              onClick={() => handleDeleteGalleryItem(item.id)}
                              className="p-1.5 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/20 transition-all cursor-pointer shrink-0"
                              title="Delete"
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
            </>
          )}
        </main>
      </div>

      {/* --- FORM MODALS --- */}

      {/* Event Modal */}
      {isEventModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm">
          <div className="bg-[#150a24] border border-primary/30 rounded-2xl w-full max-w-lg p-6 sm:p-8 shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto text-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl sm:text-2xl font-heading font-extrabold">
                {editingEvent ? "Edit Event" : "New Event"}
              </h3>
              <button onClick={() => setIsEventModalOpen(false)} className="text-gray-400 hover:text-white cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleEventSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-dimmed uppercase tracking-wider">
                  Event Title
                </label>
                <input
                  type="text"
                  required
                  className="bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  value={eventForm.title}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, title: e.target.value })
                  }
                  placeholder="Sunday Service"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-text-dimmed uppercase tracking-wider">
                    Date {editingEvent && eventForm.date && <span className="normal-case text-primary font-normal">(current: {eventForm.date})</span>}
                  </label>
                  <input
                    type="date"
                    required={!editingEvent}
                    className="bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-primary [color-scheme:dark] cursor-pointer"
                    value={eventDateRaw}
                    onChange={(e) => {
                      const raw = e.target.value; // YYYY-MM-DD
                      setEventDateRaw(raw);
                      const fmt = raw ? new Date(raw + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }) : '';
                      setEventForm({ ...eventForm, date: fmt || eventForm.date });
                    }}
                  />
                  {eventDateRaw && eventForm.date && (
                    <span className="text-xs text-primary mt-0.5">{eventForm.date}</span>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-text-dimmed uppercase tracking-wider">
                    Time {editingEvent && eventForm.time && <span className="normal-case text-primary font-normal">(current: {eventForm.time})</span>}
                  </label>
                  <input
                    type="time"
                    className="bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-primary [color-scheme:dark] cursor-pointer"
                    value={eventTimeRaw}
                    onChange={(e) => {
                      const raw = e.target.value; // HH:MM
                      setEventTimeRaw(raw);
                      if (!raw) { setEventForm({ ...eventForm, time: '' }); return; }
                      const [h, m] = raw.split(':').map(Number);
                      const ampm = h >= 12 ? 'PM' : 'AM';
                      const h12 = h % 12 || 12;
                      setEventForm({ ...eventForm, time: `${h12}:${String(m).padStart(2, '0')} ${ampm}` });
                    }}
                  />
                  {eventForm.time && (
                    <span className="text-xs text-primary mt-0.5">{eventForm.time}</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-dimmed uppercase tracking-wider">
                  Location
                </label>
                <input
                  type="text"
                  required
                  className="bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                  value={eventForm.location}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, location: e.target.value })
                  }
                  placeholder="Main Auditorium"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-dimmed uppercase tracking-wider">
                  Event Type
                </label>
                <div className="flex gap-6 mt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="radio"
                      checked={eventForm.isUpcoming === true}
                      onChange={() =>
                        setEventForm({ ...eventForm, isUpcoming: true })
                      }
                      className="accent-primary"
                    />
                    Upcoming
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="radio"
                      checked={eventForm.isUpcoming === false}
                      onChange={() =>
                        setEventForm({ ...eventForm, isUpcoming: false })
                      }
                      className="accent-primary"
                    />
                    Past Event
                  </label>
                </div>
              </div>

              {!eventForm.isUpcoming && (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-text-dimmed uppercase tracking-wider">
                      Month & Year
                    </label>
                    <input
                      type="text"
                      required={!eventForm.isUpcoming}
                      className="bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                      value={eventForm.monthYear}
                      onChange={(e) =>
                        setEventForm({ ...eventForm, monthYear: e.target.value })
                      }
                      placeholder="June 2026"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-text-dimmed uppercase tracking-wider">
                      View Highlights — YouTube URL
                    </label>
                    <input
                      type="text"
                      className="bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                      value={eventForm.videoUrl}
                      onChange={(e) => {
                        let url = e.target.value.trim();
                        // Extract video ID from any YouTube URL format and convert to embed
                        const ytMatch = url.match(
                          /(?:youtube\.com\/(?:watch\?v=|live\/|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
                        );
                        if (ytMatch) url = `https://www.youtube.com/embed/${ytMatch[1]}`;
                        setEventForm({ ...eventForm, videoUrl: url });
                      }}
                      placeholder="Paste any YouTube link here..."
                    />
                    <p className="text-[11px] text-text-dimmed">
                      Supports: watch, live, shorts, embed, and youtu.be links — all auto-converted.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-dimmed uppercase tracking-wider">
                  Description
                </label>
                <textarea
                  required
                  rows={3}
                  className="bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-primary resize-y"
                  value={eventForm.description}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, description: e.target.value })
                  }
                  placeholder="Enter event details..."
                ></textarea>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-dimmed uppercase tracking-wider">
                  Event Flier / Image
                </label>
                {/* Hidden file input */}
                <input
                  ref={eventImageInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      const result = ev.target?.result as string;
                      setEventImagePreview(result);
                      setEventForm({ ...eventForm, image: result });
                    };
                    reader.readAsDataURL(file);
                  }}
                />
                <button
                  type="button"
                  onClick={() => eventImageInputRef.current?.click()}
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 border border-dashed border-white/20 rounded-xl text-sm text-text-dimmed hover:border-primary hover:text-primary transition-all cursor-pointer bg-white/5"
                >
                  <ImageIcon size={15} />
                  {eventImagePreview ? 'Change Image' : 'Upload Flier'}
                </button>
                {/* Image preview */}
                {eventImagePreview && (
                  <div className="relative mt-2 rounded-xl overflow-hidden border border-white/10 bg-black/20">
                    <img
                      src={eventImagePreview}
                      alt="Event flier preview"
                      className="w-full max-h-52 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setEventImagePreview('');
                        setEventForm({ ...eventForm, image: homepageImg });
                        if (eventImageInputRef.current) eventImageInputRef.current.value = '';
                      }}
                      className="absolute top-2 right-2 p-1 bg-black/60 hover:bg-red-600 rounded-full text-white transition-all cursor-pointer"
                      title="Remove image"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>

              {/* Modal feedback */}
              {modalError && (
                <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
                  <span className="shrink-0 mt-0.5">⚠</span>
                  <span>{modalError}</span>
                </div>
              )}
              {modalSuccess && (
                <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm">
                  <span>✓</span> {modalSuccess}
                </div>
              )}

              <div className="flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => { setIsEventModalOpen(false); setModalError(''); setModalSuccess(''); }}
                  disabled={modalSubmitting}
                  className="px-5 py-2.5 border border-white/10 rounded-full text-sm text-text-dimmed hover:text-white transition-all cursor-pointer disabled:opacity-40"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={modalSubmitting}
                  className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-hover rounded-full text-sm font-semibold text-white shadow-lg transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {modalSubmitting && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                  {modalSubmitting ? 'Saving...' : (editingEvent ? 'Update Event' : 'Save Event')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sermon Modal */}
      {isSermonModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm">
          <div className="bg-[#150a24] border border-primary/30 rounded-2xl w-full max-w-lg p-6 sm:p-8 shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto text-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl sm:text-2xl font-heading font-extrabold">
                {editingSermon ? "Edit Sermon" : "New Sermon"}
              </h3>
              <button onClick={() => setIsSermonModalOpen(false)} className="text-gray-400 hover:text-white cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSermonSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-dimmed uppercase tracking-wider">
                  Sermon Title
                </label>
                <input
                  type="text"
                  required
                  className="bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none"
                  value={sermonForm.title}
                  onChange={(e) =>
                    setSermonForm({ ...sermonForm, title: e.target.value })
                  }
                  placeholder="Building Your Life"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-dimmed uppercase tracking-wider">
                  Preacher / Speaker
                </label>
                <input
                  type="text"
                  required
                  className="bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none"
                  value={sermonForm.speaker}
                  onChange={(e) =>
                    setSermonForm({ ...sermonForm, speaker: e.target.value })
                  }
                  placeholder="Julianah Olu-Ajadi"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-text-dimmed uppercase tracking-wider">
                    Release Date {editingSermon && sermonForm.date && <span className="normal-case text-primary font-normal">(current: {sermonForm.date})</span>}
                  </label>
                  <input
                    type="date"
                    required={!editingSermon}
                    className="bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-primary [color-scheme:dark] cursor-pointer"
                    value={sermonDateRaw}
                    onChange={(e) => {
                      const raw = e.target.value;
                      setSermonDateRaw(raw);
                      const fmt = raw ? new Date(raw + 'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.') : '';
                      setSermonForm({ ...sermonForm, date: fmt || sermonForm.date });
                    }}
                  />
                  {sermonDateRaw && sermonForm.date && (
                    <span className="text-xs text-primary mt-0.5">{sermonForm.date}</span>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-text-dimmed uppercase tracking-wider">
                    Duration
                  </label>
                  <input
                    type="text"
                    required
                    className="bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none"
                    value={sermonForm.duration}
                    onChange={(e) =>
                      setSermonForm({ ...sermonForm, duration: e.target.value })
                    }
                    placeholder="45:00"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-dimmed uppercase tracking-wider">
                  YouTube Video URL
                </label>
                <input
                  type="text"
                  required
                  className="bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                  value={sermonForm.videoUrl}
                  onChange={(e) => {
                    let url = e.target.value.trim();
                    const ytMatch = url.match(
                      /(?:youtube\.com\/(?:watch\?v=|live\/|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
                    );
                    if (ytMatch) url = `https://www.youtube.com/embed/${ytMatch[1]}`;
                    setSermonForm({ ...sermonForm, videoUrl: url });
                  }}
                  placeholder="Paste any YouTube link here..."
                />
                <p className="text-[11px] text-text-dimmed">
                  Supports: watch, live, shorts, embed, and youtu.be links — all auto-converted.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-dimmed uppercase tracking-wider">
                  Sermon Thumbnail
                </label>
                {/* Hidden file input */}
                <input
                  ref={sermonThumbnailInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      const result = ev.target?.result as string;
                      setSermonThumbnailPreview(result);
                      setSermonForm({ ...sermonForm, thumbnail: result });
                    };
                    reader.readAsDataURL(file);
                  }}
                />
                <button
                  type="button"
                  onClick={() => sermonThumbnailInputRef.current?.click()}
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 border border-dashed border-white/20 rounded-xl text-sm text-text-dimmed hover:border-primary hover:text-primary transition-all cursor-pointer bg-white/5"
                >
                  <ImageIcon size={15} />
                  {sermonThumbnailPreview ? 'Change Thumbnail' : 'Upload Thumbnail'}
                </button>
                {/* Thumbnail preview */}
                {sermonThumbnailPreview && (
                  <div className="relative mt-2 rounded-xl overflow-hidden border border-white/10 bg-black/20">
                    <img
                      src={sermonThumbnailPreview}
                      alt="Sermon thumbnail preview"
                      className="w-full max-h-48 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setSermonThumbnailPreview('');
                        setSermonForm({ ...sermonForm, thumbnail: homepageImg });
                        if (sermonThumbnailInputRef.current) sermonThumbnailInputRef.current.value = '';
                      }}
                      className="absolute top-2 right-2 p-1 bg-black/60 hover:bg-red-600 rounded-full text-white transition-all cursor-pointer"
                      title="Remove thumbnail"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>

              {/* Modal feedback */}
              {modalError && (
                <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
                  <span className="shrink-0 mt-0.5">⚠</span>
                  <span>{modalError}</span>
                </div>
              )}
              {modalSuccess && (
                <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm">
                  <span>✓</span> {modalSuccess}
                </div>
              )}

              <div className="flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => { setIsSermonModalOpen(false); setModalError(''); setModalSuccess(''); }}
                  disabled={modalSubmitting}
                  className="px-5 py-2.5 border border-white/10 rounded-full text-sm text-text-dimmed hover:text-white transition-all cursor-pointer disabled:opacity-40"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={modalSubmitting}
                  className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-hover rounded-full text-sm font-semibold text-white shadow-lg transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {modalSubmitting && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                  {modalSubmitting ? 'Saving...' : (editingSermon ? 'Update Sermon' : 'Save Sermon')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Modal */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm">
          <div className="bg-[#150a24] border border-primary/30 rounded-2xl w-full max-w-lg p-6 sm:p-8 shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto text-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl sm:text-2xl font-heading font-extrabold">
                Add Photo to Gallery
              </h3>
              <button onClick={() => setIsGalleryModalOpen(false)} className="text-gray-400 hover:text-white cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <form
              onSubmit={handleGallerySubmit}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-dimmed uppercase tracking-wider">
                  Photo Title / Caption
                </label>
                <input
                  type="text"
                  required
                  className="bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none"
                  value={galleryForm.title}
                  onChange={(e) =>
                    setGalleryForm({ ...galleryForm, title: e.target.value })
                  }
                  placeholder="Worship Service"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-dimmed uppercase tracking-wider">
                  Photo
                </label>
                {/* Hidden file input */}
                <input
                  ref={galleryImageInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      const result = ev.target?.result as string;
                      setGalleryImagePreview(result);
                      setGalleryForm({ ...galleryForm, image: result });
                    };
                    reader.readAsDataURL(file);
                  }}
                />
                <button
                  type="button"
                  onClick={() => galleryImageInputRef.current?.click()}
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 border border-dashed border-white/20 rounded-xl text-sm text-text-dimmed hover:border-primary hover:text-primary transition-all cursor-pointer bg-white/5"
                >
                  <ImageIcon size={15} />
                  {galleryImagePreview ? 'Change Photo' : 'Upload Photo'}
                </button>
                {/* Photo preview */}
                {galleryImagePreview && (
                  <div className="relative mt-2 rounded-xl overflow-hidden border border-white/10 bg-black/20">
                    <img
                      src={galleryImagePreview}
                      alt="Gallery photo preview"
                      className="w-full max-h-56 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setGalleryImagePreview('');
                        setGalleryForm({ ...galleryForm, image: homepageImg });
                        if (galleryImageInputRef.current) galleryImageInputRef.current.value = '';
                      }}
                      className="absolute top-2 right-2 p-1 bg-black/60 hover:bg-red-600 rounded-full text-white transition-all cursor-pointer"
                      title="Remove photo"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-dimmed uppercase tracking-wider">
                  Aspect Ratio Layout
                </label>
                <select
                  className="bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:bg-[#150a24]"
                  value={galleryForm.aspectRatio}
                  onChange={(e) =>
                    setGalleryForm({
                      ...galleryForm,
                      aspectRatio: e.target.value as any,
                    })
                  }
                >
                  <option value="horizontal">Horizontal (Landscape)</option>
                  <option value="vertical">Vertical (Portrait)</option>
                  <option value="square">Square</option>
                </select>
              </div>

              {/* Modal feedback */}
              {modalError && (
                <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
                  <span className="shrink-0 mt-0.5">⚠</span>
                  <span>{modalError}</span>
                </div>
              )}
              {modalSuccess && (
                <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm">
                  <span>✓</span> {modalSuccess}
                </div>
              )}

              <div className="flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => { setIsGalleryModalOpen(false); setModalError(''); setModalSuccess(''); }}
                  disabled={modalSubmitting}
                  className="px-5 py-2.5 border border-white/10 rounded-full text-sm text-text-dimmed hover:text-white transition-all cursor-pointer disabled:opacity-40"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={modalSubmitting}
                  className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-hover rounded-full text-sm font-semibold text-white shadow-lg transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {modalSubmitting && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                  {modalSubmitting ? 'Uploading...' : 'Upload Photo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
