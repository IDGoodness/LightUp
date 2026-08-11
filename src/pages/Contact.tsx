import { useState } from 'react';
import type { FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, Radio, CheckCircle } from 'lucide-react';

const Facebook = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const Youtube = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><polyline points="10 15 15 12 10 9"/></svg>
);

const Instagram = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setError('Please fill in all fields before sending.');
      return;
    }
    setError('');
    setIsSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const btnPrimaryClass = "inline-flex items-center justify-center px-7 py-3 rounded-lg font-heading font-semibold cursor-pointer transition-all duration-300 text-[0.95rem] gap-2 bg-primary text-text-white shadow-[0_4px_12px_rgba(140,82,255,0.3)] hover:bg-primary-hover hover:shadow-[0_6px_18px_rgba(140,82,255,0.5)] hover:-translate-y-[2px] active:translate-y-0 w-full mt-4";

  return (
    <div className="contact-page">
      {/* 1. Hero Section */}
      <header className="relative flex items-center justify-center text-center py-20 px-6 min-h-[40vh] bg-[#13042b]">
        <div className="relative z-20 max-w-[850px] animate-fade-in">
          <p className="font-heading font-bold uppercase tracking-[0.15em] text-primary mb-4">GET IN TOUCH</p>
          <h1 className="text-white mb-6 font-heading font-extrabold text-[2rem] sm:text-[3rem] md:text-[3.2rem] leading-tight">WE'D LOVE TO HEAR FROM YOU</h1>
          <p className="max-w-[750px] mx-auto text-sm text-text-dimmed leading-relaxed">
            Whether you have a question, need prayer support, want to learn more about our ministry outposts, or simply want to connect, we are here for you. Reach out to us—we'd be delighted to hear from you.
          </p>
        </div>
      </header>

      {/* 2. Contact Container (Double Card layout) */}
      <section className="py-24 bg-bg-dark -mt-12 relative z-10">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="bg-gradient-to-br from-primary to-[#3e1b85] rounded-xl p-6 sm:p-10 md:p-16 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 md:gap-16 shadow-2xl animate-fade-in">
            {/* Left Card: Get In Touch Details */}
            <div className="bg-text-white text-text-dark rounded-lg p-8 md:p-12 shadow-lg flex flex-col justify-between h-full gap-8">
              <div>
                <h3 className="text-3xl font-heading font-bold text-text-dark mb-4">Get in touch</h3>
                <p className="text-text-muted mb-8 leading-relaxed">
                  Reach out through our office email, phone lines, or visit our administration coordinates in Lagos.
                </p>

                <div className="flex flex-col gap-6">
                  <div className="flex items-start gap-4 text-[1.05rem]">
                    <Mail size={20} className="text-primary shrink-0 mt-1" />
                    <div>
                      <span className="block text-xs font-bold text-text-muted tracking-wider">EMAIL US</span>
                      <a href="mailto:info@lightupinternationalchristiannetwork.org" className="text-text-dark font-medium break-all hover:text-primary transition-colors">
                        info@lightupinternationalchristiannetwork.org
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 text-[1.05rem]">
                    <Phone size={20} className="text-primary shrink-0 mt-1" />
                    <div>
                      <span className="block text-xs font-bold text-text-muted tracking-wider">CALL US</span>
                      <a href="tel:+2348000000000" className="text-text-dark font-medium hover:text-primary transition-colors">
                        +234 800 000 0000
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 text-[1.05rem]">
                    <MapPin size={20} className="text-primary shrink-0 mt-1" />
                    <div>
                      <span className="block text-xs font-bold text-text-muted tracking-wider">VISIT US</span>
                      <span className="text-text-dark font-medium">47, Awolowo Road, Ikoyi, Lagos, Nigeria.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social links row */}
              <div>
                <h4 className="text-xs font-bold text-text-muted mb-4 tracking-wider">CONNECT ON SOCIALS</h4>
                <div className="flex gap-4">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-text-muted hover:bg-primary hover:text-text-white hover:border-primary transition-all duration-150" aria-label="Facebook">
                    <Facebook size={18} />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-text-muted hover:bg-primary hover:text-text-white hover:border-primary transition-all duration-150" aria-label="YouTube">
                    <Youtube size={18} />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-text-muted hover:bg-primary hover:text-text-white hover:border-primary transition-all duration-150" aria-label="Instagram">
                    <Instagram size={18} />
                  </a>
                  <a href="https://mixlr.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-text-muted hover:bg-primary hover:text-text-white hover:border-primary transition-all duration-150" aria-label="Mixlr">
                    <Radio size={18} />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Card: Form */}
            <div className="bg-text-white text-text-dark rounded-lg p-8 md:p-12 shadow-lg">
              {isSubmitted ? (
                <div className="text-center py-12 text-text-dark">
                  <CheckCircle size={56} className="text-primary mx-auto mb-6" />
                  <h3 className="text-2xl font-heading font-bold text-text-dark mb-2">Message Sent Successfully!</h3>
                  <p className="text-text-muted">
                    Thank you for reaching out. A representative from our network administration office will contact you soon.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-heading font-bold text-text-dark mb-6">Want to send us a message?</h3>
                  <form onSubmit={handleSubmit}>
                    {error && (
                      <div className="bg-red-50 text-red-700 p-3 rounded-md mb-5 text-sm font-medium border border-red-200">
                        {error}
                      </div>
                    )}
                    
                    <div className="mb-5 flex flex-col gap-2">
                      <label htmlFor="contact-name" className="text-xs font-bold text-text-muted tracking-wider">YOUR NAME</label>
                      <input 
                        type="text" 
                        id="contact-name" 
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="border border-black/15 rounded-lg py-2.5 px-4 text-sm w-full text-text-dark focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/15 transition-all"
                      />
                    </div>

                    <div className="mb-5 flex flex-col gap-2">
                      <label htmlFor="contact-email" className="text-xs font-bold text-text-muted tracking-wider">YOUR EMAIL ADDRESS</label>
                      <input 
                        type="email" 
                        id="contact-email" 
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border border-black/15 rounded-lg py-2.5 px-4 text-sm w-full text-text-dark focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/15 transition-all"
                      />
                    </div>

                    <div className="mb-5 flex flex-col gap-2">
                      <label htmlFor="contact-message" className="text-xs font-bold text-text-muted tracking-wider">MESSAGE</label>
                      <textarea 
                        id="contact-message" 
                        placeholder="Write your message or prayer request here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        className="border border-black/15 rounded-lg py-2.5 px-4 text-sm w-full text-text-dark focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/15 transition-all min-h-[120px] resize-y"
                      ></textarea>
                    </div>

                    <button type="submit" className={btnPrimaryClass}>
                      <Send size={16} /> Send Message
                    </button>
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
