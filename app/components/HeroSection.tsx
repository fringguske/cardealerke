import React, { useState } from "react";
import Link from "next/link";
import ReactDOM from "react-dom";

/**
 * HeroSection component displays a hero area with a dark grey background,
 * a header with a responsive dropdown menu, a headline, and a car image.
 * The image is fully responsive and never extends beyond the hero section.
 */
const HeroSection: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // For SSR safety
  const isClient = typeof window !== 'undefined';

  return (
    <section className="hero-section-transparent">
      <div className="hero-bg-image" aria-hidden="true"></div>
      <header className="hero-header-top">
        <Link href="/admin" title="Admin Login" className="hero-logo-link">
          <img src="/carr/ChatGPT Image Jul 9, 2025, 10_58_18 AM.png" alt="Logo" className="hero-logo-image" />
        </Link>
        <nav className="hero-nav-top-desktop">
          <a href="#product">Product</a>
          <a href="#tech">Tech</a>
          <a href="#story">Story</a>
          <a href="#setup">Setup</a>
          <a href="#order" className="hero-order-top">Order Now</a>
        </nav>
      </header>
      {isMenuOpen && isClient && ReactDOM.createPortal(
        <nav className="hero-nav-mobile-dropdown">
          <button className="hero-nav-back-btn" onClick={() => setIsMenuOpen(false)}>&larr; Back</button>
          <a href="#product" onClick={() => setIsMenuOpen(false)}>Product</a>
          <a href="#tech" onClick={() => setIsMenuOpen(false)}>Tech</a>
          <a href="#story" onClick={() => setIsMenuOpen(false)}>Story</a>
          <a href="#setup" onClick={() => setIsMenuOpen(false)}>Setup</a>
          <a href="#order" className="hero-order-top" onClick={() => setIsMenuOpen(false)}>Order Now</a>
        </nav>,
        document.body
      )}
      <h1 className="hero-title-grey">
        Meet the car built<br />
        for people who<br />
        move differently.
      </h1>
      <style jsx>{`
        .hero-section-transparent {
          position: relative;
          width: 100%;
          background: rgba(255,255,255,0.10); /* subtle glass effect, transparent */
          border-radius: 24px;
          margin: 0;
          box-shadow: 0 8px 32px 0 rgba(31,38,135,0.10);
          max-width: 1200px;
          display: flex;
          flex-direction: column;
          padding: 0 2.5rem 2.5rem 2.5rem;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          overflow: hidden;
        }
        .hero-bg-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          background: url('/carr/ice-bear-Fc1qqvL2Ets-unsplash.jpg') center center / cover no-repeat;
          opacity: 0.82;
          transition: opacity 0.3s;
        }
        .hero-header-top,
        .hero-title-grey,
        .hero-nav-top-desktop,
        .hero-nav-mobile-dropdown {
          position: relative;
          z-index: 2;
        }
        .hero-section-transparent::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg,rgba(255,255,255,0.38) 0%,rgba(255,255,255,0.08) 100%);
          z-index: 1;
          pointer-events: none;
        }
        .hero-logo-image {
          height: 64px;
          width: auto;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          background: none;
          padding: 0;
          z-index: 10;
          display: block;
        }
        .hero-nav-top-desktop {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 2.5rem;
          height: 100%;
          margin-left: auto;
        }
        .hero-nav-top-desktop a {
          color: #23272f;
          text-decoration: none;
          font-weight: 500;
          font-size: 1.05rem;
          transition: color 0.18s;
        }
        .hero-nav-top-desktop a:hover {
          color: #111;
        }
        .hero-nav-top-desktop .hero-order-top {
          font-weight: 700;
          color: #23272f;
        }
        .hero-admin-link {
          background: #667eea;
          color: #fff !important;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-weight: 600;
          transition: background-color 0.2s;
        }
        .hero-admin-link:hover {
          background: #5a67d8 !important;
          color: #fff !important;
        }
        .hero-menu-button-mobile {
          display: block;
          background: rgba(68,72,81,0.7);
          color: #23272f;
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          z-index: 10;
        }
        .hero-nav-mobile-dropdown {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          background: rgba(255,255,255,0.97);
          padding: 1.2rem 1.2rem 1.6rem 1.2rem;
          border-radius: 0 0 18px 18px;
          position: fixed;
          top: 64px;
          right: 0;
          left: auto;
          width: 260px;
          min-width: 180px;
          max-width: 260px;
          margin-top: 10px;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 4px 24px rgba(0,0,0,0.13);
          z-index: 9999;
        }
        .hero-nav-back-btn {
          background: #2563eb;
          border: none;
          color: #fff;
          font-size: 1.1rem;
          font-weight: 600;
          text-align: left;
          margin-bottom: 1rem;
          padding: 0.5rem 1.2rem 0.5rem 0.7rem;
          cursor: pointer;
          border-radius: 6px;
          transition: background 0.18s;
          box-shadow: 0 2px 8px rgba(37,99,235,0.08);
        }
        .hero-nav-back-btn:hover {
          background: #1d4ed8;
        }
        .hero-nav-mobile-dropdown a {
          color: #23272f;
          text-decoration: none;
          font-weight: 500;
          font-size: 1.1rem;
          padding: 0.7rem;
          border-radius: 6px;
          transition: background-color 0.2s, color 0.2s;
        }
        .hero-nav-mobile-dropdown a:hover {
          background-color: #e5e7eb;
          color: #111;
        }
        .hero-nav-mobile-dropdown .hero-admin-link {
          background: #667eea;
          color: #fff !important;
          text-align: center;
          font-weight: 600;
        }
        .hero-nav-mobile-dropdown .hero-admin-link:hover {
          background: #5a67d8 !important;
        }
        .hero-title-grey {
          font-size: 2.8rem;
          font-weight: 700;
          color: #23272f;
          margin: 2.5rem 0 2.2rem 0;
          line-height: 1.08;
          letter-spacing: -1px;
          text-align: left;
          align-self: flex-start;
          text-shadow: 0 2px 8px rgba(255,255,255,0.15), 0 2px 16px rgba(0,0,0,0.12);
        }
        .hero-header-top {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 2.5rem;
          padding-top: 2.5rem;
          padding-bottom: 0.5rem;
        }
        @media (min-width: 901px) {
          .hero-nav-top-desktop {
            display: none;
          }
          .hero-menu-button-mobile {
            display: none;
          }
        }
        @media (max-width: 900px) {
          .hero-section-transparent {
            margin: 0;
            padding: 0.5rem 0.7rem 1.5rem 0.7rem;
          }
          .hero-header-top {
            gap: 0;
            padding-top: 1.2rem;
            padding-bottom: 0.2rem;
            justify-content: space-between;
          }
          .hero-logo-image {
            margin-right: 0;
          }
          .hero-menu-button-mobile {
            margin-left: auto;
            margin-right: 0.2rem;
            display: block;
          }
          .hero-title-grey {
            font-size: 2.1rem;
            margin: 1.5rem 0 1.2rem 0;
          }
          .hero-nav-top-desktop {
            display: none;
          }
          .hero-nav-mobile-dropdown {
            left: 0;
            right: 0;
            width: 100vw;
            margin: 0 auto;
            top: 64px;
            border-radius: 0 0 18px 18px;
            max-width: 100vw;
            min-width: unset;
            box-sizing: border-box;
            padding: 1.2rem 1.2rem 1.6rem 1.2rem;
          }
        }
        @media (max-width: 600px) {
          .hero-section-transparent {
            margin: 0;
            padding: 0.5rem 0.2rem 1rem 0.2rem;
          }
          .hero-header-top {
            padding-top: 1rem;
          }
          .hero-title-grey {
            font-size: 1.3rem;
            margin: 1rem 0 0.7rem 0;
          }
        }
        .hero-admin-login-mobile {
          background: #667eea;
          color: #fff;
          font-weight: 600;
          border-radius: 6px;
          padding: 0.5rem 1.2rem;
          font-size: 1rem;
          border: none;
          margin-left: auto;
          margin-right: 0.2rem;
          transition: background 0.18s;
          z-index: 10;
        }
        .hero-admin-login-mobile:hover {
          background: #5a67d8;
        }
        .hero-logo-link {
          display: block;
          cursor: pointer;
          z-index: 10;
        }
      `}</style>
    </section>
  );
};

export default HeroSection; 