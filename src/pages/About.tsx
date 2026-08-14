import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ministriesData } from '../data/mockData';
import aboutImg from '../assets/about.png';
import targetImg from '../assets/target.png';
import eyeImg from '../assets/eye.png';
import jewelImg from '../assets/jewel.png';
import ecclipseImg from '../assets/ecclipse.png';
import pinImg from '../assets/pin.png';

export default function About() {
  const btnPrimaryClass = "inline-flex items-center justify-center px-7 py-3 rounded-full font-heading font-semibold cursor-pointer transition-all duration-300 text-[0.95rem] gap-2 bg-primary text-text-white shadow-[0_4px_12px_rgba(140,82,255,0.3)] hover:bg-primary-hover hover:shadow-[0_6px_18px_rgba(140,82,255,0.5)] hover:-translate-y-[2px] active:translate-y-0";

  return (
    <div className="about-page">
      {/* 1. Hero Section */}
      <header
        className="relative bg-cover bg-center bg-no-repeat min-h-[50vh] flex items-center justify-center text-center py-24 px-6"
        style={{ backgroundImage: `url(${aboutImg})` }}
      >
        <div className="relative z-20 max-w-[850px] animate-fade-in">
          <h1 className="text-white mb-6 font-heading font-extrabold text-[2.5rem] sm:text-[3.5rem] md:text-[4rem] leading-tight">
            WHO ARE WE?
          </h1>
          <p className="max-w-[800px] mx-auto text-[1rem] text-text-dimmed leading-relaxed">
            A Christ-centered ministry dedicated to raising believers through
            prayer, biblical teaching, mentorship and impactful gatherings that
            inspire lives and strengthen faith. A Christ-centered ministry
            dedicated to raising believers through prayer, biblical teaching,
            mentorship and impactful gatherings that inspire lives and
            strengthen faith. A Christ-centered ministry dedicated to raising
            believers through prayer, biblical teaching, mentorship and
            impactful gatherings that inspire lives and strengthen faith. A
            Christ-centered ministry dedicated to raising believers through
            prayer, biblical teaching, mentorship and impactful gatherings that
            inspire lives and strengthen faith. A Christ-centered ministry
            dedicated to raising believers through prayer, biblical teaching,
            mentorship and impactful gatherings that inspire lives and
            strengthen faith. A Christ-centered ministry dedicated to raising
            believers through prayer, biblical teaching, mentorship and
            impactful gatherings that inspire lives and strengthen faith.
          </p>
        </div>
      </header>

      {/* 2. Mission, Vision, Values */}
      <section className="py-28 bg-[#ede8f5] text-text-dark relative overflow-hidden">
        {/* Background Decorative Images */}

        {/* Eclipse (Dashed orange/gold circles in center) */}
        <img
          src={ecclipseImg}
          className="absolute left-1/2 top-1/2 md:top-100 -translate-x-1/2 -translate-y-1/2 w-[240px] md:w-[300px] h-auto object-contain z-0 pointer-events-none opacity-90 select-none"
          alt="Decorative eclipse path"
        />

        {/* Eclipse (Dashed orange/gold circles in center) */}
        <img
          src={ecclipseImg}
          className="absolute left-1/2 top-1/2 md:top-150 -translate-x-1/2 -translate-y-1/2 w-[240px] md:w-[300px] h-auto object-contain z-0 pointer-events-none opacity-90 select-none"
          alt="Decorative eclipse path"
        />

        {/* Target Background Image (left side) */}
        <img
          src={targetImg}
          className="absolute left-[-2%] md:left-[1%] top-[5%] md:top-[8%] w-[130px] md:w-[200px] h-auto object-contain z-0 opacity-[1] pointer-events-none select-none"
          alt="Target watermark"
        />

        {/* Eye Background Image (right side) */}
        <img
          src={eyeImg}
          className="absolute right-[-2%] md:right-[1%] top-[35%] md:top-[38%] w-[140px] md:w-[220px] h-auto object-contain z-0 opacity-[1] pointer-events-none select-none"
          alt="Eye watermark"
        />

        {/* Jewel Background Image (bottom center/right) */}
        <img
          src={jewelImg}
          className="absolute right-[12%] md:right-[30%] bottom-[2%] md:bottom-[15%] w-[140px] md:w-[220px] h-auto object-contain z-0 opacity-[1] pointer-events-none select-none"
          alt="Jewel watermark"
        />

        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8 relative z-10 animate-fade-in">
          <div className="flex flex-col w-full max-w-[760px] mx-auto relative z-10 gap-10 md:gap-0">
            {/* Mission Card (Left-aligned) */}
            <div className="w-full md:w-[380px] rounded-[1rem] p-8 md:p-10 relative z-10 shadow-2xl text-text-white bg-primary self-start transition-all duration-300 hover:scale-[1.02]">
              <h3 className="text-xl md:text-2xl font-heading font-extrabold uppercase tracking-wide mb-4 text-text-white">
                OUR MISSION
              </h3>
              <p className="text-white/95 text-[0.95rem] md:text-[1rem] leading-relaxed">
                Our mission is to reach and transform lives through outreaches
                and prayer conferences, awakening hearts, breaking spiritual
                darkness, and equipping people to live in the truth of their
                identity in Christ Jesus.
              </p>
            </div>

            {/* Vision Card (Right-aligned, overlapping vertically on desktop) */}
            <div className="w-full md:w-[380px] rounded-[1rem] p-8 md:p-10 relative z-20 shadow-2xl text-text-white bg-accent-teal self-end md:-mt-16 md:-mb-16 transition-all duration-300 hover:scale-[1.02]">
              <h3 className="text-xl md:text-2xl font-heading font-extrabold uppercase tracking-wide mb-4 text-text-white">
                OUR VISION
              </h3>
              <p className="text-white/95 text-[0.95rem] md:text-[1rem] leading-relaxed">
                We envision a people no longer bound by spiritual darkness, but
                fully alive in the light of Christ, hearts awakened, eyes
                opened, and lives transformed. A generation that knows who they
                are in Christ Jesus, walks in that identity boldly, and brings
                light into every area of life and every place they go.
              </p>
            </div>

            {/* Core Values Card (Left-aligned) */}
            <div className="w-full md:w-[380px] rounded-[1rem] p-8 md:p-10 relative z-10 shadow-2xl text-text-white bg-accent-deep-purple self-start transition-all duration-300 hover:scale-[1.02]">
              <h3 className="text-xl md:text-2xl font-heading font-extrabold uppercase tracking-wide mb-4 text-text-white">
                OUR CORE VALUES
              </h3>
              <p className="text-white/95 text-[0.95rem] md:text-[1rem] leading-relaxed">
                Uncompromising commitment to scriptural truth, deep devotion in
                prayer, excellence in marketplace service, absolute integrity in
                leadership, and sacrificial love for the communities we serve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. What We Believe */}
      <section className="py-24 bg-bg-black">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="text-center max-w-[700px] mx-auto mb-20 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl md:text-4xl font-heading font-extrabold text-text-white uppercase tracking-wider">
              WHAT WE <span className="text-[#ffa800]">BELIEVE</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-10 lg:gap-16 mt-16 max-w-[1100px] mx-auto animate-fade-in">
            {/* Card 1 */}
            <div className="relative group min-h-[300px]">
              {/* Rotated Orange Background Card */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#ffa800] to-[#ff8c00] rounded-[2rem] -rotate-[3deg] z-0 transition-transform duration-300 group-hover:rotate-[-1deg] shadow-[0_10px_25px_rgba(255,168,0,0.15)]"></div>

              {/* Front Text Card */}
              <div className="relative bg-[#090212] border border-white/10 rounded-[2rem] p-8 pt-14 flex flex-col items-center justify-center text-center h-full z-10 shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
                <img
                  src={pinImg}
                  className="absolute top-[-30px] w-16 h-16 md:w-20 md:h-20 object-contain select-none pointer-events-none"
                  alt="Pin decoration"
                />
                <p className="text-text-white text-[0.95rem] md:text-[1rem] leading-relaxed font-body">
                  We believe the Holy Bible is the inspired, infallible, and
                  complete Word of God. It stands as our final authority in all
                  matters of faith, conduct, doctrine, and spiritual growth.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div
              className="relative group min-h-[300px]"
              style={{ animationDelay: "0.2s" }}
            >
              {/* Rotated Orange Background Card */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#ffa800] to-[#ff8c00] rounded-[2rem] -rotate-[3deg] z-0 transition-transform duration-300 group-hover:rotate-[-1deg] shadow-[0_10px_25px_rgba(255,168,0,0.15)]"></div>

              {/* Front Text Card */}
              <div className="relative bg-[#090212] border border-white/10 rounded-[2rem] p-8 pt-14 flex flex-col items-center justify-center text-center h-full z-10 shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
                <img
                  src={pinImg}
                  className="absolute top-[-30px] w-16 h-16 md:w-20 md:h-20 object-contain select-none pointer-events-none"
                  alt="Pin decoration"
                />
                <p className="text-text-white text-[0.95rem] md:text-[1rem] leading-relaxed font-body">
                  We believe that consistent, spirit-led prayer is vital for a
                  thriving relationship with God. It is the fuel for personal
                  transformation, family protection, and territorial victory.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div
              className="relative group min-h-[300px]"
              style={{ animationDelay: "0.4s" }}
            >
              {/* Rotated Orange Background Card */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#ffa800] to-[#ff8c00] rounded-[2rem] -rotate-[3deg] z-0 transition-transform duration-300 group-hover:rotate-[-1deg] shadow-[0_10px_25px_rgba(255,168,0,0.15)]"></div>

              {/* Front Text Card */}
              <div className="relative bg-[#090212] border border-white/10 rounded-[2rem] p-8 pt-14 flex flex-col items-center justify-center text-center h-full z-10 shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
                <img
                  src={pinImg}
                  className="absolute top-[-30px] w-16 h-16 md:w-20 md:h-20 object-contain select-none pointer-events-none"
                  alt="Pin decoration"
                />
                <p className="text-text-white text-[0.95rem] md:text-[1rem] leading-relaxed font-body">
                  We believe every believer is called to be a minister of
                  reconciliation in their community. We are saved not just to go
                  to heaven, but to establish God's reign on earth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Ministries list */}
      <section className="py-24 bg-bg-dark" id="ministries">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="text-center max-w-[700px] mx-auto mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl md:text-4xl font-heading font-extrabold text-text-white uppercase tracking-wider">
              OUR MINISTRIES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16 max-w-[1100px] mx-auto animate-fade-in">
            {ministriesData.map((min) => (
              <div
                className="relative w-full rounded-[2rem] overflow-hidden h-[420px] shadow-xl group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(140,82,255,0.25)]"
                key={min.id}
              >
                {/* Image Background */}
                <img
                  src={min.image}
                  alt={min.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/15 transition-opacity duration-300 group-hover:bg-black/25"></div>

                {/* Floating White Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white rounded-[1.5rem] p-6 shadow-2xl z-10">
                  <h3 className="font-heading font-extrabold text-base text-[#08060d] tracking-wide uppercase mb-2">
                    {min.title}
                  </h3>
                  <p className="text-xs text-[#6b6375] leading-relaxed font-body">
                    {min.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Call to action */}
          <div className="mt-16 p-8 md:p-12 bg-gradient-to-br from-card-dark to-[#1a0a30] rounded-xl border border-primary/20 text-center">
            <h3 className="text-2xl font-heading font-bold mb-2 text-text-white">
              Want to find out about our meetings?
            </h3>
            <p className="text-text-dimmed mb-8 max-w-[600px] mx-auto">
              We host weekly online intercession coordinates, hybrid training
              seminars, and periodic marketplace congresses.
            </p>
            <Link to="/events" className={btnPrimaryClass}>
              View Calendar <Calendar size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
