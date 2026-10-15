const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5000;
const DB_PATH = path.join(__dirname, 'data', 'db.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Ensure data directory exists
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json());

// Prevent stale API responses on mobile webviews, WhatsApp, and shared links
app.use('/api', (req, res, next) => {
  res.header('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', '0');
  res.header('Surrogate-Control', 'no-store');
  next();
});

app.use('/uploads', express.static(UPLOADS_DIR));

// Admin Password Constant
const ADMIN_PASSWORD = '#karthick#01';

// Default Master Database Data if db.json is missing or newly created
const DEFAULT_CATEGORIES = [
  'All Projects',
  'Modular Kitchens',
  'Luxury Living Rooms',
  'Master Suites',
  'Commercial & Office Spaces'
];

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

// Helper functions for reading & writing database
const readDB = () => {
  try {
    let db = {};
    if (fs.existsSync(DB_PATH)) {
      const data = fs.readFileSync(DB_PATH, 'utf8');
      db = JSON.parse(data);
    }
    let modified = false;
    if (!Array.isArray(db.categories) || db.categories.length === 0) {
      db.categories = [...DEFAULT_CATEGORIES];
      modified = true;
    }
    if (!Array.isArray(db.projects) || db.projects.length === 0) {
      db.projects = [...DEFAULT_PROJECTS];
      modified = true;
    }
    if (!Array.isArray(db.customerBookings)) {
      db.customerBookings = [];
      modified = true;
    }
    if (!Array.isArray(db.announcements)) {
      db.announcements = [
        {
          id: 'ann-1',
          title: 'NEW 2026 MODULAR KITCHEN COLLECTION HANDOVER',
          message: 'We have completed the 5,200 sq. ft. Country Estate modular woodwork in Mayfair District with 0mm deviation accuracy!',
          date: 'Recent Handover'
        }
      ];
      modified = true;
    }
    if (!db.siteImages || typeof db.siteImages !== 'object') {
      db.siteImages = {};
      modified = true;
    }
    if (modified) {
      writeDB(db);
    }
    return db;
  } catch (err) {
    console.error('Error reading db.json:', err);
    return {
      categories: [...DEFAULT_CATEGORIES],
      projects: [...DEFAULT_PROJECTS],
      customerBookings: [],
      announcements: [],
      siteImages: {}
    };
  }
};

const writeDB = (data) => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing to db.json:', err);
    return false;
  }
};

// Multer Storage setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, 'img-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage });

// API ROUTES

// 1. Admin Login Endpoint
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    return res.json({ success: true, message: 'Admin authentication successful' });
  }
  return res.status(401).json({ success: false, error: 'Incorrect password! Access denied.' });
});

// 2. Image File Upload Endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No image file uploaded' });
  }
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ success: true, imageUrl: fileUrl, filename: req.file.filename });
});

// 3. Projects API Endpoints
app.get('/api/projects', (req, res) => {
  const db = readDB();
  res.json({ success: true, projects: db.projects || [] });
});

app.post('/api/projects', (req, res) => {
  const db = readDB();
  const newProject = req.body;
  if (!newProject.title) {
    return res.status(400).json({ success: false, error: 'Title is required' });
  }
  
  const id = newProject.id || newProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || `proj-${Date.now()}`;
  const projectItem = {
    ...newProject,
    id,
    tag: newProject.tag || newProject.category || 'Luxury Interior'
  };

  const existingIdx = (db.projects || []).findIndex(p => p.id === id);
  if (existingIdx !== -1) {
    db.projects[existingIdx] = { ...db.projects[existingIdx], ...projectItem };
  } else {
    db.projects = [projectItem, ...(db.projects || [])];
  }

  writeDB(db);
  res.json({ success: true, project: projectItem, projects: db.projects });
});

app.put('/api/projects/:id', (req, res) => {
  const db = readDB();
  const { id } = req.params;
  const updatedData = req.body;

  const existingIdx = (db.projects || []).findIndex(p => p.id === id);
  if (existingIdx === -1) {
    return res.status(404).json({ success: false, error: 'Project not found' });
  }

  db.projects[existingIdx] = { ...db.projects[existingIdx], ...updatedData, id };
  writeDB(db);
  res.json({ success: true, project: db.projects[existingIdx], projects: db.projects });
});

app.delete('/api/projects/:id', (req, res) => {
  const db = readDB();
  const { id } = req.params;
  db.projects = (db.projects || []).filter(p => p.id !== id);
  writeDB(db);
  res.json({ success: true, message: 'Project deleted successfully', projects: db.projects });
});

// 4. Categories API Endpoints
app.get('/api/categories', (req, res) => {
  const db = readDB();
  res.json({ success: true, categories: db.categories || [] });
});

app.post('/api/categories', (req, res) => {
  const { name } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ success: false, error: 'Category name required' });
  }
  const db = readDB();
  const trimmed = name.trim();
  if (!db.categories.includes(trimmed)) {
    db.categories.push(trimmed);
    writeDB(db);
  }
  res.json({ success: true, categories: db.categories });
});

