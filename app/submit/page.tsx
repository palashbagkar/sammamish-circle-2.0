"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../header";
import Footer from "../footer";
import "./submit.css";
import { submitResourceAction } from "../actions";

interface FormData {
  // Resource Information
  resourceTitle: string;
  category: string;
  topic: string;
  tags: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  websiteUrl: string;
  action: string;
  resourceImage: File | null;
  
  // Your Information
  email: string;
  phoneNumber: string;
}

export default function SubmitPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [popUp, setPopUp] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    resourceTitle: "",
    category: "",
    topic: "",
    tags: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    websiteUrl: "",
    action: "Visit Website",
    resourceImage: null,
    email: "",
    phoneNumber: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, resourceImage: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {showPopUp();}
  };

  const showPopUp = () => {
    setPopUp((prev) => true);
  };

  const hidePopUp = () => {
    setPopUp((prev) => false);
  };


  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Update this function in your SubmitPage component
const handleSubmit = async () => {
  try {
    setPopUp(false);

    const data = new FormData();

    // Mapping your specific state keys to the FormData
    data.append("title", String(formData.resourceTitle)); // Fixed the "title" error
    data.append("category", String(formData.category));
    data.append("topic", String(formData.topic));
    data.append("tags", String(formData.tags));
    data.append("description", String(formData.description));
    data.append("date", String(formData.date));
    data.append("location", String(formData.location));
    data.append("email", String(formData.email));
    data.append("phone", String(formData.phoneNumber));

    if (formData.resourceImage) {
      data.append("image", formData.resourceImage);
    }

    const result = await submitResourceAction(data);

    if (result.success) {
      alert("Mission Accomplished: Resource submitted successfully!");
    }
  } catch (error) {
    console.error("Submission failed:", error);
    alert("Still hitting a wall. Check the browser console for details.");
  }
};

  const steps = [
    {
      number: 1,
      label: "Resource Information",
      icon: (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="13" cy="13" r="10" stroke="currentColor" strokeWidth="2"/>
          <path d="M13 8V13L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      number: 2,
      label: "Your Information",
      icon: (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="13" cy="9" r="4" stroke="currentColor" strokeWidth="2"/>
          <path d="M6 21C6 17.134 9.134 14 13 14C16.866 14 20 17.134 20 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      number: 3,
      label: "Preview",
      icon: (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 6C7 6 3 13 3 13C3 13 7 20 13 20C19 20 23 13 23 13C23 13 19 6 13 6Z" stroke="currentColor" strokeWidth="2"/>
          <circle cx="13" cy="13" r="3" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      number: 4,
      label: "Submit for Review",
      icon: (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 13L11 18L20 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
  ];

  // Calculate progress percentage for the line
  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="submit-page-container">
      <Header />
      
      <div className="submit-content">
      {/*}  <div className="submit-top-section">
          <h1 className="submit-page-title">Submit a Resource</h1>
        </div>
        */}
        {/* Progress Bar 
        <div className="progress-bar-container">
          <div className="progress-bar-inner">
            <div className="progress-line-wrapper">
              <div className="progress-line-bg"></div>
              <motion.div 
                className="progress-line-fill"
                initial={{ width: "0%" }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              ></motion.div>
            </div>

            <div className="progress-steps">
              {steps.map((step) => (
                <div key={step.number} className="progress-step-wrapper">
                  <motion.div
                    className={`progress-circle ${currentStep >= step.number ? "active" : ""} ${
                      currentStep === step.number ? "current" : ""
                    }`}
                    initial={false}
                    animate={{
                      scale: currentStep === step.number ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <div className="step-icon-wrapper">
                      {step.icon}
                    </div>
                  </motion.div>
                  <p className={`step-label ${currentStep >= step.number ? "active" : ""}`}>
                    {step.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        */}

        {/* Form Content */}
        <div className="form-content-wrapper">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <div className="form-step">
              <div className="step-number-container">
                    <button className="step-btn-inactive" aria-label="Previous Step">
                      <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                      </svg>
                    </button>
                    
                    <span className="step-label">Step <span className="current">1</span> of 3</span>
                    
                    <button className="step-btn" aria-label="Next Step" onClick={handleNext}>
                      <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </div>
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="step-header">
                  
                  {/*<div className="stepper-dots-container">
  <button className="nav-arrow" aria-label="Previous Step">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  </button>
  
  <div className="dots-group">
    <span className="dot active"></span>
    <span className="dot"></span>
    <span className="dot"></span>
    <span className="dot"></span>
  </div>
  
  <button className="nav-arrow" aria-label="Next Step">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  </button>
</div>*/}
                  <h2 className="step-title">Resource Information</h2>
                  <p className="step-description">
                    This information will appear when a user clicks on your resource.
                  </p>
                </div>
 
                {/* Basic Information */}
                <div className="form-section">
                  <h3 className="section-heading">Basic Information</h3>
                  
                  <div className="form-field">
                    <label className="field-label">
                      Resource Title <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="resourceTitle"
                      className="field-input"
                      placeholder="Enter the resource title"
                      value={formData.resourceTitle}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label className="field-label">
                        Category <span className="required">*</span>
                      </label>
                      <select
                        name="category"
                        className="field-select"
                        value={formData.category}
                        onChange={handleInputChange}
                      >
                        <option value="">Select a category</option>
                        <option value="Event">Event</option>
                        <option value="Volunteering">Volunteering</option>
                        <option value="Service">Service</option>
                        <option value="Organization">Organization</option>
                      </select>
                    </div>

                    <div className="form-field">
                      <label className="field-label">Topic</label>
                      <select
                        name="topic"
                        className="field-select"
                        value={formData.topic}
                        onChange={handleInputChange}
                      >
                        <option value="">Select topic</option>
                        <option value="Community">Community</option>
                        <option value="Education">Education</option>
                        <option value="Health">Health</option>
                        <option value="Environment">Environment</option>
                      </select>
                    </div>

                    <div className="form-field">
                      <label className="field-label">Tags</label>
                      <input
                        type="text"
                        name="tags"
                        className="field-input"
                        placeholder="Free, Accessible, etc."
                        value={formData.tags}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="field-label">
                      Description <span className="required">*</span>
                    </label>
                    <textarea
                      name="description"
                      className="field-textarea"
                      placeholder="Provide a detailed description of the resource..."
                      rows={5}
                      maxLength={500}
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                    <p className="char-count">{formData.description.length} / 500</p>
                  </div>
                </div>

                {/* Schedule & Location */}
                <div className="form-section">
                  <h3 className="section-heading">Schedule & Location</h3>
                  
                  <div className="form-row">
                    <div className="form-field">
                      <label className="field-label">Date</label>
                      <input
                        type="text"
                        name="date"
                        className="field-input"
                        placeholder="mm/dd/yyyy"
                        value={formData.date}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-field">
                      <label className="field-label">Start Time</label>
                      <input
                        type="text"
                        name="startTime"
                        className="field-input"
                        placeholder="9:00 am"
                        value={formData.startTime}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-field">
                      <label className="field-label">End Time</label>
                      <input
                        type="text"
                        name="endTime"
                        className="field-input"
                        placeholder="5:00 pm"
                        value={formData.endTime}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="field-label">Location</label>
                    <input
                      type="text"
                      name="location"
                      className="field-input"
                      placeholder="Enter address or venue name"
                      value={formData.location}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-field form-field-wide">
                      <label className="field-label">Website URL</label>
                      <input
                        type="url"
                        name="websiteUrl"
                        className="field-input"
                        placeholder="https://example.com"
                        value={formData.websiteUrl}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-field">
                      <label className="field-label">Action</label>
                      <select
                        name="action"
                        className="field-select"
                        value={formData.action}
                        onChange={handleInputChange}
                      >
                        <option value="Visit Website">Visit Website</option>
                        <option value="Register">Register</option>
                        <option value="Learn More">Learn More</option>
                        <option value="Sign Up">Sign Up</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Media */}
                <div className="form-section">
                  <h3 className="section-heading">Media</h3>
                  
                  <div className="form-field">
                    <label className="field-label">Resource Image</label>
                    <div className="image-upload-container">
                      <input
                        type="file"
                        id="image-upload"
                        className="image-input"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                      <label htmlFor="image-upload" className="image-upload-label">
                        {imagePreview ? (
                          <img src={imagePreview} alt="Preview" className="image-preview" />
                        ) : (
                          <>
                            <svg className="upload-icon" width="48" height="48" viewBox="0 0 48 48" fill="none">
                              <circle cx="24" cy="24" r="20" fill="#608D8D" opacity="0.2"/>
                              <path d="M24 16V32M16 24H32" stroke="#608D8D" strokeWidth="3" strokeLinecap="round"/>
                            </svg>
                            <p className="upload-text">
                              Drag and drop an image here, or{" "}
                              <span className="browse-text">browse</span>
                            </p>
                          </>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="form-step">
              <div className="step-number-container">
                    <button className="step-btn" aria-label="Previous Step" onClick={handleBack}>
                      <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                      </svg>
                    </button>
                    
                    <span className="step-label">Step <span className="current">2</span> of 3</span>
                    
                    <button className="step-btn" aria-label="Next Step" onClick={handleNext}>
                      <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </div>
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="step-header">
                
                  <h2 className="step-title">Your Information</h2>
                  <p className="step-description">
                    We will display this info and use it to contact you if changes are needed.
                  </p>
                </div>

                <div className="form-section form-section-centered">
                  <div className="form-field">
                    <label className="field-label">
                      Email Address <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="field-input"
                      placeholder="example@gmail.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">
                      Phone Number <span className="required">*</span>
                    </label>
                    <select
                      name="phoneNumber"
                      className="field-select"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                    >
                      <option value="">Select a category</option>
                      <option value="+1">+1 (US)</option>
                      <option value="+44">+44 (UK)</option>
                      <option value="+91">+91 (India)</option>
                    </select>
                  </div>
                </div>
              </motion.div>
              </div>
            )}

            {currentStep >= 3 && (
              <div className="form-step">
              <div className="step-number-container">
                    <button className="step-btn" aria-label="Previous Step" onClick={handleBack}>
                      <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                      </svg>
                    </button>
                    
                    <span className="step-label">Step <span className="current">3</span> of 3</span>
                    
                    <button className="step-btn" aria-label="Next Step" onClick={showPopUp}>
                      <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </div>
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="step-header">
                
                  <h2 className="step-title">Preview</h2>
                  <p className="step-description">
                    Review details and make sure everything looks correct before submitting.
                  </p>
                </div>

                <div className="preview-container">
                  <div className="preview-left">
                    <h3 className="preview-resource-title">
                      {formData.resourceTitle || "Coffee With Council"}
                    </h3>
                    <div className="preview-meta">
                      <span className="preview-date">
                        📅 {formData.date || "Wednesday, Dec 20, 2025"}
                      </span>
                      <span className="preview-time">
                        🕐 {formData.startTime || "3:00 PM"} - {formData.endTime || "5:00 PM"}
                      </span>
                    </div>
                    
                    {imagePreview ? (
                      <img src={imagePreview} alt="Resource" className="preview-image" />
                    ) : (
                      <div className="preview-image-placeholder">
                        <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop" alt="Coffee" className="preview-image" />
                      </div>
                    )}

                    <div className="preview-description-section">
                      <h4 className="preview-section-title">Description</h4>
                      <p className="preview-description">
                        {formData.description ||
                          "Join your Sammamish City Council members for an engaging, informal discussion over a cup of coffee. Held monthly, typically on the first Saturday, this is your opportunity to connect directly with your council in a relaxed setting. Whether you want to share your thoughts, ask questions about current city projects, voice concerns regarding neighborhood issues, or simply learn more about decisions impacting our community. We look forward to hearing your perspectives!"}
                      </p>
                    </div>
                  </div>

                  <div className="preview-right">
                    <button className="visit-website-btn">
                      {formData.action || "Visit Website"}
                    </button>

                    <div className="organizer-info">
                      <h4 className="preview-section-title">Organizer Contact Info</h4>
                      <p className="organizer-email">
                        📧 {formData.email || "events@sammamishcircle.org"}
                      </p>
                      <p className="organizer-phone">
                        📞 {formData.phoneNumber || "(425) 123-4567"}
                      </p>
                    </div>

                    <div className="tags-section">
                      <h4 className="preview-section-title">Tags</h4>
                      <div className="tags-list">
                        {formData.tags ? (
                          formData.tags.split(",").map((tag, index) => (
                            <span key={index} className="tag-badge">
                              {tag.trim()}
                            </span>
                          ))
                        ) : (
                          <>
                            <span className="tag-badge">♿ Wheelchair Accessible</span>
                            <span className="tag-badge">🎟️ Free Entry</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="location-section">
                      <h4 className="preview-section-title">Location</h4>
                      <p className="location-text">
                        {formData.location || "Sammamish Commons"}
                      </p>
                      <div className="location-map">
                        <div className="map-placeholder">
                          📍 Map View
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                
              </motion.div>
              </div>
            )}
            </AnimatePresence>
            <AnimatePresence mode="wait">
            {popUp && (
                  <motion.div
                    key="popup"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="modal-overlay"
                    id="submit-modal"
                  >
                      <motion.div initial={{y: 50}} animate={{y:0}} exit={{y:50}} className="modal-card">
                        <div className="modal-content">
                          <h2>Ready to submit?</h2>
                          <p>Please ensure all your event details are correct. You won't be able to edit this until it has been reviewed by our team.</p>
                          
                          <div className="modal-actions">
                            <button className="btn-primary" onClick={handleSubmit}>Yes, Submit Resource</button>
                            <button className="btn-secondary" onClick={hidePopUp}>Go Back</button>
                          </div>
                        </div>
                    </motion.div>
                  </motion.div>
                )}
            
              

            {/*{currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="form-step final-step"
              >
                <div className="step-header">
                <div className="step-number-container">
                    <button className="step-btn" aria-label="Previous Step" onClick={handleBack}>
                      <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                      </svg>
                    </button>
                    
                    <span className="step-label">Step <span className="current">4</span> of 3</span>
                    
                    <button className="step-btn" aria-label="Next Step">
                      <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </div>
                  <h2 className="step-title">Ready to Submit?</h2>
                  <p className="step-description">
                    We'll approve your submission within 2-3 days. If any changes are needed, we will
                    contact you.
                  </p>
                </div>

                <button className="submit-final-button" onClick={handleSubmit}>
                  Submit
                </button>
              </motion.div>
            )}*/}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="form-navigation">
            {currentStep > 1 && currentStep < 4 && (
              <button className="nav-button back-button" onClick={handleBack}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back
              </button>
            )}
            {currentStep < 3 && (
              <button className="nav-button next-button" onClick={handleNext}>
                Next
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}

            {currentStep === 3 && (
              <button className="nav-button next-button" onClick={handleNext}>
                Submit
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <path d="M20 6L9 17L4 12" />
</svg>
              </button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
