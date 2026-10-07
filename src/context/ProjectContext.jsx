import React, { createContext, useContext, useState, useEffect } from 'react';

const ProjectContext = createContext();
const API_BASE_URL = 'http://localhost:5000/api';

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

  // Load initial data from Node.js Express API on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [projRes, catRes, annRes, bookRes, imgRes] = await Promise.all([
          fetch(`${API_BASE_URL}/projects`).then(r => r.json()),
          fetch(`${API_BASE_URL}/categories`).then(r => r.json()),
          fetch(`${API_BASE_URL}/announcements`).then(r => r.json()),
          fetch(`${API_BASE_URL}/bookings`).then(r => r.json()),
          fetch(`${API_BASE_URL}/site-images`).then(r => r.json())
        ]);

        if (projRes?.success && projRes.projects?.length > 0) setProjects(projRes.projects);
        if (catRes?.success && catRes.categories?.length > 0) setCategories(catRes.categories);
        if (annRes?.success && annRes.announcements?.length > 0) setAnnouncements(annRes.announcements);
        if (bookRes?.success && bookRes.customerBookings?.length > 0) setCustomerBookings(bookRes.customerBookings);
        if (imgRes?.success && Object.keys(imgRes.siteImages || {}).length > 0) setSiteImages(imgRes.siteImages);
      } catch (err) {
        console.warn('Backend server offline or unreachable. Using localStorage state.', err);
      }
    };

    fetchInitialData();
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
      await fetch(`${API_BASE_URL}/announcements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, message })
      });
    } catch (e) {
      console.warn('Backend sync failed for announcement add');
    }
  };

  const deleteAnnouncement = async (id) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));

    try {
      await fetch(`${API_BASE_URL}/announcements/${id}`, { method: 'DELETE' });
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
      await fetch(`${API_BASE_URL}/site-images`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, key, imageUrl: newUrl })
      });
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
        await fetch(`${API_BASE_URL}/categories`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: trimmed })
        });
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
      await fetch(`${API_BASE_URL}/categories/${encodeURIComponent(catName)}`, { method: 'DELETE' });
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
      await fetch(`${API_BASE_URL}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectItem)
      });
    } catch (e) {
      console.warn('Backend sync failed for project add');
    }
  };

  // Delete project
  const deleteProject = async (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));

    try {
      await fetch(`${API_BASE_URL}/projects/${id}`, { method: 'DELETE' });
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
      await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
    } catch (e) {
      console.warn('Backend sync failed for booking add');
    }
    return newBooking;
  };

  // Delete customer booking
  const deleteBooking = async (id) => {
    setCustomerBookings(prev => prev.filter(b => b.id !== id));

    try {
      await fetch(`${API_BASE_URL}/bookings/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.warn('Backend sync failed for booking delete');
    }
  };

  // Update booking status
  const updateBookingStatus = async (id, newStatus) => {
    setCustomerBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));

    try {
      await fetch(`${API_BASE_URL}/bookings/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (e) {
      console.warn('Backend sync failed for booking status update');
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
      deleteCategory,
      addProject,
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
