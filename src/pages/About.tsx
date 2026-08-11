import { Target, Eye, Gem, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ministriesData } from '../data/mockData';
import homepageImg from '../assets/homepage.jpg';

export default function About() {
  const btnPrimaryClass = "inline-flex items-center justify-center px-7 py-3 rounded-full font-heading font-semibold cursor-pointer transition-all duration-300 text-[0.95rem] gap-2 bg-primary text-text-white shadow-[0_4px_12px_rgba(140,82,255,0.3)] hover:bg-primary-hover hover:shadow-[0_6px_18px_rgba(140,82,255,0.5)] hover:-translate-y-[2px] active:translate-y-0";

  return (
    <div className="about-page">
      {/* 1. Hero Section */}
      <header className="relative bg-cover bg-center bg-no-repeat min-h-[50vh] flex items-center justify-center text-center py-24 px-6" style={{ backgroundImage: `url(${homepageImg})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/70 to-bg-dark/95 z-10"></div>
        <div className="relative z-20 max-w-[850px] animate-fade-in">
          <p className="font-heading font-bold uppercase tracking-[0.15em] text-primary mb-6">ABOUT US</p>
          <h1 className="text-white mb-6 font-heading font-extrabold text-[2.5rem] sm:text-[3.5rem] md:text-[4rem] leading-tight">WHO ARE WE?</h1>
          <p className="max-w-[800px] mx-auto text-[1.1rem] text-text-dimmed leading-relaxed">
            Light-Up International Christian Network is a corporate, multi-faceted ministry called to ignite the hearts of believers and raise kingdom ambassadors. We stand as a beacon of truth, raising individuals to influence their families, careers, and communities with the love, power, and principles of God's Word.
          </p>
        </div>
      </header>

      {/* 2. Mission, Vision, Values */}
      <section className="py-24 bg-bg-light text-text-dark relative overflow-hidden">
        {/* Background Decorative Dotted Line */}
        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[2px] h-[70%] border-l-2 border-dotted border-primary/30 z-0 pointer-events-none desktop-only-line"></div>

        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8 relative z-10">
          <div className="text-center max-w-[700px] mx-auto mb-16">
            <span className="font-heading font-bold text-[0.9rem] uppercase tracking-[0.15em] text-primary">FOUNDATION</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-text-dark mt-2 mb-4 leading-tight">Our Core Purpose</h2>
            <p className="text-text-muted">The pillars upon which Light-Up International is established.</p>
          </div>

          <div className="flex flex-col gap-12 relative">
            {/* Mission */}
            <div className="w-full md:w-[45%] rounded-lg p-8 md:p-12 relative z-10 shadow-lg border border-white/5 text-text-white self-start bg-primary">
              <div className="mb-6 w-12 h-12 rounded-full flex items-center justify-center bg-white/15">
                <Target size={24} />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4">OUR MISSION</h3>
              <p className="text-text-white text-[1.05rem] leading-relaxed">
                To ignite spiritual passion, raise mature kingdom ambassadors, and transform communities globally by training believers in prayer, sound biblical doctrine, and active marketplace outreach.
              </p>
            </div>

            {/* Vision */}
            <div className="w-full md:w-[45%] rounded-lg p-8 md:p-12 relative z-10 shadow-lg border border-white/5 text-text-dark self-end bg-accent-teal">
              <div className="mb-6 w-12 h-12 rounded-full flex items-center justify-center bg-black/10">
                <Eye size={24} />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4">OUR VISION</h3>
              <p className="text-text-dark text-[1.05rem] leading-relaxed">
                To see equipped believers actively leading positive transformation and standing as standard-bearers of righteousness, love, and excellence in their families, cities, and workplaces.
              </p>
            </div>

            {/* Values */}
            <div className="w-full md:w-[45%] rounded-lg p-8 md:p-12 relative z-10 shadow-lg border border-white/5 text-text-white self-start bg-accent-deep-purple">
              <div className="mb-6 w-12 h-12 rounded-full flex items-center justify-center bg-white/15">
                <Gem size={24} />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4">OUR CORE VALUES</h3>
              <p className="text-text-white text-[1.05rem] leading-relaxed">
                Uncompromising commitment to scriptural truth, deep devotion in prayer, excellence in marketplace service, absolute integrity in leadership, and sacrificial love for the communities we serve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. What We Believe */}
      <section className="py-24 bg-bg-black">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="text-center max-w-[700px] mx-auto mb-16">
            <span className="font-heading font-bold text-[0.9rem] uppercase tracking-[0.15em] text-primary">DOCTRINE</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-text-white mt-2 mb-4 leading-tight">
              What We <span className="text-gradient-orange">Believe</span>
            </h2>
            <p className="text-text-dimmed">Fundamental spiritual foundations of our network and teaching.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
            <div className="sticky-card bg-card-dark-lighter rounded-lg p-8 md:p-10 shadow-2xl border border-white/5 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/20 animate-fade-in">
              <h3 className="text-xl font-heading font-bold mb-4 text-text-white">Scriptural Authority</h3>
              <p className="text-[0.95rem] text-text-dimmed leading-relaxed">
                We believe the Holy Bible is the inspired, infallible, and complete Word of God. It stands as our final authority in all matters of faith, conduct, doctrine, and spiritual growth.
              </p>
            </div>

            <div className="sticky-card bg-card-dark-lighter rounded-lg p-8 md:p-10 shadow-2xl border border-white/5 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/20 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-xl font-heading font-bold mb-4 text-text-white">Prayer & Communion</h3>
              <p className="text-[0.95rem] text-text-dimmed leading-relaxed">
                We believe that consistent, spirit-led prayer is vital for a thriving relationship with God. It is the fuel for personal transformation, family protection, and territorial victory.
              </p>
            </div>

            <div className="sticky-card bg-card-dark-lighter rounded-lg p-8 md:p-10 shadow-2xl border border-white/5 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-xl font-heading font-bold mb-4 text-text-white">Kingdom Impact</h3>
              <p className="text-[0.95rem] text-text-dimmed leading-relaxed">
                We believe every believer is called to be a minister of reconciliation in their community. We are saved not just to go to heaven, but to establish God's reign on earth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Ministries list */}
      <section className="py-24 bg-bg-dark" id="ministries">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="text-center max-w-[700px] mx-auto mb-16">
            <span className="font-heading font-bold text-[0.9rem] uppercase tracking-[0.15em] text-primary">OFFICES</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-text-white mt-2 mb-4 leading-tight">Our Ministries & Offices</h2>
            <p className="text-text-dimmed">Our work is structured into dedicated offices to provide deep, focused support to believers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
            {ministriesData.map((min) => (
              <div className="bg-card-dark rounded-lg overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.2)] border border-primary/20 transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_15px_35px_rgba(140,82,255,0.2)] flex flex-col" key={min.id}>
                <div className="h-[200px] relative">
                  <img src={min.image} alt={min.title} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-card-dark to-transparent"></div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <span className="text-[0.8rem] font-bold tracking-[0.1em] text-primary mb-2">{min.office}</span>
                  <h3 className="text-2xl font-heading font-bold mb-4 text-text-white">{min.title}</h3>
                  <p className="text-[0.95rem] text-text-dimmed mb-6 leading-relaxed">{min.description}</p>
                  
                  <div className="border-t border-white/5 pt-4 mt-auto">
                    <h4 className="text-sm font-semibold text-text-white mb-2 font-heading">Scope of Work:</h4>
                    <p className="text-xs text-text-dimmed leading-relaxed">{min.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to action */}
          <div className="mt-16 p-8 md:p-12 bg-gradient-to-br from-card-dark to-[#1a0a30] rounded-xl border border-primary/20 text-center">
            <h3 className="text-2xl font-heading font-bold mb-2 text-text-white">Want to find out about our meetings?</h3>
            <p className="text-text-dimmed mb-8 max-w-[600px] mx-auto">We host weekly online intercession coordinates, hybrid training seminars, and periodic marketplace congresses.</p>
            <Link to="/events" className={btnPrimaryClass}>
              View Calendar <Calendar size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
