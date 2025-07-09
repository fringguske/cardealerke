import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

const DEFAULT_MESSAGE = "Hello, I would like to know if the unit is still available.";

function ContactForm() {
  const [state, handleSubmit] = useForm("manjkzyq");
  if (state.succeeded) {
    return <p className="form-success">Thank you! Your message has been sent.</p>;
  }
  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <h2 className="form-title">Send a Direct Message</h2>
      <input
        id="name"
        type="text"
        name="name"
        placeholder="Your Name"
        className="form-input"
        required
      />
      <input
        id="phone"
        type="tel"
        name="phone"
        placeholder="Phone Number"
        className="form-input"
        required
      />
      <input
        id="email"
        type="email"
        name="email"
        placeholder="Your Email"
        className="form-input"
        required
      />
      <ValidationError prefix="Email" field="email" errors={state.errors} />
      <textarea
        id="message"
        name="message"
        placeholder="Message"
        className="form-textarea"
        rows={4}
        defaultValue={DEFAULT_MESSAGE}
        required
      />
      <ValidationError prefix="Message" field="message" errors={state.errors} />
      <button type="submit" className="form-submit" disabled={state.submitting}>
        Send Message
      </button>
      <style jsx>{`
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          background: #f1f5f9;
          border-radius: 12px;
          padding: 2rem 1.2rem 1.2rem 1.2rem;
          box-shadow: 0 1px 6px rgba(0,0,0,0.04);
          margin-bottom: 0.5rem;
        }
        .form-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.7rem;
          color: #23272f;
        }
        .form-input, .form-textarea {
          padding: 0.7rem 1rem;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          font-size: 1rem;
          background: #fff;
          color: #23272f;
          transition: border 0.2s;
        }
        .form-input:focus, .form-textarea:focus {
          border: 1.5px solid #6366f1;
          outline: none;
        }
        .form-textarea {
          resize: vertical;
          min-height: 80px;
        }
        .form-submit {
          background: #6366f1;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 0.7rem 1.5rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          margin-top: 0.5rem;
          transition: background 0.2s;
        }
        .form-submit:disabled {
          background: #a5b4fc;
          cursor: not-allowed;
        }
        .form-submit:hover:not(:disabled) {
          background: #4338ca;
        }
        .form-success {
          color: #059669;
          background: #d1fae5;
          border-radius: 6px;
          padding: 0.7rem 1.1rem;
          margin-bottom: 0.5rem;
          font-size: 1.05rem;
        }
      `}</style>
    </form>
  );
}

export default ContactForm; 