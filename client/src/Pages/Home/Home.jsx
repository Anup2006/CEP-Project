import { Brain, Compass, Target, Users } from "lucide-react";
import "./Home.css";
import { useNavigate } from "react-router";
import { useEffect } from "react";


export default function Home() {
  const navigate=useNavigate();
  const onStartQuiz=async ()=>{
    navigate("/app/quiz",{replace:true});
  }
  const handleExplore=async ()=>{
    navigate("/app/explore-careers",{replace:true});
  }

  const features = [
    {
      icon: Brain,
      title: "Smart Career Assessment",
      description: "Take our comprehensive quiz to discover careers that match your interests and strengths."
    },
    {
      icon: Compass,
      title: "Explore Career Paths",
      description: "Learn about different career options with detailed information about requirements and prospects."
    },
    {
      icon: Target,
      title: "Personalized Recommendations",
      description: "Get tailored career suggestions based on your academic performance and interests."
    },
    {
      icon: Users,
      title: "Expert Guidance",
      description: "Access curated resources and tips from career counselors and industry experts."
    }
  ];

  return (
    <div className="home-section">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-grid">
            <div className="hero-content">
              <div>
                <h1 className="hero-title">
                  Discover Your Perfect 
                  <span className="hero-highlight"> Career Path</span>
                </h1>
                <p className="hero-description">
                  Whether you're in Class 10 or 12, make informed decisions about your future. 
                  Our career guidance platform helps you explore opportunities and choose the right path.
                </p>
              </div>
              
              <div className="hero-buttons">
                <button onClick={onStartQuiz} className="hero-button primary">
                  Take Career Quiz
                </button>
                <button onClick={handleExplore} className="hero-button secondary">
                  Explore Careers
                </button>
              </div>

              <div className="hero-features">
                <div className="hero-feature">
                  <div className="feature-dot green"></div>
                  <span>Free Assessment</span>
                </div>
                <div className="hero-feature">
                  <div className="feature-dot blue"></div>
                  <span>Instant Results</span>
                </div>
                <div className="hero-feature">
                  <div className="feature-dot purple"></div>
                  <span>Expert Curated</span>
                </div>
              </div>
            </div>

            <div className="hero-image">
              <img
                src="https://images.unsplash.com/photo-1543295523-78c9bbdba65c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nJTIwY2FyZWVyJTIwZ3VpZGFuY2V8ZW58MXx8fHwxNzU4MzgwMzcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Students discussing career options"
                className="hero-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2 className="features-title">
              Why Choose CareerCompass?
            </h2>
            <p className="features-description">
              Our platform is designed specifically for Indian students in Classes 10 and 12, 
              providing comprehensive career guidance tailored to your needs.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon-wrapper">
                  <feature.icon className="feature-icon" />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">
            Ready to Discover Your Future?
          </h2>
          <p className="cta-description">
            Take the first step towards a successful career. Our comprehensive assessment 
            will help you understand your strengths and find the perfect career match.
          </p>
          <button 
            onClick={onStartQuiz}
            className="cta-button"
          >
            Start Your Career Journey
          </button>
        </div>
      </section>
    </div>
  );
}