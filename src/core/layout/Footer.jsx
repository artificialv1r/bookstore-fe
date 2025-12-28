import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2026 Bookstore App. All rights reserved.</p>
        <div className="footer-links">
          <a href="#contact">Contact</a>
          <span>|</span>
          <a href="#privacy">Privacy</a>
          <span>|</span>
          <a href="#terms">Terms</a>
        </div>
      </div>
    </footer>
  );
}
