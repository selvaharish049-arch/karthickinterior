import React, { createContext, useContext, useState, useEffect } from 'react';

const ProjectContext = createContext();

export const getApiBaseUrl = () => {
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL.replace(/\/+$/, '');
  }
  if (typeof window !== 'undefined') {
    const { protocol, hostname, port } = window.location;
    // Local dev: React dev server on 3000 -> target backend on 5000
    if ((hostname === 'localhost' || hostname === '127.0.0.1') && port === '3000') {
      return `${protocol}//${hostname}:5000/api`;
    }
    // LAN mobile testing on port 3000
    if (port === '3000' && /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname)) {
      return `${protocol}//${hostname}:5000/api`;
    }
    // Production on Render / Any host: Use relative /api (always hits the host serving the app)
    return `${protocol}//${hostname}${port ? `:${port}` : ''}/api`;
  }
  return 'http://localhost:5000/api';
};

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

  const [serverOnline, setServerOnline] = useState(true);

  // Helper for safe JSON fetching that never crashes on HTML or network errors
  const safeFetchJson = async (url) => {
    try {
      const res = await fetch(url, {
        cache: 'no-store',
        headers: {
          'Pragma': 'no-cache',
          'Cache-Control': 'no-cache, no-store',
          'Accept': 'application/json'
        }
      });
      if (!res.ok) return null;
      const ct = res.headers.get('content-type') || '';
      if (!ct.includes('application/json')) return null;
      return await res.json();
    } catch (e) {
      return null;
    }
  };

  // Sync live database from backend server across all PCs & Mobile devices
  const syncWithBackend = async () => {
    try {
      const baseUrl = getApiBaseUrl();
      const ts = Date.now();

      const [projRes, catRes, annRes, bookRes, imgRes] = await Promise.all([
        safeFetchJson(`${baseUrl}/projects?t=${ts}`),
        safeFetchJson(`${baseUrl}/categories?t=${ts}`),
        safeFetchJson(`${baseUrl}/announcements?t=${ts}`),
        safeFetchJson(`${baseUrl}/bookings?t=${ts}`),
        safeFetchJson(`${baseUrl}/site-images?t=${ts}`)
      ]);

      let isConnected = false;

      if (projRes && projRes.success && Array.isArray(projRes.projects)) {
        setProjects(projRes.projects);
        localStorage.setItem('luxe_projects', JSON.stringify(projRes.projects));
        isConnected = true;
      }
      if (catRes && catRes.success && Array.isArray(catRes.categories)) {
        setCategories(catRes.categories);
        localStorage.setItem('luxe_categories', JSON.stringify(catRes.categories));
        isConnected = true;
      }
      if (annRes && annRes.success && Array.isArray(annRes.announcements)) {
        setAnnouncements(annRes.announcements);
        localStorage.setItem('luxe_announcements', JSON.stringify(annRes.announcements));
      }
      if (bookRes && bookRes.success && Array.isArray(bookRes.customerBookings)) {
        setCustomerBookings(bookRes.customerBookings);
        localStorage.setItem('luxe_customer_bookings', JSON.stringify(bookRes.customerBookings));
      }
      if (imgRes && imgRes.success && imgRes.siteImages && Object.keys(imgRes.siteImages).length > 0) {
        setSiteImages(imgRes.siteImages);
        localStorage.setItem('luxe_site_images', JSON.stringify(imgRes.siteImages));
      }

      setServerOnline(isConnected);
    } catch (err) {
      console.warn('Backend sync error:', err);
      setServerOnline(false);
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
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (data.success) {
        setIsAdminLoggedIn(true);
        setServerOnline(true);
        return { success: true };
      } else {
        setIsAdminLoggedIn(false);
        return { success: false, error: data.error || 'Incorrect password! Access denied.' };
      }
    } catch (err) {
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
      const baseUrl = getApiBaseUrl();
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch(`${baseUrl}/upload`, {
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
    const trimmedTitle = (title || '').trim();
    if (!trimmedTitle) return { success: false, error: 'Title required' };
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/announcements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: trimmedTitle, message })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.announcements)) {
        setAnnouncements(data.announcements);
        localStorage.setItem('luxe_announcements', JSON.stringify(data.announcements));
        setServerOnline(true);
        return { success: true };
      }
      throw new Error(data.error || 'Failed to add announcement');
    } catch (e) {
      setServerOnline(false);
      return { success: false, error: e.message };
    }
  };

  const deleteAnnouncement = async (id) => {
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/announcements/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.announcements)) {
        setAnnouncements(data.announcements);
        localStorage.setItem('luxe_announcements', JSON.stringify(data.announcements));
        setServerOnline(true);
        return { success: true };
      }
      throw new Error(data.error || 'Failed to delete announcement');
    } catch (e) {
      setServerOnline(false);
      return { success: false, error: e.message };
    }
  };

  // Update site image
  const updateSiteImage = async (section, key, newUrl) => {
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/site-images`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, key, imageUrl: newUrl })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.success && data.siteImages) {
        setSiteImages(data.siteImages);
        localStorage.setItem('luxe_site_images', JSON.stringify(data.siteImages));
        setServerOnline(true);
        return { success: true };
      }
      throw new Error(data.error || 'Failed to update image');
    } catch (e) {
      setServerOnline(false);
      return { success: false, error: e.message };
    }
  };

  // Add new collection category
  const addCategory = async (newCatName) => {
    const trimmed = (newCatName || '').trim();
    if (!trimmed) {
      return { success: false, error: 'Category name cannot be empty.' };
    }
    if (categories.some(c => c.toLowerCase() === trimmed.toLowerCase())) {
      return { success: false, error: `Collection "${trimmed}" already exists.` };
    }

    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmed })
      });
      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}: ${res.statusText}`);
      }
      const data = await res.json();
      if (data.success && Array.isArray(data.categories)) {
        setCategories(data.categories);
        localStorage.setItem('luxe_categories', JSON.stringify(data.categories));
        setServerOnline(true);
        return { success: true, categories: data.categories };
      }
      throw new Error(data.error || 'Failed to save collection to server.');
    } catch (e) {
      console.error('Error adding category to server:', e);
      setServerOnline(false);
      return { success: false, error: e.message || 'Cannot reach server database. Please ensure backend is running.' };
    }
  };

  // Delete category
  const deleteCategory = async (catName) => {
    if (catName === 'All Projects') {
      return { success: false, error: 'Cannot delete "All Projects" root category.' };
    }
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/categories/${encodeURIComponent(catName)}`, {
        method: 'DELETE'
      });
      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}: ${res.statusText}`);
      }
      const data = await res.json();
      if (data.success && Array.isArray(data.categories)) {
        setCategories(data.categories);
        localStorage.setItem('luxe_categories', JSON.stringify(data.categories));
        if (Array.isArray(data.projects)) {
          setProjects(data.projects);
          localStorage.setItem('luxe_projects', JSON.stringify(data.projects));
        }
        setServerOnline(true);
        return { success: true, categories: data.categories };
      }
      throw new Error(data.error || 'Failed to delete collection from server.');
    } catch (e) {
      console.error('Error deleting category from server:', e);
      setServerOnline(false);
      return { success: false, error: e.message || 'Cannot reach server database.' };
    }
  };

  // Edit category name
  const editCategory = async (oldName, newName) => {
    const trimmed = (newName || '').trim();
    if (!trimmed || oldName === 'All Projects') {
      return { success: false, error: 'Invalid collection name.' };
    }
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/categories/${encodeURIComponent(oldName)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newName: trimmed })
      });
      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}: ${res.statusText}`);
      }
      const data = await res.json();
      if (data.success && Array.isArray(data.categories)) {
        setCategories(data.categories);
        localStorage.setItem('luxe_categories', JSON.stringify(data.categories));
        if (Array.isArray(data.projects)) {
          setProjects(data.projects);
          localStorage.setItem('luxe_projects', JSON.stringify(data.projects));
        }
        setServerOnline(true);
        return { success: true };
      }
      throw new Error(data.error || 'Failed to rename collection.');
    } catch (e) {
      console.error('Error renaming category:', e);
      setServerOnline(false);
      return { success: false, error: e.message || 'Cannot reach server database.' };
    }
  };

  // Add new project
  const addProject = async (newProj) => {
    if (!newProj || !newProj.title || !newProj.title.trim()) {
      return { success: false, error: 'Product title is required.' };
    }
    const cleanSlug = newProj.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || 'product';
    const id = newProj.id || `${cleanSlug}-${Date.now()}`;
    const projectItem = {
      ...newProj,
      id,
      title: newProj.title.trim(),
      category: newProj.category || categories[1] || 'Modular Kitchens',
      tag: newProj.tag || newProj.category || 'Luxury Interior'
    };

    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectItem)
      });
      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}: ${res.statusText}`);
      }
      const data = await res.json();
      if (data.success && Array.isArray(data.projects)) {
        setProjects(data.projects);
        localStorage.setItem('luxe_projects', JSON.stringify(data.projects));
        setServerOnline(true);
        return { success: true, project: data.project, projects: data.projects };
      }
      throw new Error(data.error || 'Failed to save product to server.');
    } catch (e) {
      console.error('Error adding project to server:', e);
      setServerOnline(false);
      return { success: false, error: e.message || 'Cannot reach server database. Please ensure backend is running.' };
    }
  };

  // Edit existing project
  const editProject = async (id, updatedData) => {
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}: ${res.statusText}`);
      }
      const data = await res.json();
      if (data.success && Array.isArray(data.projects)) {
        setProjects(data.projects);
        localStorage.setItem('luxe_projects', JSON.stringify(data.projects));
        setServerOnline(true);
        return { success: true, project: data.project, projects: data.projects };
      }
      throw new Error(data.error || 'Failed to update product on server.');
    } catch (e) {
      console.error('Error updating project:', e);
      setServerOnline(false);
      return { success: false, error: e.message || 'Cannot reach server database.' };
    }
  };

  // Delete project
  const deleteProject = async (id) => {
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/projects/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}: ${res.statusText}`);
      }
      const data = await res.json();
      if (data.success && Array.isArray(data.projects)) {
        setProjects(data.projects);
        localStorage.setItem('luxe_projects', JSON.stringify(data.projects));
        setServerOnline(true);
        return { success: true, projects: data.projects };
      }
      throw new Error(data.error || 'Failed to delete product from server.');
    } catch (e) {
      console.error('Error deleting project:', e);
      setServerOnline(false);
      return { success: false, error: e.message || 'Cannot reach server database.' };
    }
  };

  // Add new Customer Booking/Inquiry
  const addBooking = async (bookingData) => {
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.customerBookings)) {
        setCustomerBookings(data.customerBookings);
        localStorage.setItem('luxe_customer_bookings', JSON.stringify(data.customerBookings));
        setServerOnline(true);
        return { success: true, booking: data.booking };
      }
      throw new Error(data.error || 'Failed to submit booking');
    } catch (e) {
      setServerOnline(false);
      return { success: false, error: e.message };
    }
  };

  // Delete customer booking
  const deleteBooking = async (id) => {
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/bookings/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.customerBookings)) {
        setCustomerBookings(data.customerBookings);
        localStorage.setItem('luxe_customer_bookings', JSON.stringify(data.customerBookings));
        setServerOnline(true);
        return { success: true };
      }
      throw new Error(data.error || 'Failed to delete booking');
    } catch (e) {
      setServerOnline(false);
      return { success: false, error: e.message };
    }
  };

  // Update booking status
  const updateBookingStatus = async (id, newStatus) => {
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/bookings/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.customerBookings)) {
        setCustomerBookings(data.customerBookings);
        localStorage.setItem('luxe_customer_bookings', JSON.stringify(data.customerBookings));
        setServerOnline(true);
        return { success: true };
      }
      throw new Error(data.error || 'Failed to update status');
    } catch (e) {
      setServerOnline(false);
      return { success: false, error: e.message };
    }
  };

  return (
    <ProjectContext.Provider value={{
      serverOnline,
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
      uploadImageFile,
      syncWithBackend
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);
