import { useState } from "react";
import AuthForm from "./Pages/AuthLanding/AuthForm.jsx";
import Header  from "./Components/Header/Header.jsx";
import Home  from "./Pages/Home/Home.jsx";
import CareerQuiz  from "./Pages/Career-Quiz/CareerQuiz.jsx";
import QuizResults  from "./Pages/QuizResults/QuizResults.jsx";
import CareerExploration  from "./Pages/Career-Exploration/CareerExploration.jsx";
import Resources  from "./Pages/Resources/Resources.jsx";
import Contact  from "./Pages/Contact/Contact.jsx";
import Footer  from "./Components/Footer/Footer.jsx";

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
      <AuthForm/>
      {/* <Header 
        currentSection={currentSection} 
        onSectionChange={setCurrentSection}
      />
      {renderCurrentSection()}
      <Footer onSectionChange={setCurrentSection} /> */}
    </div>
  );
}