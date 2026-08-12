import { useState } from 'react';
import type { FormEvent } from 'react';
import { Mail, Phone, Home, CheckCircle } from 'lucide-react';
import fb from '../assets/fb.png';
import yt from '../assets/yt.png';
import insta from '../assets/insta.png';
import mixlr from '../assets/mixlr.png';
import { dbService } from '../services/db';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setError('Please fill in all fields before sending.');
      return;
    }
    try {
      setError('');
      await dbService.submitContactForm(name, email, message);
      setIsSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err: any) {
      setError(err.message || 'An error occurred while sending your message. Please try again.');
    }
  };

  return (
    <div className="contact-page bg-[#0e031c] min-h-screen text-text-white pb-32">
      {/* 1. Hero Section */}
      <header className="relative flex flex-col items-center justify-center text-center pt-24 pb-12 px-6">
        <div className="relative z-20 max-w-[800px] animate-fade-in">
          <h1 className="text-white mb-6 font-heading font-extrabold text-[2rem] sm:text-[3rem] md:text-[3.2rem] leading-tight">
            WE’D LOVE TO HEAR FROM YOU
          </h1>
          <p className="max-w-[700px] mx-auto text-sm sm:text-[0.95rem] text-text-dimmed leading-relaxed">
            Whether you have a question, need prayer, want to learn more about our
            ministry, or simply wish to connect, we're here for you. Reach out to us—we'd
            be delighted to hear from you.
          </p>
        </div>
      </header>

      {/* 2. Contact Container (Double Card layout) */}
      <section className="relative z-10 px-6">
        <div className="w-full max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
            
            {/* Left Card: Get In Touch Details */}
            <div className="bg-text-white text-text-dark rounded-2xl p-8 md:p-12 shadow-xl flex flex-col justify-between h-full gap-12">
              <div>
                <h3 className="text-[2rem] font-heading font-bold text-text-dark mb-4 leading-tight">
                  Get in touch
                </h3>
                <p className="text-text-muted mb-10 leading-relaxed text-[0.95rem]">
                  Whether you have an inquiry, need prayer, or want to learn more about our ministry, we'd love to hear from you.
                </p>

                <div className="flex flex-col gap-6">
                  {/* Email */}
                  <div className="flex items-center gap-4 text-[0.95rem] sm:text-[1rem]">
                    <div className="w-10 h-10 flex items-center justify-center bg-primary rounded-lg text-white shrink-0">
                      <Mail size={18} />
                    </div>
                    <a href="mailto:info@lightupinternationalchristiannetwork.org" className="text-text-dark font-medium break-all hover:text-primary transition-colors">
                      info@lightupinternationalchristiannetwork.org
                    </a>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-4 text-[0.95rem] sm:text-[1rem]">
                    <div className="w-10 h-10 flex items-center justify-center bg-primary rounded-lg text-white shrink-0">
                      <Phone size={18} />
                    </div>
                    <a href="tel:+2348000000000" className="text-text-dark font-medium hover:text-primary transition-colors">
                      +234 XXX XXX XXXX
                    </a>
                  </div>

                  {/* Address */}
                  <div className="flex items-center gap-4 text-[0.95rem] sm:text-[1rem]">
                    <div className="w-10 h-10 flex items-center justify-center bg-primary rounded-lg text-white shrink-0">
                      <Home size={18} />
                    </div>
                    <span className="text-text-dark font-medium leading-normal">
                      47, Randu Avenue Close, Lagos, Nigeria.
                    </span>
                  </div>
                </div>
              </div>

              {/* Social links row */}
              <div className="flex items-center gap-6 pt-4 border-t border-black/5 md:border-t-0 md:pt-0">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-105" aria-label="Facebook">
                  <img src={fb} alt="Facebook" className="h-5 w-5 object-contain" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-105" aria-label="Instagram">
                  <img src={insta} alt="Instagram" className="h-5 w-5 object-contain" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-105" aria-label="YouTube">
                  <img src={yt} alt="YouTube" className="h-5 w-5 object-contain" />
                </a>
                <a href="https://mixlr.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-transform hover:scale-105" aria-label="Mixlr">
                  <img src={mixlr} alt="Mixlr" className="h-5 w-auto object-contain" />
                </a>
              </div>
            </div>

            {/* Right Card: Form */}
            <div className="bg-text-white text-text-dark rounded-2xl p-8 md:p-12 shadow-xl">
              {isSubmitted ? (
                <div className="text-center py-16 text-text-dark flex flex-col items-center justify-center h-full">
                  <CheckCircle size={56} className="text-primary mb-6 animate-bounce" />
                  <h3 className="text-2xl font-heading font-bold text-text-dark mb-2">Message Sent Successfully!</h3>
                  <p className="text-text-muted max-w-[320px] mx-auto text-sm leading-relaxed">
                    Thank you for reaching out. A representative from our network administration office will contact you soon.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-[1.25rem] sm:text-[1.35rem] font-heading font-bold text-text-dark mb-6 leading-tight">
                    Want to send us a message?
                  </h3>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {error && (
                      <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm font-medium border border-red-200">
                        {error}
                      </div>
                    )}
                    
                    <div className="flex flex-col gap-2">
                      <label htmlFor="contact-name" className="text-xs font-semibold text-text-muted">Your Full Name</label>
                      <input 
                        type="text" 
                        id="contact-name" 
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="border border-black/15 rounded-lg py-3 px-4 text-sm w-full text-text-dark focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all placeholder:text-black/35"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="contact-email" className="text-xs font-semibold text-text-muted">Your Email Address</label>
                      <input 
                        type="email" 
                        id="contact-email" 
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border border-black/15 rounded-lg py-3 px-4 text-sm w-full text-text-dark focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all placeholder:text-black/35"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="contact-message" className="text-xs font-semibold text-text-muted">Message</label>
                      <textarea 
                        id="contact-message" 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        className="border border-black/15 rounded-lg py-3 px-4 text-sm w-full text-text-dark focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all min-h-[160px] resize-y"
                      ></textarea>
                    </div>

                    <div className="flex justify-center mt-2">
                      <button type="submit" className="px-10 py-3 rounded-full font-heading font-semibold cursor-pointer transition-all duration-300 text-[0.95rem] bg-primary text-text-white shadow-[0_4px_12px_rgba(140,82,255,0.3)] hover:bg-primary-hover hover:shadow-[0_6px_18px_rgba(140,82,255,0.5)] hover:-translate-y-[2px] active:translate-y-0">
                        Send Message
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
