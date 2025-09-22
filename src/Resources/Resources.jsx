import { useState } from "react";
import { FileText, Download, Play, ExternalLink, Calendar, Clock, Target, BookOpen, Users, Lightbulb } from "lucide-react";
import "./Resources.css";

export default function Resources() {
  const [activeTab, setActiveTab] = useState("materials");

  const studyMaterials = [
    {
      id: 1,
      title: "Class 10 Science Stream Guide",
      type: "PDF",
      description: "Complete guide covering Physics, Chemistry, Biology fundamentals and career paths in science.",
      pages: 45,
      category: "Class 10"
    },
    {
      id: 2,
      title: "Engineering Entrance Exam Preparation",
      type: "PDF",
      description: "Comprehensive preparation material for JEE Main, JEE Advanced, and other engineering entrance exams.",
      pages: 128,
      category: "Engineering"
    },
    {
      id: 3,
      title: "Medical Career Pathways",
      type: "PDF", 
      description: "Detailed information about NEET preparation, medical specializations, and career opportunities.",
      pages: 67,
      category: "Medical"
    },
    {
      id: 4,
      title: "Commerce Stream Opportunities",
      type: "PDF",
      description: "Guide to CA, CS, finance careers, and business opportunities for commerce students.",
      pages: 52,
      category: "Commerce"
    }
  ];

  const expertVideos = [
    {
      id: 1,
      title: "Choosing the Right Stream After Class 10",
      expert: "Dr. Priya Sharma",
      duration: "25:30",
      views: "15K",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGNsYXNzcm9vbXxlbnwxfHx8fDE3NTgzODAzNzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Educational counselor discusses how to choose between Science, Commerce, and Arts streams."
    },
    {
      id: 2,
      title: "Engineering vs Medical: Making the Right Choice",
      expert: "Prof. Rajesh Kumar",
      duration: "32:15",
      views: "12K",
      thumbnail: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlciUyMGRvY3RvcnxlbnwxfHx8fDE3NTgzODAzNzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Career guidance on choosing between engineering and medical fields based on interests and aptitude."
    },
    {
      id: 3,
      title: "Digital Age Careers: New Opportunities",
      expert: "Ms. Anita Desai",
      duration: "28:45",
      views: "18K",
      thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwY2FyZWVyfGVufDF8fHx8MTc1ODM4MDM3MHww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Exploring emerging careers in technology, digital marketing, data science, and AI."
    },
    {
      id: 4,
      title: "Financial Planning for Higher Education",
      expert: "CA Vikram Singh",
      duration: "35:20",
      views: "9K",
      thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNlJTIwcGxhbm5pbmd8ZW58MXx8fHwxNzU4MzgwMzcwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Expert advice on education loans, scholarships, and financial planning for career goals."
    }
  ];

  const webinars = [
    {
      id: 1,
      title: "Career Opportunities in Artificial Intelligence",
      date: "2024-01-15",
      time: "7:00 PM IST",
      speaker: "Dr. Amit Verma, AI Researcher",
      status: "upcoming",
      description: "Explore the growing field of AI and machine learning, with insights on required skills and career paths."
    },
    {
      id: 2,
      title: "Medical Entrance Exam Strategy",
      date: "2024-01-08",
      time: "6:00 PM IST", 
      speaker: "Dr. Kavita Rao, NEET Expert",
      status: "completed",
      description: "Comprehensive strategy for NEET preparation and medical college selection."
    },
    {
      id: 3,
      title: "Entrepreneurship for Young Minds",
      date: "2024-01-22",
      time: "7:30 PM IST",
      speaker: "Mr. Rohit Aggarwal, Startup Founder",
      status: "upcoming",
      description: "Learn about startup ecosystem, funding, and how to start your entrepreneurial journey."
    }
  ];

  const careerTips = [
    {
      icon: Target,
      title: "Set Clear Goals",
      description: "Define your short-term and long-term career objectives to stay focused and motivated."
    },
    {
      icon: BookOpen,
      title: "Continuous Learning",
      description: "Stay updated with industry trends and continuously develop new skills throughout your career."
    },
    {
      icon: Users,
      title: "Build Networks",
      description: "Connect with professionals, mentors, and peers in your field of interest."
    },
    {
      icon: Lightbulb,
      title: "Stay Curious",
      description: "Maintain an inquisitive mindset and explore different opportunities and experiences."
    }
  ];

  return (
    <div className="resources-section">
      <div className="resources-container">
        {/* Header */}
        <div className="resources-header">
          <h1 className="resources-title">
            Career Resources & Learning Materials
          </h1>
          <p className="resources-description">
            Access comprehensive study materials, expert guidance videos, live webinars, 
            and practical career tips to support your educational journey.
          </p>
        </div>

        {/* Tabs */}
        <div className="resources-tabs">
          <div className="tabs-navigation">
            {[
              { id: "materials", label: "Study Materials" },
              { id: "videos", label: "Expert Videos" },
              { id: "webinars", label: "Webinars" },
              { id: "tips", label: "Career Tips" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Study Materials Tab */}
          {activeTab === "materials" && (
            <div className="tab-content">
              <div className="materials-grid">
                {studyMaterials.map((material) => (
                  <div key={material.id} className="material-card">
                    <div className="material-header">
                      <div className="material-title-section">
                        <div className="material-title-content">
                          <h3 className="material-title">{material.title}</h3>
                          <div className="material-badges">
                            <span className="material-badge secondary">
                              {material.category}
                            </span>
                            <span className="material-badge outline">
                              {material.type}
                            </span>
                          </div>
                        </div>
                        <FileText className="material-icon" />
                      </div>
                      <p className="material-description">{material.description}</p>
                    </div>
                    <div className="material-content">
                      <div className="material-footer">
                        <span className="material-pages">{material.pages} pages</span>
                        <button className="download-button">
                          <Download className="download-icon" />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Expert Videos Tab */}
          {activeTab === "videos" && (
            <div className="videos-grid">
              {expertVideos.map((video) => (
                <div key={video.id} className="video-card">
                  <div className="video-thumbnail">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="video-image"
                    />
                    <div className="video-overlay">
                      <div className="play-button">
                        <Play className="play-icon" />
                      </div>
                    </div>
                    <div className="video-duration">
                      {video.duration}
                    </div>
                  </div>
                  <div className="video-header">
                    <h3 className="video-title">{video.title}</h3>
                    <p className="video-description">{video.description}</p>
                  </div>
                  <div className="video-content">
                    <div className="video-footer">
                      <span className="video-views">{video.views} views</span>
                      <button className="watch-button">
                        <ExternalLink className="external-icon" />
                        Watch Video
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Webinars Tab */}
          {activeTab === "webinars" && (
            <div className="webinars-list">
              {webinars.map((webinar) => (
                <div key={webinar.id} className="webinar-card">
                  <div className="webinar-content">
                    <div className="webinar-main">
                      <div className="webinar-info">
                        <div className="webinar-title-row">
                          <h3 className="webinar-title">{webinar.title}</h3>
                          <span className={`webinar-status ${webinar.status}`}>
                            {webinar.status === "upcoming" ? "Upcoming" : "Completed"}
                          </span>
                        </div>
                        <p className="webinar-description">{webinar.description}</p>
                        <div className="webinar-details">
                          <div className="webinar-detail">
                            <Calendar className="calendar-icon" />
                            <span>{new Date(webinar.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}</span>
                          </div>
                          <div className="webinar-detail">
                            <Clock className="calendar-icon" />
                            <span>{webinar.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="webinar-action">
                        {webinar.status === "upcoming" ? (
                          <button className="register-button">
                            Register Now
                          </button>
                        ) : (
                          <button className="view-recording-button">
                            View Recording
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Career Tips Tab */}
          {activeTab === "tips" && (
            <div className="tab-content">
              <div className="tips-grid">
                {careerTips.map((tip, index) => (
                  <div key={index} className="tip-card">
                    <div className="tip-icon-wrapper">
                      <tip.icon className="tip-icon" />
                    </div>
                    <h3 className="tip-title">{tip.title}</h3>
                    <p className="tip-description">
                      {tip.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Pro Tips Section */}
              <div className="pro-tips-card">
                <div className="pro-tips-header">
                  <h3 className="pro-tips-title">💡 Pro Tips for Career Success</h3>
                </div>
                <div className="pro-tips-content">
                  <div className="pro-tips-grid">
                    <div className="pro-tips-section">
                      <h4 className="pro-tips-section-title">For Class 10 Students:</h4>
                      <div className="pro-tips-list">
                        <div className="pro-tips-item">
                          <span className="pro-tips-bullet">•</span>
                          <span>Focus on building strong fundamentals in core subjects</span>
                        </div>
                        <div className="pro-tips-item">
                          <span className="pro-tips-bullet">•</span>
                          <span>Explore different career options through internships or workshops</span>
                        </div>
                        <div className="pro-tips-item">
                          <span className="pro-tips-bullet">•</span>
                          <span>Develop time management and study habits early</span>
                        </div>
                        <div className="pro-tips-item">
                          <span className="pro-tips-bullet">•</span>
                          <span>Start building a portfolio of extracurricular activities</span>
                        </div>
                      </div>
                    </div>
                    <div className="pro-tips-section">
                      <h4 className="pro-tips-section-title">For Class 12 Students:</h4>
                      <div className="pro-tips-list">
                        <div className="pro-tips-item">
                          <span className="pro-tips-bullet">•</span>
                          <span>Research colleges and courses thoroughly before applying</span>
                        </div>
                        <div className="pro-tips-item">
                          <span className="pro-tips-bullet">•</span>
                          <span>Prepare for entrance exams with focused study plans</span>
                        </div>
                        <div className="pro-tips-item">
                          <span className="pro-tips-bullet">•</span>
                          <span>Network with seniors and industry professionals</span>
                        </div>
                        <div className="pro-tips-item">
                          <span className="pro-tips-bullet">•</span>
                          <span>Consider backup plans and alternative career paths</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}