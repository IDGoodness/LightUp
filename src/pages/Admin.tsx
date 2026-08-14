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
  RefreshCw,
  FolderPlus,
  Link,
  UploadCloud,
  Check
} from 'lucide-react';
import { dbService } from '../services/db';
import type { ContactSubmission, NewsletterSubscriber, EventRegistration } from '../services/db';
import type { Sermon, ChurchEvent, GalleryItem } from '../data/churchData';
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

  // Gallery-specific UI & Multi-select States
  const [galleryImagePreview, setGalleryImagePreview] = useState<string>('');
  const galleryImageInputRef = useRef<HTMLInputElement>(null);
  const [selectedGalleryIds, setSelectedGalleryIds] = useState<string[]>([]);

  // Bulk Gallery & Google Drive Import States
  const [isBulkGalleryModalOpen, setIsBulkGalleryModalOpen] = useState(false);
  const [bulkImportMode, setBulkImportMode] = useState<'urls' | 'files'>('urls');
  const [bulkUrlsInput, setBulkUrlsInput] = useState<string>('');
  const [bulkFiles, setBulkFiles] = useState<File[]>([]);
  const [bulkProgress, setBulkProgress] = useState<string>('');
  const bulkFileInputRef = useRef<HTMLInputElement>(null);

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

  const compressImageFile = (file: File, maxWidth = 1200, quality = 0.75): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > maxWidth || height > maxWidth) {
            if (width > height) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxWidth) / height);
              height = maxWidth;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', quality));
          } else {
            resolve(e.target?.result as string);
          }
        };
        img.onerror = () => resolve(e.target?.result as string);
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const compressUrlToDataUrl = (imageUrl: string, maxWidth = 1200, quality = 0.75): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > maxWidth || height > maxWidth) {
            if (width > height) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxWidth) / height);
              height = maxWidth;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', quality));
          } else {
            resolve(imageUrl);
          }
        } catch (e) {
          resolve(imageUrl);
        }
      };
      img.onerror = () => resolve(imageUrl);
      img.src = imageUrl;
    });
  };

  const extractGoogleDriveFolderImageUrls = async (folderUrlOrId: string): Promise<string[]> => {
    const folderIdMatch = folderUrlOrId.match(/(?:folders\/|id=|^)([a-zA-Z0-9_-]{25,})/);
    if (!folderIdMatch) return [];
    const folderId = folderIdMatch[1];

    // 1. Query server endpoint /api/gdrive-folder — zero CORS restrictions
    try {
      const apiRes = await fetch(`/api/gdrive-folder?id=${folderId}`);
      if (apiRes.ok) {
        const json = await apiRes.json();
        if (json.success && Array.isArray(json.urls) && json.urls.length > 0) {
          return json.urls;
        }
      }
    } catch (err) {
      console.log('Server endpoint fetch failed, falling back to direct parse:', err);
    }

    // 2. Direct fetch fallback
    let html = '';
    try {
      const res = await fetch(`https://drive.google.com/embeddedfolderview?id=${folderId}#grid`);
      if (res.ok) html = await res.text();
    } catch (e) {
      try {
        const res2 = await fetch(`https://drive.google.com/drive/folders/${folderId}`);
        if (res2.ok) html = await res2.text();
      } catch (err) {
        console.error('Direct folder fetch failed:', err);
      }
    }

    const fileIdMatches = [...html.matchAll(/\/file\/d\/([a-zA-Z0-9_-]{25,})/g)].map(m => m[1]);
    const stringIdMatches = [...html.matchAll(/["']([a-zA-Z0-9_-]{33})["']/g)].map(m => m[1]);

    const allIds = new Set([...fileIdMatches, ...stringIdMatches]);
    const imageIds = Array.from(allIds).filter(id => id !== folderId && !id.includes('google') && !id.includes('drive'));

    if (imageIds.length > 0) {
      return imageIds.map(id => `https://lh3.googleusercontent.com/d/${id}`);
    }

    return [];
  };

  const parseUrlsFromInput = (input: string): string[] => {
    const lines = input.split(/[\n,\s]+/).map(s => s.trim()).filter(Boolean);
    const urls: string[] = [];

    for (const line of lines) {
      // Ignore main folder URLs in line-by-line parser as folder parser handles them separately
      if (line.includes('drive.google.com/drive/folders/') || line.includes('/folders/')) continue;

      const driveFileMatch = line.match(/(?:file\/d\/|id=)([a-zA-Z0-9_-]{25,})/);
      if (driveFileMatch) {
        const fileId = driveFileMatch[1];
        urls.push(`https://lh3.googleusercontent.com/d/${fileId}`);
        continue;
      }

      if (line.startsWith('http://') || line.startsWith('https://') || line.startsWith('data:')) {
        urls.push(line);
      }
    }

    return Array.from(new Set(urls));
  };

  const handleBulkGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalSubmitting(true);
    setModalError('');
    setModalSuccess('');
    setBulkProgress('');

    try {
      const itemsToCreate: Array<{ title: string; image: string; aspectRatio: 'horizontal' | 'vertical' | 'square' }> = [];

      if (bulkImportMode === 'files') {
        if (bulkFiles.length === 0) {
          setModalError('Please select at least one image file from your device.');
          setModalSubmitting(false);
          return;
        }

        setBulkProgress(`Compressing & processing ${bulkFiles.length} file(s)...`);
        for (let i = 0; i < bulkFiles.length; i++) {
          const file = bulkFiles[i];
          setBulkProgress(`Processing photo ${i + 1} of ${bulkFiles.length}...`);
          const compressedDataUrl = await compressImageFile(file, 1200, 0.75);
          const cleanTitle = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
          itemsToCreate.push({
            title: cleanTitle || `Gallery Photo ${i + 1}`,
            image: compressedDataUrl,
            aspectRatio: 'horizontal'
          });
        }
      } else {
        setBulkProgress('Scanning for Google Drive folder & image links...');
        let rawUrls: string[] = [];

        if (bulkUrlsInput.includes('drive.google.com/drive/folders/') || bulkUrlsInput.includes('/folders/')) {
          setBulkProgress('Extracting individual photos from Google Drive folder...');
          const folderUrls = await extractGoogleDriveFolderImageUrls(bulkUrlsInput);
          rawUrls.push(...folderUrls);
        }

        const singleUrls = parseUrlsFromInput(bulkUrlsInput);
        rawUrls.push(...singleUrls);
        rawUrls = Array.from(new Set(rawUrls));

        if (rawUrls.length === 0) {
          setModalError('No valid images or Google Drive links found. Make sure folder sharing is set to "Anyone with the link can view".');
          setModalSubmitting(false);
          return;
        }

        setBulkProgress(`Found ${rawUrls.length} photo(s)! Compressing & importing...`);
        for (let i = 0; i < rawUrls.length; i++) {
          const url = rawUrls[i];
          setBulkProgress(`Compressing & saving photo ${i + 1} of ${rawUrls.length}...`);
          const compressedImage = await compressUrlToDataUrl(url, 1200, 0.75);
          itemsToCreate.push({
            title: `LightUp Gallery Photo ${itemsToCreate.length + 1}`,
            image: compressedImage,
            aspectRatio: i % 3 === 0 ? 'vertical' : i % 2 === 0 ? 'square' : 'horizontal'
          });
        }
      }

      setBulkProgress(`Saving ${itemsToCreate.length} photo(s) to gallery...`);
      await dbService.createGalleryItemsBatch(itemsToCreate);

      setModalSuccess(`Successfully imported ${itemsToCreate.length} photo(s) to gallery!`);
      setTimeout(() => {
        setIsBulkGalleryModalOpen(false);
        setBulkUrlsInput('');
        setBulkFiles([]);
        setBulkProgress('');
        setModalSuccess('');
        fetchData();
      }, 1200);
    } catch (err: any) {
      console.error('Bulk import error:', err);
      setModalError(err?.message || 'Failed to import photos. Please try again.');
    } finally {
      setModalSubmitting(false);
    }
  };

  const handleDeleteGalleryItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this photo from the gallery?')) return;
    // Optimistic UI update: instantly update UI so user experiences ZERO lag
    setGallery(prev => prev.filter(item => item.id !== id));
    setSelectedGalleryIds(prev => prev.filter(i => i !== id));

    try {
      await dbService.deleteGalleryItem(id);
    } catch (err) {
      console.error('Error deleting gallery item:', err);
      alert('Failed to delete photo from database.');
      fetchData(); // Rollback/reload if network error
    }
  };

  const handleBulkDeleteGalleryItems = async () => {
    if (selectedGalleryIds.length === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedGalleryIds.length} selected photo(s)?`)) return;

    const idsToDelete = [...selectedGalleryIds];
    // Optimistic UI update: remove selected photos immediately from screen
    setGallery(prev => prev.filter(item => !idsToDelete.includes(item.id)));
    setSelectedGalleryIds([]);

    try {
      await dbService.deleteGalleryItemsBatch(idsToDelete);
    } catch (err) {
      console.error('Error bulk deleting gallery items:', err);
      alert('Failed to delete photos from database.');
      fetchData();
    }
  };

  const toggleSelectAllGallery = () => {
    if (selectedGalleryIds.length === gallery.length) {
      setSelectedGalleryIds([]);
    } else {
      setSelectedGalleryIds(gallery.map(g => g.id));
    }
  };

  const toggleGallerySelect = (id: string) => {
    setSelectedGalleryIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
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
              alt="LightUp"
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
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => {
                          setModalError('');
                          setModalSuccess('');
                          setBulkProgress('');
                          setBulkUrlsInput('');
                          setBulkFiles([]);
                          setIsBulkGalleryModalOpen(true);
                        }}
                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/15 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold cursor-pointer transition-all shadow-md text-white"
                      >
                        <FolderPlus size={16} className="text-primary" /> Import Multiple / Google Drive
                      </button>
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
                        className="flex items-center gap-2 bg-primary hover:bg-primary-hover px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold cursor-pointer transition-all shadow-md text-white"
                      >
                        <Plus size={16} /> Upload Photo
                      </button>
                    </div>
                  </div>

                  {/* Permanent Selection & Action Toolbar */}
                  {gallery.length > 0 && (
                    <div className="flex flex-wrap items-center justify-between gap-3 bg-white/5 p-3.5 rounded-xl border border-white/10 mb-2 shadow-sm">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={toggleSelectAllGallery}
                          className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all bg-white/10 hover:bg-white/20 text-white border border-white/15 cursor-pointer shadow-sm"
                        >
                          <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                            selectedGalleryIds.length > 0 && selectedGalleryIds.length === gallery.length
                              ? 'bg-primary border-primary text-white'
                              : 'bg-transparent border-white/40'
                          }`}>
                            {selectedGalleryIds.length > 0 && selectedGalleryIds.length === gallery.length && <Check size={11} strokeWidth={3} />}
                          </div>
                          {selectedGalleryIds.length === gallery.length ? 'Deselect All' : `Select All (${gallery.length})`}
                        </button>

                        {selectedGalleryIds.length > 0 && (
                          <span className="text-xs font-semibold text-text-dimmed">
                            {selectedGalleryIds.length} of {gallery.length} photo(s) selected
                          </span>
                        )}
                      </div>

                      {selectedGalleryIds.length > 0 && (
                        <button
                          type="button"
                          onClick={handleBulkDeleteGalleryItems}
                          className="flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-bold cursor-pointer transition-all bg-red-600 hover:bg-red-700 text-white shadow-lg animate-pulse"
                        >
                          <Trash2 size={15} /> Delete Selected ({selectedGalleryIds.length})
                        </button>
                      )}
                    </div>
                  )}

                  {gallery.length === 0 ? (
                    <div className="bg-card-dark p-8 text-center rounded-xl border border-white/5 text-text-dimmed text-sm">
                      No photos in gallery.
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {gallery.map((item) => {
                        const isSelected = selectedGalleryIds.includes(item.id);
                        return (
                          <div
                            key={item.id}
                            onClick={() => toggleGallerySelect(item.id)}
                            className={`bg-card-dark border rounded-xl overflow-hidden shadow-lg group relative flex flex-col justify-between transition-all cursor-pointer ${
                              isSelected
                                ? 'border-primary ring-2 ring-primary bg-primary/20 scale-[0.98]'
                                : 'border-white/10 hover:border-white/30 hover:scale-[1.01]'
                            }`}
                          >
                            {/* Custom Selection Checkbox Button */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleGallerySelect(item.id);
                              }}
                              className={`absolute top-2.5 left-2.5 z-20 w-6 h-6 rounded-md flex items-center justify-center transition-all cursor-pointer shadow-lg border ${
                                isSelected
                                  ? 'bg-primary border-primary text-white scale-110'
                                  : 'bg-black/60 hover:bg-black/90 border-white/40 text-transparent hover:text-white/40'
                              }`}
                              title={isSelected ? 'Deselect photo' : 'Select photo'}
                            >
                              <Check size={14} strokeWidth={3} className={isSelected ? 'opacity-100' : 'opacity-0'} />
                            </button>

                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-36 sm:h-44 object-cover select-none"
                            />
                            <div className="p-3 flex justify-between items-center gap-2 bg-slate-900/70 backdrop-blur-md">
                              <span className="text-xs font-semibold truncate text-white">
                                {item.title}
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteGalleryItem(item.id);
                                }}
                                className="p-1.5 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all cursor-pointer shrink-0"
                                title="Delete single photo"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
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
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const compressed = await compressImageFile(file, 1200, 0.75);
                    setGalleryImagePreview(compressed);
                    setGalleryForm({ ...galleryForm, image: compressed });
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

      {/* Bulk Gallery & Google Drive Import Modal */}
      {isBulkGalleryModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm">
          <div className="bg-[#150a24] border border-primary/30 rounded-2xl w-full max-w-xl p-6 sm:p-8 shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto text-white">
            <div className="flex justify-between items-center mb-5">
              <div>
                <h3 className="text-xl sm:text-2xl font-heading font-extrabold flex items-center gap-2">
                  <FolderPlus className="text-primary" size={24} /> Import Gallery Photos
                </h3>
                <p className="text-xs text-text-dimmed mt-1">
                  Add multiple images via Google Drive links, URLs, or device batch upload.
                </p>
              </div>
              <button
                onClick={() => setIsBulkGalleryModalOpen(false)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mode Tabs */}
            <div className="flex border-b border-white/10 mb-5 gap-4">
              <button
                type="button"
                onClick={() => setBulkImportMode('urls')}
                className={`pb-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  bulkImportMode === 'urls'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-text-dimmed hover:text-white'
                }`}
              >
                Google Drive & Links
              </button>
              <button
                type="button"
                onClick={() => setBulkImportMode('files')}
                className={`pb-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  bulkImportMode === 'files'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-text-dimmed hover:text-white'
                }`}
              >
                Batch File Upload
              </button>
            </div>

            <form onSubmit={handleBulkGallerySubmit} className="flex flex-col gap-4">
              {bulkImportMode === 'urls' ? (
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-text-dimmed uppercase tracking-wider flex items-center gap-1.5">
                    <Link size={14} className="text-primary" /> Paste Image / Google Drive Share Links
                  </label>
                  <textarea
                    rows={6}
                    className="bg-white/5 border border-white/10 rounded-xl p-3.5 text-xs sm:text-sm text-white focus:outline-none focus:border-primary font-mono leading-relaxed placeholder:text-gray-500"
                    placeholder={`Paste Google Drive file share links or image URLs here (one link per line or separated by commas):\n\nExample:\nhttps://drive.google.com/file/d/1ALfph18adVjHilgMDN3pyxYEHKZwYq4M/view\nhttps://drive.google.com/file/d/1B2c3D4e5F6g7H8i9J0k/view`}
                    value={bulkUrlsInput}
                    onChange={(e) => setBulkUrlsInput(e.target.value)}
                  />
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-[11px] text-text-dimmed leading-relaxed flex flex-col gap-1">
                    <span className="font-semibold text-white">💡 How Google Drive Import Works:</span>
                    <span>1. Open your Google Drive folder and right-click any photo (or select all) → click <b>"Copy Link"</b>.</span>
                    <span>2. Make sure file access is set to <b>"Anyone with the link can view"</b>.</span>
                    <span>3. Paste the share link(s) above — our parser automatically converts them to direct high-res images!</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-text-dimmed uppercase tracking-wider flex items-center gap-1.5">
                    <UploadCloud size={14} className="text-primary" /> Select Multiple Files from Device
                  </label>
                  <input
                    ref={bulkFileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      const filesArray = Array.from(e.target.files || []);
                      setBulkFiles(filesArray);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => bulkFileInputRef.current?.click()}
                    className="flex flex-col items-center justify-center gap-2 w-full py-8 border-2 border-dashed border-white/20 rounded-xl text-sm text-text-dimmed hover:border-primary hover:text-primary transition-all cursor-pointer bg-white/5"
                  >
                    <UploadCloud size={32} className="text-primary" />
                    <span className="font-semibold text-white">
                      {bulkFiles.length > 0
                        ? `Selected ${bulkFiles.length} file(s)`
                        : 'Click to select multiple photos'}
                    </span>
                    <span className="text-xs text-text-dimmed">Supports PNG, JPG, WEBP formats</span>
                  </button>

                  {bulkFiles.length > 0 && (
                    <div className="mt-2 max-h-32 overflow-y-auto p-2 bg-black/20 rounded-xl border border-white/10 flex flex-col gap-1">
                      {bulkFiles.map((file, i) => (
                        <div key={i} className="text-xs text-text-dimmed truncate flex justify-between">
                          <span>{i + 1}. {file.name}</span>
                          <span>{(file.size / 1024).toFixed(1)} KB</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Progress & Feedback */}
              {bulkProgress && (
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary/10 border border-primary/30 text-primary text-xs font-semibold animate-pulse">
                  <span className="w-3.5 h-3.5 border-2 border-primary border-t-transparent rounded-full animate-spin shrink-0" />
                  <span>{bulkProgress}</span>
                </div>
              )}

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
                  onClick={() => {
                    setIsBulkGalleryModalOpen(false);
                    setModalError('');
                    setModalSuccess('');
                    setBulkProgress('');
                  }}
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
                  {modalSubmitting ? 'Importing...' : 'Import All Photos'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