app.put('/api/categories/:oldName', (req, res) => {
  const db = readDB();
  const oldName = decodeURIComponent(req.params.oldName);
  const { newName } = req.body;
  if (!newName || !newName.trim()) {
    return res.status(400).json({ success: false, error: 'New category name required' });
  }
  const trimmed = newName.trim();

  const idx = (db.categories || []).indexOf(oldName);
  if (idx !== -1) {
    db.categories[idx] = trimmed;
    db.projects = (db.projects || []).map(p => p.category === oldName ? { ...p, category: trimmed } : p);
    writeDB(db);
  }
  res.json({ success: true, categories: db.categories, projects: db.projects });
});

app.delete('/api/categories/:name', (req, res) => {
  const db = readDB();
  const name = decodeURIComponent(req.params.name);
  if (name === 'All Projects') {
    return res.status(400).json({ success: false, error: 'Cannot delete All Projects category' });
  }
  db.categories = (db.categories || []).filter(c => c !== name);
  db.projects = (db.projects || []).map(p => p.category === name ? { ...p, category: 'All Projects' } : p);
  writeDB(db);
  res.json({ success: true, categories: db.categories, projects: db.projects });
});

// 5. Customer Bookings / Inquiries API Endpoints
app.get('/api/bookings', (req, res) => {
  const db = readDB();
  res.json({ success: true, customerBookings: db.customerBookings || [] });
});

app.post('/api/bookings', (req, res) => {
  const db = readDB();
  const bookingData = req.body;
  const newBooking = {
    ...bookingData,
    id: `book-${Date.now()}`,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    status: 'Pending'
  };
  db.customerBookings = [newBooking, ...(db.customerBookings || [])];
  writeDB(db);
  res.json({ success: true, booking: newBooking, customerBookings: db.customerBookings });
});

app.put('/api/bookings/:id/status', (req, res) => {
  const db = readDB();
  const { id } = req.params;
  const { status } = req.body;
  db.customerBookings = (db.customerBookings || []).map(b => b.id === id ? { ...b, status } : b);
  writeDB(db);
  res.json({ success: true, message: 'Status updated successfully', customerBookings: db.customerBookings });
});

app.delete('/api/bookings/:id', (req, res) => {
  const db = readDB();
  const { id } = req.params;
  db.customerBookings = (db.customerBookings || []).filter(b => b.id !== id);
  writeDB(db);
  res.json({ success: true, message: 'Booking deleted', customerBookings: db.customerBookings });
});

// 6. Customer Announcements API Endpoints
app.get('/api/announcements', (req, res) => {
  const db = readDB();
  res.json({ success: true, announcements: db.announcements || [] });
});

app.post('/api/announcements', (req, res) => {
  const { title, message } = req.body;
  if (!title || !title.trim()) {
    return res.status(400).json({ success: false, error: 'Title required' });
  }
  const db = readDB();
  const newAnn = {
    id: `ann-${Date.now()}`,
    title: title.trim(),
    message: message || '',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  };
  db.announcements = [newAnn, ...(db.announcements || [])];
  writeDB(db);
  res.json({ success: true, announcement: newAnn, announcements: db.announcements });
});

app.delete('/api/announcements/:id', (req, res) => {
  const db = readDB();
  const { id } = req.params;
  db.announcements = (db.announcements || []).filter(a => a.id !== id);
  writeDB(db);
  res.json({ success: true, message: 'Announcement deleted', announcements: db.announcements });
});

// 7. Site Images API Endpoints
app.get('/api/site-images', (req, res) => {
  const db = readDB();
  res.json({ success: true, siteImages: db.siteImages || {} });
});

app.put('/api/site-images', (req, res) => {
  const { section, key, imageUrl } = req.body;
  if (!section || !key || !imageUrl) {
    return res.status(400).json({ success: false, error: 'Section, key and imageUrl required' });
  }
  const db = readDB();
  if (!db.siteImages) db.siteImages = {};
  if (!db.siteImages[section]) db.siteImages[section] = {};
  db.siteImages[section][key] = imageUrl;
  writeDB(db);
  res.json({ success: true, siteImages: db.siteImages });
});

// 8. Health Check API Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Online', success: true, message: 'Luxe Interiors Backend API Server Running on Port ' + PORT, timestamp: Date.now() });
});

// 9. API 404 JSON Handler for any unhandled /api/* routes
app.all('/api/*', (req, res) => {
  res.status(404).json({ success: false, error: `API endpoint ${req.originalUrl} not found` });
});

// 10. Serve static React build files for Render / Production SPA
const BUILD_DIR = path.join(__dirname, '..', 'build');
if (fs.existsSync(BUILD_DIR)) {
  app.use(express.static(BUILD_DIR));
  app.get('*', (req, res) => {
    res.sendFile(path.join(BUILD_DIR, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`🚀 Node.js Backend Server Running!`);
  console.log(`Port: ${PORT}`);
  console.log(`API URL: http://localhost:${PORT}`);
  console.log(`=================================`);
});
