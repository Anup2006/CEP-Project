import { useState } from "react";
import { 
  DollarSign, 
  TrendingUp, 
  GraduationCap, 
  Users, 
  Clock, 
  BookOpen, 
  Target,
  Briefcase,
  Star,
  Award,
  MapPin,
  Building
} from "lucide-react";
import "./CareerDetailModal.css";

export default function CareerDetailModal({ career, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("overview");

  if (!career || !isOpen) return null;

  // Extended career data for detailed view
  const getCareerDetails = (careerId) => {
    const detailsMap = {
      "software-engineer": {
        detailedDescription: "Software engineers design, develop, test, and maintain software applications and systems. They work across various industries to create solutions that help businesses operate efficiently and users accomplish their goals.",
        dailyActivities: [
          "Writing and debugging code",
          "Collaborating with cross-functional teams",
          "Designing system architecture",
          "Testing and deploying applications",
          "Code reviews and documentation"
        ],
        workCulture: "Tech companies often have flexible work environments with modern offices, remote work options, and emphasis on innovation and continuous learning.",
        topEmployers: ["Google", "Microsoft", "Amazon", "TCS", "Infosys", "Wipro", "Accenture"],
        salaryProgression: [
          { level: "Fresher (0-2 years)", range: "₹3-8 LPA" },
          { level: "Mid-level (3-6 years)", range: "₹8-18 LPA" },
          { level: "Senior (7-12 years)", range: "₹18-35 LPA" },
          { level: "Lead/Architect (12+ years)", range: "₹35-60 LPA" }
        ],
        entrance_exams: ["JEE Main", "JEE Advanced", "BITSAT", "VITEEE", "SRMJEEE"],
        topColleges: ["IIT Delhi", "IIT Bombay", "IIT Kanpur", "NIT Trichy", "BITS Pilani"],
        futureScope: "High demand for AI/ML, Cloud Computing, Cybersecurity, and Full-stack development specialists."
      },
      "doctor": {
        detailedDescription: "Medical doctors diagnose and treat illnesses, injuries, and other health conditions. They work to prevent disease, promote health, and provide compassionate care to patients across all age groups.",
        dailyActivities: [
          "Examining patients and diagnosing conditions",
          "Prescribing treatments and medications",
          "Performing procedures and surgeries",
          "Consulting with other healthcare professionals",
          "Maintaining patient records and documentation"
        ],
        workCulture: "Healthcare environments require dedication, long hours, and emotional resilience. Strong emphasis on continuous medical education and patient care.",
        topEmployers: ["AIIMS", "Apollo Hospitals", "Fortis Healthcare", "Max Healthcare", "Government Hospitals"],
        salaryProgression: [
          { level: "Junior Resident", range: "₹6-12 LPA" },
          { level: "Senior Resident", range: "₹12-20 LPA" },
          { level: "Consultant", range: "₹20-40 LPA" },
          { level: "Senior Consultant", range: "₹40-80 LPA" }
        ],
        entrance_exams: ["NEET UG", "NEET PG", "AIIMS MBBS", "JIPMER"],
        topColleges: ["AIIMS Delhi", "AFMC Pune", "JIPMER", "CMC Vellore", "KGMU Lucknow"],
        futureScope: "Growing demand in telemedicine, geriatric care, mental health, and specialized medical fields."
      }
    };

    return detailsMap[careerId] || {
      detailedDescription: career.description,
      dailyActivities: ["Perform core job responsibilities", "Collaborate with team members", "Continuous learning and skill development"],
      workCulture: "Professional environment with growth opportunities",
      topEmployers: ["Leading companies in the industry"],
      salaryProgression: [
        { level: "Entry Level", range: "Starting salary range" },
        { level: "Mid Level", range: "Growth phase salary" },
        { level: "Senior Level", range: "Experienced professional salary" }
      ],
      entrance_exams: ["Relevant entrance examinations"],
      topColleges: ["Top institutions for this field"],
      futureScope: "Positive growth prospects in the field"
    };
  };

  const details = getCareerDetails(career.id);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "education", label: "Education" },
    { id: "salary", label: "Salary" },
    { id: "daily-work", label: "Daily Work" },
    { id: "future", label: "Future Scope" }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-section">
            <div>
              <h2 className="modal-title">{career.title}</h2>
              <div className="modal-badges">
                <span className="modal-badge secondary">{career.category}</span>
                <span className="modal-badge outline">In-Demand</span>
              </div>
            </div>
          </div>
          <p className="modal-description">
            {details.detailedDescription}
          </p>
        </div>

        <div className="tabs-container">
          <div className="tabs-list">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-trigger ${activeTab === tab.id ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "overview" && (
            <div className="tab-content">
              <div className="content-grid">
                {/* Key Stats */}
                <div className="info-card">
                  <div className="card-header">
                    <Target className="card-icon" />
                    <h3 className="card-title">Key Statistics</h3>
                  </div>
                  <div className="card-content">
                    <div className="stat-row">
                      <div className="stat-label">
                        <DollarSign className="stat-icon green" />
                        <span>Average Salary</span>
                      </div>
                      <span className="stat-value">{career.averageSalary}</span>
                    </div>
                    <div className="stat-row">
                      <div className="stat-label">
                        <TrendingUp className="stat-icon blue" />
                        <span>Job Growth</span>
                      </div>
                      <span className="stat-value">{career.jobGrowth}</span>
                    </div>
                    <div className="stat-row">
                      <div className="stat-label">
                        <Clock className="stat-icon purple" />
                        <span>Work Environment</span>
                      </div>
                      <span className="stat-value">{career.workEnvironment}</span>
                    </div>
                  </div>
                </div>

                {/* Skills Required */}
                <div className="info-card">
                  <div className="card-header">
                    <Users className="card-icon" />
                    <h3 className="card-title">Essential Skills</h3>
                  </div>
                  <div className="card-content">
                    <div className="tags-grid">
                      {career.keySkills.map((skill, index) => (
                        <span key={index} className="tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Employers */}
              <div className="info-card full-width-card">
                <div className="card-header">
                  <Building className="card-icon" />
                  <h3 className="card-title">Top Employers</h3>
                </div>
                <div className="card-content">
                  <div className="tags-grid">
                    {details.topEmployers.map((employer, index) => (
                      <span key={index} className="tag">
                        {employer}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Work Culture */}
              <div className="info-card full-width-card">
                <div className="card-header">
                  <Briefcase className="card-icon" />
                  <h3 className="card-title">Work Culture</h3>
                </div>
                <div className="card-content">
                  <p className="section-text">{details.workCulture}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "education" && (
            <div className="tab-content">
              <div className="content-grid">
                {/* Education Requirements */}
                <div className="info-card">
                  <div className="card-header">
                    <GraduationCap className="card-icon" />
                    <h3 className="card-title">Education Path</h3>
                  </div>
                  <div className="card-content education-section">
                    <div className="education-subsection">
                      <h4>Required Education</h4>
                      <p className="education-content">{career.educationRequired}</p>
                    </div>
                    <div className="education-subsection">
                      <h4>Stream Requirements</h4>
                      <div className="tags-grid">
                        {career.streamRequired.map((stream, index) => (
                          <span key={index} className="tag">{stream}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Popular Courses */}
                <div className="info-card">
                  <div className="card-header">
                    <BookOpen className="card-icon" />
                    <h3 className="card-title">Popular Courses</h3>
                  </div>
                  <div className="card-content">
                    {career.popularCourses.map((course, index) => (
                      <div key={index} className="college-item">
                        <div className="college-dot"></div>
                        {course}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Entrance Exams */}
              <div className="info-card full-width-card">
                <div className="card-header">
                  <Award className="card-icon" />
                  <h3 className="card-title">Entrance Examinations</h3>
                </div>
                <div className="card-content">
                  <div className="tags-grid">
                    {details.entrance_exams.map((exam, index) => (
                      <span key={index} className="tag">{exam}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Top Colleges */}
              <div className="info-card full-width-card">
                <div className="card-header">
                  <Star className="card-icon" />
                  <h3 className="card-title">Top Colleges/Universities</h3>
                </div>
                <div className="card-content">
                  <div className="colleges-grid">
                    {details.topColleges.map((college, index) => (
                      <div key={index} className="college-item">
                        <div className="college-dot"></div>
                        {college}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "salary" && (
            <div className="tab-content">
              <div className="info-card">
                <div className="card-header">
                  <DollarSign className="card-icon" />
                  <h3 className="card-title">Salary Progression</h3>
                </div>
                <div className="card-content">
                  <div className="salary-progression">
                    {details.salaryProgression.map((level, index) => (
                      <div key={index} className="salary-level">
                        <div className="salary-header">
                          <span className="salary-title">{level.level}</span>
                          <span className="salary-range">{level.range}</span>
                        </div>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${25 + (index * 20)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="content-grid salary-factors-grid">
                <div className="info-card">
                  <div className="card-header">
                    <h3 className="card-title">Factors Affecting Salary</h3>
                  </div>
                  <div className="card-content">
                    <div className="factors-list">
                      <div className="factor-item">
                        <div className="factor-dot"></div>
                        <span>Years of experience</span>
                      </div>
                      <div className="factor-item">
                        <div className="factor-dot"></div>
                        <span>Educational qualifications</span>
                      </div>
                      <div className="factor-item">
                        <div className="factor-dot"></div>
                        <span>Company size and reputation</span>
                      </div>
                      <div className="factor-item">
                        <div className="factor-dot"></div>
                        <span>Geographic location</span>
                      </div>
                      <div className="factor-item">
                        <div className="factor-dot"></div>
                        <span>Specialized skills and certifications</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="info-card">
                  <div className="card-header">
                    <h3 className="card-title">Additional Benefits</h3>
                  </div>
                  <div className="card-content">
                    <div className="factors-list">
                      <div className="factor-item">
                        <div className="factor-dot green"></div>
                        <span>Health insurance coverage</span>
                      </div>
                      <div className="factor-item">
                        <div className="factor-dot green"></div>
                        <span>Performance bonuses</span>
                      </div>
                      <div className="factor-item">
                        <div className="factor-dot green"></div>
                        <span>Professional development opportunities</span>
                      </div>
                      <div className="factor-item">
                        <div className="factor-dot green"></div>
                        <span>Flexible working arrangements</span>
                      </div>
                      <div className="factor-item">
                        <div className="factor-dot green"></div>
                        <span>Retirement savings plans</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "daily-work" && (
            <div className="tab-content">
              <div className="info-card">
                <div className="card-header">
                  <Clock className="card-icon" />
                  <h3 className="card-title">Daily Activities</h3>
                </div>
                <div className="card-content">
                  <div className="activities-list">
                    {details.dailyActivities.map((activity, index) => (
                      <div key={index} className="activity-item">
                        <div className="activity-icon">
                          <div className="activity-dot"></div>
                        </div>
                        <span className="activity-text">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="info-card">
                <div className="card-header">
                  <MapPin className="card-icon" />
                  <h3 className="card-title">Career Progression Path</h3>
                </div>
                <div className="card-content">
                  <div className="progression-path">
                    {career.careerLevels.map((level, index) => (
                      <div key={index} className="progression-item">
                        <div className="progression-number">
                          {index + 1}
                        </div>
                        <span>{level}</span>
                        {index < career.careerLevels.length - 1 && (
                          <div className="progression-line"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "future" && (
            <div className="tab-content">
              <div className="info-card full-width-card">
                <div className="card-header">
                  <TrendingUp className="card-icon" />
                  <h3 className="card-title">Future Scope & Trends</h3>
                </div>
                <div className="card-content">
                  <p className="section-text">{details.futureScope}</p>
                </div>
              </div>

              <div className="content-grid future-grid">
                <div className="info-card">
                  <div className="card-header">
                    <h3 className="card-title">Growth Opportunities</h3>
                  </div>
                  <div className="card-content">
                    <div className="factors-list">
                      <div className="factor-item">
                        <div className="factor-dot green"></div>
                        <span>Leadership and management roles</span>
                      </div>
                      <div className="factor-item">
                        <div className="factor-dot green"></div>
                        <span>Specialization in niche areas</span>
                      </div>
                      <div className="factor-item">
                        <div className="factor-dot green"></div>
                        <span>Entrepreneurship opportunities</span>
                      </div>
                      <div className="factor-item">
                        <div className="factor-dot green"></div>
                        <span>International career prospects</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="info-card">
                  <div className="card-header">
                    <h3 className="card-title">Industry Challenges</h3>
                  </div>
                  <div className="card-content">
                    <div className="factors-list">
                      <div className="factor-item">
                        <div className="factor-dot orange"></div>
                        <span>Keeping up with technological changes</span>
                      </div>
                      <div className="factor-item">
                        <div className="factor-dot orange"></div>
                        <span>Continuous skill development</span>
                      </div>
                      <div className="factor-item">
                        <div className="factor-dot orange"></div>
                        <span>Work-life balance</span>
                      </div>
                      <div className="factor-item">
                        <div className="factor-dot orange"></div>
                        <span>Competition in the field</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button onClick={onClose} className="modal-button outline">
            Close
          </button>
          <button className="modal-button primary">
            Get Personalized Guidance
          </button>
        </div>
      </div>
    </div>
  );
}