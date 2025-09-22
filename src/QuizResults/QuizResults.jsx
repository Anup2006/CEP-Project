import { ArrowLeft, BookOpen, TrendingUp, Users, DollarSign, Clock, GraduationCap } from "lucide-react";
import "./QuizResults.css";

export default function QuizResults({ scores, onBack, onRetakeQuiz }) {
  // Career data with detailed information
  const careerData = {
    engineering: {
      name: "Engineering",
      description: "Design, build, and maintain systems, structures, and technology that solve real-world problems.",
      matchPercentage: 0,
      requiredEducation: ["Class 12 (PCM)", "B.Tech/B.E.", "Specialized Engineering Courses"],
      averageSalary: "₹3-15 LPA",
      jobGrowth: "8-12% annually",
      workEnvironment: "Offices, Labs, Field Sites",
      keySkills: ["Problem Solving", "Mathematical Skills", "Technical Knowledge", "Innovation"],
      subjects: ["Physics", "Chemistry", "Mathematics", "Computer Science"]
    },
    medical: {
      name: "Medical & Healthcare",
      description: "Diagnose, treat, and care for patients while advancing medical knowledge and healthcare practices.",
      matchPercentage: 0,
      requiredEducation: ["Class 12 (PCB)", "MBBS/BDS", "Specialization (MD/MS)"],
      averageSalary: "₹4-25 LPA",
      jobGrowth: "15-20% annually",
      workEnvironment: "Hospitals, Clinics, Research Centers",
      keySkills: ["Empathy", "Scientific Knowledge", "Decision Making", "Communication"],
      subjects: ["Biology", "Chemistry", "Physics", "English"]
    },
    business: {
      name: "Business & Management",
      description: "Lead organizations, manage resources, and drive business growth through strategic planning and execution.",
      matchPercentage: 0,
      requiredEducation: ["Class 12 (Any Stream)", "BBA/B.Com", "MBA"],
      averageSalary: "₹3-20 LPA",
      jobGrowth: "10-15% annually",
      workEnvironment: "Corporate Offices, Remote Work",
      keySkills: ["Leadership", "Communication", "Strategic Thinking", "Analysis"],
      subjects: ["Business Studies", "Economics", "Mathematics", "English"]
    },
    arts: {
      name: "Arts & Creative Fields",
      description: "Express creativity through various mediums including visual arts, performing arts, and digital media.",
      matchPercentage: 0,
      requiredEducation: ["Class 12 (Any Stream)", "BFA/BA", "Portfolio Development"],
      averageSalary: "₹2-12 LPA",
      jobGrowth: "12-18% annually",
      workEnvironment: "Studios, Theaters, Digital Spaces",
      keySkills: ["Creativity", "Artistic Vision", "Technical Skills", "Innovation"],
      subjects: ["Fine Arts", "English", "History", "Computer Applications"]
    },
    science: {
      name: "Science & Research",
      description: "Conduct research, analyze data, and advance scientific knowledge in various fields of study.",
      matchPercentage: 0,
      requiredEducation: ["Class 12 (PCM/PCB)", "B.Sc", "M.Sc/Ph.D"],
      averageSalary: "₹3-18 LPA",
      jobGrowth: "8-12% annually",
      workEnvironment: "Laboratories, Research Institutes, Universities",
      keySkills: ["Analytical Thinking", "Research Methods", "Data Analysis", "Scientific Writing"],
      subjects: ["Physics", "Chemistry", "Biology", "Mathematics"]
    },
    finance: {
      name: "Finance & Banking",
      description: "Manage financial resources, analyze markets, and provide financial services to individuals and organizations.",
      matchPercentage: 0,
      requiredEducation: ["Class 12 (Commerce/Any)", "B.Com/BBA", "CA/CFA/MBA"],
      averageSalary: "₹4-25 LPA",
      jobGrowth: "10-15% annually",
      workEnvironment: "Banks, Financial Institutions, Corporate Offices",
      keySkills: ["Mathematical Skills", "Analysis", "Risk Assessment", "Communication"],
      subjects: ["Mathematics", "Economics", "Accountancy", "Business Studies"]
    },
    law: {
      name: "Law & Legal Services",
      description: "Practice law, provide legal counsel, and ensure justice through legal expertise and advocacy.",
      matchPercentage: 0,
      requiredEducation: ["Class 12 (Any Stream)", "LLB (5 years)", "LLM (Specialization)"],
      averageSalary: "₹3-20 LPA",
      jobGrowth: "8-12% annually",
      workEnvironment: "Courts, Law Firms, Corporate Legal Departments",
      keySkills: ["Critical Thinking", "Communication", "Research", "Negotiation"],
      subjects: ["English", "Political Science", "History", "Economics"]
    },
    teaching: {
      name: "Education & Teaching",
      description: "Educate and inspire students while contributing to the development of future generations.",
      matchPercentage: 0,
      requiredEducation: ["Class 12 (Any Stream)", "B.Ed", "Subject Specialization"],
      averageSalary: "₹2-8 LPA",
      jobGrowth: "5-8% annually",
      workEnvironment: "Schools, Colleges, Online Platforms",
      keySkills: ["Communication", "Patience", "Subject Knowledge", "Mentoring"],
      subjects: ["Subject Specialization", "Psychology", "English", "Computer Skills"]
    }
  };

  // Calculate match percentages and sort careers by score
  const maxScore = Math.max(...Object.values(scores));
  const sortedCareers = Object.entries(scores)
    .map(([career, score]) => ({
      career,
      score,
      percentage: maxScore > 0 ? Math.round((score / maxScore) * 100) : 0
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4); // Show top 4 recommendations

  // Update career data with calculated percentages
  sortedCareers.forEach(({ career, percentage }) => {
    if (careerData[career]) {
      careerData[career].matchPercentage = percentage;
    }
  });

  const topCareer = sortedCareers[0];

  return (
    <div className="quiz-results">
      <div className="results-container">
        {/* Header */}
        <div className="results-header">
          <button className="back-button" onClick={onBack}>
            <ArrowLeft style={{ width: '1rem', height: '1rem' }} />
            Back to Home
          </button>
          
          <div className="results-title-section">
            <h1 className="results-title">
              Your Career Recommendations
            </h1>
            <p className="results-description">
              Based on your quiz responses, here are the career paths that best match your interests, 
              skills, and personality.
            </p>
          </div>
        </div>

        {/* Top Match Highlight */}
        {topCareer && careerData[topCareer.career] && (
          <div className="top-match-card">
            <div className="top-match-header">
              <div className="top-match-header-content">
                <div>
                  <h2 className="top-match-title">
                    🎯 Best Match: {careerData[topCareer.career].name}
                  </h2>
                  <p className="top-match-compatibility">
                    {topCareer.percentage}% compatibility
                  </p>
                </div>
                <span className="top-choice-badge">
                  Top Choice
                </span>
              </div>
            </div>
            <div className="top-match-content">
              <p className="top-match-description">{careerData[topCareer.career].description}</p>
              <div className="top-match-stats">
                <div className="stat-item">
                  <DollarSign className="stat-icon green" />
                  <span>Salary: {careerData[topCareer.career].averageSalary}</span>
                </div>
                <div className="stat-item">
                  <TrendingUp className="stat-icon blue" />
                  <span>Growth: {careerData[topCareer.career].jobGrowth}</span>
                </div>
                <div className="stat-item">
                  <Clock className="stat-icon purple" />
                  <span>{careerData[topCareer.career].workEnvironment}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* All Recommendations */}
        <div className="recommendations-grid">
          {sortedCareers.map(({ career, percentage }) => {
            const careerInfo = careerData[career];
            if (!careerInfo) return null;

            return (
              <div key={career} className="recommendation-card">
                <div className="recommendation-header">
                  <div className="recommendation-title-row">
                    <h3 className="recommendation-title">{careerInfo.name}</h3>
                    <span className={`match-badge ${percentage >= 80 ? 'high' : percentage >= 60 ? 'medium' : 'low'}`}>
                      {percentage}% Match
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <p className="recommendation-description">{careerInfo.description}</p>
                </div>
                <div className="recommendation-content">
                  {/* Education Path */}
                  <div className="content-section">
                    <div className="section-title">
                      <GraduationCap className="section-icon blue" />
                      <span id="content-heading">Education Path:</span>
                    </div>
                    <div className="tags-container">
                      {careerInfo.requiredEducation.map((edu, index) => (
                        <span key={index} className="tag"  style={{border:"2px solid oklch(0.95 0.0058 264.53)"}} >
                          {edu}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Skills */}
                  <div className="content-section">
                    <div className="section-title">
                      <Users className="section-icon green" />
                      <span id="content-heading">Key Skills:</span>
                    </div>
                    <div className="tags-container">
                      {careerInfo.keySkills.map((skill, index) => (
                        <span key={index} className="tag secondary">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Important Subjects */}
                  <div className="content-section">
                    <div className="section-title">
                      <BookOpen className="section-icon purple" />
                      <span id="content-heading">Important Subjects:</span>
                    </div>
                    <div className="tags-container">
                      {careerInfo.subjects.map((subject, index) => (
                        <span key={index} className="tag" style={{ border:" 2px solid oklch(0.95 0.0058 264.53) "}}>
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="separator"></div>
                  {/* Career Stats */}
                  <div className="stats-grid">
                    <div className="stat-item">
                      <div className="stat-label">Average Salary</div>
                      <div className="stat-value">{careerInfo.averageSalary}</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-label">Job Growth</div>
                      <div className="stat-value">{careerInfo.jobGrowth}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="actions-section">
          <div className="actions-buttons">
            <button onClick={onRetakeQuiz} className="action-button secondary">
              Retake Quiz
            </button>
            <button className="action-button primary">
              Explore Career Details
            </button>
          </div>
          <p className="disclaimer">
            These recommendations are based on your quiz responses. Consider consulting with career counselors 
            and exploring each field further before making final decisions.
          </p>
        </div>
      </div>
    </div>
  );
}