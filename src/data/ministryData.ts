export interface Ministry {
  id: string;
  title: string;
  office: string;
  description: string;
  details: string;
  image: string;
}


import Img4 from '../assets/Img4.jpeg';
import Img5 from '../assets/Img5.jpeg';
import Img6 from '../assets/Img6.jpeg';

export const ministriesData: Ministry[] = [
  {
    id: '1',
    title: 'Campus Outreach (ARISE)',
    office: 'Campus',
    description: 'ARISE is the campus movement of LightUp Christian Network, committed to reaching students with the Gospel of Jesus Christ and empowering them to be lights in their institutions and beyond.',
    details: 'Through vibrant weekly meetings, evangelistic outreaches, and intentional discipleship, ARISE is raising a generation of young leaders who carry the light of Christ into their campuses and communities. Whether you\'re exploring faith or growing in it, there\'s a place for you in ARISE.',
    image: Img4
  },
  {
    id: '2',
    title: 'Weekly Prayer and Meditation: Mon - Fri',
    office: 'Prayer',
    description: 'Join us for a dedicated time of corporate prayer and deep biblical meditation. This daily practice is designed to help you connect with God, seek His guidance, and cultivate a lifestyle of devotion and spiritual discipline.',
    details: 'Our prayer sessions focus on intercession, spiritual growth, and alignment with God\'s purposes. Whether you\'re new to prayer or have been praying for years, you\'ll find a welcoming community and opportunities to deepen your relationship with God.',
    image: Img5
  },
  {
    id: '3',
    title: 'Monthly meetings: 1st Saturday of every Month',
    office: 'Congregation',
    description: 'Join us for our monthly congregation gathering. This is a special time of worship, teaching, and community as we come together to experience God\'s presence and grow in our faith.',
    details: 'Our monthly meetings feature powerful worship, inspiring messages, and opportunities to connect with other believers. Whether you\'re a long-time member or a first-time guest, you\'ll find a warm and welcoming environment where you can encounter God and grow in your relationship with Him.',
    image: Img6
  }
];