"use client"
import React from "react";

// SVG icon components for WhatsApp, Phone, and Email
const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.67 20.13A10 10 0 1 0 3.87 3.87a10 10 0 0 0 13.36 13.36l3.11 3.11a1 1 0 0 0 1.42-1.42l-3.11-3.11z"/><path d="M8.29 13.29a6 6 0 0 1 7.42 0"/></svg>
);
const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a2 2 0 0 1 2 1.72c.13 1.13.37 2.23.72 3.29a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c1.06.35 2.16.59 3.29.72A2 2 0 0 1 22 16.92z"/></svg>
);
const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,6 12,13 2,6"/></svg>
);

/**
 * ContactInfo component displays static contact details with icons.
 * - WhatsApp, Phone, and Email are shown with clickable links.
 * - Modular and reusable.
 */
const ContactInfo: React.FC = () => {
  return (
    <div className="contact-info">
      <a
        href="https://wa.me/254758993926"
        target="_blank"
        rel="noopener noreferrer"
        className="contact-item"
        aria-label="WhatsApp"
      >
        <WhatsAppIcon />
        <span>0758 993 926</span>
      </a>
      <a href="tel:0768700741" className="contact-item" aria-label="Call">
        <PhoneIcon />
        <span>0768 700 741</span>
      </a>
      <a href="mailto:jeffersonmutinda96@gmail.com" className="contact-item" aria-label="Email">
        <EmailIcon />
        <span>jeffersonmutinda96@gmail.com</span>
      </a>
      <style jsx>{`
        .contact-info {
          display: flex;
          gap: 1.5rem;
          align-items: center;
          flex-wrap: wrap;
        }
        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          color: #222;
          font-size: 1rem;
          transition: color 0.2s;
        }
        .contact-item:hover {
          color: #007b5e;
        }
        svg {
          display: inline-block;
          vertical-align: middle;
        }
      `}</style>
    </div>
  );
};

export default ContactInfo; 