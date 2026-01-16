import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {ArrowLeft} from "lucide-react";
import { useNavigate,useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { createWebinar } from "../../redux/webinarSlice";

export default function CreateWebinar() {
    const dispatch = useDispatch();
    
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.webinars);

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    duration: "",
    meetingLink: "",
    platform: "",
    capacity: "",
    speakerName:"",
    speakerBio: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      speaker: {
        name: form.speakerName,
        bio: form.speakerBio,
      },
      duration: Number(form.duration),
      capacity: Number(form.capacity),
    };

    dispatch(createWebinar({webinarData:payload}))
      .unwrap()
      .then(() => {
        toast.success("Webinar created successfully");
        setTimeout(() => {
          navigate("/app/resources?tab=webinars");
        }, 1200);
      })
      .catch((err) => {
        toast.error(err?.message || "Failed to create webinar");
      });
  };
  
  return (
    <div className="max-w-5xl mx-auto p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md p-8 space-y-6"
      >
        <div className="flex gap-4">
            <ArrowLeft onClick={()=>{navigate("/app/resources?tab=webinars")}}/>
            <h2 className="text-3xl font-bold text-gray-800">
            Create Webinar
            </h2>
        </div>

        {/* Title & Speaker */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            name="title"
            placeholder="Webinar Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <Input
            name="speakerName"
            placeholder="Speaker Name"
            value={form.speakerName}
            onChange={handleChange}
            required
          />
        </div>

        <Input
          name="speakerBio"
          placeholder="Speaker Bio (Ex-Amazon SDE, AI Researcher)"
          value={form.speakerBio}
          onChange={handleChange}
        />
        <Textarea
          name="description"
          placeholder="Webinar Description"
          value={form.description}
          onChange={handleChange}
        />

        {/* Date & Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="datetime-local"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
          <Input
            name="duration"
            placeholder="Duration (minutes)"
            value={form.duration}
            onChange={handleChange}
          />
        </div>

        {/* Meeting Link */}
        <Input
          name="meetingLink"
          placeholder="Meeting Link"
          value={form.meetingLink}
          onChange={handleChange}
          required
        />

        {/* Platform & Capacity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            name="platform"
            placeholder="Platform (Zoom / Google Meet)"
            value={form.platform}
            onChange={handleChange}
          />
          <Input
            name="capacity"
            placeholder="Max Capacity"
            value={form.capacity}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-400 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Webinar"}
        </button>
      </form>
    </div>
  );
}

/* Reusable Inputs */
const Input = (props) => (
  <input
    {...props}
    className="w-full border border-gray-300 rounded-lg px-4 py-2
               focus:ring-2 focus:ring-blue-500 focus:outline-none"
  />
);

const Textarea = (props) => (
  <textarea
    {...props}
    rows={4}
    className="w-full border border-gray-300 rounded-lg px-4 py-2
               focus:ring-2 focus:ring-blue-500 focus:outline-none"
  />
);
