import React, { createContext, useContext, useState, useEffect } from 'react';

const ProjectContext = createContext();

const getApiBaseUrl = () => {
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  if (typeof window !== 'undefined') {
    const { protocol, hostname } = window.location;
    // Local dev or Local LAN IP testing on mobile (e.g., 192.168.x.x, 10.x.x.x, localhost)
    if (hostname === 'localhost' || hostname === '127.0.0.1' || /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname)) {
      return `${protocol}//${hostname}:5000/api`;
    }
    // Production deployment online
    return `${protocol}//${hostname}/api`;
  }
  return 'http://localhost:5000/api';
};

const API_BASE_URL = getApiBaseUrl();

// Default Initial Collections
const DEFAULT_CATEGORIES = [
  'All Projects',
  'Modular Kitchens',
  'Luxury Living Rooms',
  'Master Suites',
  'Commercial & Office Spaces'
];

// Default Initial Projects
const DEFAULT_PROJECTS = [
  {
    id: 'country-estate',
    title: 'Country Estate',
    category: 'Modular Kitchens',
    tag: 'Modular Kitchens & Living',
    desc: 'Modern minimalism, dark fluted wood, warm indirect lighting, integrated brass handles, and continuous quartz island.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    renderImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    executionImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
    planImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    area: '5,200 Sq. Ft.',
    location: 'Green Valley Estate',
    duration: '90 Calendar Days',
    brief: 'Create a dark-toned modular kitchen that anchors the open-plan estate living room, emphasizing concealed hardware and subtle warm glows.',
    challenge: 'Integrating heavy stone slabs with fluted acoustic paneling across seamless 14-foot kitchen island drawers.',
    materials: [
      { name: 'Italian Grigio Marble', type: 'Stone Island Cladding', color: '#3A3F47' },
      { name: 'Charcoal Matte Laminate', type: 'Custom Cabinetry', color: '#1E2229' },
      { name: 'Brushed Brass Trim', type: 'Metallic Accents & Handles', color: '#C5A059' },
      { name: 'Fluted American Walnut', type: 'Wall Acoustic Paneling', color: '#5C4033' },
      { name: 'Warm 2700K Indirect LED', type: 'Ceiling Trough Lighting', color: '#FFE4B5' }
    ]
  },
  {
    id: 'urban-apartment',
    title: 'Urban Apartment',
    category: 'Luxury Living Rooms',
    tag: 'Contemporary Compact Luxury',
    desc: 'Contemporary compact luxury, textured marble, custom cabinetry, media wall with integrated LED troughing.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
    renderImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
    executionImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
    planImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
    area: '2,800 Sq. Ft.',
    location: 'Metropolitan Tower',
    duration: '60 Calendar Days',
    brief: 'Maximize natural light while infusing rich charcoal hues, Italian Grigio marble, and concealed storage units.',
    challenge: 'Optimizing ceiling height clearance with concealed HVAC diffusers and perimeter ambient cove lighting.',
    materials: [
      { name: 'Carrara Quartzite', type: 'Media Wall Accent', color: '#DCDCDC' },
      { name: 'Smoked Oak Veneer', type: 'Concealed Storage', color: '#2B231D' },
      { name: 'Satin Gold Hardware', type: 'Cabinetry Pulls', color: '#D4AF37' }
    ]
  },
  {
    id: 'creative-studio',
    title: 'Creative Studio',
    category: 'Commercial & Office Spaces',
    tag: 'Executive Acoustic Studio',
    desc: 'Executive acoustic wood panels, ergonomic statement desks, micro-cement flooring, and custom display cases.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
    renderImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
    executionImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    planImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
    area: '3,400 Sq. Ft.',
    location: 'Innovation District',
    duration: '45 Calendar Days',
    brief: 'Design a private executive studio that functions as both a high-stakes board consultation space and a design lounge.',
    challenge: 'Ensuring STC-50 sound isolation ratings across all fluted wooden wall partitions.',
    materials: [
      { name: 'Acoustic Fluted Oak', type: 'Soundproofing Paneling', color: '#6E523A' },
      { name: 'Cognac Leather', type: 'Executive Seating', color: '#964B00' }
    ]
  },
  {
    id: 'the-penthouse',
    title: 'The Penthouse',
    category: 'Master Suites',
    tag: 'Master Suites & Panoramic',
    desc: 'Panoramic architectural ceiling work, ambient backlit display units, customized walk-in dressing room, and master spa.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80',
    renderImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80',
    executionImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
    planImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80',
    area: '6,100 Sq. Ft.',
    location: 'Skyline Heights',
    duration: '110 Calendar Days',
    brief: 'Ultra-luxurious master bedroom suite featuring a glass-enclosed vanity room, headboard fluting, and automated curtain coves.',
    challenge: 'Engineered structural floor load distribution for freestanding solid stone soaking tubs on elevated platforms.',
    materials: [
      { name: 'Honey Onyx Stone', type: 'Translucent Backlit Wall', color: '#D4A373' },
      { name: 'Polished Brass Trim', type: 'Inlaid Accent Joints', color: '#E5C158' }
    ]
  }
];

