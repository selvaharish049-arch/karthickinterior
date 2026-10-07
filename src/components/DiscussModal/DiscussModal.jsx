import React, { useState, useEffect } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { X, CheckCircle2, Upload, Sparkles, MessageSquare, Package } from 'lucide-react';
import './DiscussModal.css';

const DiscussModal = ({ isOpen, onClose, selectedProduct }) => {
  const { addBooking } = useProjects();
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    projectType: 'New Luxury Villa / Home',
    selectedProduct: selectedProduct || '',
    area: '',
    budget: '',
    notes: '',
    fileName: ''
  });

  useEffect(() => {
    if (selectedProduct) {
      setFormData(prev => ({ ...prev, selectedProduct: selectedProduct }));
    }
  }, [selectedProduct]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, fileName: e.target.files[0].name });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalProduct = formData.selectedProduct || selectedProduct || 'General Project Consultation';

    const bookingPayload = {
      ...formData,
      selectedProduct: finalProduct
    };

    // 1. Save booking to Admin Database in Context & LocalStorage
    addBooking(bookingPayload);

    // 2. Format WhatsApp Message for Admin Number: 6379183549
    const adminPhone = '916379183549';
    const messageText = 
      `🏛️ *NEW LUXE INTERIOR PROJECT CONSULTATION REQUEST*\n\n` +
      `👤 *Client Name:* ${formData.fullName}\n` +
      `📞 *Phone / WhatsApp:* ${formData.phone}\n` +
      `✉️ *Email:* ${formData.email}\n` +
      `🛋️ *Selected Product:* ${finalProduct}\n` +
      `🛋️ *Project Category:* ${formData.projectType}\n` +
      `📐 *Floor Area:* ${formData.area || 'Not specified'}\n` +
      `💰 *Budget (₹):* ${formData.budget || 'Not specified'}\n` +
      `📄 *Attached File:* ${formData.fileName || 'None'}\n` +
      `📝 *Notes/Vision:* ${formData.notes || 'No extra notes'}\n\n` +
      `_Sent from LUXE INTERIOR Website Consultation Form_`;

    const encodedMsg = encodeURIComponent(messageText);
    const waLink = `https://wa.me/${adminPhone}?text=${encodedMsg}`;
    
    setWhatsappUrl(waLink);
    setSubmitted(true);

    // Automatically open WhatsApp in new tab
    window.open(waLink, '_blank');
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={resetAndClose}>
      <div className="modal-content-wrapper" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={resetAndClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {submitted ? (
          <div className="modal-success-state">
            <div className="success-icon-wrapper">
              <CheckCircle2 size={56} className="gold-text-icon" />
            </div>
            <h3 className="success-title">Consultation Sent to Admin WhatsApp & Database</h3>
            <p className="success-desc">
              Thank you, <strong style={{ color: '#d4af37' }}>{formData.fullName || 'Valued Client'}</strong>. Your consultation details have been sent directly to the Admin WhatsApp (<strong>6379183549</strong>) and logged into the Admin Database.
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px' }}>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="gold-btn-solid">
                <MessageSquare size={16} />
                <span>OPEN ADMIN WHATSAPP CHAT</span>
              </a>
              <button className="gold-btn" onClick={resetAndClose}>
                RETURN TO LUXE INTERIOR
              </button>
            </div>
          </div>
        ) : (
          <div className="modal-form-container">
            <div className="modal-header">
              <div className="modal-badge">
                <Sparkles size={14} />
                <span>PRIVATE CONSULTATION</span>
              </div>
              <h2 className="modal-title">DISCUSS YOUR PROJECT</h2>
              <p className="modal-subtitle">
                Fill in your architectural requirements for a tailored concept blueprint & project budget breakdown.
              </p>

              {(selectedProduct || formData.selectedProduct) && (
                <div style={{ marginTop: '14px', background: 'rgba(212, 175, 55, 0.12)', border: '1px solid var(--border-gold)', padding: '10px 16px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Package size={18} color="#d4af37" />
                  <span style={{ fontSize: '0.85rem', color: '#ffffff', fontFamily: 'var(--font-sans)', letterSpacing: '1px' }}>
                    INQUIRING FOR PRODUCT: <strong style={{ color: 'var(--gold-light)' }}>{selectedProduct || formData.selectedProduct}</strong>
                  </span>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-grid-2">
                <div className="form-group">
                  <label>FULL NAME *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="e.g. Alexander Vance"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>PHONE / WHATSAPP *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 6379183549"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="selvaharish049@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>PROJECT CATEGORY *</label>
                  <select name="projectType" value={formData.projectType} onChange={handleChange}>
                    <option value="New Luxury Villa / Home">New Luxury Villa / Home</option>
                    <option value="Complete Penthouse Renovation">Complete Penthouse Renovation</option>
                    <option value="Bespoke Modular Kitchen & Suites">Bespoke Modular Kitchen & Suites</option>
                    <option value="Executive Commercial Studio / Office">Executive Commercial Studio / Office</option>
                  </select>
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>APPROX. FLOOR AREA (SQ. FT.)</label>
                  <input
                    type="text"
                    name="area"
                    placeholder="e.g. 3,500 Sq. Ft."
                    value={formData.area}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>BUDGET IN ₹ (RUPEES) *</label>
                  <input
                    type="text"
                    name="budget"
                    placeholder="Type your budget in ₹ (e.g. ₹15 Lakhs)"
                    value={formData.budget}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>OPTIONAL FLOOR PLAN / DESIGN REFERENCES</label>
                <label className="file-upload-box">
                  <Upload size={20} className="gold-icon" />
                  <span>{formData.fileName ? formData.fileName : 'Click or Drag & Drop Architectural CAD / PDF Plan'}</span>
                  <input type="file" onChange={handleFileChange} accept=".pdf,.png,.jpg,.jpeg,.dwg" hidden />
                </label>
              </div>

              <div className="form-group">
                <label>PROJECT SPECIFICATIONS & NOTES</label>
                <textarea
                  name="notes"
                  rows="3"
                  placeholder="Share details on your timeline, material choices, or specific design aesthetic preferences..."
                  value={formData.notes}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="gold-btn-solid modal-submit-btn">
                SUBMIT & SEND TO ADMIN WHATSAPP (6379183549)
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscussModal;
