import { useState } from "react";
import { useEffect } from "react";
import { Search, Filter, TrendingUp, DollarSign, Users, Clock, BookOpen, GraduationCap } from "lucide-react";
import CareerDetailModal from "../Career-Detail-Modal/CareerDetailModal";
import "./CareerExploration.css";
const base_uri=import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api/v1";
const BACKEND_URL=`${base_uri}/careers`;

export default function CareerExploration() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const res = await fetch(BACKEND_URL);
        if (!res.ok){
          throw new Error("Failed to fetch careers");
        }
        const data = await res.json();
        setCareers(data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Unable to load careers. Please try again later.");
        setLoading(false);
      }
    };

    fetchCareers();
  }, []);

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

  if (loading) return <div className="loading">Loading careers...</div>
  if (error) return <div className="error">{error}</div>

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
            <div key={career.slug || career.id} className="career-card">
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