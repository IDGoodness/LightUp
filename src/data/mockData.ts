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
  videoUrl?: string;  // optional YouTube highlights embed URL for past events
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
  { id: 'arise-1', title: 'ARISE Conference Photo 1', image: 'https://lh3.googleusercontent.com/d/1JjZARNmlk7-xOL50QB-x8K4LsrkLLCtD', aspectRatio: 'vertical' },
  { id: 'arise-2', title: 'ARISE Conference Photo 2', image: 'https://lh3.googleusercontent.com/d/16ff1yfgzbYcdvmQ7LVsPsgbDLLW3bwQr', aspectRatio: 'horizontal' },
  { id: 'arise-3', title: 'ARISE Conference Photo 3', image: 'https://lh3.googleusercontent.com/d/157zDao6s98brjS6ORQGzfZyMIccgmX5B', aspectRatio: 'square' },
  { id: 'arise-4', title: 'ARISE Conference Photo 4', image: 'https://lh3.googleusercontent.com/d/1NcTP1jp85eoDdCr_yibl4agHSDYd5-Od', aspectRatio: 'vertical' },
  { id: 'arise-5', title: 'ARISE Conference Photo 5', image: 'https://lh3.googleusercontent.com/d/1bJ2xPXSgi2A4IkiUDBwWKv_DFVwGxK5C', aspectRatio: 'square' },
  { id: 'arise-6', title: 'ARISE Conference Photo 6', image: 'https://lh3.googleusercontent.com/d/1eOq5vGcE8JFGGgEh2z8TLvqGqeXyMT4Y', aspectRatio: 'horizontal' },
  { id: 'arise-7', title: 'ARISE Conference Photo 7', image: 'https://lh3.googleusercontent.com/d/10xA6mk5mpZLkgZSlNERCF7l08GL5U2Ti', aspectRatio: 'vertical' },
  { id: 'arise-8', title: 'ARISE Conference Photo 8', image: 'https://lh3.googleusercontent.com/d/19Pbqn5557WkoG-QGK07fg3prbxHjJ-RK', aspectRatio: 'horizontal' },
  { id: 'arise-9', title: 'ARISE Conference Photo 9', image: 'https://lh3.googleusercontent.com/d/1z4rfxe9ggO9RDukGyswPKk8Bt4IoQrBY', aspectRatio: 'square' },
  { id: 'arise-10', title: 'ARISE Conference Photo 10', image: 'https://lh3.googleusercontent.com/d/1wjoNiPIqaWpkjCva16p-wMv6omV27k7N', aspectRatio: 'vertical' },
  { id: 'arise-11', title: 'ARISE Conference Photo 11', image: 'https://lh3.googleusercontent.com/d/1Gso_YRu5DFLEr1ceO4XCCGfUw1ybVU54', aspectRatio: 'square' },
  { id: 'arise-12', title: 'ARISE Conference Photo 12', image: 'https://lh3.googleusercontent.com/d/1KrUofTvjO98V9SHSt01-gYL_sHTBzUMx', aspectRatio: 'horizontal' },
  { id: 'arise-13', title: 'ARISE Conference Photo 13', image: 'https://lh3.googleusercontent.com/d/1LXeCL59hVm4oIdfcARuEARAV-BqhVurU', aspectRatio: 'vertical' },
  { id: 'arise-14', title: 'ARISE Conference Photo 14', image: 'https://lh3.googleusercontent.com/d/1EfFL-7N9zEb_Eb3TQ0fzt3V81_3qA5lK', aspectRatio: 'horizontal' },
  { id: 'arise-15', title: 'ARISE Conference Photo 15', image: 'https://lh3.googleusercontent.com/d/1L8bAs7zw5aCaEu4rR1E3y-A8e4-EzU_4', aspectRatio: 'square' },
  { id: 'arise-16', title: 'ARISE Conference Photo 16', image: 'https://lh3.googleusercontent.com/d/1I-yfYQDBHBrfTJ8ocX8y5LOyHdIDuyZI', aspectRatio: 'vertical' },
  { id: 'arise-17', title: 'ARISE Conference Photo 17', image: 'https://lh3.googleusercontent.com/d/1yVxYFL64rRjr-s67xHR_rjX7JXpm6FhB', aspectRatio: 'square' },
  { id: 'arise-18', title: 'ARISE Conference Photo 18', image: 'https://lh3.googleusercontent.com/d/17Wq6N8cMSRnIQt9u0UNIEQOigGgoJrlN', aspectRatio: 'horizontal' },
  { id: 'arise-19', title: 'ARISE Conference Photo 19', image: 'https://lh3.googleusercontent.com/d/1p74V0j8R6SlKbhjoGfIWk0IucdS4qRMg', aspectRatio: 'vertical' },
  { id: 'arise-20', title: 'ARISE Conference Photo 20', image: 'https://lh3.googleusercontent.com/d/1L-jxA641HXveEbXSeygk0sOukJkzPjlu', aspectRatio: 'horizontal' },
  { id: 'arise-21', title: 'ARISE Conference Photo 21', image: 'https://lh3.googleusercontent.com/d/1pAf3PWUpHQk9X-l5FvpPCjPhsDFjBYT6', aspectRatio: 'square' },
  { id: 'arise-22', title: 'ARISE Conference Photo 22', image: 'https://lh3.googleusercontent.com/d/1Dgrik7h2naVj4ClLnzxZTexpaA6XvTkS', aspectRatio: 'vertical' },
  { id: 'arise-23', title: 'ARISE Conference Photo 23', image: 'https://lh3.googleusercontent.com/d/1v5B0eZq7yPGqi5kDEweHPzjurefEOs_e', aspectRatio: 'square' },
  { id: 'arise-24', title: 'ARISE Conference Photo 24', image: 'https://lh3.googleusercontent.com/d/1wIF3xl44SMZqamx0miX4r8ZxKiah-9_R', aspectRatio: 'horizontal' },
  { id: 'arise-25', title: 'ARISE Conference Photo 25', image: 'https://lh3.googleusercontent.com/d/1xUvXxoFwlwPJmC41iAOr73b6jhtNaW3S', aspectRatio: 'vertical' },
  { id: 'arise-26', title: 'ARISE Conference Photo 26', image: 'https://lh3.googleusercontent.com/d/1XOmu6C9j5q6t4Pr8hAn6cy9i9svpMLAO', aspectRatio: 'horizontal' },
  { id: 'arise-27', title: 'ARISE Conference Photo 27', image: 'https://lh3.googleusercontent.com/d/1QywPr2O6QkiH8IHskMxuMjZwtpLdmNOK', aspectRatio: 'square' },
  { id: 'arise-28', title: 'ARISE Conference Photo 28', image: 'https://lh3.googleusercontent.com/d/1-X9SzClKG2B6cep2twSrL9LgBfuxWM0c', aspectRatio: 'vertical' },
  { id: 'arise-29', title: 'ARISE Conference Photo 29', image: 'https://lh3.googleusercontent.com/d/1CD96R-aLR_5xe1vz2Wy0dYtNlvLaNjbJ', aspectRatio: 'square' },
  { id: 'arise-30', title: 'ARISE Conference Photo 30', image: 'https://lh3.googleusercontent.com/d/1kphK5nyP8Mo_11IRdFf3Vpk7p2c4-foC', aspectRatio: 'horizontal' },
  { id: 'arise-31', title: 'ARISE Conference Photo 31', image: 'https://lh3.googleusercontent.com/d/1oAT7Mg76hxEX5vyxm3tnfcX2TM-8KhAd', aspectRatio: 'vertical' },
  { id: 'arise-32', title: 'ARISE Conference Photo 32', image: 'https://lh3.googleusercontent.com/d/1NaZf6FDzmmb1gILUSHz6_iOIzAFGx9Mp', aspectRatio: 'horizontal' },
  { id: 'arise-33', title: 'ARISE Conference Photo 33', image: 'https://lh3.googleusercontent.com/d/1VoUHltEvqqRj1GEF2IybHZr7uQNkgxGD', aspectRatio: 'square' },
  { id: 'arise-34', title: 'ARISE Conference Photo 34', image: 'https://lh3.googleusercontent.com/d/19N60dnucAOD5vBIyiFx_JYfsWzPIr6VA', aspectRatio: 'vertical' },
  { id: 'arise-35', title: 'ARISE Conference Photo 35', image: 'https://lh3.googleusercontent.com/d/1Tdpu2DBz53e3-0LvwRy-aZE-87aSwFA9', aspectRatio: 'square' },
  { id: 'arise-36', title: 'ARISE Conference Photo 36', image: 'https://lh3.googleusercontent.com/d/1nF0g0itm33sY12434Jgcs77-9J1Qyprg', aspectRatio: 'horizontal' },
  { id: 'arise-37', title: 'ARISE Conference Photo 37', image: 'https://lh3.googleusercontent.com/d/1Vb3p96Qq3WZuISxGu9zanNHkNY99m3rQ', aspectRatio: 'vertical' },
  { id: 'arise-38', title: 'ARISE Conference Photo 38', image: 'https://lh3.googleusercontent.com/d/149eqKUJYvvXuEFEMhLbatIz8UvGpWJFu', aspectRatio: 'horizontal' },
  { id: 'arise-39', title: 'ARISE Conference Photo 39', image: 'https://lh3.googleusercontent.com/d/1JmTRnGtzhg699HejyWKNPtV7j6xWHpLE', aspectRatio: 'square' },
  { id: 'arise-40', title: 'ARISE Conference Photo 40', image: 'https://lh3.googleusercontent.com/d/1I4tXFxuCqtMd4JQEUbNXCoa0dUgF_6Mk', aspectRatio: 'vertical' },
  { id: 'arise-41', title: 'ARISE Conference Photo 41', image: 'https://lh3.googleusercontent.com/d/1C5qqKkaNLRs7o0AAMyZ9KrR1wi6J3EAx', aspectRatio: 'square' },
  { id: 'arise-42', title: 'ARISE Conference Photo 42', image: 'https://lh3.googleusercontent.com/d/1jZqNPiYb6IenHrBFF7y-yswsVPFAYolP', aspectRatio: 'horizontal' },
  { id: 'arise-43', title: 'ARISE Conference Photo 43', image: 'https://lh3.googleusercontent.com/d/1uUItJTenUumtEnJSjVyU9viT1Y3toWLc', aspectRatio: 'vertical' },
  { id: 'arise-44', title: 'ARISE Conference Photo 44', image: 'https://lh3.googleusercontent.com/d/1hDIDOn6Oh3xvcUd7L_qj8rsTBXnPtHhd', aspectRatio: 'horizontal' },
  { id: 'arise-45', title: 'ARISE Conference Photo 45', image: 'https://lh3.googleusercontent.com/d/1kSTe7rbHfmA4e8Hd4mKaXH3gCUcRin_S', aspectRatio: 'square' },
  { id: 'arise-46', title: 'ARISE Conference Photo 46', image: 'https://lh3.googleusercontent.com/d/11BBniHIXbPAaOa6ESmruj0kgM2v6-SuH', aspectRatio: 'vertical' },
  { id: 'arise-47', title: 'ARISE Conference Photo 47', image: 'https://lh3.googleusercontent.com/d/1z930ryOfJ5VNqGYHFN0DP119qe3B7zvC', aspectRatio: 'square' },
  { id: 'arise-48', title: 'ARISE Conference Photo 48', image: 'https://lh3.googleusercontent.com/d/1zsv3C8uUfQwFd7OTTm24DbQetUgKN84l', aspectRatio: 'horizontal' },
  { id: 'arise-49', title: 'ARISE Conference Photo 49', image: 'https://lh3.googleusercontent.com/d/1Jaee3MFaI-PVHcUGbrYbLCw7TPPkmzL4', aspectRatio: 'vertical' },
  { id: 'arise-50', title: 'ARISE Conference Photo 50', image: 'https://lh3.googleusercontent.com/d/1Lw_La67YBMNHd6Ayq8B82ESCSLQOZc6S', aspectRatio: 'horizontal' },
  { id: 'arise-51', title: 'ARISE Conference Photo 51', image: 'https://lh3.googleusercontent.com/d/15aIZnCXlYUDAjlILRysZ1VejsTSTdMNr', aspectRatio: 'square' },
  { id: 'arise-52', title: 'ARISE Conference Photo 52', image: 'https://lh3.googleusercontent.com/d/1cTCrGMGBj9LXS048-K3mBqWZc6EYrBxZ', aspectRatio: 'vertical' },
  { id: 'arise-53', title: 'ARISE Conference Photo 53', image: 'https://lh3.googleusercontent.com/d/1gYW6QuHPkMLOOp2cmTyU0hfiXPFY49Z1', aspectRatio: 'square' },
  { id: 'arise-54', title: 'ARISE Conference Photo 54', image: 'https://lh3.googleusercontent.com/d/1MJhjufRkoWuYJ9u9-gBCSVB1y_zWkkru', aspectRatio: 'horizontal' },
  { id: 'arise-55', title: 'ARISE Conference Photo 55', image: 'https://lh3.googleusercontent.com/d/1a-hgJyW2abAMsKjnNSHl0j8bCv74CPfi', aspectRatio: 'vertical' },
  { id: 'arise-56', title: 'ARISE Conference Photo 56', image: 'https://lh3.googleusercontent.com/d/188dGtULb_iY37L_SssPCG2jMGsoJ3iCh', aspectRatio: 'horizontal' },
  { id: 'arise-57', title: 'ARISE Conference Photo 57', image: 'https://lh3.googleusercontent.com/d/19buhgh7gwH2fFv9Dz35GfZ7_XV7CE7Vw', aspectRatio: 'square' },
  { id: 'arise-58', title: 'ARISE Conference Photo 58', image: 'https://lh3.googleusercontent.com/d/1BE_RX9GmdQ7PHh5VPpdeaWLlB4zewgLY', aspectRatio: 'vertical' },
  { id: 'arise-59', title: 'ARISE Conference Photo 59', image: 'https://lh3.googleusercontent.com/d/1urAhmgW1IiViiplOrTAla7lvLkQYOQOA', aspectRatio: 'square' },
  { id: 'arise-60', title: 'ARISE Conference Photo 60', image: 'https://lh3.googleusercontent.com/d/1EeHJ-4oUl4mI4lffnxehPIOGaOHYvuSu', aspectRatio: 'horizontal' },
  { id: 'arise-61', title: 'ARISE Conference Photo 61', image: 'https://lh3.googleusercontent.com/d/12G1Rzcw2Cn-UwFAOQdCNyem82EbV4xLj', aspectRatio: 'vertical' },
  { id: 'arise-62', title: 'ARISE Conference Photo 62', image: 'https://lh3.googleusercontent.com/d/1Pof3O-65RvZu8e8rzhJdqNsE9HmuYHv9', aspectRatio: 'horizontal' },
  { id: 'arise-63', title: 'ARISE Conference Photo 63', image: 'https://lh3.googleusercontent.com/d/1z_qQdpqEqT4roSXgy1D9jFYYgDiiVEN7', aspectRatio: 'square' },
  { id: 'arise-64', title: 'ARISE Conference Photo 64', image: 'https://lh3.googleusercontent.com/d/1XaWaLnNND8SQvywbiSf_LzwJvuHp6pOS', aspectRatio: 'vertical' },
  { id: 'arise-65', title: 'ARISE Conference Photo 65', image: 'https://lh3.googleusercontent.com/d/1PYi1spiRwTMqu2LvqHmXY7Vg4OYSc8kq', aspectRatio: 'square' },
  { id: 'arise-66', title: 'ARISE Conference Photo 66', image: 'https://lh3.googleusercontent.com/d/1bPpHfnYCsvMJSaz2_Rt5DCWYqmi3qopT', aspectRatio: 'horizontal' },
  { id: 'arise-67', title: 'ARISE Conference Photo 67', image: 'https://lh3.googleusercontent.com/d/1ZfgFgTP-G3bGq754kNDlaz4fkq1xPf50', aspectRatio: 'vertical' },
  { id: 'arise-68', title: 'ARISE Conference Photo 68', image: 'https://lh3.googleusercontent.com/d/18xINPxys-8urgFoyem4VkOpXUKUDaKeF', aspectRatio: 'horizontal' },
  { id: 'arise-69', title: 'ARISE Conference Photo 69', image: 'https://lh3.googleusercontent.com/d/1gK_vd9USwPSj3snXfmjgOa02vDCPmUCj', aspectRatio: 'square' },
  { id: 'arise-70', title: 'ARISE Conference Photo 70', image: 'https://lh3.googleusercontent.com/d/1dgGWGgXTRLUoCiKoCojAoE8EvP-0-rqj', aspectRatio: 'vertical' },
  { id: 'arise-71', title: 'ARISE Conference Photo 71', image: 'https://lh3.googleusercontent.com/d/1UcBfQ5WCiFcTvH0OAlGov-go35fvTQnJ', aspectRatio: 'square' },
  { id: 'arise-72', title: 'ARISE Conference Photo 72', image: 'https://lh3.googleusercontent.com/d/1ZibLfP5INaspgVw-DH1EyfftP-oY6DyO', aspectRatio: 'horizontal' },
  { id: 'arise-73', title: 'ARISE Conference Photo 73', image: 'https://lh3.googleusercontent.com/d/14rXbciVJQAkApmnnMWxWJcA8XDgwWMA-', aspectRatio: 'vertical' },
  { id: 'arise-74', title: 'ARISE Conference Photo 74', image: 'https://lh3.googleusercontent.com/d/1g736E7iSn9tnZ9bsdz6KpqTvrEpxNbdv', aspectRatio: 'horizontal' },
  { id: 'arise-75', title: 'ARISE Conference Photo 75', image: 'https://lh3.googleusercontent.com/d/1BeaXf0fBDHheGvdQFFU46BUwM6qsF2M_', aspectRatio: 'square' },
  { id: 'arise-76', title: 'ARISE Conference Photo 76', image: 'https://lh3.googleusercontent.com/d/1fb5dQZpJUx0z_1Q9XEsVECeVrC9hLjAP', aspectRatio: 'vertical' },
  { id: 'arise-77', title: 'ARISE Conference Photo 77', image: 'https://lh3.googleusercontent.com/d/1mT9kfP50yaZjhuUgI9O8gmpB6MUeZucs', aspectRatio: 'square' },
  { id: 'arise-78', title: 'ARISE Conference Photo 78', image: 'https://lh3.googleusercontent.com/d/1tKQZvGyB8AZ1qQJa0yxrVtg1PLX0LGKM', aspectRatio: 'horizontal' },
  { id: 'arise-79', title: 'ARISE Conference Photo 79', image: 'https://lh3.googleusercontent.com/d/1d-7qYTJXVMVzDXGJYJL4svR6L58Pn6UV', aspectRatio: 'vertical' },
  { id: 'arise-80', title: 'ARISE Conference Photo 80', image: 'https://lh3.googleusercontent.com/d/1gDpNk_55T_H_keQJIfjmHeF-BZvFRmIw', aspectRatio: 'horizontal' },
  { id: 'arise-81', title: 'ARISE Conference Photo 81', image: 'https://lh3.googleusercontent.com/d/1RiZImlJCngfkrNPWfnC57UItNv_hryyW', aspectRatio: 'square' },
  { id: 'arise-82', title: 'ARISE Conference Photo 82', image: 'https://lh3.googleusercontent.com/d/1db8qZIaX1qs5E97sCXxNgoIsQvmEXFIe', aspectRatio: 'vertical' },
  { id: 'arise-83', title: 'ARISE Conference Photo 83', image: 'https://lh3.googleusercontent.com/d/1JTpBoPFT1P6JkWko_kJYtp3QTUTg-rMA', aspectRatio: 'square' },
  { id: 'arise-84', title: 'ARISE Conference Photo 84', image: 'https://lh3.googleusercontent.com/d/17Qp49f4F0H6lWSNGm9513pyiaUd561kJ', aspectRatio: 'horizontal' },
  { id: 'arise-85', title: 'ARISE Conference Photo 85', image: 'https://lh3.googleusercontent.com/d/1rLuD6mGOaHxQfvjzNsrHENS4UU_KAZ77', aspectRatio: 'vertical' },
  { id: 'arise-86', title: 'ARISE Conference Photo 86', image: 'https://lh3.googleusercontent.com/d/1FAsu6EsxEA2bpnbnKfSVwFDxsS0RHV3V', aspectRatio: 'horizontal' },
  { id: 'arise-87', title: 'ARISE Conference Photo 87', image: 'https://lh3.googleusercontent.com/d/1oFJhuTDMSCBaFi6XhYL1ACAFRVuImCdq', aspectRatio: 'square' },
  { id: 'arise-88', title: 'ARISE Conference Photo 88', image: 'https://lh3.googleusercontent.com/d/1qV6QOoGYKrxquBH9ltpLUC5eulCKQWeU', aspectRatio: 'vertical' },
  { id: 'arise-89', title: 'ARISE Conference Photo 89', image: 'https://lh3.googleusercontent.com/d/12OEsLgY4ZheHq4eLBgO3jXlrascpHTqS', aspectRatio: 'square' },
  { id: 'arise-90', title: 'ARISE Conference Photo 90', image: 'https://lh3.googleusercontent.com/d/1Ulb7FY_IDuLxIUYwNjEkhy3JisUO5JX1', aspectRatio: 'horizontal' },
  { id: 'arise-91', title: 'ARISE Conference Photo 91', image: 'https://lh3.googleusercontent.com/d/1u8P7fwCLelM0PTQEZPEiHRSN4K0QL4l6', aspectRatio: 'vertical' },
  { id: 'arise-92', title: 'ARISE Conference Photo 92', image: 'https://lh3.googleusercontent.com/d/1GdE9JfBRAX_9eSOCG6fGj4SW5vzRoOv9', aspectRatio: 'horizontal' },
  { id: 'arise-93', title: 'ARISE Conference Photo 93', image: 'https://lh3.googleusercontent.com/d/1hJRciUfbyiH4QAYQQ_LTepcdg_uS0KVO', aspectRatio: 'square' },
  { id: 'arise-94', title: 'ARISE Conference Photo 94', image: 'https://lh3.googleusercontent.com/d/1GtNs4H_seany1k8e4qp5ES9hT9vpHVVt', aspectRatio: 'vertical' },
  { id: 'arise-95', title: 'ARISE Conference Photo 95', image: 'https://lh3.googleusercontent.com/d/1nnjc7qhbKWs7rL7-TwMSxJIVvsIvwctn', aspectRatio: 'square' },
  { id: 'arise-96', title: 'ARISE Conference Photo 96', image: 'https://lh3.googleusercontent.com/d/1la8h9Po9DmguAMeOmjFUf7W0mvzoa8d9', aspectRatio: 'horizontal' },
  { id: 'arise-97', title: 'ARISE Conference Photo 97', image: 'https://lh3.googleusercontent.com/d/1e3na0M_qH9MJFwZlvy5gR_afMbg4-u4F', aspectRatio: 'vertical' },
  { id: 'arise-98', title: 'ARISE Conference Photo 98', image: 'https://lh3.googleusercontent.com/d/12ZPdl6bwfvNKe7gPBH5IMyY5KqOY6-Ri', aspectRatio: 'horizontal' },
  { id: 'arise-99', title: 'ARISE Conference Photo 99', image: 'https://lh3.googleusercontent.com/d/1Lj0Bw8ieA2X855MS1ShSGpNnX2OpGVla', aspectRatio: 'square' },
  { id: 'arise-100', title: 'ARISE Conference Photo 100', image: 'https://lh3.googleusercontent.com/d/1yu34rL4nwUooCr0R20feRvnH_RcR0vyM', aspectRatio: 'vertical' },
  { id: 'arise-101', title: 'ARISE Conference Photo 101', image: 'https://lh3.googleusercontent.com/d/1GODd_7KqxIMG8xuOzu7FhNeruq677N4_', aspectRatio: 'square' },
  { id: 'arise-102', title: 'ARISE Conference Photo 102', image: 'https://lh3.googleusercontent.com/d/1-e2HCcEuX90DzzOGO1dSTlMFR82QQifQ', aspectRatio: 'horizontal' },
  { id: 'arise-103', title: 'ARISE Conference Photo 103', image: 'https://lh3.googleusercontent.com/d/17tU-MHtcOpKSeO47OGzvEw89tyfj59AH', aspectRatio: 'vertical' },
  { id: 'arise-104', title: 'ARISE Conference Photo 104', image: 'https://lh3.googleusercontent.com/d/1cK26bxqcBrmwzXCZzZPrtEnBSDv7cEf3', aspectRatio: 'horizontal' },
  { id: 'arise-105', title: 'ARISE Conference Photo 105', image: 'https://lh3.googleusercontent.com/d/1itB46MwZ57xaqIUInoAr-NrxmGTct2I-', aspectRatio: 'square' },
  { id: 'arise-106', title: 'ARISE Conference Photo 106', image: 'https://lh3.googleusercontent.com/d/1_bryKsTvSlVup0Tktpwlh9i5elEhVfnJ', aspectRatio: 'vertical' },
  { id: 'arise-107', title: 'ARISE Conference Photo 107', image: 'https://lh3.googleusercontent.com/d/1Nn0kTxeJ13cvmSNUTOTQ_nS30Wm4-r93', aspectRatio: 'square' },
  { id: 'arise-108', title: 'ARISE Conference Photo 108', image: 'https://lh3.googleusercontent.com/d/1ocXFReoDC4rl3vdIF9dTPdL__dNN7l6m', aspectRatio: 'horizontal' },
  { id: 'arise-109', title: 'ARISE Conference Photo 109', image: 'https://lh3.googleusercontent.com/d/1RNN0e59UbThKhFxCVdHBsAWGSeNHCkxu', aspectRatio: 'vertical' },
  { id: 'arise-110', title: 'ARISE Conference Photo 110', image: 'https://lh3.googleusercontent.com/d/1Oa1JaJgSAEHVvP725Pd13-_IoDnzoa4Z', aspectRatio: 'horizontal' },
  { id: 'arise-111', title: 'ARISE Conference Photo 111', image: 'https://lh3.googleusercontent.com/d/1vEySbYPvBdVwPomUk9MYfGOs6WN4sCz9', aspectRatio: 'square' },
  { id: 'arise-112', title: 'ARISE Conference Photo 112', image: 'https://lh3.googleusercontent.com/d/1YlEt-j3NWS7IyF40vOJHNKIS_h85IbFP', aspectRatio: 'vertical' },
  { id: 'arise-113', title: 'ARISE Conference Photo 113', image: 'https://lh3.googleusercontent.com/d/1P1vGaMqA0l94aJerQtojom53HYlg-QkS', aspectRatio: 'square' },
  { id: 'arise-114', title: 'ARISE Conference Photo 114', image: 'https://lh3.googleusercontent.com/d/1S2VGYxOHo9DxegCJlMQHIpteSz5FwCGs', aspectRatio: 'horizontal' },
  { id: 'arise-115', title: 'ARISE Conference Photo 115', image: 'https://lh3.googleusercontent.com/d/17A_0gRozzuTSWMZlbXlfvkvtSg0c7HQu', aspectRatio: 'vertical' },
  { id: 'arise-116', title: 'ARISE Conference Photo 116', image: 'https://lh3.googleusercontent.com/d/1g1r7pcSHH2T34KzxbjprMLNwEhRXx3Ia', aspectRatio: 'horizontal' },
  { id: 'arise-117', title: 'ARISE Conference Photo 117', image: 'https://lh3.googleusercontent.com/d/15x8Xo2yPFA7Do786_TehVB6_59wNhNR_', aspectRatio: 'square' },
  { id: 'arise-118', title: 'ARISE Conference Photo 118', image: 'https://lh3.googleusercontent.com/d/1ncH8gwbRZl2b9qaspYc8DXCbVOF2BDdK', aspectRatio: 'vertical' },
  { id: 'arise-119', title: 'ARISE Conference Photo 119', image: 'https://lh3.googleusercontent.com/d/1ig087yEit7dqQ-vffbAkqMFfkagPpERo', aspectRatio: 'square' },
  { id: 'arise-120', title: 'ARISE Conference Photo 120', image: 'https://lh3.googleusercontent.com/d/13qk1M_St54Qg8uGwXcmWiBCb2itmIBWK', aspectRatio: 'horizontal' },
  { id: 'arise-121', title: 'ARISE Conference Photo 121', image: 'https://lh3.googleusercontent.com/d/1OAb6n0uszLgqgjEYAMXw1oWUhRt37n43', aspectRatio: 'vertical' },
  { id: 'arise-122', title: 'ARISE Conference Photo 122', image: 'https://lh3.googleusercontent.com/d/1oqOlRHlJ7EjSFy1mTvKhnt9hLh5ICUFD', aspectRatio: 'horizontal' },
  { id: 'arise-123', title: 'ARISE Conference Photo 123', image: 'https://lh3.googleusercontent.com/d/1VSOSp2p3C_peJwmN81OH84bggrPw5pj8', aspectRatio: 'square' },
  { id: 'arise-124', title: 'ARISE Conference Photo 124', image: 'https://lh3.googleusercontent.com/d/1zoG1fIexMpNxzhdGJe3rmSiHfH3VBdwe', aspectRatio: 'vertical' },
  { id: 'arise-125', title: 'ARISE Conference Photo 125', image: 'https://lh3.googleusercontent.com/d/1gGoA--J-jFlOA0JpFG4mdbo53oKT3xlO', aspectRatio: 'square' },
  { id: 'arise-126', title: 'ARISE Conference Photo 126', image: 'https://lh3.googleusercontent.com/d/1G_VRVK9VVI5-I86U_Gz_8iV5_Nf8XnMJ', aspectRatio: 'horizontal' },
  { id: 'arise-127', title: 'ARISE Conference Photo 127', image: 'https://lh3.googleusercontent.com/d/10jUMEz6ByJ2POVMWCpX1dRzvBTYp6MXj', aspectRatio: 'vertical' },
  { id: 'arise-128', title: 'ARISE Conference Photo 128', image: 'https://lh3.googleusercontent.com/d/1mIfLjTT6rVimNQngan_WfwRQoGW0bOHH', aspectRatio: 'horizontal' },
  { id: 'arise-129', title: 'ARISE Conference Photo 129', image: 'https://lh3.googleusercontent.com/d/1wNzncyfpgLr0Czp37bKQT-6eUO1o0MpY', aspectRatio: 'square' },
  { id: 'arise-130', title: 'ARISE Conference Photo 130', image: 'https://lh3.googleusercontent.com/d/1DGBCDugEnGzo7suaBaQqdXtyqa6qP8eB', aspectRatio: 'vertical' },
  { id: 'arise-131', title: 'ARISE Conference Photo 131', image: 'https://lh3.googleusercontent.com/d/135-4UsbxZJMUCRyA2DK7fY878QJPLp_S', aspectRatio: 'square' },
  { id: 'arise-132', title: 'ARISE Conference Photo 132', image: 'https://lh3.googleusercontent.com/d/1bvGS9l7nE1s1pyD2LMdiJG5xwOa5v79-', aspectRatio: 'horizontal' },
  { id: 'arise-133', title: 'ARISE Conference Photo 133', image: 'https://lh3.googleusercontent.com/d/1WenAgAndZE4n7-SyvlU9Mzy-D0WjmzSE', aspectRatio: 'vertical' },
  { id: 'arise-134', title: 'ARISE Conference Photo 134', image: 'https://lh3.googleusercontent.com/d/1_0CkpIYrDCQ3GS2wHMnl3moGDZ04WCPp', aspectRatio: 'horizontal' },
  { id: 'arise-135', title: 'ARISE Conference Photo 135', image: 'https://lh3.googleusercontent.com/d/1O1BB8iL0KFZyrIkCtwy5QyLEAstwhEcZ', aspectRatio: 'square' },
  { id: 'arise-136', title: 'ARISE Conference Photo 136', image: 'https://lh3.googleusercontent.com/d/1k7SQjBLeV1V7Nma4RnO36S1Wu_IbhC0N', aspectRatio: 'vertical' },
  { id: 'arise-137', title: 'ARISE Conference Photo 137', image: 'https://lh3.googleusercontent.com/d/1uVnqa72gpzw9Wj75Nh4RztIahpWVWsTs', aspectRatio: 'square' },
  { id: 'arise-138', title: 'ARISE Conference Photo 138', image: 'https://lh3.googleusercontent.com/d/1XxQrDd5lZumGWF_B0iB9B2xm2XgJWAYe', aspectRatio: 'horizontal' },
  { id: 'arise-139', title: 'ARISE Conference Photo 139', image: 'https://lh3.googleusercontent.com/d/1ppRKxa3HW918_vjDbHva29Vx7LOoruqE', aspectRatio: 'vertical' },
  { id: 'arise-140', title: 'ARISE Conference Photo 140', image: 'https://lh3.googleusercontent.com/d/1-1KqCRJlnEyuH_NM9jkt-HZvWkAKU-bY', aspectRatio: 'horizontal' },
  { id: 'arise-141', title: 'ARISE Conference Photo 141', image: 'https://lh3.googleusercontent.com/d/1LVyfAn1YshpKbGkzgUveLWtzSUOUhfCu', aspectRatio: 'square' },
  { id: 'arise-142', title: 'ARISE Conference Photo 142', image: 'https://lh3.googleusercontent.com/d/1c6uH5aJ-TdpsbJmRkzAK1kguLoewXWXp', aspectRatio: 'vertical' },
  { id: 'arise-143', title: 'ARISE Conference Photo 143', image: 'https://lh3.googleusercontent.com/d/1TFwWECZDCgTxsK0AOBrGuaX5Pi9-WqPb', aspectRatio: 'square' },
  { id: 'arise-144', title: 'ARISE Conference Photo 144', image: 'https://lh3.googleusercontent.com/d/12rgYCvrPYebr9k3s3ea6VqZQb530nI64', aspectRatio: 'horizontal' },
  { id: 'arise-145', title: 'ARISE Conference Photo 145', image: 'https://lh3.googleusercontent.com/d/1YULdvoA2D0IxzSe-_IZP_csmWp4Z5Fbp', aspectRatio: 'vertical' },
  { id: 'arise-146', title: 'ARISE Conference Photo 146', image: 'https://lh3.googleusercontent.com/d/1BwStgTQWayxlij-JRMltdJ4eAjIsZOMV', aspectRatio: 'horizontal' },
  { id: 'arise-147', title: 'ARISE Conference Photo 147', image: 'https://lh3.googleusercontent.com/d/17ASyANmm6IFY4MWF-8qKxFuhPTybHAj7', aspectRatio: 'square' },
  { id: 'arise-148', title: 'ARISE Conference Photo 148', image: 'https://lh3.googleusercontent.com/d/1bvnkvsKewIvVPaMGp-oo-nbt679P0RoE', aspectRatio: 'vertical' },
  { id: 'arise-149', title: 'ARISE Conference Photo 149', image: 'https://lh3.googleusercontent.com/d/1149RO5odq38xSGUC-fnVlAjAnZasO9bz', aspectRatio: 'square' },
  { id: 'arise-150', title: 'ARISE Conference Photo 150', image: 'https://lh3.googleusercontent.com/d/1Pv4vwWGMqlH1J3bkO7iIlYexklqr5f1s', aspectRatio: 'horizontal' },
  { id: 'arise-151', title: 'ARISE Conference Photo 151', image: 'https://lh3.googleusercontent.com/d/1-kL1J6vBgnD-xbrkGm1AXXtf3BxjjsQ5', aspectRatio: 'vertical' },
  { id: 'arise-152', title: 'ARISE Conference Photo 152', image: 'https://lh3.googleusercontent.com/d/1SpgVWz7kjQVPuoNij1YC9sWnDgVK59-z', aspectRatio: 'horizontal' },
  { id: 'arise-153', title: 'ARISE Conference Photo 153', image: 'https://lh3.googleusercontent.com/d/11ay7h5GwtmK5dzW_hlPGRiH60HSd8U34', aspectRatio: 'square' },
  { id: 'arise-154', title: 'ARISE Conference Photo 154', image: 'https://lh3.googleusercontent.com/d/1fgxkReYWk73VNNSGvmuiqiScEoktJBg_', aspectRatio: 'vertical' },
  { id: 'arise-155', title: 'ARISE Conference Photo 155', image: 'https://lh3.googleusercontent.com/d/1CI_ESMiixKcRCPmxKbMZHpZ_2YjgTW3Q', aspectRatio: 'square' },
  { id: 'arise-156', title: 'ARISE Conference Photo 156', image: 'https://lh3.googleusercontent.com/d/1KkRxwXTnEuDzPYI3AhY_X94mCl980JyJ', aspectRatio: 'horizontal' },
  { id: 'arise-157', title: 'ARISE Conference Photo 157', image: 'https://lh3.googleusercontent.com/d/1iBS2T7IH7SjsKlrDTAPDV5AV06uWRi4d', aspectRatio: 'vertical' },
  { id: 'arise-158', title: 'ARISE Conference Photo 158', image: 'https://lh3.googleusercontent.com/d/13gjsUU8Syl2u07n-TtnC4JgMU_89vb0v', aspectRatio: 'horizontal' },
  { id: 'arise-159', title: 'ARISE Conference Photo 159', image: 'https://lh3.googleusercontent.com/d/1TNqe8BYQNvXs5uqW3hfbD7wR5xd9Zv2Q', aspectRatio: 'square' },
  { id: 'arise-160', title: 'ARISE Conference Photo 160', image: 'https://lh3.googleusercontent.com/d/1u1VZ-yxqg1b4p-28lY88calTe98iId-6', aspectRatio: 'vertical' },
  { id: 'arise-161', title: 'ARISE Conference Photo 161', image: 'https://lh3.googleusercontent.com/d/1Yica7EkGgAUaAEUPmVJE5Hz5P2I6ZOn5', aspectRatio: 'square' },
  { id: 'arise-162', title: 'ARISE Conference Photo 162', image: 'https://lh3.googleusercontent.com/d/1OgjPSfz9scaDPm2iSGXl0APFIlz_sogb', aspectRatio: 'horizontal' },
  { id: 'arise-163', title: 'ARISE Conference Photo 163', image: 'https://lh3.googleusercontent.com/d/1eF-PlmDeY4Bvx7YTUovPKTj1eeQBULlH', aspectRatio: 'vertical' },
  { id: 'arise-164', title: 'ARISE Conference Photo 164', image: 'https://lh3.googleusercontent.com/d/1CfUB5NHwtPmJtRI_hqhAdJq7pLyGHfew', aspectRatio: 'horizontal' },
  { id: 'arise-165', title: 'ARISE Conference Photo 165', image: 'https://lh3.googleusercontent.com/d/1cFE9mFjJWLP5RfzvDj9df5gb5ZFZBTW6', aspectRatio: 'square' },
  { id: 'arise-166', title: 'ARISE Conference Photo 166', image: 'https://lh3.googleusercontent.com/d/11UdrFvq0N3xCBJpbpJZ7HlweMZyys0vF', aspectRatio: 'vertical' },
  { id: 'arise-167', title: 'ARISE Conference Photo 167', image: 'https://lh3.googleusercontent.com/d/1bJvN60kPEGDaDAXLjij9eX39pJZH3GNw', aspectRatio: 'square' },
  { id: 'arise-168', title: 'ARISE Conference Photo 168', image: 'https://lh3.googleusercontent.com/d/1FOo3MGM8Nj8-Vc2coQ0tn9to1wNtmZhH', aspectRatio: 'horizontal' },
  { id: 'arise-169', title: 'ARISE Conference Photo 169', image: 'https://lh3.googleusercontent.com/d/1dc5w1hhADnIbbL1MGWvTPykZvePC1XCJ', aspectRatio: 'vertical' },
  { id: 'arise-170', title: 'ARISE Conference Photo 170', image: 'https://lh3.googleusercontent.com/d/1lnFAaXOupPNXcu9wQYO7mC_JtaJ2pMZD', aspectRatio: 'horizontal' },
  { id: 'arise-171', title: 'ARISE Conference Photo 171', image: 'https://lh3.googleusercontent.com/d/1A9gmHgL5E7hL0D5oupTIKLJPpYphfI3P', aspectRatio: 'square' },
  { id: 'arise-172', title: 'ARISE Conference Photo 172', image: 'https://lh3.googleusercontent.com/d/1uwqbczaKGW8kXFuZ-zEm49tXbBI1UA7y', aspectRatio: 'vertical' },
  { id: 'arise-173', title: 'ARISE Conference Photo 173', image: 'https://lh3.googleusercontent.com/d/13Oxk6OsBdG2z_y4elx2400oE4kUivaYe', aspectRatio: 'square' },
  { id: 'arise-174', title: 'ARISE Conference Photo 174', image: 'https://lh3.googleusercontent.com/d/1yEUlNSdhFkm5CJ4B7QX_AJiDHTHAO2eq', aspectRatio: 'horizontal' },
  { id: 'arise-175', title: 'ARISE Conference Photo 175', image: 'https://lh3.googleusercontent.com/d/122zrTmrvg7MMZtbVMpcbt9lcXa4f6ub_', aspectRatio: 'vertical' },
  { id: 'arise-176', title: 'ARISE Conference Photo 176', image: 'https://lh3.googleusercontent.com/d/1HCa7aumZMJ-eI7VZdQw7SBRmZ2njH_jB', aspectRatio: 'horizontal' },
  { id: 'arise-177', title: 'ARISE Conference Photo 177', image: 'https://lh3.googleusercontent.com/d/1-1sLs8DohCdIFvXMcbZe97HVylwC8Lqd', aspectRatio: 'square' },
  { id: 'arise-178', title: 'ARISE Conference Photo 178', image: 'https://lh3.googleusercontent.com/d/1VDldsZPYE691qH89Y13gf8R6F6aiHDwz', aspectRatio: 'vertical' },
  { id: 'arise-179', title: 'ARISE Conference Photo 179', image: 'https://lh3.googleusercontent.com/d/1kTat7Y4yG00MwWIj267it6rrVDyJUFpG', aspectRatio: 'square' },
  { id: 'arise-180', title: 'ARISE Conference Photo 180', image: 'https://lh3.googleusercontent.com/d/1fZqbHEiY6lRsuQ9NoU8_oE0QIdbvuVfn', aspectRatio: 'horizontal' },
  { id: 'arise-181', title: 'ARISE Conference Photo 181', image: 'https://lh3.googleusercontent.com/d/1ySCxMAmPlYRMSAPpQM0O3hoTrD1bgtof', aspectRatio: 'vertical' },
  { id: 'arise-182', title: 'ARISE Conference Photo 182', image: 'https://lh3.googleusercontent.com/d/1Dprxugent-fJwzMBvXs_TBIS9aHWMDJO', aspectRatio: 'horizontal' },
  { id: 'arise-183', title: 'ARISE Conference Photo 183', image: 'https://lh3.googleusercontent.com/d/1W1P5OfkNih1V0KOuOyw11vxg_pplBu8G', aspectRatio: 'square' },
  { id: 'arise-184', title: 'ARISE Conference Photo 184', image: 'https://lh3.googleusercontent.com/d/1hBOCYaglDRp89hycQXRJW-QUxL0coXBY', aspectRatio: 'vertical' },
  { id: 'arise-185', title: 'ARISE Conference Photo 185', image: 'https://lh3.googleusercontent.com/d/1oHxj-CmHr7i1uuYuNG8XGTAhrR8XnGWX', aspectRatio: 'square' },
  { id: 'arise-186', title: 'ARISE Conference Photo 186', image: 'https://lh3.googleusercontent.com/d/1FPKU-JBBaVDN3I-aiWuTXH78fSJHKV2r', aspectRatio: 'horizontal' },
  { id: 'arise-187', title: 'ARISE Conference Photo 187', image: 'https://lh3.googleusercontent.com/d/1OFhWV2MuYRD3tMqsIJkDMyB8mGLs8otZ', aspectRatio: 'vertical' },
  { id: 'arise-188', title: 'ARISE Conference Photo 188', image: 'https://lh3.googleusercontent.com/d/1lCUiQTnVQ0n8233NPg4SVRDqkGSa05Qh', aspectRatio: 'horizontal' },
  { id: 'arise-189', title: 'ARISE Conference Photo 189', image: 'https://lh3.googleusercontent.com/d/15CvCHYPjO3p1Z7XR6Y4y8QmUS4PmPTPF', aspectRatio: 'square' },
  { id: 'arise-190', title: 'ARISE Conference Photo 190', image: 'https://lh3.googleusercontent.com/d/1Itmj4d6YI4-cWbiEf4LS-nSC-k39YrAt', aspectRatio: 'vertical' },
  { id: 'arise-191', title: 'ARISE Conference Photo 191', image: 'https://lh3.googleusercontent.com/d/1KZhAsgOS7M09mIVFxUkLkfdTqjWtjADb', aspectRatio: 'square' },
  { id: 'arise-192', title: 'ARISE Conference Photo 192', image: 'https://lh3.googleusercontent.com/d/1IUNtOnlEPAqce2QHnpuofir76xMJQQdx', aspectRatio: 'horizontal' },
  { id: 'arise-193', title: 'ARISE Conference Photo 193', image: 'https://lh3.googleusercontent.com/d/1ZQ2D7CWxLQ1DZBa6mNkrQh5jj_9csnSU', aspectRatio: 'vertical' },
  { id: 'arise-194', title: 'ARISE Conference Photo 194', image: 'https://lh3.googleusercontent.com/d/1BytLc8FV5DgzXGRjIxp-FiRi8hwbEksy', aspectRatio: 'horizontal' },
  { id: 'arise-195', title: 'ARISE Conference Photo 195', image: 'https://lh3.googleusercontent.com/d/19Fs6uGQAUE6xGudwdWPGX9TDzNV3R2CC', aspectRatio: 'square' },
  { id: 'arise-196', title: 'ARISE Conference Photo 196', image: 'https://lh3.googleusercontent.com/d/1jQJ_orUul7eyX7feBkbFz1AprEKh75VF', aspectRatio: 'vertical' },
  { id: 'arise-197', title: 'ARISE Conference Photo 197', image: 'https://lh3.googleusercontent.com/d/1EKj4ZdYaLuAYbllbkbyTrHKPaQblBesY', aspectRatio: 'square' },
  { id: 'arise-198', title: 'ARISE Conference Photo 198', image: 'https://lh3.googleusercontent.com/d/1xzzhM0k_9GL5jXXBSGE2bX2dGLPwRLWp', aspectRatio: 'horizontal' },
  { id: 'arise-199', title: 'ARISE Conference Photo 199', image: 'https://lh3.googleusercontent.com/d/11RUl_bEyHgl0OZ_KyRnkqiyIvpzEQoLm', aspectRatio: 'vertical' },
  { id: 'arise-200', title: 'ARISE Conference Photo 200', image: 'https://lh3.googleusercontent.com/d/1T5kulaJTf43N-z4C3wWiQ6z5dzlZrpaO', aspectRatio: 'horizontal' },
  { id: 'arise-201', title: 'ARISE Conference Photo 201', image: 'https://lh3.googleusercontent.com/d/1oL85fjbOKgqCyN3CtUd6ImVE86f9MG5V', aspectRatio: 'square' },
  { id: 'arise-202', title: 'ARISE Conference Photo 202', image: 'https://lh3.googleusercontent.com/d/1YbQDKQGWXsptykK8C_ZYIbtImfSpWblW', aspectRatio: 'vertical' },
  { id: 'arise-203', title: 'ARISE Conference Photo 203', image: 'https://lh3.googleusercontent.com/d/1r9jfhm9bHiTwRJWCKY-JY6vN1BVQZ367', aspectRatio: 'square' },
  { id: 'arise-204', title: 'ARISE Conference Photo 204', image: 'https://lh3.googleusercontent.com/d/1fsPocR_e0mQYMA5m35J57Vfd6MxzKP8o', aspectRatio: 'horizontal' },
  { id: 'arise-205', title: 'ARISE Conference Photo 205', image: 'https://lh3.googleusercontent.com/d/1Wz9sFEWydf0ZdTYx31ehG6Qizuw3PxB1', aspectRatio: 'vertical' },
  { id: 'arise-206', title: 'ARISE Conference Photo 206', image: 'https://lh3.googleusercontent.com/d/1BteY9u3rgYoKJsrhiFNzWw1DyYZY-Dyh', aspectRatio: 'horizontal' },
  { id: 'arise-207', title: 'ARISE Conference Photo 207', image: 'https://lh3.googleusercontent.com/d/1e_OsL-FNkc6BWCxAPdAKTCRHlssM0zr_', aspectRatio: 'square' },
  { id: 'arise-208', title: 'ARISE Conference Photo 208', image: 'https://lh3.googleusercontent.com/d/18qvG14r2YS5QtfTMUQL-As4yqMXQeTTe', aspectRatio: 'vertical' },
  { id: 'arise-209', title: 'ARISE Conference Photo 209', image: 'https://lh3.googleusercontent.com/d/1L3Os5L6nU94szw9Ql4Q2j9uEVW6tuKp-', aspectRatio: 'square' },
  { id: 'arise-210', title: 'ARISE Conference Photo 210', image: 'https://lh3.googleusercontent.com/d/1-3UC6sKvgqGFzFd3UCiGBJqbbLhIqlwK', aspectRatio: 'horizontal' },
  { id: 'arise-211', title: 'ARISE Conference Photo 211', image: 'https://lh3.googleusercontent.com/d/1F_ToaPiW9AZZvSzEF1csuFdvKN0fD7gp', aspectRatio: 'vertical' },
  { id: 'arise-212', title: 'ARISE Conference Photo 212', image: 'https://lh3.googleusercontent.com/d/17qkax1m_ApQCAF3NHF2HjQNEe8khDemA', aspectRatio: 'horizontal' },
  { id: 'arise-213', title: 'ARISE Conference Photo 213', image: 'https://lh3.googleusercontent.com/d/1mNMvgngtJq9RVCSoi83M77_5hjzGlr3y', aspectRatio: 'square' },
  { id: 'arise-214', title: 'ARISE Conference Photo 214', image: 'https://lh3.googleusercontent.com/d/1qIVZe7tNWliI59IqZbsxBo7LqtyLAgtt', aspectRatio: 'vertical' },
  { id: 'arise-215', title: 'ARISE Conference Photo 215', image: 'https://lh3.googleusercontent.com/d/1LqvevyVtp_Ug7W57q8yjImFM2quofNTF', aspectRatio: 'square' },
  { id: 'arise-216', title: 'ARISE Conference Photo 216', image: 'https://lh3.googleusercontent.com/d/1y9G_LS808p9VYg35djYw4dMMQgVoNigh', aspectRatio: 'horizontal' },
  { id: 'arise-217', title: 'ARISE Conference Photo 217', image: 'https://lh3.googleusercontent.com/d/1d0TddFsdAU4ISKAbaBbevuZEtNc_OLIF', aspectRatio: 'vertical' },
  { id: 'arise-218', title: 'ARISE Conference Photo 218', image: 'https://lh3.googleusercontent.com/d/16RGLsGs8Msusv2Dl3XfzVNeMdlPlTSSH', aspectRatio: 'horizontal' },
  { id: 'arise-219', title: 'ARISE Conference Photo 219', image: 'https://lh3.googleusercontent.com/d/1HKgRMmF5jPRaP9PhYAOdeKkWeA3Jtkia', aspectRatio: 'square' },
  { id: 'arise-220', title: 'ARISE Conference Photo 220', image: 'https://lh3.googleusercontent.com/d/1UxPq_sOb2oF9gwrfO87GuyDrXlmTXCXQ', aspectRatio: 'vertical' },
  { id: 'arise-221', title: 'ARISE Conference Photo 221', image: 'https://lh3.googleusercontent.com/d/1Pmn0Db0YXNfRYVl3K5SJG3Tq3JODqshO', aspectRatio: 'square' },
  { id: 'arise-222', title: 'ARISE Conference Photo 222', image: 'https://lh3.googleusercontent.com/d/1KZT9kBKYYmx-ODVcdEVZXlloo6laFAwM', aspectRatio: 'horizontal' },
  { id: 'arise-223', title: 'ARISE Conference Photo 223', image: 'https://lh3.googleusercontent.com/d/1a0GxTQz5CIWgpakyBxx-cwK65SgWxyjp', aspectRatio: 'vertical' },
  { id: 'arise-224', title: 'ARISE Conference Photo 224', image: 'https://lh3.googleusercontent.com/d/1YWxzRcrcxfNfHGf_dfHYYln71lQtDl0M', aspectRatio: 'horizontal' },
  { id: 'arise-225', title: 'ARISE Conference Photo 225', image: 'https://lh3.googleusercontent.com/d/1L_Utgvw21gyoh6HTebA8f1T9pHfVYu1D', aspectRatio: 'square' },
  { id: 'arise-226', title: 'ARISE Conference Photo 226', image: 'https://lh3.googleusercontent.com/d/1UVnYfW24gYK_mn2n2ldN5I_LB6xxYdOJ', aspectRatio: 'vertical' },
  { id: 'arise-227', title: 'ARISE Conference Photo 227', image: 'https://lh3.googleusercontent.com/d/1wvtWXL4sbaCy-i3QdSlV8CUYHFwloZ4Z', aspectRatio: 'square' },
  { id: 'arise-228', title: 'ARISE Conference Photo 228', image: 'https://lh3.googleusercontent.com/d/11zhwv7SOvzACOdqrJo5w6k6D-u4REJQp', aspectRatio: 'horizontal' },
  { id: 'arise-229', title: 'ARISE Conference Photo 229', image: 'https://lh3.googleusercontent.com/d/17oCoU6PXZuucz9GWh_gjDMLa4hadKkvV', aspectRatio: 'vertical' },
  { id: 'arise-230', title: 'ARISE Conference Photo 230', image: 'https://lh3.googleusercontent.com/d/1VWgc9eGM_8Q_FinB6LdJxbg2p7wZTdRH', aspectRatio: 'horizontal' },
  { id: 'arise-231', title: 'ARISE Conference Photo 231', image: 'https://lh3.googleusercontent.com/d/1s1a0rJcfN36-R9ZfHA0nY1_WQxOA_GHz', aspectRatio: 'square' },
  { id: 'arise-232', title: 'ARISE Conference Photo 232', image: 'https://lh3.googleusercontent.com/d/1PF8ljwXoWkhjwHTMymkA747RMvj88t86', aspectRatio: 'vertical' },
  { id: 'arise-233', title: 'ARISE Conference Photo 233', image: 'https://lh3.googleusercontent.com/d/1kjdhpAfdn9qseTvnZE8aJU-rY99PDAD5', aspectRatio: 'square' },
  { id: 'arise-234', title: 'ARISE Conference Photo 234', image: 'https://lh3.googleusercontent.com/d/1LUVKAfz07Bg73s618LVscIPk6IiVq46t', aspectRatio: 'horizontal' },
  { id: 'arise-235', title: 'ARISE Conference Photo 235', image: 'https://lh3.googleusercontent.com/d/1m0vLdMSGF4kIekkhuhvDP6oJ-4E6PM1s', aspectRatio: 'vertical' },
  { id: 'arise-236', title: 'ARISE Conference Photo 236', image: 'https://lh3.googleusercontent.com/d/1GLvDLS3EzY8L_PF8d4goKg_XTYs626eb', aspectRatio: 'horizontal' },
  { id: 'arise-237', title: 'ARISE Conference Photo 237', image: 'https://lh3.googleusercontent.com/d/10Cm1mETNfm0sUtFYKyrcNC6KMkLmfAkD', aspectRatio: 'square' },
  { id: 'arise-238', title: 'ARISE Conference Photo 238', image: 'https://lh3.googleusercontent.com/d/1Ufv1p833Vp-VpfLGMQO5Sqwq7jduQYkU', aspectRatio: 'vertical' },
  { id: 'arise-239', title: 'ARISE Conference Photo 239', image: 'https://lh3.googleusercontent.com/d/1vjocon-xhLVl6bgdaFfT78hxqwhGhwxk', aspectRatio: 'square' },
  { id: 'arise-240', title: 'ARISE Conference Photo 240', image: 'https://lh3.googleusercontent.com/d/1OuRyb7zCqgZZjUaqfZMZdFAxo7JidzwO', aspectRatio: 'horizontal' },
  { id: 'arise-241', title: 'ARISE Conference Photo 241', image: 'https://lh3.googleusercontent.com/d/1VAHSfZL6HtSFJA_wXHn0Cilc_RnK64A1', aspectRatio: 'vertical' },
  { id: 'arise-242', title: 'ARISE Conference Photo 242', image: 'https://lh3.googleusercontent.com/d/1tuTJY41oY6sK3ExSmKL30CZIrxRHOYx8', aspectRatio: 'horizontal' },
  { id: 'arise-243', title: 'ARISE Conference Photo 243', image: 'https://lh3.googleusercontent.com/d/1m31FfBEghHuAb_GHf9AeZ0daWMF7q2Xw', aspectRatio: 'square' },
  { id: 'arise-244', title: 'ARISE Conference Photo 244', image: 'https://lh3.googleusercontent.com/d/1z07HBbP3JjY0jwJkM8jJV2QQUVCVTqrc', aspectRatio: 'vertical' },
  { id: 'arise-245', title: 'ARISE Conference Photo 245', image: 'https://lh3.googleusercontent.com/d/12WZN22gKITjumV9cXtF5ZCyyYhtjIqZj', aspectRatio: 'square' },
  { id: 'arise-246', title: 'ARISE Conference Photo 246', image: 'https://lh3.googleusercontent.com/d/1mcaSdC8mGyihJ_vYtHKgUkGT7uBAyrUR', aspectRatio: 'horizontal' },
  { id: 'arise-247', title: 'ARISE Conference Photo 247', image: 'https://lh3.googleusercontent.com/d/1C08JiuZxUEyDr-5_SjjAZSPg6aZX0445', aspectRatio: 'vertical' },
  { id: 'arise-248', title: 'ARISE Conference Photo 248', image: 'https://lh3.googleusercontent.com/d/1P7pBOOrRZa_zAGyLXRmhZ5cYdawCQJxg', aspectRatio: 'horizontal' },
  { id: 'arise-249', title: 'ARISE Conference Photo 249', image: 'https://lh3.googleusercontent.com/d/1BviOsVjWSD4MaYNzCFfGL_rAWr5MgBnS', aspectRatio: 'square' },
  { id: 'arise-250', title: 'ARISE Conference Photo 250', image: 'https://lh3.googleusercontent.com/d/1FWQZ1iFGaNqXwq8u9O9qIQ7gswzA1FeC', aspectRatio: 'vertical' },
  { id: 'arise-251', title: 'ARISE Conference Photo 251', image: 'https://lh3.googleusercontent.com/d/1d2J2RtdhPAg53yvZvGA5HLmK4VpWO7dU', aspectRatio: 'square' },
  { id: 'arise-252', title: 'ARISE Conference Photo 252', image: 'https://lh3.googleusercontent.com/d/1TiZDDX_5nGmN9OwTKxClSUwmzx7-9csw', aspectRatio: 'horizontal' },
  { id: 'arise-253', title: 'ARISE Conference Photo 253', image: 'https://lh3.googleusercontent.com/d/15cKO_6E3Q6xdQqwl4BdiJWIejeJAkf6A', aspectRatio: 'vertical' },
  { id: 'arise-254', title: 'ARISE Conference Photo 254', image: 'https://lh3.googleusercontent.com/d/1qvOcHhnElkE3_q6hipVtd1RNahBcC9BZ', aspectRatio: 'horizontal' },
  { id: 'arise-255', title: 'ARISE Conference Photo 255', image: 'https://lh3.googleusercontent.com/d/1fY5UnaovOuAzBk68AOxuLhu_fGRkFKfh', aspectRatio: 'square' },
  { id: 'arise-256', title: 'ARISE Conference Photo 256', image: 'https://lh3.googleusercontent.com/d/1ePYtFKApxM7lkQ0dZZG-w2CvfHD7K4sp', aspectRatio: 'vertical' },
  { id: 'arise-257', title: 'ARISE Conference Photo 257', image: 'https://lh3.googleusercontent.com/d/1KtB5EpJ2bkw93s5FUlkIDRZpip6lWsJh', aspectRatio: 'square' },
  { id: 'arise-258', title: 'ARISE Conference Photo 258', image: 'https://lh3.googleusercontent.com/d/1BPr4_CFOven90PKSZYEsxl8lrIU0xLaj', aspectRatio: 'horizontal' },
  { id: 'arise-259', title: 'ARISE Conference Photo 259', image: 'https://lh3.googleusercontent.com/d/18S15mgbONfbVOUL6xtIoL8TYwP5OGO-Z', aspectRatio: 'vertical' },
  { id: 'arise-260', title: 'ARISE Conference Photo 260', image: 'https://lh3.googleusercontent.com/d/1ygrwFli5A5HrW7ohoHx6zn4rkR1ijxoN', aspectRatio: 'horizontal' }
];

