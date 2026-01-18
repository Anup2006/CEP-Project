import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUserMessage, sendMessageToAI } from "../../redux/chatbotSlice.js";
import { MessageCircle } from "lucide-react";

export default function ChatBot() {
  const { messages, loading, quotaReached } = useSelector(state => state.chatbot);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);
  const {user,token} = useSelector(state=>state.auth);

  // useEffect(() => {
  //   chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages, loading]);

  const handleSend = () => {
    if (!input.trim() || loading || quotaReached) return;

    dispatch(addUserMessage(input)); 
    dispatch(sendMessageToAI({message:input},{token:token})); 
    setInput("");
  };

  return (
    <div ref={chatEndRef} className="max-w-10xl  mt-10 bg-white shadow-lg rounded-2xl flex flex-col h-[500px] border">

      <div className="bg-gray-400 text-white p-4 rounded-t-2xl">
        <span className="flex gap-1">
          <MessageCircle size={24} color="white" />
          <h2 className="text-lg font-semibold"> AI Career Assistant</h2>
        </span>
        <p className="text-sm opacity-90">
          Personalized career guidance powered by AI
        </p>
      </div>


      <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-3 bg-gray-50">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[75%] px-4 py-2 rounded-xl text-sm whitespace-pre-wrap  ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-white text-gray-800 shadow rounded-bl-none"
              }`}>
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-2 rounded-xl shadow text-sm text-gray-500">
              AI is typing...
            </div>
          </div>
        )}

      </div>

      <div className="p-3 border-t flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
          placeholder={
            quotaReached
              ? "⚠️ Free usage limit reached"
              : "Ask about careers, skills, future scope..."
          }
          disabled={loading || quotaReached}
          className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-50"
        />

        <button
          onClick={handleSend}
          disabled={loading || quotaReached}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-700 disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
};

