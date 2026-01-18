import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWebinarById, clearWebinar } from "../../redux/webinarSlice";
import {
  X,
  Calendar,
  Clock,
  User,
  Video,
  Timer
} from "lucide-react";

export default function WebinarDetail({ webinarId, token, show, onClose }) {
  const dispatch = useDispatch();
  const { webinar, loading } = useSelector((state) => state.webinars);

  useEffect(() => {
    if (!show) return;
    dispatch(fetchWebinarById({ webinarId, token }));
    return () => dispatch(clearWebinar());
  }, [dispatch, webinarId, token, show]);

  if (!show) return null;
  if (loading) return <p className="text-center">Loading...</p>;
  if (!webinar) return <p className="text-center">Webinar not found</p>;

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  return (
    <div className="modal-overlay p-4" onClick={onClose}>
      <div
        className="modal-content max-w-2xl w-full bg-white rounded-xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b px-6 py-4">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 flex-1">
            {webinar.title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            {webinar.description}
          </p>

          {/* Speaker Card */}
          <div className="bg-gray-50 p-4 rounded-lg border">
            <div className="flex items-center gap-2 font-medium text-gray-800">
              <User className="w-4 h-4 text-blue-500" />
              {webinar.speaker.name}
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {webinar.speaker.bio}
            </p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
              <Calendar className="w-5 h-5 text-purple-500" />
              <span className="text-sm text-gray-700">
                {new Date(webinar.date).toLocaleDateString()}
              </span>
            </div>

            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
              <Clock className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-gray-700">
                {formatTime(webinar.date)}
              </span>
            </div>

            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
              <Timer className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-700">
                {webinar.duration} minutes
              </span>
            </div>

            {webinar.createdBy?.fullname && (
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <User className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-700">
                  Created by {webinar.createdBy.fullname}
                </span>
              </div>
            )}
          </div>

          {/* Join Button */}
          {webinar.status === "live" && webinar.meetingLink && (
            <a
              href={webinar.meetingLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
            >
              <Video className="w-5 h-5" />
              Join Live Webinar
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
