import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { 
  PlusCircle, 
  FolderPlus, 
  PackagePlus, 
  Trash2, 
  CheckCircle2, 
  Layers, 
  Compass, 
  Eye, 
  Sparkles, 
  Users, 
  MessageSquare, 
  Phone, 
  Mail, 
  Clock,
  Filter,
  Lock,
  Unlock,
  LogOut,
  Camera,
  Image as ImageIcon,
  Megaphone,
  Send,
  Package
} from 'lucide-react';
import './Admin.css';

const Admin = () => {
  const { 
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    siteImages,
    updateSiteImage,
    announcements,
    addAnnouncement,
    deleteAnnouncement,
    categories, 
    projects, 
    customerBookings,
    addCategory, 
    deleteCategory, 
    addProject, 
    deleteProject,
    deleteBooking,
    updateBookingStatus,
    uploadImageFile
  } = useProjects();

  const [inputPassword, setInputPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('bookings'); // 'create-category', 'create-project', 'view-catalog', 'bookings', 'site-images'

  // Announcement Form State
  const [annTitle, setAnnTitle] = useState('');
  const [annMessage, setAnnMessage] = useState('');
  const [annSuccessMsg, setAnnSuccessMsg] = useState('');

  const handleAnnounceSubmit = (e) => {
    e.preventDefault();
    if (!annTitle.trim()) return;
    addAnnouncement(annTitle, annMessage);
    setAnnTitle('');
    setAnnMessage('');
    setAnnSuccessMsg('Live website update published successfully for all customers!');
    setTimeout(() => setAnnSuccessMsg(''), 4000);
  };

  const handleSendCustomUpdateWa = (customerPhone, customerName, currentProduct) => {
    const defaultText = `Hello ${customerName}, updating you regarding your consultation for ${currentProduct || 'LUXE INTERIOR project'}. We have prepared the next design blueprint step.`;
    const customMsg = window.prompt(`Enter WhatsApp Update Message for ${customerName}:`, defaultText);
    if (customMsg) {
      const cleanPhone = customerPhone.replace(/[^0-9]/g, '');
      const phoneWithCountry = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
      const link = `https://wa.me/${phoneWithCountry}?text=${encodeURIComponent(customMsg)}`;
      window.open(link, '_blank');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const res = await loginAdmin(inputPassword);
    if (!res.success) {
      setLoginError(res.error);
    } else {
      setLoginError('');
      setInputPassword('');
    }
  };
  
  // Category Form State
  const [newCatName, setNewCatName] = useState('');
  const [catMessage, setCatMessage] = useState('');

  // Project Form State
  const [projectData, setProjectData] = useState({
    title: '',
    category: categories[1] || 'Modular Kitchens',
    tag: '',
    desc: '',
    image: '',
    renderImage: '',
    executionImage: '',
    planImage: '',
    area: '3,800 Sq. Ft.',
    location: 'Private Villa',
    duration: '75 Calendar Days',
    brief: '',
    challenge: '',
    materials: [
      { name: 'Italian Marble Slab', type: 'Wall Cladding', color: '#3A3F47' },
      { name: 'Brushed Brass Trim', type: 'Accent Trim', color: '#C5A059' }
    ]
  });

  const [projMessage, setProjMessage] = useState('');
  const [bookingFilterStatus, setBookingFilterStatus] = useState('All');

  // Handle Category Submit
  const handleCatSubmit = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    const success = addCategory(newCatName);
    if (success) {
      setCatMessage(`New collection "${newCatName}" successfully created!`);
      setNewCatName('');
      setTimeout(() => setCatMessage(''), 4000);
    } else {
      setCatMessage(`Collection "${newCatName}" already exists.`);
      setTimeout(() => setCatMessage(''), 4000);
    }
  };

  // Handle Project Field Change
  const handleProjChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  // Handle Material Swatch Add
  const handleAddMaterial = () => {
    setProjectData({
      ...projectData,
      materials: [
        ...projectData.materials,
        { name: 'New Material', type: 'Finish Type', color: '#D4AF37' }
      ]
    });
  };

  // Handle Material Field Change
  const handleMaterialChange = (index, field, value) => {
    const updatedMats = [...projectData.materials];
    updatedMats[index][field] = value;
    setProjectData({ ...projectData, materials: updatedMats });
  };

  // Handle Material Remove
  const handleRemoveMaterial = (index) => {
    setProjectData({
      ...projectData,
      materials: projectData.materials.filter((_, i) => i !== index)
    });
  };

  // Handle Project Submit
  const handleProjSubmit = (e) => {
    e.preventDefault();
    if (!projectData.title.trim()) return;

    const defaultImg = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80';
    
    const finalProject = {
      ...projectData,
      tag: projectData.tag || projectData.category,
      desc: projectData.desc || 'Custom luxury architectural interior with bespoke modular joinery and ambient lighting.',
      image: projectData.image || defaultImg,
      renderImage: projectData.renderImage || projectData.image || defaultImg,
      executionImage: projectData.executionImage || projectData.image || defaultImg,
      planImage: projectData.planImage || defaultImg,
      brief: projectData.brief || 'Client requested an opulent bespoke interior designed with certified premium materials and concealed fittings.',
      challenge: projectData.challenge || 'Seamless spatial circulation and millimeter-accurate installation across high-ceiling spans.'
    };

    addProject(finalProject);
    setProjMessage(`Product "${projectData.title}" successfully added to "${projectData.category}"!`);
    
    setProjectData({
      title: '',
      category: categories[1] || 'Modular Kitchens',
      tag: '',
      desc: '',
      image: '',
      renderImage: '',
      executionImage: '',
      planImage: '',
      area: '3,800 Sq. Ft.',
      location: 'Private Villa',
      duration: '75 Calendar Days',
      brief: '',
      challenge: '',
      materials: [
        { name: 'Italian Marble Slab', type: 'Wall Cladding', color: '#3A3F47' },
        { name: 'Brushed Brass Trim', type: 'Accent Trim', color: '#C5A059' }
      ]
    });

    setTimeout(() => setProjMessage(''), 4000);
  };

  // Helper to construct WhatsApp link for Admin to reply to Customer
  const getCustomerWaLink = (customerPhone, customerName) => {
    const cleanPhone = customerPhone.replace(/[^0-9]/g, '');
    const phoneWithCountry = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const text = encodeURIComponent(`Hello ${customerName}, thank you for inquiring with LUXE INTERIOR. We reviewed your project booking request and would love to discuss the design blueprint with you.`);
    return `https://wa.me/${phoneWithCountry}?text=${text}`;
  };

  const filteredBookings = bookingFilterStatus === 'All' 
    ? customerBookings 
    : customerBookings.filter(b => b.status === bookingFilterStatus);

  if (!isAdminLoggedIn) {
    return (
      <div className="admin-page" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 60px' }}>
        <div style={{ background: '#14171d', border: '1px solid var(--border-gold)', padding: '40px 32px', borderRadius: '8px', maxWidth: '460px', width: '100%', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(212, 175, 55, 0.15)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <Lock size={30} color="#d4af37" />
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', color: '#ffffff', letterSpacing: '2px', marginBottom: '8px', fontSize: '1.4rem' }}>ADMIN ACCESS PORTAL</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px', lineHeight: '1.6' }}>
            Please enter your admin password to access customer database and unlock site image management.
          </p>
          
          <form onSubmit={handleLoginSubmit}>
            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '1.5px', color: 'var(--gold-light)', marginBottom: '8px', fontWeight: 600 }}>ADMIN PASSWORD *</label>
              <input 
                type="password"
                placeholder="Enter Admin Password"
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
                style={{ width: '100%', padding: '14px 16px', background: '#0a0b0d', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#ffffff', borderRadius: '4px', fontSize: '1rem', letterSpacing: '1px', outline: 'none' }}
                required
              />
            </div>
            {loginError && <p style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '16px', background: 'rgba(239,68,68,0.1)', padding: '10px', borderRadius: '4px', border: '1px solid rgba(239,68,68,0.3)' }}>{loginError}</p>}
            <button type="submit" className="gold-btn-solid" style={{ width: '100%', padding: '14px', justifyContent: 'center' }}>
              <Unlock size={18} />
              <span>LOGIN TO CONTROL CENTER</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  const handleImageUpload = async (section, key, e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      try {
        if (uploadImageFile) {
          const fileUrl = await uploadImageFile(file);
          updateSiteImage(section, key, fileUrl);
          return;
        }
      } catch (err) {
        console.warn('Backend image upload failed, falling back to local reader', err);
      }
      const reader = new FileReader();
      reader.onload = (evt) => {
        updateSiteImage(section, key, evt.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        {/* Admin Header */}
        <div className="admin-header">
          <div>
            <div className="admin-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={14} />
              <span>STUDIO CONTENT & CUSTOMER DATABASE CONTROL</span>
            </div>
            <h1 className="admin-title">ADMIN CONTROL CENTER</h1>
            <p className="admin-subtitle">
              Admin WhatsApp: <strong style={{ color: '#d4af37' }}>+91 6379183549</strong> | Email: <strong style={{ color: '#d4af37' }}>selvaharish049@gmail.com</strong>
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
            <button className="gold-btn" onClick={logoutAdmin} style={{ padding: '8px 16px', fontSize: '0.78rem' }}>
              <LogOut size={14} />
              <span>LOGOUT ADMIN</span>
            </button>

            <div className="admin-stats-bar">
              <div className="admin-stat-item">
                <span className="stat-num">{customerBookings.length}</span>
                <span className="stat-lbl">Customer Inquiries</span>
              </div>
              <div className="stat-divider"></div>
              <div className="admin-stat-item">
                <span className="stat-num">{categories.length - 1}</span>
                <span className="stat-lbl">Active Collections</span>
              </div>
              <div className="stat-divider"></div>
              <div className="admin-stat-item">
                <span className="stat-num">{projects.length}</span>
                <span className="stat-lbl">Products</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="admin-tabs">
          <button 
            className={`admin-tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            <Users size={18} />
            <span>1. CUSTOMER DATABASE ({customerBookings.length})</span>
          </button>

          <button 
            className={`admin-tab-btn ${activeTab === 'create-category' ? 'active' : ''}`}
            onClick={() => setActiveTab('create-category')}
          >
            <FolderPlus size={18} />
            <span>2. CREATE NEW COLLECTION</span>
          </button>

          <button 
            className={`admin-tab-btn ${activeTab === 'create-project' ? 'active' : ''}`}
            onClick={() => setActiveTab('create-project')}
          >
            <PackagePlus size={18} />
            <span>3. ADD PRODUCT TO COLLECTION</span>
          </button>

          <button 
            className={`admin-tab-btn ${activeTab === 'view-catalog' ? 'active' : ''}`}
            onClick={() => setActiveTab('view-catalog')}
          >
            <Eye size={18} />
            <span>4. MANAGE LIVE CATALOG ({projects.length})</span>
          </button>

          <button 
            className={`admin-tab-btn ${activeTab === 'site-images' ? 'active' : ''}`}
            onClick={() => setActiveTab('site-images')}
          >
            <ImageIcon size={18} />
            <span>5. SITE IMAGES MANAGER</span>
          </button>
        </div>

        {/* TAB 1: CUSTOMER BOOKINGS & DATABASE */}
        {activeTab === 'bookings' && (
          <div className="admin-card">
            <div className="flex-between">
              <div className="card-top-header">
                <Users size={22} className="gold-icon" />
                <h2>CUSTOMER BOOKINGS & INQUIRY DATABASE ({customerBookings.length})</h2>
              </div>

              <div className="filter-status-group">
                <Filter size={14} className="gold-icon" />
                <select 
                  value={bookingFilterStatus} 
                  onChange={(e) => setBookingFilterStatus(e.target.value)}
                  className="status-filter-select"
                >
                  <option value="All">All Inquiries ({customerBookings.length})</option>
                  <option value="Pending">Pending</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Confirmed">Confirmed</option>
                </select>
              </div>
            </div>

            <p className="admin-card-desc">
              All consultation requests submitted by clients via website forms are automatically saved here and routed to Admin WhatsApp (<strong>6379183549</strong>).
            </p>

            {filteredBookings.length === 0 ? (
              <div className="no-bookings-box">
                <p>No customer inquiries found for filter "{bookingFilterStatus}".</p>
              </div>
            ) : (
              <div className="bookings-table-wrapper">
                <div className="bookings-grid-list">
                  {filteredBookings.map((b) => (
                    <div key={b.id} className={`booking-card ${b.status.toLowerCase()}-status`}>
                      <div className="booking-card-header">
                        <div>
                          <div className="booking-date-badge">
                            <Clock size={12} />
                            <span>{b.date}</span>
                          </div>
                          <h3 className="booking-client-name">{b.fullName}</h3>
                          <span className="booking-project-type">{b.projectType}</span>
                          
                          {/* Selected Product Badge */}
                          <div style={{ marginTop: '8px', background: 'rgba(212, 175, 55, 0.12)', border: '1px solid var(--border-gold)', padding: '6px 12px', borderRadius: '4px', fontSize: '0.78rem', color: '#ffffff', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                            <Package size={14} color="#d4af37" />
                            <span>BOOKED PRODUCT: <strong style={{ color: 'var(--gold-light)' }}>{b.selectedProduct || 'General Project Consultation'}</strong></span>
                          </div>
                        </div>

                        <div className="status-dropdown-box">
                          <span className={`status-pill pill-${b.status.toLowerCase()}`}>{b.status}</span>
                          <select 
                            value={b.status} 
                            onChange={(e) => updateBookingStatus(b.id, e.target.value)}
                            className="status-change-select"
                          >
                            <option value="Pending">Mark Pending</option>
                            <option value="Contacted">Mark Contacted</option>
                            <option value="Confirmed">Mark Confirmed</option>
                          </select>
                        </div>
                      </div>

                      <div className="booking-details-grid">
                        <div className="booking-detail-item">
                          <Phone size={14} className="gold-icon" />
                          <a href={`tel:${b.phone}`} className="detail-link">{b.phone}</a>
                        </div>
                        <div className="booking-detail-item">
                          <Mail size={14} className="gold-icon" />
                          <a href={`mailto:${b.email}`} className="detail-link">{b.email}</a>
                        </div>
                        <div className="booking-detail-item">
                          <span className="detail-key">Area:</span>
                          <span className="detail-val">{b.area || 'N/A'}</span>
                        </div>
                        <div className="booking-detail-item">
                          <span className="detail-key">Budget:</span>
                          <span className="detail-val gold-val">{b.budget}</span>
                        </div>
                      </div>

                      {b.fileName && (
                        <div className="booking-attachment-bar">
                          <span>Attached Blueprint: <strong>{b.fileName}</strong></span>
                        </div>
                      )}

                      {b.notes && (
                        <div className="booking-notes-box">
                          <p>"{b.notes}"</p>
                        </div>
                      )}

                      <div className="booking-card-actions">
                        <a 
                          href={getCustomerWaLink(b.phone, b.fullName)} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="gold-btn-solid wa-reply-btn"
                        >
                          <MessageSquare size={14} />
                          <span>INITIAL WHATSAPP RECOVERY</span>
                        </a>

                        <button 
                          className="gold-btn btn-sm"
                          onClick={() => handleSendCustomUpdateWa(b.phone, b.fullName, b.selectedProduct)}
                          style={{ fontSize: '0.75rem', padding: '8px 14px' }}
                        >
                          <Send size={14} />
                          <span>📱 SEND WHATSAPP UPDATE TO CLIENT</span>
                        </button>

                        <button 
                          className="delete-booking-btn"
                          onClick={() => deleteBooking(b.id)}
                          title="Delete Booking Record"
                        >
                          <Trash2 size={14} />
                          <span>DELETE</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CREATE NEW COLLECTION */}
        {activeTab === 'create-category' && (
          <div className="admin-card">
            <div className="card-top-header">
              <FolderPlus size={22} className="gold-icon" />
              <h2>CREATE A NEW COLLECTION / CATEGORY</h2>
            </div>
            <p className="admin-card-desc">
              Define a new category (e.g., "Executive Wine Lounges", "Penthouse Terraces"). It will immediately register across all filter tabs and navigation.
            </p>

            {catMessage && (
              <div className="admin-toast success-toast">
                <CheckCircle2 size={18} />
                <span>{catMessage}</span>
              </div>
            )}

            <form onSubmit={handleCatSubmit} className="admin-form">
              <div className="admin-field-group">
                <label>NEW COLLECTION NAME *</label>
                <div className="input-with-btn">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Executive Wine Lounges"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                  />
                  <button type="submit" className="gold-btn-solid">
                    <PlusCircle size={16} />
                    <span>CREATE COLLECTION</span>
                  </button>
                </div>
              </div>
            </form>

            <div className="existing-categories-box">
              <h3>EXISTING COLLECTIONS ({categories.length - 1})</h3>
              <div className="category-tags-grid">
                {categories.map((cat) => (
                  <div key={cat} className="category-tag-chip">
                    <span>{cat}</span>
                    {cat !== 'All Projects' && (
                      <button 
                        className="delete-chip-btn" 
                        onClick={() => deleteCategory(cat)}
                        title="Delete Collection"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ADD PRODUCT TO COLLECTION */}
        {activeTab === 'create-project' && (
          <div className="admin-card">
            <div className="card-top-header">
              <PackagePlus size={22} className="gold-icon" />
              <h2>ADD PRODUCT / PROJECT TO COLLECTION</h2>
            </div>
            <p className="admin-card-desc">
              Add a new architectural project or modular product to any existing or newly created collection.
            </p>

            {projMessage && (
              <div className="admin-toast success-toast">
                <CheckCircle2 size={18} />
                <span>{projMessage}</span>
              </div>
            )}

            <form onSubmit={handleProjSubmit} className="admin-form">
              <div className="admin-field-group highlight-field">
                <label>SELECT TARGET COLLECTION / CATEGORY *</label>
                <select
                  name="category"
                  value={projectData.category}
                  onChange={handleProjChange}
                  required
                >
                  {categories.filter(c => c !== 'All Projects').map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="admin-grid-2">
                <div className="admin-field-group">
                  <label>PRODUCT / PROJECT TITLE *</label>
                  <input
                    type="text"
                    name="title"
                    required
                    placeholder="e.g. Royal Sovereign Penthouse Lounge"
                    value={projectData.title}
                    onChange={handleProjChange}
                  />
                </div>

                <div className="admin-field-group">
                  <label>SUB-HEADLINE / CATEGORY TAG</label>
                  <input
                    type="text"
                    name="tag"
                    placeholder="e.g. Modern Minimalism & Fluted Wood"
                    value={projectData.tag}
                    onChange={handleProjChange}
                  />
                </div>
              </div>

              <div className="admin-grid-3">
                <div className="admin-field-group">
                  <label>FLOOR AREA (SQ. FT.)</label>
                  <input
                    type="text"
                    name="area"
                    placeholder="e.g. 4,200 Sq. Ft."
                    value={projectData.area}
                    onChange={handleProjChange}
                  />
                </div>

                <div className="admin-field-group">
                  <label>LOCATION / PROPERTY TYPE</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g. Mayfair Penthouse"
                    value={projectData.location}
                    onChange={handleProjChange}
                  />
                </div>

                <div className="admin-field-group">
                  <label>EXECUTION TIMEFRAME</label>
                  <input
                    type="text"
                    name="duration"
                    placeholder="e.g. 90 Calendar Days"
                    value={projectData.duration}
                    onChange={handleProjChange}
                  />
                </div>
              </div>

              <div className="admin-field-group">
                <label>SHORT DESCRIPTION</label>
                <textarea
                  name="desc"
                  rows="2"
                  placeholder="A concise 2-sentence summary of the design aesthetic and modular craftsmanship..."
                  value={projectData.desc}
                  onChange={handleProjChange}
                ></textarea>
              </div>

              <div className="form-sub-section">
                <h3 className="sub-section-title">
                  <Layers size={16} className="gold-icon" />
                  HIGH-RES MEDIA URLS (Optional - Fallbacks Available)
                </h3>
                
                <div className="admin-grid-2">
                  <div className="admin-field-group">
                    <label>MAIN COVER IMAGE URL</label>
                    <input
                      type="url"
                      name="image"
                      placeholder="https://images.unsplash.com/..."
                      value={projectData.image}
                      onChange={handleProjChange}
                    />
                  </div>

                  <div className="admin-field-group">
                    <label>3D CGI RENDER IMAGE URL</label>
                    <input
                      type="url"
                      name="renderImage"
                      placeholder="https://images.unsplash.com/..."
                      value={projectData.renderImage}
                      onChange={handleProjChange}
                    />
                  </div>
                </div>

                <div className="admin-grid-2">
                  <div className="admin-field-group">
                    <label>2D ARCHITECTURAL PLAN IMAGE URL</label>
                    <input
                      type="url"
                      name="planImage"
                      placeholder="https://images.unsplash.com/..."
                      value={projectData.planImage}
                      onChange={handleProjChange}
                    />
                  </div>

                  <div className="admin-field-group">
                    <label>ON-SITE EXECUTION IMAGE URL</label>
                    <input
                      type="url"
                      name="executionImage"
                      placeholder="https://images.unsplash.com/..."
                      value={projectData.executionImage}
                      onChange={handleProjChange}
                    />
                  </div>
                </div>
              </div>

              <div className="admin-grid-2">
                <div className="admin-field-group">
                  <label>CLIENT BRIEF & DESIGN VISION</label>
                  <textarea
                    name="brief"
                    rows="3"
                    placeholder="Describe the client's desire for materials, lighting, and spatial zoning..."
                    value={projectData.brief}
                    onChange={handleProjChange}
                  ></textarea>
                </div>

                <div className="admin-field-group">
                  <label>ARCHITECTURAL CHALLENGE & SOLUTION</label>
                  <textarea
                    name="challenge"
                    rows="3"
                    placeholder="Describe structural challenges, ceiling clearances, or joinery fitting details..."
                    value={projectData.challenge}
                    onChange={handleProjChange}
                  ></textarea>
                </div>
              </div>

              <div className="form-sub-section">
                <div className="flex-between">
                  <h3 className="sub-section-title">
                    <Compass size={16} className="gold-icon" />
                    CURATED MATERIAL PALETTE SWATCHES
                  </h3>
                  <button type="button" className="gold-btn btn-sm" onClick={handleAddMaterial}>
                    + ADD MATERIAL SWATCH
                  </button>
                </div>

                <div className="materials-builder-list">
                  {projectData.materials.map((mat, idx) => (
                    <div key={idx} className="material-input-row">
                      <input
                        type="text"
                        placeholder="Material Name (e.g. Italian Marble)"
                        value={mat.name}
                        onChange={(e) => handleMaterialChange(idx, 'name', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Application (e.g. Wall Cladding)"
                        value={mat.type}
                        onChange={(e) => handleMaterialChange(idx, 'type', e.target.value)}
                      />
                      <input
                        type="color"
                        value={mat.color}
                        onChange={(e) => handleMaterialChange(idx, 'color', e.target.value)}
                        className="color-picker-input"
                      />
                      <button 
                        type="button" 
                        className="remove-mat-btn"
                        onClick={() => handleRemoveMaterial(idx)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" className="gold-btn-solid submit-project-btn">
                <PackagePlus size={18} />
                <span>PUBLISH PRODUCT TO COLLECTION</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: MANAGE LIVE CATALOG */}
        {activeTab === 'view-catalog' && (
          <div className="admin-card">
            <div className="card-top-header">
              <Eye size={22} className="gold-icon" />
              <h2>LIVE PRODUCT & COLLECTION CATALOG ({projects.length})</h2>
            </div>
            <p className="admin-card-desc">
              Manage published items. Products added here immediately reflect on the live website and Case Study Drawers.
            </p>

            <div className="admin-catalog-grid">
              {projects.map((proj) => (
                <div key={proj.id} className="catalog-item-card">
                  <div className="catalog-media-box">
                    <img src={proj.image} alt={proj.title} className="catalog-img" />
                    <span className="catalog-cat-badge">{proj.category}</span>
                  </div>
                  <div className="catalog-info">
                    <h3 className="catalog-title">{proj.title}</h3>
                    <p className="catalog-location">{proj.location} • {proj.area}</p>
                    <p className="catalog-desc">{proj.desc}</p>
                    
                    <div className="catalog-actions">
                      <button 
                        className="delete-proj-btn" 
                        onClick={() => deleteProject(proj.id)}
                      >
                        <Trash2 size={14} />
                        <span>REMOVE PRODUCT</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SITE IMAGES MANAGER */}
        {activeTab === 'site-images' && (
          <div className="admin-card">
            <div className="card-top-header">
              <Camera size={22} className="gold-icon" />
              <h2>SITE IMAGES MANAGER (OUR DESIGN ETHOS, TEASERS, ABOUT US, SERVICES)</h2>
            </div>
            <p className="admin-card-desc">
              Upload files or paste new image URLs for all sections. Changes update instantly across the entire live website!
            </p>

            {/* SECTION 1: OUR DESIGN ETHOS (HOME PAGE PHILOSOPHY) */}
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-light)', borderBottom: '1px solid rgba(212,175,55,0.2)', paddingBottom: '8px', marginBottom: '20px' }}>
                1. HOME PAGE - OUR DESIGN ETHOS IMAGES (PHILOSOPHY)
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                {[
                  { id: 'moodboard', label: '01. Mood Board Detail' },
                  { id: 'sketch', label: '02. Architectural Sketch' },
                  { id: 'vision', label: '03. Client Vision to Concept' },
                  { id: 'materials', label: '04. Material Samples' }
                ].map((item) => {
                  const currentImg = siteImages?.philosophy?.[item.id] || '';
                  return (
                    <div key={item.id} style={{ background: '#0a0b0d', border: '1px solid rgba(255,255,255,0.1)', padding: '16px', borderRadius: '4px' }}>
                      <span style={{ fontSize: '0.8rem', color: '#ffffff', fontWeight: 600, display: 'block', marginBottom: '10px' }}>{item.label}</span>
                      <div style={{ height: '140px', overflow: 'hidden', borderRadius: '4px', marginBottom: '12px', background: '#14171d' }}>
                        <img src={currentImg} alt={item.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <label className="gold-btn-solid" style={{ display: 'flex', justifyContent: 'center', width: '100%', cursor: 'pointer', padding: '8px 12px', fontSize: '0.78rem' }}>
                        <Camera size={14} />
                        <span>UPLOAD NEW IMAGE</span>
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload('philosophy', item.id, e)} hidden />
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SECTION 2: FLAGSHIP PORTFOLIO (CURATED TEASERS) */}
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-light)', borderBottom: '1px solid rgba(212,175,55,0.2)', paddingBottom: '8px', marginBottom: '20px' }}>
                2. HOME PAGE - FLAGSHIP PORTFOLIO IMAGES (CURATED TEASERS)
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                {[
                  { id: 'country-estate', label: 'Country Estate (Kitchen)' },
                  { id: 'urban-apartment', label: 'Urban Apartment (Living)' },
                  { id: 'creative-studio', label: 'Creative Studio (Office)' },
                  { id: 'the-penthouse', label: 'The Penthouse (Suite)' }
                ].map((item) => {
                  const currentImg = siteImages?.teasers?.[item.id] || '';
                  return (
                    <div key={item.id} style={{ background: '#0a0b0d', border: '1px solid rgba(255,255,255,0.1)', padding: '16px', borderRadius: '4px' }}>
                      <span style={{ fontSize: '0.8rem', color: '#ffffff', fontWeight: 600, display: 'block', marginBottom: '10px' }}>{item.label}</span>
                      <div style={{ height: '140px', overflow: 'hidden', borderRadius: '4px', marginBottom: '12px', background: '#14171d' }}>
                        <img src={currentImg} alt={item.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <label className="gold-btn-solid" style={{ display: 'flex', justifyContent: 'center', width: '100%', cursor: 'pointer', padding: '8px 12px', fontSize: '0.78rem' }}>
                        <Camera size={14} />
                        <span>UPLOAD NEW IMAGE</span>
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload('teasers', item.id, e)} hidden />
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SECTION 3: ABOUT US PAGE */}
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-light)', borderBottom: '1px solid rgba(212,175,55,0.2)', paddingBottom: '8px', marginBottom: '20px' }}>
                3. ABOUT US PAGE IMAGE
              </h3>
              <div style={{ maxWidth: '320px', background: '#0a0b0d', border: '1px solid rgba(255,255,255,0.1)', padding: '16px', borderRadius: '4px' }}>
                <span style={{ fontSize: '0.8rem', color: '#ffffff', fontWeight: 600, display: 'block', marginBottom: '10px' }}>Craftsmanship Story Feature</span>
                <div style={{ height: '160px', overflow: 'hidden', borderRadius: '4px', marginBottom: '12px', background: '#14171d' }}>
                  <img src={siteImages?.about?.story || ''} alt="About Us Story" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <label className="gold-btn-solid" style={{ display: 'flex', justifyContent: 'center', width: '100%', cursor: 'pointer', padding: '8px 12px', fontSize: '0.78rem' }}>
                  <Camera size={14} />
                  <span>UPLOAD ABOUT IMAGE</span>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload('about', 'story', e)} hidden />
                </label>
              </div>
            </div>

            {/* SECTION 4: SERVICES PAGE */}
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-light)', borderBottom: '1px solid rgba(212,175,55,0.2)', paddingBottom: '8px', marginBottom: '20px' }}>
                4. SERVICES PAGE IMAGES (5 CORE PILLARS)
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                {[
                  { id: '01', label: 'Pillar 01: Concept & Space Planning' },
                  { id: '02', label: 'Pillar 02: 3D Visualisation' },
                  { id: '03', label: 'Pillar 03: Custom Joinery' },
                  { id: '04', label: 'Pillar 04: Material Selection' },
                  { id: '05', label: 'Pillar 05: Turnkey Supervision' }
                ].map((item) => {
                  const currentImg = siteImages?.services?.[item.id] || '';
                  return (
                    <div key={item.id} style={{ background: '#0a0b0d', border: '1px solid rgba(255,255,255,0.1)', padding: '16px', borderRadius: '4px' }}>
                      <span style={{ fontSize: '0.8rem', color: '#ffffff', fontWeight: 600, display: 'block', marginBottom: '10px' }}>{item.label}</span>
                      <div style={{ height: '140px', overflow: 'hidden', borderRadius: '4px', marginBottom: '12px', background: '#14171d' }}>
                        <img src={currentImg} alt={item.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <label className="gold-btn-solid" style={{ display: 'flex', justifyContent: 'center', width: '100%', cursor: 'pointer', padding: '8px 12px', fontSize: '0.78rem' }}>
                        <Camera size={14} />
                        <span>UPLOAD SERVICE IMAGE</span>
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload('services', item.id, e)} hidden />
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SECTION 5: LIVE WEBSITE ANNOUNCEMENTS FOR CUSTOMERS */}
            <div style={{ marginTop: '40px', borderTop: '1px solid rgba(212,175,55,0.2)', paddingTop: '30px' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-light)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Megaphone size={20} color="#d4af37" />
                5. LIVE WEBSITE ANNOUNCEMENTS & CUSTOMER BROADCAST UPDATES
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '20px' }}>
                Publish studio announcements or handover news. Active announcements immediately appear on the top header ticker of the website!
              </p>

              <form onSubmit={handleAnnounceSubmit} style={{ background: '#0a0b0d', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', borderRadius: '4px', marginBottom: '24px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--gold-light)', marginBottom: '6px', fontWeight: 600 }}>UPDATE TITLE *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. NEW 2026 MODULAR KITCHEN COLLECTION" 
                    value={annTitle} 
                    onChange={(e) => setAnnTitle(e.target.value)}
                    style={{ width: '100%', padding: '12px', background: '#14171d', border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff', borderRadius: '4px' }}
                    required 
                  />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--gold-light)', marginBottom: '6px', fontWeight: 600 }}>UPDATE MESSAGE / DETAILS *</label>
                  <textarea 
                    rows="2"
                    placeholder="e.g. Handover completed for 5,200 sq. ft. Luxury Residence in Tuticorin with 100% millimeter accuracy!" 
                    value={annMessage} 
                    onChange={(e) => setAnnMessage(e.target.value)}
                    style={{ width: '100%', padding: '12px', background: '#14171d', border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff', borderRadius: '4px' }}
                    required 
                  ></textarea>
                </div>
                {annSuccessMsg && <p style={{ color: '#10b981', fontSize: '0.85rem', marginBottom: '16px' }}>{annSuccessMsg}</p>}
                <button type="submit" className="gold-btn-solid">
                  <Send size={16} />
                  <span>PUBLISH LIVE WEBSITE UPDATE</span>
                </button>
              </form>

              <h4 style={{ color: '#ffffff', fontSize: '0.9rem', marginBottom: '12px' }}>CURRENT PUBLISHED ANNOUNCEMENTS ({announcements ? announcements.length : 0})</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {announcements && announcements.map((ann) => (
                  <div key={ann.id} style={{ background: '#0a0b0d', border: '1px solid var(--border-gold)', padding: '16px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--gold-light)', letterSpacing: '1px', fontWeight: 600 }}>{ann.date}</span>
                      <h4 style={{ color: '#ffffff', fontSize: '0.95rem', margin: '4px 0' }}>{ann.title}</h4>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>{ann.message}</p>
                    </div>
                    <button className="gold-btn btn-sm" onClick={() => deleteAnnouncement(ann.id)} style={{ padding: '6px 12px', fontSize: '0.75rem', borderColor: '#ef4444', color: '#ef4444' }}>
                      <Trash2 size={14} />
                      <span>DELETE</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
