import React, { useEffect, useState } from 'react';
import { RiGithubFill, RiExternalLinkLine, RiHeartFill } from 'react-icons/ri';
import '../styles/sunset.css';

const Sunset = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`sunset-page ${loaded ? 'loaded' : ''}`}>
      {/* Animated background */}
      <div className="sunset-bg">
        <div className="sunset-gradient-1"></div>
        <div className="sunset-gradient-2"></div>
        <div className="sunset-gradient-3"></div>
        <div className="sunset-road">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M35 100 L50 20 L65 100" fill="rgba(255,255,255,0.02)" />
            <path d="M48 100 L50 30 L52 100" fill="rgba(255,255,255,0.04)" strokeDasharray="2 4" />
          </svg>
        </div>
        <div className="sunset-noise"></div>
      </div>

      {/* Content */}
      <main className="sunset-main">
        {/* Hero */}
        <section className="sunset-hero">
          <div className="hero-icon">
            <svg viewBox="0 0 80 80" className="broken-road-icon">
              <path
                d="M10 50 Q25 30 40 50 Q55 70 70 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                className="road-path"
              />
              <circle cx="40" cy="50" r="6" fill="currentColor" className="pothole-dot" />
              <path d="M36 46 L44 54 M44 46 L36 54" stroke="var(--color-bg)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          <p className="hero-date">2024 - 2025</p>

          <h1 className="sunset-title">
            <span className="title-line title-line-1">Indian Potholes</span>
            <span className="title-line title-line-2">has closed its doors.</span>
          </h1>
        </section>

        {/* Emotional opening */}
        <section className="sunset-opening">
          <div className="opening-content">
            <p className="opening-quote">
              "Every pothole reported was an act of hope - <br/>
              hope that someone was listening."
            </p>
            <p className="opening-text">
              We built this platform with a simple dream: that ordinary citizens could photograph
              the broken roads in their neighborhoods, and that <em>someone in power</em> would care
              enough to fix them.
            </p>
            <p className="opening-text">
              We were wrong.
            </p>
          </div>
        </section>

        {/* The Story */}
        <section className="sunset-story">
          <h2 className="story-heading">What We Tried To Build</h2>

          <div className="story-content">
            <p>
              For months, we poured our hearts into creating something meaningful. A platform where
              a mother could report the pothole her child's school bus hits every morning. Where a
              delivery driver could document the crater that damages his bike. Where elderly citizens
              could flag the broken footpath they're afraid to walk on.
            </p>
            <p>
              We mapped potholes to constituencies. We tagged MLAs, MPs, corporators, engineers.
              We built a system that could have connected citizens directly to the people responsible
              for their roads.
            </p>
            <p className="story-emphasis">
              All we needed was for those people to listen.
            </p>
          </div>
        </section>

        {/* What happened */}
        <section className="sunset-happened">
          <div className="happened-card">
            <h2>What Happened</h2>
            <p>
              We reached out to government bodies. We wrote emails. We tried official channels.
              We hoped that showing them a tool built with good intentions would spark interest.
            </p>
            <p className="happened-result">
              We received silence.
            </p>
            <p>
              Not a single government authority engaged meaningfully with this platform.
              Not one MLA asked to see the reports from their constituency. Not one municipal
              corporation expressed interest in the data citizens were providing <em>for free</em>.
            </p>
          </div>
        </section>

        {/* Why we're stopping */}
        <section className="sunset-why">
          <h2>Why We Can't Continue</h2>
          <div className="why-content">
            <p>
              A pothole reporting platform without responsive authorities is just a graveyard
              of unfulfilled hopes. Every report submitted becomes another entry in a database
              that no one in power will ever look at.
            </p>
            <p>
              We refuse to let citizens believe their voices are being heard when they're not.
              We refuse to collect their frustrations into a void. That would be worse than
              having no platform at all.
            </p>
            <p className="why-hard">
              This is the hardest decision we've made. But it's the honest one.
            </p>
          </div>
        </section>

        {/* Gratitude */}
        <section className="sunset-gratitude">
          <div className="gratitude-heart">
            <RiHeartFill />
          </div>
          <h2>To Everyone Who Believed</h2>
          <div className="gratitude-content">
            <p>
              To every citizen who took time out of their day to photograph a pothole,
              to pin it on a map, to write a description hoping it would help -
              <strong>thank you</strong>.
            </p>
            <p>
              Your civic spirit is not misplaced. Your desire to improve your community
              is exactly what India needs. The failure here is not yours.
            </p>
            <p className="gratitude-system">
              The failure is a system that does not listen to its people.
            </p>
          </div>
        </section>

        {/* Hope */}
        <section className="sunset-hope">
          <div className="hope-content">
            <h2>Maybe Someday</h2>
            <p>
              We're leaving the code open source. Every line of it. Maybe a future government
              will want to build something like this. Maybe another team will have better luck
              than we did. Maybe someday, citizens reporting problems will actually lead to
              problems being solved.
            </p>
            <p className="hope-final">
              Until then, the roads remain broken. <br/>
              And so does something in us.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="sunset-footer">
          <a
            href="https://github.com/Empowered-Indian/indian-potholes"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
          >
            <RiGithubFill />
            <span>The code lives on</span>
            <RiExternalLinkLine className="external-icon" />
          </a>

          <div className="footer-divider"></div>

          <p className="footer-sign">
            Made with love, frustration, and hope for better roads in India
          </p>

          <p className="footer-team">
            - The Team Behind Indian Potholes
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Sunset;
