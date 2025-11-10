import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import "./CareerQuiz.css";

export default function CareerQuiz({ onComplete, onBack }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleting, setIsCompleting] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What subjects do you enjoy the most in school?",
      options: [
        { value: "science", text: "Science (Physics, Chemistry, Biology)", weights: { science: 3, engineering: 2, medical: 3 } },
        { value: "math", text: "Mathematics", weights: { engineering: 3, finance: 2, science: 2 } },
        { value: "humanities", text: "Humanities (History, Literature, Languages)", weights: { arts: 3, law: 2, journalism: 2 } },
        { value: "commerce", text: "Commerce (Accounts, Economics)", weights: { business: 3, finance: 3, law: 1 } },
        { value: "arts", text: "Creative Arts (Drawing, Music, Drama)", weights: { arts: 3, design: 3, entertainment: 2 } }
      ]
    },
    {
      id: 2,
      question: "What type of activities do you prefer?",
      options: [
        { value: "hands_on", text: "Hands-on experiments and practical work", weights: { engineering: 3, science: 2, medical: 2 } },
        { value: "creative", text: "Creative projects and artistic expression", weights: { arts: 3, design: 3, entertainment: 2 } },
        { value: "analytical", text: "Solving complex problems and analysis", weights: { engineering: 2, finance: 3, science: 2 } },
        { value: "social", text: "Working with people and helping others", weights: { medical: 3, teaching: 3, social: 2 } },
        { value: "leadership", text: "Leading teams and organizing events", weights: { business: 3, management: 2, law: 2 } }
      ]
    },
    {
      id: 3,
      question: "What kind of work environment appeals to you?",
      options: [
        { value: "office", text: "Modern office with technology", weights: { business: 2, finance: 3, engineering: 1 } },
        { value: "lab", text: "Laboratory or research facility", weights: { science: 3, medical: 2, engineering: 2 } },
        { value: "outdoors", text: "Outdoor fieldwork", weights: { environmental: 3, agriculture: 2, science: 1 } },
        { value: "studio", text: "Creative studio or workshop", weights: { arts: 3, design: 3, entertainment: 2 } },
        { value: "hospital", text: "Hospital or healthcare facility", weights: { medical: 3, nursing: 2, pharmacy: 2 } }
      ]
    },
    {
      id: 4,
      question: "What motivates you most in your future career?",
      options: [
        { value: "helping", text: "Helping people and making a difference", weights: { medical: 3, teaching: 3, social: 3 } },
        { value: "innovation", text: "Innovation and creating new things", weights: { engineering: 3, science: 2, design: 2 } },
        { value: "financial", text: "Financial success and stability", weights: { business: 3, finance: 3, law: 2 } },
        { value: "recognition", text: "Recognition and fame", weights: { entertainment: 3, arts: 2, sports: 2 } },
        { value: "knowledge", text: "Continuous learning and research", weights: { science: 3, academia: 3, research: 3 } }
      ]
    },
    {
      id: 5,
      question: "How do you prefer to learn new things?",
      options: [
        { value: "reading", text: "Reading books and researching", weights: { academia: 3, law: 2, journalism: 2 } },
        { value: "practical", text: "Hands-on practice and experimentation", weights: { engineering: 3, medical: 2, science: 2 } },
        { value: "visual", text: "Visual aids and demonstrations", weights: { design: 3, arts: 2, teaching: 2 } },
        { value: "discussion", text: "Group discussions and collaboration", weights: { business: 2, management: 2, social: 3 } },
        { value: "online", text: "Online courses and digital media", weights: { technology: 3, digital: 2, journalism: 1 } }
      ]
    },
    {
      id: 6,
      question: "What's your approach to problem-solving?",
      options: [
        { value: "logical", text: "Step-by-step logical analysis", weights: { engineering: 3, science: 2, finance: 2 } },
        { value: "creative", text: "Creative and innovative thinking", weights: { arts: 3, design: 3, advertising: 2 } },
        { value: "collaborative", text: "Team brainstorming and discussion", weights: { management: 3, consulting: 2, social: 2 } },
        { value: "research", text: "Thorough research and study", weights: { academia: 3, science: 2, journalism: 2 } },
        { value: "intuitive", text: "Intuition and quick decisions", weights: { business: 2, entrepreneurship: 3, arts: 1 } }
      ]
    },
    {
      id: 7,
      question: "Which of these best describes your personality?",
      options: [
        { value: "analytical", text: "Analytical and detail-oriented", weights: { engineering: 2, finance: 3, science: 2 } },
        { value: "creative", text: "Creative and imaginative", weights: { arts: 3, design: 3, writing: 2 } },
        { value: "social", text: "Social and people-oriented", weights: { teaching: 3, social: 3, management: 2 } },
        { value: "adventurous", text: "Adventurous and risk-taking", weights: { entrepreneurship: 3, journalism: 2, sports: 2 } },
        { value: "organized", text: "Organized and systematic", weights: { administration: 3, finance: 2, law: 2 } }
      ]
    },
    {
      id: 8,
      question: "What type of impact do you want to make?",
      options: [
        { value: "society", text: "Positive impact on society", weights: { medical: 3, teaching: 3, social: 3 } },
        { value: "technology", text: "Advance technology and innovation", weights: { engineering: 3, science: 2, technology: 3 } },
        { value: "economy", text: "Contribute to economic growth", weights: { business: 3, finance: 3, economics: 2 } },
        { value: "culture", text: "Influence culture and arts", weights: { arts: 3, entertainment: 3, literature: 2 } },
        { value: "environment", text: "Protect the environment", weights: { environmental: 3, agriculture: 2, science: 2 } }
      ]
    }
  ];

  const handleAnswerChange = (value) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleComplete = () => {
    setIsCompleting(true);
    
    // Calculate career scores based on answers
    const careerScores = {};
    
    Object.entries(answers).forEach(([questionIndex, answerValue]) => {
      const question = questions[parseInt(questionIndex)];
      const selectedOption = question.options.find(opt => opt.value === answerValue);
      
      if (selectedOption) {
        Object.entries(selectedOption.weights).forEach(([career, weight]) => {
          careerScores[career] = (careerScores[career] || 0) + weight;
        });
      }
    });

    // Simulate processing time
    setTimeout(() => {
      onComplete(careerScores);
    }, 1500);
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion ) / questions.length) * 100;
  const isLastQuestion = currentQuestion === questions.length - 1;
  const hasAnswer = answers[currentQuestion] !== undefined;

  if (isCompleting) {
    return (
      <div className="loading-screen">
        <div className="loading-card">
          <div className="loading-content">
            <div className="loading-spinner"></div>
            <h3 className="loading-title">Analyzing Your Responses...</h3>
            <p className="loading-description">
              We're processing your answers to find the best career matches for you.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="career-quiz">
      <div className="quiz-container">
        {/* Header */}
        <div className="quiz-header">
          <div className="quiz-header-controls">
            <button className="back-button" onClick={onBack}>
              <ArrowLeft style={{ width: '1rem', height: '1rem' }} />
              Back to Home
            </button>
            <div className="progress-container">
              <div className="progress-info">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="question-card">
          <div className="question-header">
            <h2 className="question-title">{currentQ.question}</h2>
            <p className="question-description">
              Choose the option that best describes you. Your honest answers will help us recommend the most suitable careers.
            </p>
          </div>
          <div className="question-content">
            <div className="options-list">
              {currentQ.options.map((option) => (
                <div key={option.value} className="option-item">
                  <input 
                    type="radio"
                    id={option.value}
                    name={`question-${currentQuestion}`}
                    value={option.value}
                    checked={answers[currentQuestion] === option.value}
                    onChange={(e) => handleAnswerChange(e.target.value)}
                    className="option-radio"
                  />
                  <label htmlFor={option.value} className="option-label">
                    {option.text}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="quiz-navigation">
          <button 
            className="nav-button secondary"
            onClick={handlePrevious} 
            disabled={currentQuestion === 0}
          >
            <ArrowLeft style={{ width: '1rem', height: '1rem' }} />
            Previous
          </button>
          
          <button 
            className="nav-button primary"
            onClick={handleNext} 
            disabled={!hasAnswer}
          >
            {isLastQuestion ? (
              <>
                <CheckCircle style={{ width: '1rem', height: '1rem' }} />
                Complete Quiz
              </>
            ) : (
              <>
                Next
                <ArrowRight style={{ width: '1rem', height: '1rem' }} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}