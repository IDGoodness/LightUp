import { useState } from 'react';
import { Heart, ChevronDown, ChevronUp, DollarSign, Gift, Clock, Sparkles } from 'lucide-react';
import homepageImg from '../assets/homepage.jpg';

export default function Partner() {
  const [openAccordion, setOpenAccordion] = useState<string | null>('giving');
  const [donationAmount, setDonationAmount] = useState('50');
  const [customAmount, setCustomAmount] = useState('');
  const [donationSuccess, setDonationSuccess] = useState(false);

  const toggleAccordion = (id: string) => {
    if (openAccordion === id) {
      setOpenAccordion(null);
    } else {
      setOpenAccordion(id);
    }
  };

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = donationAmount === 'custom' ? customAmount : donationAmount;
    if (finalAmount) {
      setDonationSuccess(true);
      setTimeout(() => {
        setDonationSuccess(false);
        setCustomAmount('');
      }, 5000);
    }
  };

  // Button styling constants
  const btnPrimaryClass = "inline-flex items-center justify-center px-7 py-3 rounded-full font-heading font-semibold cursor-pointer transition-all duration-300 text-[0.95rem] gap-2 bg-primary text-text-white shadow-[0_4px_12px_rgba(140,82,255,0.3)] hover:bg-primary-hover hover:shadow-[0_6px_18px_rgba(140,82,255,0.5)] hover:-translate-y-[2px] active:translate-y-0";
  const btnDonatePrimary = "flex-1 py-2.5 px-4 rounded-lg font-heading font-semibold text-sm bg-primary text-text-white text-center cursor-pointer transition-all hover:bg-primary-hover hover:-translate-y-[1px]";
  const btnDonateSecondary = "flex-1 py-2.5 px-4 rounded-lg font-heading font-semibold text-sm bg-transparent text-text-white border border-white/20 text-center cursor-pointer transition-all hover:bg-white/10 hover:-translate-y-[1px]";

  return (
    <div className="partner-page">
      {/* 1. Split Hero Section */}
      <header className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] min-h-[60vh] bg-bg-black">
        <div className="flex items-center py-16 px-6 sm:px-12 md:px-16 lg:px-24">
          <div className="max-w-[600px] animate-fade-in">
            <span className="font-heading font-bold text-[0.9rem] uppercase tracking-[0.15em] text-primary">PARTNERSHIP</span>
            <h1 className="text-white mb-6 font-heading font-extrabold text-[2.2rem] sm:text-[3rem] md:text-[3.5rem] leading-tight">
              Together, We Can Advance <span className="text-gradient-purple">God's Kingdom</span>
            </h1>
            <p className="text-lg text-text-dimmed leading-relaxed">
              Your partnership helps us share the gospel, disciple believers, support local outreach outposts, and create opportunities for lives to be transformed through the love and power of Jesus Christ.
            </p>
          </div>
        </div>
        <div 
          className="bg-cover bg-center relative min-h-[250px] md:min-h-auto"
          style={{ backgroundImage: `url(${homepageImg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-bg-black via-bg-black/40 to-transparent"></div>
        </div>
      </header>

      {/* 2. Why Partner With Us? */}
      <section className="py-24 bg-bg-light text-text-dark">
        <div className="w-full max-w-[850px] mx-auto px-6 md:px-8 text-center animate-fade-in">
          <span className="font-heading font-bold text-[0.9rem] uppercase tracking-[0.15em] text-primary">THE VISION</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-text-dark mt-2 mb-6 leading-tight">WHY PARTNER WITH US?</h2>
          <p className="text-text-muted text-[1.1rem] leading-relaxed">
            When you partner with Light-Up International Christian Network, you become part of a mission that extends beyond a single event or gathering. You support structural courses to reach more people, strengthen believers through sound teaching, organize impactful conferences, and carry the message of hope to communities near and far. Whether through financial giving, prayer, volunteering, or sharing our mission, every act of partnership contributes directly to the spiritual harvest and lives entrusted to us.
          </p>
        </div>
      </section>

      {/* 3. Ways to Partner Accordions */}
      <section className="py-24 bg-bg-dark">
        <div className="w-full max-w-[900px] mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <span className="font-heading font-bold text-[0.9rem] uppercase tracking-[0.15em] text-primary">CHANNELS</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-text-white mt-2 leading-tight">WAYS TO PARTNER</h2>
          </div>

          <div className="flex flex-col gap-4 mt-14">
            {/* Accordion 1: Financial Giving */}
            <div className="border-b border-white/10 py-6">
              <div 
                className="flex justify-between items-center cursor-pointer select-none py-2" 
                onClick={() => toggleAccordion('giving')}
              >
                <h3 className="text-2xl font-heading font-bold text-text-white flex items-center gap-3">
                  <DollarSign size={24} className="text-primary" /> Financial Giving
                </h3>
                {openAccordion === 'giving' ? <ChevronUp size={20} className="text-text-dimmed" /> : <ChevronDown size={20} className="text-text-dimmed" />}
              </div>
              {openAccordion === 'giving' && (
                <div className="pt-6 max-w-[800px] text-[1.05rem] text-text-dimmed leading-relaxed animate-fade-in">
                  <p className="mb-6">
                    Support our ministry programs, conferences, media broadcasting, and community outreach outposts through secure financial seed sowing.
                  </p>
                  
                  {/* Donation Form */}
                  <form onSubmit={handleDonateSubmit} className="bg-card-dark p-8 rounded-lg border border-primary/20 max-w-[500px] mt-6 shadow-xl">
                    {donationSuccess ? (
                      <div className="text-center text-accent-orange py-4">
                        <Sparkles size={36} className="mx-auto mb-4 animate-bounce" />
                        <h4 className="text-lg font-heading font-bold text-text-white mb-2">Thank You for Your Generosity!</h4>
                        <p className="text-sm text-text-dimmed">Your support makes our global ministry work possible.</p>
                      </div>
                    ) : (
                      <>
                        <h4 className="text-base font-semibold mb-4 text-text-white font-heading">Select Amount to Give</h4>
                        <div className="flex gap-2 mb-4 flex-wrap">
                          {['10', '25', '50', '100'].map((amt) => (
                            <button
                              key={amt}
                              type="button"
                              className={donationAmount === amt ? btnDonatePrimary : btnDonateSecondary}
                              onClick={() => { setDonationAmount(amt); }}
                            >
                              ${amt}
                            </button>
                          ))}
                          <button
                            type="button"
                            className={donationAmount === 'custom' ? btnDonatePrimary : btnDonateSecondary}
                            onClick={() => { setDonationAmount('custom'); }}
                          >
                            Custom
                          </button>
                        </div>

                        {donationAmount === 'custom' && (
                          <div className="mb-4">
                            <input
                              type="number"
                              className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-text-white text-[0.95rem] focus:outline-none focus:border-primary focus:bg-white/8 transition-all"
                              placeholder="Enter Custom Amount ($)"
                              value={customAmount}
                              onChange={(e) => setCustomAmount(e.target.value)}
                              required
                              min="1"
                            />
                          </div>
                        )}

                        <button type="submit" className={`${btnPrimaryClass} w-full gap-2 rounded-lg py-2.5`}>
                          <Gift size={16} /> Partner Financially
                        </button>
                      </>
                    )}
                  </form>
                </div>
              )}
            </div>

            {/* Accordion 2: Prayer Partnership */}
            <div className="border-b border-white/10 py-6">
              <div 
                className="flex justify-between items-center cursor-pointer select-none py-2" 
                onClick={() => toggleAccordion('prayer')}
              >
                <h3 className="text-2xl font-heading font-bold text-text-white flex items-center gap-3">
                  <Heart size={24} className="text-primary" /> Prayer Partnership
                </h3>
                {openAccordion === 'prayer' ? <ChevronUp size={20} className="text-text-dimmed" /> : <ChevronDown size={20} className="text-text-dimmed" />}
              </div>
              {openAccordion === 'prayer' && (
                <div className="pt-6 max-w-[800px] text-[1.05rem] text-text-dimmed leading-relaxed animate-fade-in">
                  <p className="mb-6">
                    Stand with us in prayer. Our global intercessory team receives periodic prayer request briefs covering our ministry meetings, missionary outposts, and global ambassador projects.
                  </p>
                  <button 
                    onClick={() => alert('Thank you! You have signed up for our monthly prayer briefing circles.')}
                    className={btnPrimaryClass}
                  >
                    Join Prayer Circle
                  </button>
                </div>
              )}
            </div>

            {/* Accordion 3: Volunteer Service */}
            <div className="border-b border-white/10 py-6">
              <div 
                className="flex justify-between items-center cursor-pointer select-none py-2" 
                onClick={() => toggleAccordion('service')}
              >
                <h3 className="text-2xl font-heading font-bold text-text-white flex items-center gap-3">
                  <Clock size={24} className="text-primary" /> Volunteer Service
                </h3>
                {openAccordion === 'service' ? <ChevronUp size={20} className="text-text-dimmed" /> : <ChevronDown size={20} className="text-text-dimmed" />}
              </div>
              {openAccordion === 'service' && (
                <div className="pt-6 max-w-[800px] text-[1.05rem] text-text-dimmed leading-relaxed animate-fade-in">
                  <p className="mb-6">
                    Share your time, talents, and professional skills in media production, translation, event management, and local community outreach planning.
                  </p>
                  <button 
                    onClick={() => {
                      const skill = prompt('What is your primary skill or interest area? (e.g. Media, Outreach, Ushering):');
                      if (skill) alert(`Awesome! We will coordinate with you regarding volunteer opportunities in "${skill}".`);
                    }}
                    className={btnPrimaryClass}
                  >
                    Register as a Volunteer
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
