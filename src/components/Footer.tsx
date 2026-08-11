import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import fb from '../assets/fb.png';
import yt from '../assets/yt.png';
import insta from '../assets/insta.png';
import mixlr from '../assets/mixlr.png';



export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#EEE7FE] text-text-dark pt-40 pb-12 border-t border-black/5">
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-16 mb-16">
          {/* Logo & Description */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="logo"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="max-w-[320px] text-[0.95rem] text-text-muted leading-relaxed">
              A Christ-centered ministry dedicated to raising believers through
              prayer, biblical teaching, mentorship, and impactful gatherings
              that inspire lives and strengthen faith.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[1.1rem] font-bold mb-6 text-text-dark font-heading tracking-wider">
              EXPLORE
            </h4>
            <ul>
              <li className="mb-3">
                <Link
                  to="/"
                  className="text-text-muted text-[0.95rem] hover:text-primary hover:pl-1 transition-all duration-150"
                >
                  Home
                </Link>
              </li>
              <li className="mb-3">
                <Link
                  to="/about"
                  className="text-text-muted text-[0.95rem] hover:text-primary hover:pl-1 transition-all duration-150"
                >
                  About Us
                </Link>
              </li>
              <li className="mb-3">
                <Link
                  to="/events"
                  className="text-text-muted text-[0.95rem] hover:text-primary hover:pl-1 transition-all duration-150"
                >
                  Events
                </Link>
              </li>
              <li className="mb-3">
                <Link
                  to="/sermons"
                  className="text-text-muted text-[0.95rem] hover:text-primary hover:pl-1 transition-all duration-150"
                >
                  Sermons
                </Link>
              </li>
              <li className="mb-3">
                <Link
                  to="/gallery"
                  className="text-text-muted text-[0.95rem] hover:text-primary hover:pl-1 transition-all duration-150"
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us / Socials */}
          <div>
            <h4 className="text-[1.1rem] font-bold mb-6 text-text-dark font-heading tracking-wider">
              FOLLOW US
            </h4>
            <ul>
              <li className="mb-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-text-muted text-[0.95rem] hover:text-primary transition-colors duration-150"
                >
                  <img src={fb} alt="facebook" className='h-4 w-4' /> Facebook
                </a>
              </li>
              <li className="mb-3">
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-text-muted text-[0.95rem] hover:text-primary transition-colors duration-150"
                >
                  <img src={yt} alt="youtube" className='h-4 w-4' /> YouTube
                </a>
              </li>
              <li className="mb-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-text-muted text-[0.95rem] hover:text-primary transition-colors duration-150"
                >
                  <img src={insta} alt="instagram" className='h-4 w-4' /> Instagram
                </a>
              </li>
              <li className="mb-3">
                <a
                  href="https://mixlr.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-text-muted text-[0.95rem] hover:text-primary transition-colors duration-150"
                >
                  <img src={mixlr} alt="mixlr" className='h-6 w-20' />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-black/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[0.85rem] text-text-muted gap-4">
          <p>
            All rights reserved. Light-Up International Christian Network ©{" "}
            {currentYear}
          </p>
          <div className="flex gap-6">
            <Link
              to="/contact"
              className="hover:text-primary transition-colors"
            >
              Contact Us
            </Link>
            <Link
              to="/partner"
              className="hover:text-primary transition-colors"
            >
              Partner Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
