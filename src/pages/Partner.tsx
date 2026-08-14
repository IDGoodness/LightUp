import partnerImg from '../assets/partner.jpg';

export default function Partner() {
  return (
    <div className="partner-page bg-[#090212] min-h-screen text-text-white">
      {/* 1. Split Hero Section */}
      <header className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] min-h-[60vh] bg-bg-black">
        <div className="flex items-center py-16 px-6 sm:px-12 md:px-16 lg:px-24">
          <div className="max-w-[600px] animate-fade-in">
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
          style={{ backgroundImage: `url(${partnerImg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-bg-black via-bg-black/40 to-transparent"></div>
        </div>
      </header>

      {/* 2. Why Partner With Us? */}
      <section className="py-24 bg-bg-light text-text-dark">
        <div className="w-full max-w-[850px] mx-auto px-6 md:px-8 text-center animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-text-dark mt-2 mb-6 leading-tight">WHY PARTNER WITH US?</h2>
          <p className="text-text-muted text-[1rem] leading-relaxed">
            When you partner with LightUp International Christian Network, you become part of a mission that extends beyond a single event or gathering. You support structural courses to reach more people, strengthen believers through sound teaching, organize impactful conferences, and carry the message of hope to communities near and far. Whether through financial giving, prayer, volunteering, or sharing our mission, every act of partnership contributes directly to the spiritual harvest and lives entrusted to us.
          </p>
        </div>
      </section>

      {/* 3. Ways to Partner */}
      <section className="py-24 bg-black">
        <div className="w-full max-w-[850px] mx-auto px-6 md:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-white tracking-wide uppercase">WAYS TO PARTNER</h2>
          </div>

          <div className="flex flex-col mt-10 animate-fade-in">
            {/* Divider line 1 */}
            <div className="border-t border-primary/40 w-full"></div>

            {/* Item 1: Financial Giving */}
            <div className="py-8">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-text-white mb-3">
                Financial Giving
              </h3>
              <p className="text-[0.9rem] sm:text-[0.95rem] text-text-dimmed leading-relaxed max-w-[750px]">
                Support the ministry through generous giving that helps fund outreach programs, conferences, discipleship initiatives, and ministry operations.
              </p>
            </div>

            {/* Divider line 2 */}
            <div className="border-t border-primary/40 w-full"></div>

            {/* Item 2: Prayer Partnership */}
            <div className="py-8">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-text-white mb-3">
                Prayer Partnership
              </h3>
              <p className="text-[0.9rem] sm:text-[0.95rem] text-text-dimmed leading-relaxed max-w-[750px]">
                Stand with us in prayer as we seek God's direction, wisdom, and grace for every ministry assignment and the lives we serve.
              </p>
            </div>

            {/* Divider line 3 */}
            <div className="border-t border-primary/40 w-full"></div>

            {/* Item 3: Volunteer Service */}
            <div className="py-8">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-text-white mb-3">
                Volunteer Service
              </h3>
              <p className="text-[0.9rem] sm:text-[0.95rem] text-text-dimmed leading-relaxed max-w-[750px]">
                Use your gifts, talents, and time to serve alongside us during ministry events, outreach programs, conferences, and community initiatives.
              </p>
            </div>

            {/* Divider line 4 */}
            <div className="border-t border-primary/40 w-full"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
