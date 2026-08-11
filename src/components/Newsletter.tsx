import { useState } from 'react';
import type { FormEvent } from 'react';
import { Send } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  return (
    <section className="relative z-10 px-6 md:px-8 -mb-20">
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="bg-gradient-to-br from-card-dark to-[#1a0e30] rounded-xl px-8 py-12 md:px-12 md:py-16 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12 shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-primary/20">
          <div className="max-w-[500px] text-center md:text-left">
            <h3 className="text-3xl font-heading font-bold mb-3 text-text-white">Stay Connected</h3>
            <p className="text-text-dimmed leading-relaxed">Subscribe to our newsletter to receive inspiration, event updates, and news straight to your inbox.</p>
          </div>
          
          <form className="flex flex-col sm:flex-row w-full max-w-[500px] gap-4" onSubmit={handleSubmit}>
            {isSubmitted ? (
              <div className="text-accent-orange font-semibold flex items-center justify-center md:justify-start gap-2 text-center w-full">
                Thank you for subscribing! We will stay in touch.
              </div>
            ) : (
              <>
                <input 
                  type="email" 
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-3 text-text-white text-[0.95rem] focus:outline-none focus:border-primary focus:bg-white/8 transition-all duration-150" 
                  placeholder="Your Email Address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
                <button 
                  type="submit" 
                  className="inline-flex items-center justify-center px-7 py-3 rounded-full font-heading font-semibold cursor-pointer transition-all duration-300 text-[0.95rem] gap-2 bg-primary text-text-white shadow-[0_4px_12px_rgba(140,82,255,0.3)] hover:bg-primary-hover hover:shadow-[0_6px_18px_rgba(140,82,255,0.5)] hover:-translate-y-[2px] active:translate-y-0 shrink-0"
                >
                  Subscribe <Send size={16} />
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
