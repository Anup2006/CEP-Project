import { useState } from "react";
import { Search, Filter, TrendingUp, DollarSign, Users, Clock, BookOpen, GraduationCap } from "lucide-react";
import CareerDetailModal from "../Career-Detail-Modal/CareerDetailModal";
import "./CareerExploration.css";

export default function CareerExploration() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStream, setSelectedStream] = useState("all");
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLearnMore = (career) => {
    setSelectedCareer(career);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCareer(null);
  };

  const careers = [
    {
      id: "software-engineer",
      title: "Software Engineer",
      category: "Technology",
      description: "Design and develop software applications, systems, and solutions using programming languages and technologies.",
      averageSalary: "₹4-20 LPA",
      jobGrowth: "15-20% annually",
      educationRequired: "B.Tech/B.E in Computer Science",
      keySkills: ["Programming", "Problem Solving", "Software Development", "Data Structures"],
      workEnvironment: "IT Companies, Startups, Remote",
      popularCourses: ["Computer Science Engineering", "Information Technology", "Software Engineering"],
      careerLevels: ["Junior Developer", "Senior Developer", "Tech Lead", "Engineering Manager"],
      streamRequired: ["Science (PCM)", "Computer Science"]
    },
    {
      id: "doctor",
      title: "Medical Doctor",
      category: "Healthcare",
      description: "Diagnose and treat patients, conduct medical research, and contribute to healthcare advancement.",
      averageSalary: "₹6-30 LPA",
      jobGrowth: "12-18% annually",
      educationRequired: "MBBS + MD/MS specialization",
      keySkills: ["Medical Knowledge", "Empathy", "Decision Making", "Communication"],
      workEnvironment: "Hospitals, Clinics, Research Centers",
      popularCourses: ["MBBS", "BDS", "BAMS", "BHMS"],
      careerLevels: ["Junior Doctor", "Specialist", "Consultant", "Department Head"],
      streamRequired: ["Science (PCB)", "Biology"]
    },
    {
      id: "chartered-accountant",
      title: "Chartered Accountant",
      category: "Finance",
      description: "Manage financial records, provide tax advice, and ensure compliance with financial regulations.",
      averageSalary: "₹5-25 LPA",
      jobGrowth: "8-12% annually",
      educationRequired: "CA qualification after Class 12",
      keySkills: ["Accounting", "Financial Analysis", "Tax Knowledge", "Audit"],
      workEnvironment: "Accounting Firms, Corporate Offices, Self-practice",
      popularCourses: ["CA (Chartered Accountancy)", "CS (Company Secretary)", "CMA"],
      careerLevels: ["Article Assistant", "Associate", "Manager", "Partner"],
      streamRequired: ["Commerce", "Any Stream"]
    },
    {
      id: "graphic-designer",
      title: "Graphic Designer",
      category: "Creative",
      description: "Create visual content for digital and print media using design software and artistic skills.",
      averageSalary: "₹2-10 LPA",
      jobGrowth: "10-15% annually",
      educationRequired: "BFA/B.Des in Graphic Design",
      keySkills: ["Design Software", "Creativity", "Visual Communication", "Typography"],
      workEnvironment: "Design Studios, Ad Agencies, Freelance",
      popularCourses: ["Graphic Design", "Visual Communication", "Fine Arts"],
      careerLevels: ["Junior Designer", "Senior Designer", "Art Director", "Creative Director"],
      streamRequired: ["Any Stream", "Arts"]
    },
    {
      id: "civil-engineer",
      title: "Civil Engineer",
      category: "Engineering",
      description: "Design, construct, and maintain infrastructure projects like buildings, roads, and bridges.",
      averageSalary: "₹3-15 LPA",
      jobGrowth: "8-12% annually",
      educationRequired: "B.Tech/B.E in Civil Engineering",
      keySkills: ["Structural Design", "Project Management", "CAD Software", "Problem Solving"],
      workEnvironment: "Construction Sites, Offices, Government Agencies",
      popularCourses: ["Civil Engineering", "Environmental Engineering", "Structural Engineering"],
      careerLevels: ["Junior Engineer", "Project Engineer", "Site Manager", "Project Manager"],
      streamRequired: ["Science (PCM)", "Mathematics"]
    },
    {
      id: "psychologist",
      title: "Psychologist",
      category: "Healthcare",
      description: "Study human behavior and mental processes to help individuals overcome psychological challenges.",
      averageSalary: "₹3-12 LPA",
      jobGrowth: "12-18% annually",
      educationRequired: "BA/MA in Psychology",
      keySkills: ["Counseling", "Research", "Empathy", "Communication"],
      workEnvironment: "Hospitals, Clinics, Schools, Private Practice",
      popularCourses: ["Psychology", "Clinical Psychology", "Counseling Psychology"],
      careerLevels: ["Assistant Psychologist", "Clinical Psychologist", "Senior Psychologist", "Director"],
      streamRequired: ["Arts", "Science", "Any Stream"]
    },
    {
      id: "digital-marketer",
      title: "Digital Marketing Specialist",
      category: "Marketing",
      description: "Promote products and services using digital channels like social media, search engines, and websites.",
      averageSalary: "₹3-15 LPA",
      jobGrowth: "20-25% annually",
      educationRequired: "BBA/MBA in Marketing",
      keySkills: ["SEO/SEM", "Social Media", "Analytics", "Content Creation"],
      workEnvironment: "Marketing Agencies, Startups, Corporate",
      popularCourses: ["Digital Marketing", "Mass Communication", "MBA Marketing"],
      careerLevels: ["Marketing Executive", "Digital Marketing Manager", "Growth Manager", "CMO"],
      streamRequired: ["Any Stream", "Commerce"]
    },
    {
      id: "data-scientist",
      title: "Data Scientist",
      category: "Technology",
      description: "Analyze complex data to extract insights and support business decision-making using statistical methods.",
      averageSalary: "₹6-25 LPA",
      jobGrowth: "25-30% annually",
      educationRequired: "B.Tech/M.Tech in Computer Science/Statistics",
      keySkills: ["Python/R", "Machine Learning", "Statistics", "Data Visualization"],
      workEnvironment: "Tech Companies, Consulting Firms, Research Labs",
      popularCourses: ["Data Science", "Statistics", "Computer Science", "Mathematics"],
      careerLevels: ["Data Analyst", "Data Scientist", "Senior Data Scientist", "Chief Data Officer"],
      streamRequired: ["Science (PCM)", "Mathematics", "Computer Science"]
    },
    {
      id: "lawyer",
      title: "Lawyer",
      category: "Legal",
      description: "Provide legal advice, represent clients in court, and ensure justice through legal expertise.",
      averageSalary: "₹3-20 LPA",
      jobGrowth: "8-12% annually",
      educationRequired: "LLB (5 years) after Class 12",
      keySkills: ["Legal Research", "Communication", "Critical Thinking", "Negotiation"],
      workEnvironment: "Law Firms, Courts, Corporate Legal Departments",
      popularCourses: ["LLB", "BA LLB", "BBA LLB", "LLM"],
      careerLevels: ["Junior Associate", "Associate", "Senior Associate", "Partner"],
      streamRequired: ["Any Stream", "Arts", "Commerce"]
    }
  ];

  const categories = ["all", "Technology", "Healthcare", "Finance", "Creative", "Engineering", "Marketing", "Legal"];
  const streams = ["all", "Science (PCM)", "Science (PCB)", "Commerce", "Arts", "Any Stream"];

  const filteredCareers = careers.filter(career => {
    const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         career.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         career.keySkills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || career.category === selectedCategory;
    const matchesStream = selectedStream === "all" || career.streamRequired.includes(selectedStream);
    
    return matchesSearch && matchesCategory && matchesStream;
  });

  return (
    <div className="career-exploration">
      <div className="exploration-container">
        {/* Header */}
        <div className="exploration-header">
          <h1 className="exploration-title">
            Explore Career Options
          </h1>
          <p className="exploration-description">
            Discover detailed information about various career paths, their requirements, 
            growth prospects, and what it takes to succeed in each field.
          </p>
        </div>

        {/* Filters */}
        <div className="filters-card">
          <div className="filters-content">
            <div className="filters-grid">
              <div className="search-container">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search careers, skills, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              
              <div className="select-container">
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="form-select"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="select-container">
                <select 
                  value={selectedStream} 
                  onChange={(e) => setSelectedStream(e.target.value)}
                  className="form-select"
                >
                  {streams.map(stream => (
                    <option key={stream} value={stream}>
                      {stream === "all" ? "All Streams" : stream}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Career Cards */}
        <div className="careers-grid">
          {filteredCareers.map(career => (
            <div key={career.id} className="career-card">
              <div className="career-header">
                <div className="career-title-section">
                  <div className="career-title-content">
                    <h3 className="career-title">{career.title}</h3>
                    <span className="category-badge">{career.category}</span>
                  </div>
                </div>
                <p className="career-description">
                  {career.description}
                </p>
              </div>
              
              <div className="career-content">
                {/* Stats Grid */}
                <div className="stats-grid">
                  <div className="stat-item">
                    <DollarSign className="stat-icon green" />
                    <div className="stat-content">
                      <div className="stat-label">Salary Range</div>
                      <div className="stat-value">{career.averageSalary}</div>
                    </div>
                  </div>
                  
                  <div className="stat-item">
                    <TrendingUp className="stat-icon blue" />
                    <div className="stat-content">
                      <div className="stat-label">Job Growth</div>
                      <div className="stat-value">{career.jobGrowth}</div>
                    </div>
                  </div>
                </div>

                {/* Education Required */}
                <div className="info-section">
                  <div className="section-header">
                    <GraduationCap className="section-icon purple" />
                    <span className="section-title">Education Required:</span>
                  </div>
                  <p className="section-content">{career.educationRequired}</p>
                </div>

                {/* Stream Required */}
                <div className="info-section">
                  <div className="section-header">
                    <BookOpen className="section-icon orange" />
                    <span className="section-title">Stream Required:</span>
                  </div>
                  <div className="tags-container">
                    {career.streamRequired.map((stream, index) => (
                      <span key={index} className="tag outline">
                        {stream}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Skills */}
                <div className="info-section">
                  <div className="section-header">
                    <Users className="section-icon green" />
                    <span className="section-title">Key Skills:</span>
                  </div>
                  <div className="tags-container">
                    {career.keySkills.slice(0, 4).map((skill, index) => (
                      <span key={index} className="tag secondary">
                        {skill}
                      </span>
                    ))}
                    {career.keySkills.length > 4 && (
                      <span className="tag outline">
                        +{career.keySkills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Work Environment */}
                <div className="info-section">
                  <div className="section-header">
                    <Clock className="section-icon blue" />
                    <span className="section-title">Work Environment:</span>
                  </div>
                  <p className="section-content">{career.workEnvironment}</p>
                </div>

                {/* Career Progression */}
                <div className="info-section">
                  <div className="section-title">Career Progression:</div>
                  <div className="progression-text">
                    {career.careerLevels.join(" → ")}
                  </div>
                </div>

                <button 
                  className="learn-more-button"
                  onClick={() => handleLearnMore(career)}
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCareers.length === 0 && (
          <div className="no-results">
            <div className="no-results-content">
              <Filter className="no-results-icon" />
              <h3 className="no-results-title">No careers found</h3>
              <p className="no-results-description">Try adjusting your search criteria or filters.</p>
            </div>
            <button 
              className="clear-filters-button"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSelectedStream("all");
              }}
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Results Count */}
        {filteredCareers.length > 0 && (
          <div className="results-count">
            Showing {filteredCareers.length} of {careers.length} careers
          </div>
        )}

        {/* Career Detail Modal */}
        <CareerDetailModal 
          career={selectedCareer}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </div>
    </div>
  );
}