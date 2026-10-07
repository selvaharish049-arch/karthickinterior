import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Settings } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ onOpenModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand" onClick={closeMobile}>
          <span className="brand-title">LUXE INTERIOR</span>
        
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="navbar-links">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            HOME
          </NavLink>
          <NavLink to="/collections" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            COLLECTIONS
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            ABOUT US
          </NavLink>
          <NavLink to="/services" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            SERVICES
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            CONTACTS
          </NavLink>
          <NavLink to="/admin" className={({ isActive }) => (isActive ? 'nav-link active admin-nav-link' : 'nav-link admin-nav-link')}>
            <Settings size={13} style={{ marginRight: 4, verticalAlign: 'middle' }} />
            ADMIN
          </NavLink>
        </nav>

        {/* Mobile Toggle Button */}
        <div className="navbar-actions">
          <button 
            className="mobile-toggle-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} color="#d4af37" /> : <Menu size={24} color="#d4af37" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-content">
            <Link to="/" className="mobile-nav-link" onClick={closeMobile}>HOME</Link>
            <Link to="/collections" className="mobile-nav-link" onClick={closeMobile}>COLLECTIONS</Link>
            <Link to="/about" className="mobile-nav-link" onClick={closeMobile}>ABOUT US</Link>
            <Link to="/services" className="mobile-nav-link" onClick={closeMobile}>SERVICES</Link>
            <Link to="/contact" className="mobile-nav-link" onClick={closeMobile}>CONTACTS</Link>
            <Link to="/admin" className="mobile-nav-link gold-text" onClick={closeMobile}>⚙️ ADMIN PANEL</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
