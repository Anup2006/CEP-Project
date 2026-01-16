import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWebinarById, clearWebinar } from "../../redux/webinarSlice";
import {X} from "lucide-react";

export default function WebinarDetail({ webinarId, token, show, onClose}) {
  const dispatch = useDispatch();
  const { webinar, loading } = useSelector(state => state.webinars);

  useEffect(() => {
    if (!show) return; 
    dispatch(fetchWebinarById({ webinarId, token }));
    return () => dispatch(clearWebinar());
  }, [dispatch, webinarId, token, show]);

  if (!show) return null;
  if (loading) return <p>Loading...</p>;
  if (!webinar) return <p>Webinar not found</p>;

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
  };

  return (
    <>
      <div className="modal-overlay p-4" onClick={onClose}>
      <div
        className="modal-content p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header flex items-start justify-between gap-4 px-4 py-3">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold leading-snug break-words flex-1">
            {webinar.title}
          </h2>

          <button
            onClick={onClose}
            className="shrink-0 p-2 rounded-full hover:bg-gray-200 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
        <p>{webinar.description}</p>
        <p>Speaker Name : {webinar.speaker.name}</p>
        <p>Speaker Bio : {webinar.speaker.bio}</p>
        {webinar.createdBy?.fullname && (
          <span>
            Created By : 👤 {webinar.createdBy.fullname}
          </span>
        )}
        <p>
          📅 {new Date(webinar.date).toLocaleDateString()}
        </p>
        <span>{formatTime(webinar.date)}</span>
        <p>⏱ {webinar.duration} minutes</p>
        <div className="m-3">
          {webinar.status === "live" && webinar.meetingLink && (
            <a href={webinar.meetingLink} target="_blank" className=" p-2 bg-gray-400 text-white" rel="noreferrer">
              Join Live
            </a>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
