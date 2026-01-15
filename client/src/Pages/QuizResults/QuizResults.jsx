import { useDispatch } from "react-redux";
import { clearQuiz,fetchQuizQuestions} from "../../redux/quizSlice";

export default function QuizResults({ result }) {
  const dispatch = useDispatch();
  const handleRetake = () => {
    dispatch(clearQuiz());
    dispatch(fetchQuizQuestions()); 
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-10">
      <div className="max-w-[1000px] mx-auto space-y-6">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center">
          <h1 className="text-3xl font-black text-slate-900">
            🎯 Your Career Matches
          </h1>
          <p className="text-slate-500 mt-2">
            Based on your personality & interests
          </p>
        </div>

        {/* Recommendations */}
        <div className="grid gap-6">
          {result.recommendations.map((rec, i) => (
            <div
              key={rec.careerId}
              className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  #{i + 1} {rec.title}
                </h3>
                <p className="text-slate-500 text-sm">
                  Career compatibility score
                </p>
              </div>

              <div className="text-2xl font-black text-blue-600">
                {rec.score}
              </div>
            </div>
          ))}
        </div>

        {/* Action */}
        <div className="text-center">
          <button
            onClick={handleRetake}
            className="mt-4 px-10 py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
