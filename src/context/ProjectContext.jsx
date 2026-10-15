import React, { createContext, useContext, useState, useEffect } from 'react';

const ProjectContext = createContext();

export const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const custom = localStorage.getItem('luxe_custom_api_url');
    if (custom && custom.trim()) {
      return custom.trim().replace(/\/+$/, '');
    }
  }
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

  // Helper for safe API mutations (POST, PUT, DELETE) that never throws SyntaxError on HTML
  const safeApiCall = async (endpoint, method = 'GET', body = null) => {
    try {
      const baseUrl = getApiBaseUrl();
      const options = {
        method,
        headers: {
          'Accept': 'application/json',
          'Pragma': 'no-cache',
          'Cache-Control': 'no-cache, no-store'
        },
        cache: 'no-store'
      };
      if (body) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
      }

      const res = await fetch(`${baseUrl}${endpoint}`, options);
      const ct = res.headers.get('content-type') || '';
      if (!ct.includes('application/json')) {
        return { isJson: false, ok: false, status: res.status, error: 'Server returned non-JSON response' };
      }
      const data = await res.json();
      return { isJson: true, ok: res.ok, status: res.status, data };
    } catch (err) {
      return { isJson: false, ok: false, error: err.message || 'Network request failed' };
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
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ password })
      });
      const ct = res.headers.get('content-type') || '';
      if (res.ok && ct.includes('application/json')) {
        const data = await res.json();
        if (data.success) {
          setIsAdminLoggedIn(true);
          setServerOnline(true);
          return { success: true };
        } else {
          setIsAdminLoggedIn(false);
          return { success: false, error: data.error || 'Incorrect password! Access denied.' };
        }
      }
    } catch {}
    if (password === ADMIN_PASSWORD) {
      setIsAdminLoggedIn(true);
      return { success: true };
    }
    setIsAdminLoggedIn(false);
    return { success: false, error: 'Incorrect password! Access denied.' };
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
  };

  // Allow setting a custom backend URL if deployed separately on Render
  const setCustomApiUrl = (url) => {
    if (url && url.trim()) {
      localStorage.setItem('luxe_custom_api_url', url.trim());
    } else {
      localStorage.removeItem('luxe_custom_api_url');
    }
    syncWithBackend();
  };

  // Image File Upload Helper (Multer API with fallback to local FileReader)
  const uploadImageFile = async (file) => {
    try {
      const baseUrl = getApiBaseUrl();
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch(`${baseUrl}/upload`, {
        method: 'POST',
        body: formData
      });
      const ct = res.headers.get('content-type') || '';
      if (res.ok && ct.includes('application/json')) {
        const data = await res.json();
        if (data.success && data.imageUrl) {
          return data.imageUrl;
        }
      }
    } catch (err) {
      console.warn('Backend image upload endpoint not available, falling back to local file reader', err);
    }
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });
  };

  // Add website announcement
  const addAnnouncement = async (title, message) => {
    const trimmedTitle = (title || '').trim();
    if (!trimmedTitle) return { success: false, error: 'Title required' };
    const newAnn = {
      id: `ann-${Date.now()}`,
      title: trimmedTitle,
      message: message || '',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    const apiRes = await safeApiCall('/announcements', 'POST', { title: trimmedTitle, message });
    if (apiRes.isJson && apiRes.ok && apiRes.data && apiRes.data.success && Array.isArray(apiRes.data.announcements)) {
      setAnnouncements(apiRes.data.announcements);
      localStorage.setItem('luxe_announcements', JSON.stringify(apiRes.data.announcements));
      setServerOnline(true);
      return { success: true, serverSynced: true };
    }

    const updated = [newAnn, ...announcements];
    setAnnouncements(updated);
    localStorage.setItem('luxe_announcements', JSON.stringify(updated));
    setServerOnline(false);
    return { success: true, serverSynced: false };
  };

  const deleteAnnouncement = async (id) => {
    const apiRes = await safeApiCall(`/announcements/${id}`, 'DELETE');
    if (apiRes.isJson && apiRes.ok && apiRes.data && apiRes.data.success && Array.isArray(apiRes.data.announcements)) {
      setAnnouncements(apiRes.data.announcements);
      localStorage.setItem('luxe_announcements', JSON.stringify(apiRes.data.announcements));
      setServerOnline(true);
      return { success: true, serverSynced: true };
    }

    const updated = announcements.filter(a => a.id !== id);
    setAnnouncements(updated);
    localStorage.setItem('luxe_announcements', JSON.stringify(updated));
    setServerOnline(false);
    return { success: true, serverSynced: false };
  };

  // Update site image
  const updateSiteImage = async (section, key, newUrl) => {
    const apiRes = await safeApiCall('/site-images', 'PUT', { section, key, imageUrl: newUrl });
    if (apiRes.isJson && apiRes.ok && apiRes.data && apiRes.data.success && apiRes.data.siteImages) {
      setSiteImages(apiRes.data.siteImages);
      localStorage.setItem('luxe_site_images', JSON.stringify(apiRes.data.siteImages));
      setServerOnline(true);
      return { success: true, serverSynced: true };
    }

    const updated = {
      ...siteImages,
      [section]: {
        ...(siteImages[section] || {}),
        [key]: newUrl
      }
    };
    setSiteImages(updated);
    localStorage.setItem('luxe_site_images', JSON.stringify(updated));
    setServerOnline(false);
    return { success: true, serverSynced: false };
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

    const apiRes = await safeApiCall('/categories', 'POST', { name: trimmed });
    if (apiRes.isJson && apiRes.ok && apiRes.data && apiRes.data.success && Array.isArray(apiRes.data.categories)) {
      setCategories(apiRes.data.categories);
      localStorage.setItem('luxe_categories', JSON.stringify(apiRes.data.categories));
      setServerOnline(true);
      return { 
        success: true, 
        message: `Collection "${trimmed}" saved permanently to shared production database!`, 
        categories: apiRes.data.categories 
      };
    }

    const targetUrl = `${getApiBaseUrl()}/categories`;
    const errorDetail = apiRes.error || (apiRes.isJson ? apiRes.data?.error : 'Server returned non-JSON HTML (Static Site detected)');
    console.error('[LUXE DB ERROR] Failed to save category to backend:', { targetUrl, apiRes });
    setServerOnline(false);
    return { 
      success: false, 
      error: `Could not save collection to production database (${errorDetail}). Target: ${targetUrl}. Please ensure Render Web Service is running.` 
    };
  };

  // Delete category
  const deleteCategory = async (catName) => {
    if (catName === 'All Projects') {
      return { success: false, error: 'Cannot delete "All Projects" root category.' };
    }

    const apiRes = await safeApiCall(`/categories/${encodeURIComponent(catName)}`, 'DELETE');
    if (apiRes.isJson && apiRes.ok && apiRes.data && apiRes.data.success && Array.isArray(apiRes.data.categories)) {
      setCategories(apiRes.data.categories);
      localStorage.setItem('luxe_categories', JSON.stringify(apiRes.data.categories));
      if (Array.isArray(apiRes.data.projects)) {
        setProjects(apiRes.data.projects);
        localStorage.setItem('luxe_projects', JSON.stringify(apiRes.data.projects));
      }
      setServerOnline(true);
      return { success: true, message: `Collection "${catName}" deleted from shared production database!`, categories: apiRes.data.categories };
    }

    const targetUrl = `${getApiBaseUrl()}/categories/${encodeURIComponent(catName)}`;
    const errorDetail = apiRes.error || 'Server unreachable or returned non-JSON';
    console.error('[LUXE DB ERROR] Failed to delete category on backend:', { targetUrl, apiRes });
    setServerOnline(false);
    return { success: false, error: `Could not delete collection from production database (${errorDetail}). Target: ${targetUrl}.` };
  };

  // Edit category name
  const editCategory = async (oldName, newName) => {
    const trimmed = (newName || '').trim();
    if (!trimmed || oldName === 'All Projects') {
      return { success: false, error: 'Invalid collection name.' };
    }

    const apiRes = await safeApiCall(`/categories/${encodeURIComponent(oldName)}`, 'PUT', { newName: trimmed });
    if (apiRes.isJson && apiRes.ok && apiRes.data && apiRes.data.success && Array.isArray(apiRes.data.categories)) {
      setCategories(apiRes.data.categories);
      localStorage.setItem('luxe_categories', JSON.stringify(apiRes.data.categories));
      if (Array.isArray(apiRes.data.projects)) {
        setProjects(apiRes.data.projects);
        localStorage.setItem('luxe_projects', JSON.stringify(apiRes.data.projects));
      }
      setServerOnline(true);
      return { success: true, message: `Collection renamed to "${trimmed}" in shared production database!` };
    }

    const targetUrl = `${getApiBaseUrl()}/categories`;
    const errorDetail = apiRes.error || 'Server unreachable or returned non-JSON';
    console.error('[LUXE DB ERROR] Failed to edit category on backend:', { targetUrl, apiRes });
    setServerOnline(false);
    return { success: false, error: `Could not rename collection in production database (${errorDetail}). Target: ${targetUrl}.` };
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

    const apiRes = await safeApiCall('/projects', 'POST', projectItem);
    if (apiRes.isJson && apiRes.ok && apiRes.data && apiRes.data.success && Array.isArray(apiRes.data.projects)) {
      setProjects(apiRes.data.projects);
      localStorage.setItem('luxe_projects', JSON.stringify(apiRes.data.projects));
      setServerOnline(true);
      return { 
        success: true, 
        message: `Product "${projectItem.title}" saved permanently to shared production database!`, 
        project: apiRes.data.project, 
        projects: apiRes.data.projects 
      };
    }

    const targetUrl = `${getApiBaseUrl()}/projects`;
    const errorDetail = apiRes.error || (apiRes.isJson ? apiRes.data?.error : 'Server returned non-JSON HTML (Static Site detected)');
    console.error('[LUXE DB ERROR] Failed to save project to backend:', { targetUrl, apiRes });
    setServerOnline(false);
    return { 
      success: false, 
      error: `Could not save product to production database (${errorDetail}). Target: ${targetUrl}. Please ensure Render Web Service is running.` 
    };
  };

  // Edit existing project
  const editProject = async (id, updatedData) => {
    const apiRes = await safeApiCall(`/projects/${id}`, 'PUT', updatedData);
    if (apiRes.isJson && apiRes.ok && apiRes.data && apiRes.data.success && Array.isArray(apiRes.data.projects)) {
      setProjects(apiRes.data.projects);
      localStorage.setItem('luxe_projects', JSON.stringify(apiRes.data.projects));
      setServerOnline(true);
      return { success: true, message: `Product updated in shared production database!`, project: apiRes.data.project, projects: apiRes.data.projects };
    }

    const targetUrl = `${getApiBaseUrl()}/projects/${id}`;
    const errorDetail = apiRes.error || 'Server unreachable or returned non-JSON';
    console.error('[LUXE DB ERROR] Failed to edit project on backend:', { targetUrl, apiRes });
    setServerOnline(false);
    return { success: false, error: `Could not update product in production database (${errorDetail}). Target: ${targetUrl}.` };
  };

  // Delete project
  const deleteProject = async (id) => {
    const apiRes = await safeApiCall(`/projects/${id}`, 'DELETE');
    if (apiRes.isJson && apiRes.ok && apiRes.data && apiRes.data.success && Array.isArray(apiRes.data.projects)) {
      setProjects(apiRes.data.projects);
      localStorage.setItem('luxe_projects', JSON.stringify(apiRes.data.projects));
      setServerOnline(true);
      return { success: true, message: `Product deleted from shared production database!`, projects: apiRes.data.projects };
    }

    const targetUrl = `${getApiBaseUrl()}/projects/${id}`;
    const errorDetail = apiRes.error || 'Server unreachable or returned non-JSON';
    console.error('[LUXE DB ERROR] Failed to delete project on backend:', { targetUrl, apiRes });
    setServerOnline(false);
    return { success: false, error: `Could not delete product from production database (${errorDetail}). Target: ${targetUrl}.` };
  };

  // Add new Customer Booking/Inquiry
  const addBooking = async (bookingData) => {
    const newBooking = {
      ...bookingData,
      id: `book-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      status: 'Pending'
    };

    const apiRes = await safeApiCall('/bookings', 'POST', bookingData);
    if (apiRes.isJson && apiRes.ok && apiRes.data && apiRes.data.success && Array.isArray(apiRes.data.customerBookings)) {
      setCustomerBookings(apiRes.data.customerBookings);
      localStorage.setItem('luxe_customer_bookings', JSON.stringify(apiRes.data.customerBookings));
      setServerOnline(true);
      return { success: true, serverSynced: true, booking: apiRes.data.booking };
    }

    const updated = [newBooking, ...customerBookings];
    setCustomerBookings(updated);
    localStorage.setItem('luxe_customer_bookings', JSON.stringify(updated));
    setServerOnline(false);
    return { success: true, serverSynced: false, booking: newBooking };
  };

  // Delete customer booking
  const deleteBooking = async (id) => {
    const apiRes = await safeApiCall(`/bookings/${id}`, 'DELETE');
    if (apiRes.isJson && apiRes.ok && apiRes.data && apiRes.data.success && Array.isArray(apiRes.data.customerBookings)) {
      setCustomerBookings(apiRes.data.customerBookings);
      localStorage.setItem('luxe_customer_bookings', JSON.stringify(apiRes.data.customerBookings));
      setServerOnline(true);
      return { success: true, serverSynced: true };
    }

    const updated = customerBookings.filter(b => b.id !== id);
    setCustomerBookings(updated);
    localStorage.setItem('luxe_customer_bookings', JSON.stringify(updated));
    setServerOnline(false);
    return { success: true, serverSynced: false };
  };

  // Update booking status
  const updateBookingStatus = async (id, newStatus) => {
    const apiRes = await safeApiCall(`/bookings/${id}/status`, 'PUT', { status: newStatus });
    if (apiRes.isJson && apiRes.ok && apiRes.data && apiRes.data.success && Array.isArray(apiRes.data.customerBookings)) {
      setCustomerBookings(apiRes.data.customerBookings);
      localStorage.setItem('luxe_customer_bookings', JSON.stringify(apiRes.data.customerBookings));
      setServerOnline(true);
      return { success: true, serverSynced: true };
    }

    const updated = customerBookings.map(b => b.id === id ? { ...b, status: newStatus } : b);
    setCustomerBookings(updated);
    localStorage.setItem('luxe_customer_bookings', JSON.stringify(updated));
    setServerOnline(false);
    return { success: true, serverSynced: false };
  };

  return (
    <ProjectContext.Provider value={{
      serverOnline,
      isAdminLoggedIn,
      loginAdmin,
      logoutAdmin,
      setCustomApiUrl,
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
