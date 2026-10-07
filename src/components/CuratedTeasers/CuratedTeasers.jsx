import React from 'react';
import { useProjects } from '../../context/ProjectContext';
import { ArrowRight, Eye, Camera } from 'lucide-react';
import teasersBg from '../../assets/images/teasers-bg.jpg';
import './CuratedTeasers.css';

const CuratedTeasers = ({ onSelectProject }) => {
  const { siteImages, updateSiteImage, isAdminLoggedIn } = useProjects();

  const teasers = [
    {
      id: 'country-estate',
      title: 'Country Estate',
      category: 'MODULAR KITCHENS & LIVING',
      desc: 'Modern minimalism, dark fluted wood, warm indirect lighting, and custom marble island.',
      specs: '5,200 Sq. Ft. | Estate Living'
    },
    {
      id: 'urban-apartment',
      title: 'Urban Apartment',
      category: 'COMPACT LUXURY & SUITES',
      desc: 'Contemporary compact luxury, textured marble, custom concealed cabinetry, and warm acoustic paneling.',
      specs: '2,800 Sq. Ft. | Metro Penthouse'
    },
    {
      id: 'creative-studio',
      title: 'Creative Studio',
      category: 'COMMERCIAL & OFFICE',
      desc: 'Executive acoustic wood panels, ergonomic statement desks, indirect warm LED trough systems.',
      specs: '3,400 Sq. Ft. | Executive Office'
    },
    {
      id: 'the-penthouse',
      title: 'The Penthouse',
      category: 'MASTER SUITES & PANORAMIC',
      desc: 'Panoramic architectural ceiling work, ambient backlit display units, and master Italian marble suites.',
      specs: '6,100 Sq. Ft. | Sky Mansion'
    }
  ];

  const handleImageFileChange = (teaserId, e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        updateSiteImage('teasers', teaserId, uploadEvent.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="teasers-section" style={{ backgroundImage: `url(${teasersBg})` }}>
      <div className="teasers-container">
        {/* Section Header */}
        <div className="teasers-header-row">
          <div>
            <span className="section-subtitle">FLAGSHIP PORTFOLIO</span>
            <h2 className="section-title">CURATED TEASERS</h2>
          </div>
          <a href="/collections" className="gold-btn">
            <span>VIEW ALL COLLECTIONS</span>
            <ArrowRight size={16} />
          </a>
        </div>

        {/* 4 Card Grid */}
        <div className="teasers-grid">
          {teasers.map((item) => {
            const imgUrl = (siteImages?.teasers && siteImages.teasers[item.id]) 
              || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';

            return (
              <div 
                key={item.id} 
                className="teaser-card"
                onClick={() => onSelectProject && onSelectProject(item.id)}
              >
                <div className="teaser-image-box" style={{ position: 'relative' }}>
                  <img src={imgUrl} alt={item.title} className="teaser-img" />
                  <div className="teaser-overlay">
                    <button className="gold-btn-solid teaser-view-btn">
                      <Eye size={16} />
                      <span>EXPLORE CASE STUDY</span>
                    </button>
                  </div>
                  <div className="teaser-category-badge">{item.category}</div>

                  {/* Admin Image Change Button */}
                  {isAdminLoggedIn && (
                    <label 
                      className="admin-edit-img-overlay"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Camera size={14} />
                      <span>CHANGE IMAGE</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleImageFileChange(item.id, e)} 
                        hidden 
                      />
                    </label>
                  )}
                </div>

                <div className="teaser-content">
                  <div className="teaser-specs">{item.specs}</div>
                  <h3 className="teaser-title">{item.title}</h3>
                  <p className="teaser-desc">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CuratedTeasers;
