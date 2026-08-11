export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
}

export interface Ministry {
  id: string;
  title: string;
  office: string;
  description: string;
  details: string;
  image: string;
}

export interface ChurchEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  monthYear?: string; // used for past events e.g. "June 2026"
  description: string;
  location: string;
  image: string;
  isUpcoming: boolean;
  status?: 'attend' | 'registered' | 'ended';
}

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  aspectRatio: 'vertical' | 'horizontal' | 'square';
}

// Using homepage.jpg as a reliable base asset since it represents the actual congregation
import homepageImg from '../assets/homepage.jpg';
import ministry from '../assets/ministry.jpeg';
import sermon from '../assets/sermon.jpg';

export const ministriesData: Ministry[] = [
  {
    id: '1',
    title: 'Prayer & Meditation',
    office: 'PRAYER OFFICE',
    description: 'A Christ-centered ministry dedicated to raising believers through prayer, spiritual devotion, and deep biblical meditation.',
    details: 'Our prayer office coordinates weekly prayer sessions, personal retreat guidance, and specialized spiritual warfare intercession plans to help believers grow in intimacy with God.',
    image: ministry
  },
  {
    id: '2',
    title: 'Discipleship & Training',
    office: 'MISSION OFFICE',
    description: 'A Christ-centered ministry dedicated to raising kingdom ambassadors through rigorous discipleship, mentorship, and mission outposts.',
    details: 'The Mission Office runs classes designed to equip believers to effectively share the gospel and lead teams in local and international outreach projects.',
    image: ministry
  },
  {
    id: '3',
    title: 'Community Impact & Outreach',
    office: 'OUTREACH OFFICE',
    description: 'A Christ-centered ministry dedicated to raising believers through social impact, community welfare outreach, and marketplace transformation.',
    details: 'We support local families, organize medical outreach clinics, and establish career mentoring platforms to shine the light of Christ in practical everyday ways.',
    image: ministry
  }
];

export const upcomingEventsData: ChurchEvent[] = [
  {
    id: 'e1',
    title: 'Prayer and Meditation',
    date: 'Mon, 18 Oct',
    time: '9:00 AM',
    description: 'Align your spirit with God\'s word. A dedicated time of silent meditation, corporate worship, and powerful intercessory prayers.',
    location: 'Prayer Office',
    image: homepageImg,
    isUpcoming: true
  },
  {
    id: 'e2',
    title: 'Monthly Prayer',
    date: 'Fri, 22 Oct',
    time: '6:00 PM',
    description: 'Join the entire Christian network for our monthly convergence. A night of intense prayer, deep worship, and prophetic declarations.',
    location: 'Main Hall',
    image: homepageImg,
    isUpcoming: true
  },
  {
    id: 'e3',
    title: 'Prayer and Meditation',
    date: 'Sun, 24 Oct',
    time: '8:00 AM',
    description: 'Begin the week in His presence. Seek His guidance and draw spiritual strength through collective prayers and scriptural insights.',
    location: 'Prayer Office',
    image: homepageImg,
    isUpcoming: true
  }
];

export const pastEventsData: ChurchEvent[] = [
  {
    id: 'pe1',
    title: 'Arise Congress \'26',
    date: '',
    time: '',
    monthYear: 'June 2026',
    description: 'An international gathering of believers focused on raising kingdom ambassadors to transform spheres of influence worldwide.',
    location: 'Texas, USA',
    image: homepageImg,
    isUpcoming: false
  },
  {
    id: 'pe2',
    title: 'Arise Congress \'25',
    date: '',
    time: '',
    monthYear: 'June 2025',
    description: 'Empowering the church for active discipleship and cross-cultural outreach. Highlights include impactful workshops and keynote addresses.',
    location: 'Texas, USA',
    image: homepageImg,
    isUpcoming: false
  },
  {
    id: 'pe3',
    title: 'Arise Congress \'24',
    date: '',
    time: '',
    monthYear: 'June 2024',
    description: 'Our foundational gathering of kingdom partners. Exploring spiritual alignment and taking action in marketplace ministry.',
    location: 'Texas, USA',
    image: homepageImg,
    isUpcoming: false
  }
];

export const sermonsData: Sermon[] = [
  {
    id: 's1',
    title: 'Building your life by the Word',
    speaker: 'Julianah Olu-Ajadi',
    date: '01.07.2026',
    duration: '17:13 mins',
    thumbnail: sermon,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 's2',
    title: 'Building your life by the Word',
    speaker: 'Julianah Olu-Ajadi',
    date: '02.07.2026',
    duration: '17:13 mins',
    thumbnail: sermon,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 's3',
    title: 'Building your life by the Word',
    speaker: 'Julianah Olu-Ajadi',
    date: '03.07.2026',
    duration: '17:13 mins',
    thumbnail: sermon,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 's4',
    title: 'Building your life by the Word',
    speaker: 'Julianah Olu-Ajadi',
    date: '04.07.2026',
    duration: '17:13 mins',
    thumbnail: sermon,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 's5',
    title: 'Building your life by the Word',
    speaker: 'Julianah Olu-Ajadi',
    date: '05.07.2026',
    duration: '17:13 mins',
    thumbnail: sermon,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 's6',
    title: 'Building your life by the Word',
    speaker: 'Julianah Olu-Ajadi',
    date: '06.07.2026',
    duration: '17:13 mins',
    thumbnail: sermon,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 's7',
    title: 'Building your life by the Word',
    speaker: 'Julianah Olu-Ajadi',
    date: '07.07.2026',
    duration: '17:13 mins',
    thumbnail: sermon,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 's8',
    title: 'Building your life by the Word',
    speaker: 'Julianah Olu-Ajadi',
    date: '08.07.2026',
    duration: '17:13 mins',
    thumbnail: sermon,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 's9',
    title: 'Building your life by the Word',
    speaker: 'Julianah Olu-Ajadi',
    date: '09.07.2026',
    duration: '17:13 mins',
    thumbnail: sermon,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
];

export const galleryData: GalleryItem[] = [
  { id: 'g1', title: 'Worship Session', image: homepageImg, aspectRatio: 'vertical' },
  { id: 'g2', title: 'Congregation Gathering', image: homepageImg, aspectRatio: 'horizontal' },
  { id: 'g3', title: 'Prayer Circle', image: homepageImg, aspectRatio: 'vertical' },
  { id: 'g4', title: 'Teaching Hour', image: homepageImg, aspectRatio: 'square' },
  { id: 'g5', title: 'Fellowship Time', image: homepageImg, aspectRatio: 'vertical' },
  { id: 'g6', title: 'Youth Group Ministry', image: homepageImg, aspectRatio: 'horizontal' },
  { id: 'g7', title: 'Leadership Summit', image: homepageImg, aspectRatio: 'square' },
  { id: 'g8', title: 'Praise and Testimony', image: homepageImg, aspectRatio: 'vertical' },
  { id: 'g9', title: 'Community Outreach', image: homepageImg, aspectRatio: 'horizontal' }
];
