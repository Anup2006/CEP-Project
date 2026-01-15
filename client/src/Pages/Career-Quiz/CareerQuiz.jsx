import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchQuizQuestions,
  submitQuizAnswers,
  setAnswer
} from "../../redux/quizSlice";
import QuizResults from "../QuizResults/QuizResults.jsx";

export default function CareerQuiz() {
  const dispatch = useDispatch();
  const { questions, answers, result, loading } = useSelector(
    (state) => state.quiz
  );

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    dispatch(fetchQuizQuestions());
  }, [dispatch]);

  useEffect(() => {
    if (questions.length > 0) {
      setCurrent(0);
    }
  }, [questions]);

  if (loading) {
    return <p className="text-center mt-10">Loading quiz...</p>;
  }

  if (result) return <QuizResults result={result} />;

  const q = questions?.[current];
  if (!q) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-slate-500">Preparing quiz questions...</p>
      </div>
    );
  }
  const selected = answers[current];

  const handleSubmit = () => {
    const formattedAnswers = questions.map((q, index) => {
      const selectedOptionId = answers[index];
      const selectedOption = q.options.find(
        (opt) => opt._id === selectedOptionId
      );

      return {
        questionId: q._id,
        optionId: selectedOptionId,
        traits: selectedOption?.traits || []
      };
    });

    dispatch(submitQuizAnswers(formattedAnswers));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-10">
      <div className="max-w-[1000px] mx-auto">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 space-y-6">
          
          {/* Header */}
          <div>
            <h1 className="text-3xl font-black text-slate-900">
              Career Assessment Quiz
            </h1>
            <p className="text-slate-500 mt-1">
              Answer honestly to get the best career recommendations.
            </p>
          </div>

          {/* Progress */}
          <div className="flex gap-10 justify-between text-sm text-slate-500">
            <span>
              Question {current + 1} of {questions.length}
            </span>
            <div className="progress-bar mt-3">
                <div 
                  className="progress-fill" 
                  style={{ width: `${(((current) / questions.length) * 100)}%` }}
                  ></div>
            </div>
            <span>
              {Math.round(((current) / questions.length) * 100)}% Complete
            </span>
          </div>

          {/* Question */}
          <div>
            <p className="text-lg font-semibold text-slate-800 mb-4">
              {q.question}
            </p>

            <div className="space-y-3">
              {q.options.map((opt) => { 
                const isSelected = answers[current] === opt._id;
                return (
                <button
                  key={opt._id}
                  onClick={() =>
                    dispatch(setAnswer({ questionIndex: current, value: opt._id }))
                  }
                  className={`w-full text-left px-4 py-3 rounded-lg border transition
                    ${
                      isSelected
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white hover:bg-gray-50 border-gray-300"
                    }`}
                >
                  {opt.text}
                </button>
              )})}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between pt-6">
            <button
              disabled={current === 0}
              onClick={() => setCurrent((c) => c - 1)}
              className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
            >
              Back
            </button>

            {current === questions.length - 1 ? (
              <button
                disabled={!selected}
                onClick={handleSubmit}
                className="px-8 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                disabled={!selected}
                onClick={() => setCurrent((c) => c + 1)}
                className="px-8 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 disabled:opacity-50"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
