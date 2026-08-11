import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Reusable Tailwind classes for buttons to keep JSX clean
  const btnPrimaryClass = "inline-flex items-center justify-center px-6 py-2.5 rounded-full font-heading font-semibold cursor-pointer transition-all duration-300 text-[0.95rem] gap-2 bg-primary text-text-white shadow-[0_4px_12px_rgba(140,82,255,0.3)] hover:bg-primary-hover hover:shadow-[0_6px_18px_rgba(140,82,255,0.5)] hover:-translate-y-[2px] active:translate-y-0";

  return (
    <nav className="sticky top-0 w-full z-50 bg-white backdrop-blur-md border-b border-white/5 transition-all duration-300">
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8 flex justify-between items-center h-20">
        <Link to="/" className="flex items-center" onClick={closeMenu}>
          <div className="h-12 flex items-center justify-center">
            <img src={logo} alt="logo" className="h-full w-auto object-contain" />
          </div>
        </Link>

        {/* Desktop & Mobile Links */}
        <div className={`md:flex items-center gap-8 ${
          isOpen 
            ? 'flex flex-col absolute top-20 left-0 w-full bg-bg-dark p-8 border-b border-white/5 gap-6 z-40 animate-fade-in' 
            : 'hidden'
        }`}>
          <NavLink 
            to="/" 
            className={({ isActive }) => `font-heading font-semibold text-[0.9rem] relative py-2 transition-colors duration-150 ${
              isActive 
                ? 'text-black after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary after:rounded-full' 
                : 'text-black hover:text-primary'
            }`}
            onClick={closeMenu}
          >
            HOME
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => `font-heading font-semibold text-[0.9rem] relative py-2 transition-colors duration-150 ${
              isActive 
                ? 'text-black after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary after:rounded-full' 
                : 'text-black hover:text-primary'
            }`}
            onClick={closeMenu}
          >
            ABOUT US
          </NavLink>
          <NavLink 
            to="/events" 
            className={({ isActive }) => `font-heading font-semibold text-[0.9rem] relative py-2 transition-colors duration-150 ${
              isActive 
                ? 'text-black after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary after:rounded-full' 
                : 'text-black hover:text-primary'
            }`}
            onClick={closeMenu}
          >
            EVENTS
          </NavLink>
          <NavLink 
            to="/sermons" 
            className={({ isActive }) => `font-heading font-semibold text-[0.9rem] relative py-2 transition-colors duration-150 ${
              isActive 
                ? 'text-black after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary after:rounded-full' 
                : 'text-black hover:text-primary'
            }`}
            onClick={closeMenu}
          >
            SERMONS
          </NavLink>
          <NavLink 
            to="/gallery" 
            className={({ isActive }) => `font-heading font-semibold text-[0.9rem] relative py-2 transition-colors duration-150 ${
              isActive 
                ? 'text-black after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary after:rounded-full' 
                : 'text-black hover:text-primary'
            }`}
            onClick={closeMenu}
          >
            GALLERY
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => `font-heading font-semibold text-[0.9rem] relative py-2 transition-colors duration-150 ${
              isActive 
                ? 'text-black after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary after:rounded-full' 
                : 'text-black hover:text-primary'
            }`}
            onClick={closeMenu}
          >
            CONTACT US
          </NavLink>

          {/* Partner button inside mobile menu */}
          <Link 
            to="/partner" 
            className={`${btnPrimaryClass} w-full md:hidden`}
            style={{ display: isOpen ? 'inline-flex' : 'none' }}
            onClick={closeMenu}
          >
            <Heart size={16} fill="white" /> Partner with us
          </Link>
        </div>

        {/* Desktop Partner Button */}
        <Link to="/partner" className={`${btnPrimaryClass} hidden md:inline-flex`}>
          Partner with us
        </Link>

        {/* Hamburger menu button */}
        <button 
          className="md:hidden bg-transparent border-none text-text-white cursor-pointer"
          onClick={toggleMenu} 
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}
