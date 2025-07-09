"use client";
import React from "react";
import ContactInfo from "../components/ContactInfo";
import ContactForm from "./ContactForm";

/**
 * OrderPage displays contact details and a direct message form for inquiries.
 */
const DEFAULT_MESSAGE = "Hello, I would like to know if the unit is still available.";

const OrderPage: React.FC = () => {
  return (
    <div className="order-bg">
      <div className="order-page-root">
        <h1 className="order-title">Order Your Car</h1>
        <p className="order-message">
          To place your order or make an inquiry, please use any of the contact methods below or send us a direct message:
        </p>
        <ContactInfo />
        <div className="divider" />
        <ContactForm />
        <style jsx>{`
          .order-bg {
            min-height: 100vh;
            background: linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%);
            padding: 0;
          }
          .order-page-root {
            max-width: 480px;
            margin: 3rem auto;
            background: #fff;
            border-radius: 16px;
            box-shadow: 0 2px 16px rgba(0,0,0,0.08);
            padding: 2.5rem 2rem 2rem 2rem;
            text-align: center;
          }
          .order-title {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 1.2rem;
            color: #23272f;
          }
          .order-message {
            font-size: 1.1rem;
            color: #444;
            margin-bottom: 2.2rem;
          }
          .divider {
            height: 1px;
            background: #e5e7eb;
            margin: 2.2rem 0 1.5rem 0;
            border-radius: 2px;
          }
        `}</style>
      </div>
    </div>
  );
};

export default OrderPage; 