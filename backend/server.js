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
app.use('/uploads', express.static(UPLOADS_DIR));

// Admin Password Constant
const ADMIN_PASSWORD = '#karthick#01';

// Helper functions for reading & writing database
const readDB = () => {
  try {
    if (!fs.existsSync(DB_PATH)) {
      return {};
    }
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading db.json:', err);
    return {};
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

  db.projects = [projectItem, ...(db.projects || [])];
  writeDB(db);
  res.json({ success: true, project: projectItem });
});

app.delete('/api/projects/:id', (req, res) => {
  const db = readDB();
  const { id } = req.params;
  db.projects = (db.projects || []).filter(p => p.id !== id);
  writeDB(db);
  res.json({ success: true, message: 'Project deleted successfully' });
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

app.delete('/api/categories/:name', (req, res) => {
  const db = readDB();
  const name = decodeURIComponent(req.params.name);
  if (name === 'All Projects') {
    return res.status(400).json({ success: false, error: 'Cannot delete All Projects category' });
  }
  db.categories = (db.categories || []).filter(c => c !== name);
  writeDB(db);
  res.json({ success: true, categories: db.categories });
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
  res.json({ success: true, booking: newBooking });
});

app.put('/api/bookings/:id/status', (req, res) => {
  const db = readDB();
  const { id } = req.params;
  const { status } = req.body;
  db.customerBookings = (db.customerBookings || []).map(b => b.id === id ? { ...b, status } : b);
  writeDB(db);
  res.json({ success: true, message: 'Status updated successfully' });
});

app.delete('/api/bookings/:id', (req, res) => {
  const db = readDB();
  const { id } = req.params;
  db.customerBookings = (db.customerBookings || []).filter(b => b.id !== id);
  writeDB(db);
  res.json({ success: true, message: 'Booking deleted' });
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
  res.json({ success: true, announcement: newAnn });
});

app.delete('/api/announcements/:id', (req, res) => {
  const db = readDB();
  const { id } = req.params;
  db.announcements = (db.announcements || []).filter(a => a.id !== id);
  writeDB(db);
  res.json({ success: true, message: 'Announcement deleted' });
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

// Root Health Check Route
app.get('/', (req, res) => {
  res.json({ status: 'Online', message: 'Luxe Interiors Backend API Server Running on Port ' + PORT });
});

app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`🚀 Node.js Backend Server Running!`);
  console.log(`Port: ${PORT}`);
  console.log(`API URL: http://localhost:${PORT}`);
  console.log(`=================================`);
});
