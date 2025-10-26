import { useState } from "react";
import Header  from "./Header/Header.jsx";
import Home  from "./Home/Home.jsx";
import CareerQuiz  from "./Career-Quiz/CareerQuiz.jsx";
import QuizResults  from "./QuizResults/QuizResults.jsx";
import CareerExploration  from "./Career-Exploration/CareerExploration.jsx";
import Resources  from "./Resources/Resources.jsx";
import Contact  from "./Contact/Contact.jsx";
import Footer  from "./Footer/Footer.jsx";
import "./App.css";

export default function App() {
  const [currentSection, setCurrentSection] = useState("home");
  const [quizResults, setQuizResults] = useState(null);

  const handleQuizComplete = (results) => {
    setQuizResults(results);
    setCurrentSection("results");
  };

  const handleStartQuiz = () => {
    setCurrentSection("quiz");
    setQuizResults(null);
  };

  const handleBackToHome = () => {
    setCurrentSection("home");
    setQuizResults(null);
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case "home":
        return <Home onStartQuiz={handleStartQuiz} />;
      case "quiz":
        return (
          <CareerQuiz 
            onComplete={handleQuizComplete} 
            onBack={handleBackToHome}
          />
        );
      case "results":
        return quizResults ? (
          <QuizResults 
            scores={quizResults} 
            onBack={handleBackToHome}
            onRetakeQuiz={handleStartQuiz}
          />
        ) : (
          <Home onStartQuiz={handleStartQuiz} />
        );
      case "explore":
        return <CareerExploration />;
      case "resources":
        return <Resources />;
      case "contact":
        return <Contact />;
      default:
        return <Home onStartQuiz={handleStartQuiz} />;
    }
  };

  return (
    <div className="app">
      <Header 
        currentSection={currentSection} 
        onSectionChange={setCurrentSection}
      />
      {renderCurrentSection()}
      <Footer onSectionChange={setCurrentSection} />
    </div>
  );
}