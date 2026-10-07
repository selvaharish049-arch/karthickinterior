import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { Mail, Phone, MapPin, Upload, CheckCircle2, ChevronDown, ChevronUp, Sparkles, Send, MessageSquare } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const { addBooking } = useProjects();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [openFaq, setOpenFaq] = useState(0);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    projectType: 'New Home / Villa Interior',
    area: '',
    budget: '₹25 Lakhs - ₹50 Lakhs',
    notes: '',
    fileName: ''
  });

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

    // 1. Save to Admin Database Context & LocalStorage
    addBooking(formData);

    // 2. Format WhatsApp message to Admin's number: 6379183549
    const adminPhone = '916379183549';
    const messageText = 
      `🏛️ *NEW LUXE INTERIOR PROJECT CONSULTATION REQUEST*\n\n` +
      `👤 *Client Name:* ${formData.fullName}\n` +
      `📞 *Phone / WhatsApp:* ${formData.phone}\n` +
      `✉️ *Email:* ${formData.email}\n` +
      `🛋️ *Project Type:* ${formData.projectType}\n` +
      `📐 *Floor Area:* ${formData.area || 'Not specified'}\n` +
      `💰 *Budget Range:* ${formData.budget}\n` +
      `📄 *Attached Blueprint:* ${formData.fileName || 'None'}\n` +
      `📝 *Notes:* ${formData.notes || 'No extra notes'}\n\n` +
      `_Sent from LUXE INTERIOR Contact Page_`;

    const encodedMsg = encodeURIComponent(messageText);
    const waLink = `https://wa.me/${adminPhone}?text=${encodedMsg}`;

    setWhatsappUrl(waLink);
    setFormSubmitted(true);

    // Automatically open WhatsApp tab
    window.open(waLink, '_blank');
  };

  const workflowSteps = [
    { num: '01', title: 'Consultation', desc: 'Initial spatial requirements discovery & 2D layout planning.' },
    { num: '02', title: '3D Design Approval', desc: 'Photorealistic CGI renders, lighting setup & material palette consensus.' },
    { num: '03', title: 'Factory Fabrication', desc: 'In-house automated CNC modular woodwork, joinery & quality check.' },
    { num: '04', title: 'Site Installation', desc: 'White-glove civil assembly, electrical fitting & final turnkey handover.' }
  ];

  const faqs = [
    {
      q: 'How long does a full luxury turnkey project typically take?',
      a: 'Depending on the total square footage, a standard 3,500 sq. ft. luxury residence takes approximately 60 to 90 calendar days from initial 3D approval to final handover.'
    },
    {
      q: 'Do you provide customized 3D renders before ground execution?',
      a: 'Yes, 100%. We craft 4K photorealistic CGI renders including exact daylight/nighttime lighting simulations, natural textures, and material swatches.'
    },
    {
      q: 'What hardware and core materials are utilized in your modular joinery?',
      a: 'We use moisture-resistant HDHMR boards (Greenpanel) with soft-close German hardware mechanisms from Blum, Hettich, and Hafele as standard.'
    },
    {
      q: 'Can I upload CAD architectural floor plans for an instant estimate?',
      a: 'Absolutely. You can attach your floor plan (CAD, PDF, or JPG) in the consultation form below, and our principal architect will prepare a preliminary estimate.'
    }
  ];

  return (
    <div className="contact-page">
      {/* Hero Header */}
      <section className="contact-hero">
        <div className="contact-container">
          <span className="section-subtitle">INITIATE CONSULTATION</span>
          <h1 className="contact-title">CONNECT WITH OUR PRINCIPAL STUDIO</h1>
          <p className="contact-subtitle">
            Schedule a private architectural consultation or inquire about turnkey project execution for your residential or commercial space.
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Studio Reach */}
      <section className="contact-main-section">
        <div className="contact-container">
          <div className="contact-grid">
            {/* Column 1: Consultation Form */}
            <div className="contact-form-column">
              <div className="form-card">
                <div className="form-card-header">
                  <Sparkles size={16} className="gold-icon" />
                  <h2>INQUIRY CONSULTATION FORM</h2>
                </div>

                {formSubmitted ? (
                  <div className="form-success-box">
                    <CheckCircle2 size={50} className="gold-text-icon" />
                    <h3>Consultation Request Submitted</h3>
                    <p>
                      Thank you, <strong style={{ color: '#d4af37' }}>{formData.fullName}</strong>. Your consultation details have been sent to Admin WhatsApp (<strong>6379183549</strong>) and saved in the Admin Database.
                    </p>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px' }}>
                      <a href={whatsappUrl} target="_blank" rel="noreferrer" className="gold-btn-solid">
                        <MessageSquare size={16} />
                        <span>OPEN ADMIN WHATSAPP CHAT</span>
                      </a>
                      <button className="gold-btn" onClick={() => setFormSubmitted(false)}>
                        SUBMIT ANOTHER INQUIRY
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-row-2">
                      <div className="field-group">
                        <label>FULL NAME *</label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          placeholder="e.g. Julian Vance"
                          value={formData.fullName}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="field-group">
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

                    <div className="form-row-2">
                      <div className="field-group">
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

                      <div className="field-group">
                        <label>PROJECT TYPE *</label>
                        <select name="projectType" value={formData.projectType} onChange={handleChange}>
                          <option value="New Home / Villa Interior">New Home / Villa Interior</option>
                          <option value="Complete Penthouse Renovation">Complete Penthouse Renovation</option>
                          <option value="Modular Kitchen & Living">Modular Kitchen & Living</option>
                          <option value="Executive Commercial / Office">Executive Commercial / Office</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-row-2">
                      <div className="field-group">
                        <label>FLOOR AREA (SQ. FT.)</label>
                        <input
                          type="text"
                          name="area"
                          placeholder="e.g. 4,500 Sq. Ft."
                          value={formData.area}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="field-group">
                        <label>BUDGET (₹ RUPEES)</label>
                        <input
                          type="text"
                          name="budget"
                          placeholder="e.g. ₹25 Lakhs or ₹50 Lakhs"
                          value={formData.budget}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="field-group">
                      <label>OPTIONAL FLOOR PLAN UPLOAD</label>
                      <label className="contact-file-box">
                        <Upload size={18} className="gold-icon" />
                        <span>{formData.fileName ? formData.fileName : 'Upload CAD, PDF or Image Blueprint'}</span>
                        <input type="file" onChange={handleFileChange} accept=".pdf,.png,.jpg,.jpeg,.dwg" hidden />
                      </label>
                    </div>

                    <div className="field-group">
                      <label>PROJECT DETAILS & NOTES</label>
                      <textarea
                        name="notes"
                        rows="4"
                        placeholder="Tell us about your timeline preferences, material inspirations, or design aesthetic..."
                        value={formData.notes}
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    <button type="submit" className="gold-btn-solid form-submit-btn">
                      <Send size={16} />
                      <span>SUBMIT & SEND TO ADMIN WHATSAPP (6379183549)</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Column 2: Direct Studio Reach & Map */}
            <div className="contact-info-column">
              <div className="info-card">
                <h3 className="info-card-title">DIRECT STUDIO REACH</h3>
                <div className="gold-line-left"></div>

                <div className="info-reach-list">
                  <div className="reach-item">
                    <div className="reach-icon">
                      <Phone size={20} className="gold-icon" />
                    </div>
                    <div>
                      <span className="reach-lbl">Phone & WhatsApp Consultation</span>
                      <a href="https://wa.me/916379183549" target="_blank" rel="noreferrer" className="reach-val">
                        +91 6379183549 (WhatsApp / Call)
                      </a>
                    </div>
                  </div>

                  <div className="reach-item">
                    <div className="reach-icon">
                      <Mail size={20} className="gold-icon" />
                    </div>
                    <div>
                      <span className="reach-lbl">Project Inquiries Email</span>
                      <a href="mailto:selvaharish049@gmail.com" className="reach-val">
                        selvaharish049@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="reach-item">
                    <div className="reach-icon">
                      <MapPin size={20} className="gold-icon" />
                    </div>
                    <div>
                      <span className="reach-lbl">Design Studio & Workshop</span>
                      <p className="reach-val-text">3c/195A vallinayaga puram 5th street tuticorin</p>
                    </div>
                  </div>
                </div>

                {/* Embedded Dark Map Frame */}
                <div className="dark-map-container">
                  <iframe 
                    title="Luxe Interior Studio Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537363153167!3d-37.81627977975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sus!4v1614134957448!5m2!1sen!2sus"
                    width="100%" 
                    height="240" 
                    style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }} 
                    allowFullScreen="" 
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Timeline Section */}
      <section className="workflow-section">
        <div className="contact-container">
          <div className="section-header text-center">
            <span className="section-subtitle">PROJECT ROADMAP</span>
            <h2 className="section-title">WORKFLOW TIMELINE</h2>
            <div className="gold-line"></div>
          </div>

          <div className="workflow-grid">
            {workflowSteps.map((step) => (
              <div key={step.num} className="workflow-card">
                <div className="workflow-num">{step.num}</div>
                <h3 className="workflow-step-title">{step.title}</h3>
                <p className="workflow-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="faq-section">
        <div className="contact-container">
          <div className="section-header text-center">
            <span className="section-subtitle">FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="section-title">CLIENT INQUIRIES & FAQS</h2>
            <div className="gold-line"></div>
          </div>

          <div className="faq-accordion-box">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${openFaq === index ? 'open' : ''}`}
                onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
              >
                <div className="faq-question-row">
                  <h3 className="faq-question">{faq.q}</h3>
                  {openFaq === index ? <ChevronUp size={20} className="gold-icon" /> : <ChevronDown size={20} className="gold-icon" />}
                </div>
                {openFaq === index && (
                  <div className="faq-answer-row">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