// Default Sample Customer Bookings for Admin Database Demonstration
const DEFAULT_BOOKINGS = [
  {
    id: 'book-1',
    fullName: 'Alexander Vance',
    phone: '6379183549',
    email: 'selvaharish049@gmail.com',
    projectType: 'New Luxury Villa / Home',
    selectedProduct: 'Country Estate (Modular Kitchens)',
    area: '4,500 Sq. Ft.',
    budget: '₹50 Lakhs',
    notes: 'Interested in dark fluted wood paneling for open living room and custom modular kitchen island.',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    status: 'Pending'
  }
];

// Default Live Website Announcements published by Admin
const DEFAULT_ANNOUNCEMENTS = [
  {
    id: 'ann-1',
    title: 'NEW 2026 MODULAR KITCHEN COLLECTION HANDOVER',
    message: 'We have completed the 5,200 sq. ft. Country Estate modular woodwork in Mayfair District with 0mm deviation accuracy!',
    date: 'Recent Handover'
  }
];

// Default Site Editable Images for Ethos, Teasers, About, and Services
const DEFAULT_SITE_IMAGES = {
  philosophy: {
    moodboard: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
    sketch: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    vision: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
    materials: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80'
  },
  teasers: {
    'country-estate': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    'urban-apartment': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    'creative-studio': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    'the-penthouse': 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80'
  },
  about: {
    story: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'
  },
  services: {
    '01': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    '02': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    '03': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    '04': 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    '05': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
  }
};

const ADMIN_PASSWORD = '#karthick#01';

