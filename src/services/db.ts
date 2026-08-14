import { createClient } from '@supabase/supabase-js';
import { upcomingEventsData, pastEventsData, sermonsData, galleryData } from '../data/churchData';
import type { Sermon, ChurchEvent, GalleryItem } from '../data/churchData';
import homepageImg from '../assets/homepage.jpg';
import sermonImg from '../assets/sermonImg.jpg';

const supabaseUrl = "https://gahpkckwjxdetfugdyos.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhaHBrY2t3anhkZXRmdWdkeW9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY1NDI0MjYsImV4cCI6MjEwMjExODQyNn0.ObXLJ3dppHI9XOkIqd6vWKv-7P_HRHUMDAuWTIQyQlI";

// Check if credentials exist
const isSupabaseConfigured = true;

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Types for additional models
export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  created_at: string;
}

export interface EventRegistration {
  id: string;
  event_id: string;
  name: string;
  email: string;
  created_at: string;
}

// Local Storage helper keys
const KEYS = {
  EVENTS: 'lightup_events',
  SERMONS: 'lightup_sermons',
  GALLERY: 'lightup_gallery',
  CONTACTS: 'lightup_contacts',
  NEWSLETTER: 'lightup_newsletter',
  REGISTRATIONS: 'lightup_registrations',
  ADMIN_AUTH: 'lightup_admin_auth',
};

// Initialize LocalStorage with real churchData if empty or holding outdated placeholders
const initLocalStorage = () => {
  if (typeof window === 'undefined') return;

  const storedEvents = localStorage.getItem(KEYS.EVENTS);
  if (!storedEvents || storedEvents === '[]' || storedEvents.includes('Prayer Office')) {
    const allEvents = [
      ...upcomingEventsData.map(e => ({ ...e })),
      ...pastEventsData.map(e => ({ ...e }))
    ];
    localStorage.setItem(KEYS.EVENTS, JSON.stringify(allEvents));
  }

  const storedSermons = localStorage.getItem(KEYS.SERMONS);
  if (!storedSermons || storedSermons === '[]' || storedSermons.includes('Building your life by the Word') || storedSermons.includes('Walking in the Light')) {
    localStorage.setItem(KEYS.SERMONS, JSON.stringify(sermonsData));
  }

  const storedGallery = localStorage.getItem(KEYS.GALLERY);
  if (!storedGallery || storedGallery === '[]' || !storedGallery.includes('arise-')) {
    localStorage.setItem(KEYS.GALLERY, JSON.stringify(galleryData));
  }

  if (!localStorage.getItem(KEYS.CONTACTS)) {
    localStorage.setItem(KEYS.CONTACTS, JSON.stringify([]));
  }
  if (!localStorage.getItem(KEYS.NEWSLETTER)) {
    localStorage.setItem(KEYS.NEWSLETTER, JSON.stringify([]));
  }
  if (!localStorage.getItem(KEYS.REGISTRATIONS)) {
    localStorage.setItem(KEYS.REGISTRATIONS, JSON.stringify([]));
  }
};

initLocalStorage();

