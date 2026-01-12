import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addVideoByAdmin } from "../../redux/videoSlice.js";

export default function CreateVideo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.videos);

  const initialFormState = {
    title: "",
    description: "",
    category: "",
    duration: "",
    youtubeUrl: "",
  };

  const [form, setForm] = useState(initialFormState);
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    if (file) {
      formData.append("video", file);
    }

    dispatch(addVideoByAdmin(formData))
      .unwrap()
      .then(() => {
        toast.success("Video added successfully", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });

        setTimeout(() => {
          navigate("/app/resources");
        }, 1500);
      })
      .catch((err) => {
        toast.error(err.message || "Failed to add video");
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-gray-800">
          Add New Video
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            name="title"
            placeholder="Video Title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <Input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            required
          />

          <Input
            name="duration"
            placeholder="Duration (optional)"
            value={form.duration}
            onChange={handleChange}
          />
        </div>

        <Textarea
          name="description"
          placeholder="Video Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <div className="space-y-3">
          <Input
            name="youtubeUrl"
            placeholder="YouTube URL (optional)"
            value={form.youtubeUrl}
            onChange={handleChange}
          />

          <p className="text-sm text-gray-500 text-center">
            OR
          </p>

          <input
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-400 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-60"
        >
          {loading ? "Uploading..." : "Add Video"}
        </button>

        {error && (
          <p className="text-red-600 text-center">{error}</p>
        )}
      </form>
    </div>
  );
}


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
