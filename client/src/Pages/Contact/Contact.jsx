import { useState,useEffect } from "react";
import { Mail, Phone, MapPin, Clock, CheckCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { sendContactMessage, resetContactState } from "../../redux/contactSlice.js";
import "./Contact.css";
import { toast } from "react-toastify";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.contact);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendContactMessage(formData))
    .unwrap()
    .then(() => {
      toast.success("Successfully message send", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    })
    .catch((err) => {
        toast.error(err.message || "Failed to send message");
    });
  };

  const faqItems = [
    {
      question: "How accurate is the career assessment quiz?",
      answer: "Our quiz is designed by career counselors and uses scientifically-backed assessment methods. While it provides valuable insights, it should be used alongside other career exploration methods."
    },
    {
      question: "Can I retake the career quiz?",
      answer: "Yes, you can retake the quiz as many times as you want. Your interests and preferences may change over time, so we encourage periodic reassessment."
    },
    {
      question: "Do you provide one-on-one counseling?",
      answer: "Yes, we offer personalized career counseling sessions with certified career advisors. Contact us to schedule a consultation."
    },
    {
      question: "Are the resources free to access?",
      answer: "Most of our basic resources, including the career quiz and exploration tools, are completely free. Premium resources may require registration."
    },
    {
      question: "How often is the career information updated?",
      answer: "We regularly update our career database to reflect current market trends, salary information, and educational requirements."
    },
    {
      question: "Can parents access guidance for their children?",
      answer: "Yes, we provide resources and guidance specifically designed for parents to help support their children's career decisions."
    }
  ];

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(resetContactState());
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: ""
        });
      }, 3000); // 3 seconds

      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  if (success) {
    return (
      <div className="success-screen">
        <div className="success-card">
          <div className="success-content">
            <div className="success-icon">
              <CheckCircle className="success-icon-svg" />
            </div>
            <h3 className="success-title">Thank You!</h3>
            <p className="success-description">
              Your message has been sent successfully. We'll get back to you within 24 hours.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-section">
      <div className="contact-container">
        {/* Header */}
        <div className="contact-header">
          <h1 className="contact-title">
            Get In Touch
          </h1>
          <p className="contact-description">
            Have questions about your career path? Need personalized guidance? 
            We're here to help you make informed decisions about your future.
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact Form */}
          <div className="form-card">
            <div className="form-header">
              <h2 className="form-title">Send us a Message</h2>
              <p className="form-description">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>
            <div className="form-content">
              <form onSubmit={handleSubmit} className="form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="What's this about?"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="form-textarea"
                    placeholder="Tell us how we can help you..."
                    required
                  />
                </div>

                <button type="submit" disabled={loading} className="submit-button">
                  {loading && <div className="loading-spinner"></div>}
                  {loading ? "Sending..." : "Send Message"}
              </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="contact-info-section1">
            <div className="contact-info-card">
              <div className="contact-info-header">
                <h3 className="contact-info-title">Contact Information</h3>
                <p className="contact-info-description">
                  Reach out to us through any of these channels. We're here to help!
                </p>
              </div>
              <div className="contact-info-content">
                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <Mail className="contact-info-icon-svg" />
                  </div>
                  <div className="contact-info-details">
                    <div className="contact-info-label1">Email Us</div>
                    <div className="contact-info-value1">support@careercompass.com</div>
                    <div className="contact-info-subtitle">We'll respond within 24 hours</div>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <Phone className="contact-info-icon-svg" />
                  </div>
                  <div className="contact-info-details">
                    <div className="contact-info-label1">Call Us</div>
                    <div className="contact-info-value1">+91 98765 43210</div>
                    <div className="contact-info-subtitle">Mon-Fri: 9:00 AM - 6:00 PM </div>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <MapPin className="contact-info-icon-svg" />
                  </div>
                  <div className="contact-info-details">
                    <div className="contact-info-label1">Visit Us</div>
                    <div className="contact-info-value1">Pune, Maharashtra</div>
                    <div className="contact-info-subtitle">By appointment only</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-header">
                <h3 className="contact-info-title">Why Contact Us?</h3>
                <p className="contact-info-description">
                  Here's how our career guidance can help you succeed.
                </p>
              </div>
              <div className="contact-info-content">
                <div className="why-contact-list">
                  <div className="why-contact-item">
                    <div className="why-contact-dot"></div>
                    <span>Personalized career advice based on your interests</span>
                  </div>
                  <div className="why-contact-item">
                    <div className="why-contact-dot"></div>
                    <span>Guidance on choosing the right stream and subjects</span>
                  </div>
                  <div className="why-contact-item">
                    <div className="why-contact-dot"></div>
                    <span>Information about entrance exams and preparation</span>
                  </div>
                  <div className="why-contact-item">
                    <div className="why-contact-dot"></div>
                    <span>College and course selection assistance</span>
                  </div>
                  <div className="why-contact-item">
                    <div className="why-contact-dot"></div>
                    <span>Scholarship and financial aid information</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-card">
          <div className="faq-header">
            <h2 className="faq-title">Frequently Asked Questions</h2>
            <p className="faq-description">
              Find quick answers to common questions about our career guidance services.
            </p>
          </div>
          <div className="faq-content">
            <div className="faq-grid">
              {faqItems.map((item, index) => (
                <div key={index} className="faq-item">
                  <h4 className="faq-question">{item.question}</h4>
                  <p className="faq-answer">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}