export const dbService = {
  // --- AUTHENTICATION ---
  async loginAdmin(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return { success: false, error: error.message };
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err.message || 'An error occurred during authentication.' };
      }
    } else {
      // Fallback auth
      if (email.includes('admin') && password === 'admin123') {
        localStorage.setItem(KEYS.ADMIN_AUTH, JSON.stringify({ email, authenticated: true }));
        return { success: true };
      }
      return { success: false, error: 'Invalid admin credentials. Use admin email and password "admin123".' };
    }
  },

  async logoutAdmin(): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem(KEYS.ADMIN_AUTH);
    }
  },

  async isAdminAuthenticated(): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        return !!session;
      } catch {
        return false;
      }
    } else {
      const auth = localStorage.getItem(KEYS.ADMIN_AUTH);
      if (auth) {
        try {
          return JSON.parse(auth).authenticated === true;
        } catch {
          return false;
        }
      }
      return false;
    }
  },

  // --- EVENTS ---
  async getEvents(): Promise<ChurchEvent[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          return data.map(e => ({
            id: e.id,
            title: e.title,
            date: e.date,
            time: e.time,
            description: e.description,
            location: e.location,
            image: e.image,
            isUpcoming: e.is_upcoming,
            monthYear: e.month_year,
            videoUrl: e.video_url
          }));
        }
      } catch (err) {
        console.error('Error fetching events from Supabase:', err);
      }
    }
    const events = localStorage.getItem(KEYS.EVENTS);
    const parsed = events ? JSON.parse(events) : [];
    return parsed.length > 0 ? parsed : [...upcomingEventsData, ...pastEventsData];
  },

  async createEvent(event: Omit<ChurchEvent, 'id'>): Promise<ChurchEvent> {
    const newEvent = { ...event, id: crypto.randomUUID() };
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('events')
        .insert([{
          title: event.title,
          date: event.date,
          time: event.time,
          description: event.description,
          location: event.location,
          image: event.image,
          is_upcoming: event.isUpcoming,
          month_year: event.monthYear,
          video_url: event.videoUrl || null
        }])
        .select();
      if (error) throw error;
      return {
        id: data[0].id,
        title: data[0].title,
        date: data[0].date,
        time: data[0].time,
        description: data[0].description,
        location: data[0].location,
        image: data[0].image,
        isUpcoming: data[0].is_upcoming,
        monthYear: data[0].month_year,
        videoUrl: data[0].video_url
      };
    } else {
      const events = await this.getEvents();
      events.unshift(newEvent);
      localStorage.setItem(KEYS.EVENTS, JSON.stringify(events));
      return newEvent;
    }
  },

  async updateEvent(id: string, event: Partial<ChurchEvent>): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      const updateData: any = {};
      if (event.title !== undefined) updateData.title = event.title;
      if (event.date !== undefined) updateData.date = event.date;
      if (event.time !== undefined) updateData.time = event.time;
      if (event.description !== undefined) updateData.description = event.description;
      if (event.location !== undefined) updateData.location = event.location;
      if (event.image !== undefined) updateData.image = event.image;
      if (event.isUpcoming !== undefined) updateData.is_upcoming = event.isUpcoming;
      if (event.monthYear !== undefined) updateData.month_year = event.monthYear;
      if (event.videoUrl !== undefined && event.videoUrl !== '') updateData.video_url = event.videoUrl;

      const { error } = await supabase
        .from('events')
        .update(updateData)
        .eq('id', id);
      if (error) throw error;
    } else {
      const events = await this.getEvents();
      const updated = events.map(e => e.id === id ? { ...e, ...event } : e);
      localStorage.setItem(KEYS.EVENTS, JSON.stringify(updated));
    }
  },

  async deleteEvent(id: string): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);
      if (error) throw error;
    } else {
      const events = await this.getEvents();
      const filtered = events.filter(e => e.id !== id);
      localStorage.setItem(KEYS.EVENTS, JSON.stringify(filtered));
    }
  },

  // --- EVENT REGISTRATIONS ---
  async getEventRegistrations(): Promise<EventRegistration[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('event_registrations')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } else {
      const regs = localStorage.getItem(KEYS.REGISTRATIONS);
      return regs ? JSON.parse(regs) : [];
    }
  },

  async registerForEvent(eventId: string, name: string, email: string): Promise<EventRegistration> {
    const newReg: EventRegistration = {
      id: crypto.randomUUID(),
      event_id: eventId,
      name,
      email,
      created_at: new Date().toISOString()
    };
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('event_registrations')
        .insert([{
          event_id: eventId,
          name,
          email
        }])
        .select();
      if (error) throw error;
      return data[0];
    } else {
      const regs = await this.getEventRegistrations();
      regs.unshift(newReg);
      localStorage.setItem(KEYS.REGISTRATIONS, JSON.stringify(regs));
      return newReg;
    }
  },

  // --- SERMONS ---
  async getSermons(): Promise<Sermon[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('sermons')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          return data.map(s => {
            let thumb = s.thumbnail;
            if (!thumb || thumb.includes('homepage.jpg')) {
              thumb = homepageImg;
            } else if (thumb.includes('sermonImg.jpg') || thumb.includes('sermon.jpg')) {
              thumb = sermonImg;
            }
            return {
              id: s.id,
              title: s.title,
              speaker: s.speaker,
              date: s.date,
              duration: s.duration,
              thumbnail: thumb,
              videoUrl: s.video_url
            };
          });
        }
      } catch (err) {
        console.error('Error fetching sermons from Supabase:', err);
      }
    }
    const sermons = localStorage.getItem(KEYS.SERMONS);
    const parsed = sermons ? JSON.parse(sermons) : [];
    return parsed.length > 0 ? parsed : sermonsData;
  },

  async createSermon(sermon: Omit<Sermon, 'id'>): Promise<Sermon> {
    const newSermon = { ...sermon, id: crypto.randomUUID() };
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('sermons')
        .insert([{
          title: sermon.title,
          speaker: sermon.speaker,
          date: sermon.date,
          duration: sermon.duration,
          thumbnail: sermon.thumbnail,
          video_url: sermon.videoUrl
        }])
        .select();
      if (error) throw error;
      return {
        id: data[0].id,
        title: data[0].title,
        speaker: data[0].speaker,
        date: data[0].date,
        duration: data[0].duration,
        thumbnail: data[0].thumbnail,
        videoUrl: data[0].video_url
      };
    } else {
      const sermons = await this.getSermons();
      sermons.unshift(newSermon);
      localStorage.setItem(KEYS.SERMONS, JSON.stringify(sermons));
      return newSermon;
    }
  },

  async updateSermon(id: string, sermon: Partial<Sermon>): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      const updateData: any = {};
      if (sermon.title !== undefined) updateData.title = sermon.title;
      if (sermon.speaker !== undefined) updateData.speaker = sermon.speaker;
      if (sermon.date !== undefined) updateData.date = sermon.date;
      if (sermon.duration !== undefined) updateData.duration = sermon.duration;
      if (sermon.thumbnail !== undefined) updateData.thumbnail = sermon.thumbnail;
      if (sermon.videoUrl !== undefined) updateData.video_url = sermon.videoUrl;

      const { error } = await supabase
        .from('sermons')
        .update(updateData)
        .eq('id', id);
      if (error) throw error;
    } else {
      const sermons = await this.getSermons();
      const updated = sermons.map(s => s.id === id ? { ...s, ...sermon } : s);
      localStorage.setItem(KEYS.SERMONS, JSON.stringify(updated));
    }
  },

  async deleteSermon(id: string): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from('sermons')
        .delete()
        .eq('id', id);
      if (error) throw error;
    } else {
      const sermons = await this.getSermons();
      const filtered = sermons.filter(s => s.id !== id);
      localStorage.setItem(KEYS.SERMONS, JSON.stringify(filtered));
    }
  },

  // --- GALLERY ---
  async getGalleryItems(): Promise<GalleryItem[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('gallery')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          return data.map(g => ({
            id: g.id,
            title: g.title,
            image: g.image,
            aspectRatio: g.aspect_ratio
          }));
        }
      } catch (err) {
        console.error('Error fetching gallery from Supabase:', err);
      }
    }
    const items = localStorage.getItem(KEYS.GALLERY);
    const parsed = items ? JSON.parse(items) : [];
    return parsed.length > 0 ? parsed : galleryData;
  },

  async createGalleryItem(item: Omit<GalleryItem, 'id'>): Promise<GalleryItem> {
    const newItem = { ...item, id: crypto.randomUUID() };
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('gallery')
        .insert([{
          title: item.title,
          image: item.image,
          aspect_ratio: item.aspectRatio
        }])
        .select();
      if (error) throw error;
      return {
        id: data[0].id,
        title: data[0].title,
        image: data[0].image,
        aspectRatio: data[0].aspect_ratio
      };
    } else {
      const items = await this.getGalleryItems();
      items.unshift(newItem);
      localStorage.setItem(KEYS.GALLERY, JSON.stringify(items));
      return newItem;
    }
  },

  async createGalleryItemsBatch(items: Array<Omit<GalleryItem, 'id'>>): Promise<void> {
    if (items.length === 0) return;
    if (isSupabaseConfigured && supabase) {
      try {
        const rows = items.map(item => ({
          title: item.title,
          image: item.image,
          aspect_ratio: item.aspectRatio
        }));
        const { error } = await supabase.from('gallery').insert(rows);
        if (!error) return;
        console.warn('Supabase insert warning, falling back to LocalStorage:', error);
      } catch (err) {
        console.warn('Supabase insert failed, falling back to LocalStorage:', err);
      }
    }
    const existing = await this.getGalleryItems();
    const newItems = items.map(item => ({ ...item, id: crypto.randomUUID() }));
    const updated = [...newItems, ...existing];
    localStorage.setItem(KEYS.GALLERY, JSON.stringify(updated));
  },

  async deleteGalleryItem(id: string): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);
      if (error) throw error;
    } else {
      const items = await this.getGalleryItems();
      const filtered = items.filter(g => g.id !== id);
      localStorage.setItem(KEYS.GALLERY, JSON.stringify(filtered));
    }
  },

  async deleteGalleryItemsBatch(ids: string[]): Promise<void> {
    if (ids.length === 0) return;
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from('gallery')
        .delete()
        .in('id', ids);
      if (error) throw error;
    } else {
      const items = await this.getGalleryItems();
      const filtered = items.filter(g => !ids.includes(g.id));
      localStorage.setItem(KEYS.GALLERY, JSON.stringify(filtered));
    }
  },

  // --- CONTACT SUBMISSIONS ---
  async getContactSubmissions(): Promise<ContactSubmission[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('contact_submissions')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) {
          console.warn('Supabase fetch error, fallback to localStorage', error);
          const list = localStorage.getItem(KEYS.CONTACTS);
          return list ? JSON.parse(list) : [];
        }
        return data || [];
      } catch (e) {
        const list = localStorage.getItem(KEYS.CONTACTS);
        return list ? JSON.parse(list) : [];
      }
    } else {
      const submissions = localStorage.getItem(KEYS.CONTACTS);
      return submissions ? JSON.parse(submissions) : [];
    }
  },

  async submitContactForm(name: string, email: string, message: string): Promise<ContactSubmission> {
    const submission: ContactSubmission = {
      id: crypto.randomUUID(),
      name,
      email,
      message,
      created_at: new Date().toISOString()
    };
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('contact_submissions')
          .insert([{ name, email, message }])
          .select();
        if (error) {
          console.warn('Supabase insert error,, fallback to localStorage', error);
          const list = JSON.parse(localStorage.getItem(KEYS.CONTACTS) || '[]');
          list.unshift(submission);
          localStorage.setItem(KEYS.CONTACTS, JSON.stringify(list));
          return submission;
        }
        return data[0];
      } catch (e) {
        console.warn('Supabase insert error, fallback to localStorage', e);
        const list = JSON.parse(localStorage.getItem(KEYS.CONTACTS) || '[]');
        list.unshift(submission);
        localStorage.setItem(KEYS.CONTACTS, JSON.stringify(list));
        return submission;
      }
    } else {
      const submissions = await this.getContactSubmissions();
      submissions.unshift(submission);
      localStorage.setItem(KEYS.CONTACTS, JSON.stringify(submissions));
      return submission;
    }
  },

  // --- NEWSLETTER SUBSCRIBERS ---
  async getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('newsletter_subscribers')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) {
          console.warn('Supabase fetch error, fallback to localStorage', error);
          const list = localStorage.getItem(KEYS.NEWSLETTER);
          return list ? JSON.parse(list) : [];
        }
        return data || [];
      } catch (e) {
        const list = localStorage.getItem(KEYS.NEWSLETTER);
        return list ? JSON.parse(list) : [];
      }
    } else {
      const algorithm = localStorage.getItem(KEYS.NEWSLETTER);
      return algorithm ? JSON.parse(algorithm) : [];
    }
  },

  async subscribeNewsletter(email: string): Promise<NewsletterSubscriber> {
    const subscriber: NewsletterSubscriber = {
      id: crypto.randomUUID(),
      email,
      created_at: new Date().toISOString()
    };
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('newsletter_subscribers')
          .insert([{ email }])
          .select();
        if (error) {
          console.warn('Supabase insert error, fallback to localStorage', error);
          const list: NewsletterSubscriber[] = JSON.parse(localStorage.getItem(KEYS.NEWSLETTER) || '[]');
          const exists = list.find(s => s.email.toLowerCase() === email.toLowerCase());
          if (exists) return exists;
          list.unshift(subscriber);
          localStorage.setItem(KEYS.NEWSLETTER, JSON.stringify(list));
          return subscriber;
        }
        return data[0];
      } catch (e) {
        console.warn('Supabase insert error, fallback to localStorage', e);
        const list: NewsletterSubscriber[] = JSON.parse(localStorage.getItem(KEYS.NEWSLETTER) || '[]');
        const exists = list.find(s => s.email.toLowerCase() === email.toLowerCase());
        if (exists) return exists;
        list.unshift(subscriber);
        localStorage.setItem(KEYS.NEWSLETTER, JSON.stringify(list));
        return subscriber;
      }
    } else {
      const subs = await this.getNewsletterSubscribers();
      const exists = subs.find(s => s.email.toLowerCase() === email.toLowerCase());
      if (exists) return exists;
      subs.unshift(subscriber);
      localStorage.setItem(KEYS.NEWSLETTER, JSON.stringify(subs));
      return subscriber;
    }
  }
};
