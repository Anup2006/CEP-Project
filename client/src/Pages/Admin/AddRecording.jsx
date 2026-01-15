import { useState } from "react";
import { useDispatch } from "react-redux";
import { addRecording } from "../../redux/webinarSlice.js";
import {X} from "lucide-react";
import { toast } from "react-toastify";

export default function AddRecording({ webinarId,token, onClose }) {
  const dispatch = useDispatch();
  const [recordingUrl, setRecordingUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addRecording({ webinarId:webinarId,token ,recordingUrl }))
    .unwrap()
    .then(() => {
      toast.success("Recording added successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      onClose();
    })
    .catch((err) => {
        toast.error(err.message || "Failed to add recording");
    });
  };

  return (
    <div className="modal-overlay p-4" onClick={onClose}>
        <div
            className="modal-content p-4"
            onClick={(e) => e.stopPropagation()}
        >
            <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-md space-y-4 ">
                <div className="modal-header flex items-start justify-between gap-4 px-4 py-3">
                    <h2 className="text-xl font-bold">Add Recording</h2>
                    <button
                        onClick={onClose}
                        className="shrink-0 p-2 rounded-full hover:bg-gray-200 transition"
                        aria-label="Close"
                        >
                        <X className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                </div>
                <input
                    type="url"
                    placeholder="Recording URL"
                    value={recordingUrl}
                    onChange={(e) => setRecordingUrl(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    required
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
            </form>
        </div>
    </div> 
  );
}
