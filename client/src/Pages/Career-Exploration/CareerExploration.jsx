import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Search, Filter, TrendingUp, DollarSign, Users, Clock, BookOpen, GraduationCap } from "lucide-react";
import CareerDetailModal from "../Career-Detail-Modal/CareerDetailModal.jsx";
import { fetchCareers,fetchCareerBySlug, clearSelectedCareer, deleteCareer } from "../../redux/careerSlice.js";
import "./CareerExploration.css";
import { Trash2,Edit } from "lucide-react"; 

export default function CareerExploration() {

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStream, setSelectedStream] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { careers, loading, error, selectedCareer } = useSelector(state => state.career);
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const handleUpdateCareer = (career) => {
    navigate(`/app/admin/career/update/${career._id}/${career.slug}`);
  };


  const handleLearnMore = (career) => {
    dispatch(fetchCareerBySlug(career.slug));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    dispatch(clearSelectedCareer());
    setIsModalOpen(false);
  };

  const handleDeleteCareer =(careerId)=>{
    if (window.confirm("Are you sure?")) dispatch(deleteCareer(careerId));
  }

  useEffect(() => {
    dispatch(fetchCareers());
  }, [dispatch]);

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

  if (loading) return <div className="flex justify-center items-center m-10 p-10">Loading careers...</div>
  if (error) return <div className="flex justify-center items-center m-10 p-10">{error}</div>

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

        <button
          onClick={() => navigate("/app/admin/createCareer")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Create Career
        </button>

        {/* Career Cards */}
        <div className="careers-grid">
          {filteredCareers.map(career => (
            <div key={career.slug || career._id} className="career-card relative">
              {user?.role === "admin" ? (
                <span>
                  <button 
                    className="delete-icon absolute top-2 right-10 p-1"
                    onClick={() => handleUpdateCareer(career)}
                  >
                    <Edit className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  </button>
                  <button 
                    className="delete-icon absolute top-2 right-2 p-1 hover:bg-red-100 rounded-full"
                    onClick={() => handleDeleteCareer(career._id)}
                  >
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </button>
                </span>
              ):(null)}
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