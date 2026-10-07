import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProjectProvider, useProjects } from './context/ProjectContext';

import Background from './components/Background/Background';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import DiscussModal from './components/DiscussModal/DiscussModal';
import CaseStudyDrawer from './components/CaseStudyDrawer/CaseStudyDrawer';

// Pages
import Home from './pages/Home/Home';
import Collections from './pages/Collections/Collections';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import Contact from './pages/Contact/Contact';
import Admin from './pages/Admin/Admin';

import './App.css';

const MainAppContent = () => {
  const { projects } = useProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeProject, setActiveProject] = useState(null);

  const handleOpenModal = (productName = null) => {
    if (typeof productName === 'string') {
      setSelectedProduct(productName);
    } else {
      setSelectedProduct(null);
    }
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleSelectProject = (projectId) => {
    const found = projects.find(p => p.id === projectId);
    if (found) {
      setActiveProject(found);
    } else if (projects.length > 0) {
      setActiveProject(projects[0]);
    }
  };

  const handleCloseDrawer = () => setActiveProject(null);

  return (
    <div className="app-container">
      {/* Dynamic Classic Luxury Interior Background */}
      <Background />

      {/* Navigation Bar */}
      <Navbar onOpenModal={handleOpenModal} />

      {/* Main Routes */}
      <main className="main-content">
        <Routes>
          <Route 
            path="/" 
            element={<Home onOpenModal={handleOpenModal} onSelectProject={handleSelectProject} />} 
          />
          <Route 
            path="/collections" 
            element={<Collections onSelectProject={handleSelectProject} />} 
          />
          <Route 
            path="/about" 
            element={<About onOpenModal={handleOpenModal} />} 
          />
          <Route 
            path="/services" 
            element={<Services onOpenModal={handleOpenModal} />} 
          />
          <Route 
            path="/contact" 
            element={<Contact />} 
          />
          <Route 
            path="/admin" 
            element={<Admin />} 
          />
        </Routes>
      </main>

      {/* Footer */}
      <Footer onOpenModal={handleOpenModal} />

      {/* Quick Inquiry Consultation Modal */}
      <DiscussModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        selectedProduct={selectedProduct} 
      />

      {/* Project Case Study Drawer */}
      <CaseStudyDrawer 
        project={activeProject} 
        onClose={handleCloseDrawer} 
        onOpenModal={handleOpenModal} 
      />
    </div>
  );
};

function App() {
  return (
    <ProjectProvider>
      <Router>
        <MainAppContent />
      </Router>
    </ProjectProvider>
  );
}

export default App;
