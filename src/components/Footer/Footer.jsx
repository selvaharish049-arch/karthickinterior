import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe, Share2, MessageCircle, ArrowUp } from 'lucide-react';
import footerBg from '../../assets/images/footer-bg.jpg';
import './Footer.css';

const Footer = ({ onOpenModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section" style={{ backgroundImage: `url(${footerBg})` }}>
      <div className="footer-container">
        {/* Main Footer Row */}
        <div className="footer-grid">
          {/* Column 1: Brand & Philosophy */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-logo">
              <span className="logo-main">LUXE INTERIOR</span>
              <span className="logo-sub">REDESIGNING LUXURY LIVING</span>
            </Link>
            <p className="footer-desc">
              Bespoke luxury interior architecture, modular woodwork, and turnkey project execution for exclusive residential and executive spaces.
            </p>
            <button className="gold-btn footer-cta-btn" onClick={onOpenModal}>
              DISCUSS YOUR PROJECT
            </button>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col links-col">
            <h4 className="footer-heading">NAVIGATION</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/collections">Collections & Portfolio</Link></li>
              <li><Link to="/about">About Our Studio</Link></li>
              <li><Link to="/services">Architectural Services</Link></li>
              <li><Link to="/contact">Contact & Consult</Link></li>
            </ul>
          </div>

          {/* Column 3: Services Summary */}
          <div className="footer-col services-col">
            <h4 className="footer-heading">OUR CAPABILITIES</h4>
            <ul className="footer-links">
              <li><Link to="/services">Concept & Space Planning</Link></li>
              <li><Link to="/services">3D Architectural Visualization</Link></li>
              <li><Link to="/services">Custom Joinery & Woodwork</Link></li>
              <li><Link to="/services">Material Selection & Procurement</Link></li>
              <li><Link to="/services">Turnkey Project Supervision</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="footer-col contact-col">
            <h4 className="footer-heading">STUDIO CONTACT</h4>
            <ul className="contact-info-list">
              <li>
                <MapPin size={18} className="gold-icon" />
                <span>3c/195A vallinayaga puram 5th street tuticorin</span>
              </li>
              <li>
                <Phone size={18} className="gold-icon" />
                <a href="https://wa.me/916379183549" target="_blank" rel="noreferrer">+91 6379183549 (WhatsApp / Call)</a>
              </li>
              <li>
                <Mail size={18} className="gold-icon" />
                <a href="mailto:selvaharish049@gmail.com">selvaharish049@gmail.com</a>
              </li>
            </ul>

            <div className="social-links">
              <a href="#website" className="social-icon-box" aria-label="Website"><Globe size={18} /></a>
              <a href="#share" className="social-icon-box" aria-label="Share"><Share2 size={18} /></a>
              <a href="#chat" className="social-icon-box" aria-label="Message"><MessageCircle size={18} /></a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} LUXE INTERIOR. All Rights Reserved. Crafted with Precision & Millimeter Accuracy.
          </p>
          
          <button className="scroll-to-top-btn" onClick={scrollToTop} aria-label="Scroll back to top">
            <span>BACK TO TOP</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
