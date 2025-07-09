"use client";
import React from "react";

const BackButton: React.FC = () => (
  <button
    className="back-btn"
    onClick={() => window.history.back()}
    type="button"
  >
    &larr; Back
  </button>
);

export default BackButton; 