export const ProjectProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const [announcements, setAnnouncements] = useState(() => {
    const saved = localStorage.getItem('luxe_announcements');
    return saved ? JSON.parse(saved) : DEFAULT_ANNOUNCEMENTS;
  });

  const [siteImages, setSiteImages] = useState(() => {
    const saved = localStorage.getItem('luxe_site_images');
    return saved ? JSON.parse(saved) : DEFAULT_SITE_IMAGES;
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('luxe_categories');
    return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('luxe_projects');
    return saved ? JSON.parse(saved) : DEFAULT_PROJECTS;
  });

  const [customerBookings, setCustomerBookings] = useState(() => {
    const saved = localStorage.getItem('luxe_customer_bookings');
    return saved ? JSON.parse(saved) : DEFAULT_BOOKINGS;
  });

  // Sync live database from backend server across all PCs & Mobile devices
  const syncWithBackend = async (retryCount = 0) => {
    try {
      const baseUrl = getApiBaseUrl();
      const ts = Date.now();
      const fetchOpts = { cache: 'no-store', headers: { 'Pragma': 'no-cache', 'Cache-Control': 'no-cache' } };

      const [projRes, catRes, annRes, bookRes, imgRes] = await Promise.all([
        fetch(`${baseUrl}/projects?t=${ts}`, fetchOpts).then(r => r.json()),
        fetch(`${baseUrl}/categories?t=${ts}`, fetchOpts).then(r => r.json()),
        fetch(`${baseUrl}/announcements?t=${ts}`, fetchOpts).then(r => r.json()),
        fetch(`${baseUrl}/bookings?t=${ts}`, fetchOpts).then(r => r.json()),
        fetch(`${baseUrl}/site-images?t=${ts}`, fetchOpts).then(r => r.json())
      ]);

      if (projRes?.success && Array.isArray(projRes.projects)) {
        setProjects(projRes.projects);
        localStorage.setItem('luxe_projects', JSON.stringify(projRes.projects));
      }
      if (catRes?.success && Array.isArray(catRes.categories)) {
        setCategories(catRes.categories);
        localStorage.setItem('luxe_categories', JSON.stringify(catRes.categories));
      }
      if (annRes?.success && Array.isArray(annRes.announcements)) {
        setAnnouncements(annRes.announcements);
        localStorage.setItem('luxe_announcements', JSON.stringify(annRes.announcements));
      }
      if (bookRes?.success && Array.isArray(bookRes.customerBookings)) {
        setCustomerBookings(bookRes.customerBookings);
        localStorage.setItem('luxe_customer_bookings', JSON.stringify(bookRes.customerBookings));
      }
      if (imgRes?.success && Object.keys(imgRes.siteImages || {}).length > 0) {
        setSiteImages(imgRes.siteImages);
        localStorage.setItem('luxe_site_images', JSON.stringify(imgRes.siteImages));
      }
    } catch (err) {
      console.warn('Backend server offline or unreachable. Retrying sync...', err);
      if (retryCount < 4) {
        setTimeout(() => syncWithBackend(retryCount + 1), 1500 * (retryCount + 1));
      }
    }
  };

  // Poll server every 3s & sync on tab focus/mobile touch to guarantee identical database on PC and Mobile
  useEffect(() => {
    syncWithBackend();

    const interval = setInterval(syncWithBackend, 3000);

    const handleFocus = () => syncWithBackend();
    window.addEventListener('focus', handleFocus);
    window.addEventListener('visibilitychange', handleFocus);
    window.addEventListener('touchstart', handleFocus, { passive: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('visibilitychange', handleFocus);
      window.removeEventListener('touchstart', handleFocus);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync state changes to localStorage as fallback cache
  useEffect(() => {
    localStorage.setItem('luxe_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('luxe_site_images', JSON.stringify(siteImages));
  }, [siteImages]);

  useEffect(() => {
    localStorage.setItem('luxe_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('luxe_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('luxe_customer_bookings', JSON.stringify(customerBookings));
  }, [customerBookings]);

  // Admin Login with password #karthick#01 (session-only)
  const loginAdmin = async (password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (data.success) {
        setIsAdminLoggedIn(true);
        return { success: true };
      } else {
        setIsAdminLoggedIn(false);
        return { success: false, error: data.error || 'Incorrect password! Access denied.' };
      }
    } catch (err) {
      // Fallback offline check
      if (password === ADMIN_PASSWORD) {
        setIsAdminLoggedIn(true);
        return { success: true };
      }
      setIsAdminLoggedIn(false);
      return { success: false, error: 'Incorrect password! Access denied.' };
    }
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
  };

  // Image File Upload Helper (Multer API)
  const uploadImageFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        return data.imageUrl;
      }
      throw new Error(data.error || 'Upload failed');
    } catch (err) {
      console.error('Image upload failed:', err);
      throw err;
    }
  };

  // Add website announcement
  const addAnnouncement = async (title, message) => {
    if (!title.trim()) return;
    const newAnn = {
      id: `ann-${Date.now()}`,
      title: title.trim(),
      message,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setAnnouncements(prev => [newAnn, ...prev]);

    try {
      const res = await fetch(`${API_BASE_URL}/announcements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, message })
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.announcements)) {
        setAnnouncements(data.announcements);
      } else {
        await syncWithBackend();
      }
    } catch (e) {
      console.warn('Backend sync failed for announcement add');
    }
  };

  const deleteAnnouncement = async (id) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));

    try {
      const res = await fetch(`${API_BASE_URL}/announcements/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success && Array.isArray(data.announcements)) {
        setAnnouncements(data.announcements);
      } else {
        await syncWithBackend();
      }
    } catch (e) {
      console.warn('Backend sync failed for announcement delete');
    }
  };

  // Update site image
  const updateSiteImage = async (section, key, newUrl) => {
    setSiteImages(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: newUrl
      }
    }));

    try {
      const res = await fetch(`${API_BASE_URL}/site-images`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, key, imageUrl: newUrl })
      });
      const data = await res.json();
      if (data.success && data.siteImages) {
        setSiteImages(data.siteImages);
      } else {
        await syncWithBackend();
      }
    } catch (e) {
      console.warn('Backend sync failed for site image update');
    }
  };

  // Add new collection category
  const addCategory = async (newCatName) => {
    const trimmed = newCatName.trim();
    if (trimmed && !categories.includes(trimmed)) {
      setCategories(prev => [...prev, trimmed]);

      try {
        const res = await fetch(`${API_BASE_URL}/categories`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: trimmed })
        });
        const data = await res.json();
        if (data.success && Array.isArray(data.categories)) {
          setCategories(data.categories);
        } else {
          await syncWithBackend();
        }
      } catch (e) {
        console.warn('Backend sync failed for category add');
      }
      return true;
    }
    return false;
  };

  // Delete category
  const deleteCategory = async (catName) => {
    if (catName === 'All Projects') return;
    setCategories(prev => prev.filter(c => c !== catName));

    try {
      const res = await fetch(`${API_BASE_URL}/categories/${encodeURIComponent(catName)}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success && Array.isArray(data.categories)) {
        setCategories(data.categories);
      } else {
        await syncWithBackend();
      }
    } catch (e) {
      console.warn('Backend sync failed for category delete');
    }
  };

  // Add new project
  const addProject = async (newProj) => {
    const id = newProj.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || `proj-${Date.now()}`;
    const projectItem = {
      ...newProj,
      id,
      tag: newProj.tag || newProj.category
    };
    setProjects(prev => [projectItem, ...prev]);

    try {
      const res = await fetch(`${API_BASE_URL}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectItem)
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.projects)) {
        setProjects(data.projects);
      } else {
        await syncWithBackend();
      }
    } catch (e) {
      console.warn('Backend sync failed for project add');
    }
  };

  // Delete project
  const deleteProject = async (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));

    try {
      const res = await fetch(`${API_BASE_URL}/projects/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success && Array.isArray(data.projects)) {
        setProjects(data.projects);
      } else {
        await syncWithBackend();
      }
    } catch (e) {
      console.warn('Backend sync failed for project delete');
    }
  };

  // Add new Customer Booking/Inquiry
  const addBooking = async (bookingData) => {
    const newBooking = {
      ...bookingData,
      id: `book-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      status: 'Pending'
    };
    setCustomerBookings(prev => [newBooking, ...prev]);

    try {
      const res = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.customerBookings)) {
        setCustomerBookings(data.customerBookings);
      } else {
        await syncWithBackend();
      }
    } catch (e) {
      console.warn('Backend sync failed for booking add');
    }
    return newBooking;
  };

  // Delete customer booking
  const deleteBooking = async (id) => {
    setCustomerBookings(prev => prev.filter(b => b.id !== id));

    try {
      const res = await fetch(`${API_BASE_URL}/bookings/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success && Array.isArray(data.customerBookings)) {
        setCustomerBookings(data.customerBookings);
      } else {
        await syncWithBackend();
      }
    } catch (e) {
      console.warn('Backend sync failed for booking delete');
    }
  };

  // Update booking status
  const updateBookingStatus = async (id, newStatus) => {
    setCustomerBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));

    try {
      const res = await fetch(`${API_BASE_URL}/bookings/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.customerBookings)) {
        setCustomerBookings(data.customerBookings);
      } else {
        await syncWithBackend();
      }
    } catch (e) {
      console.warn('Backend sync failed for booking status update');
    }
  };

  // Edit existing project
  const editProject = async (id, updatedData) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));

    try {
      const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.projects)) {
        setProjects(data.projects);
      } else {
        await syncWithBackend();
      }
      return { success: true };
    } catch (e) {
      console.warn('Backend sync failed for project edit', e);
      return { success: false, error: e.message };
    }
  };

  // Edit category name
  const editCategory = async (oldName, newName) => {
    const trimmed = newName.trim();
    if (!trimmed || oldName === 'All Projects') return false;
    
    setCategories(prev => prev.map(c => c === oldName ? trimmed : c));
    setProjects(prev => prev.map(p => p.category === oldName ? { ...p, category: trimmed } : p));

    try {
      const res = await fetch(`${API_BASE_URL}/categories/${encodeURIComponent(oldName)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newName: trimmed })
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.categories)) {
        setCategories(data.categories);
        if (Array.isArray(data.projects)) {
          setProjects(data.projects);
        }
      } else {
        await syncWithBackend();
      }
      return true;
    } catch (e) {
      console.warn('Backend sync failed for category edit', e);
      return false;
    }
  };

  return (
    <ProjectContext.Provider value={{
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
      editCategory,
      deleteCategory,
      addProject,
      editProject,
      deleteProject,
      addBooking,
      deleteBooking,
      updateBookingStatus,
      uploadImageFile
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);
