import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createStudyMaterial } from "../../redux/studyMaterialSlice.js";

export default function AddMaterial() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.studyMaterials);
  const {token } = useSelector((state) => state.auth);

  const [file, setFile] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    pages: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("PDF file is required");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("pages", form.pages);
    formData.append("pdf", file);

    dispatch(createStudyMaterial({ formData, token }))
      .unwrap()
      .then(() => {
        toast.success("Study material uploaded successfully");
        navigate("/app/resources?tab=materials");
      })
      .catch((err) => {
        toast.error(err || "Upload failed");
      });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md p-8 space-y-6"
      >
        {/* Header */}
        <div className="flex gap-4 items-center">
          <ArrowLeft
            className="cursor-pointer"
            onClick={() => navigate("/app/resources?tab=materials")}
          />
          <h2 className="text-3xl font-bold text-gray-800">
            Upload Study Material
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            name="title"
            placeholder="Material Title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <Input
            name="category"
            placeholder="Category (Medical, Commerce, Engineering)"
            value={form.category}
            onChange={handleChange}
            required
          />

          <Input
            name="pages"
            type="number"
            placeholder="Number of Pages"
            value={form.pages}
            onChange={handleChange}
            required
          />
        </div>

        <Textarea
          name="description"
          placeholder="Material Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        {/* File Upload */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Upload PDF
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-400 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-60"
        >
          {loading ? "Uploading..." : "Upload Material"}
        </button>
      </form>
    </div>
  );
}

const Input = (props) => (
  <input
    {...props}
    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
  />
);

const Textarea = (props) => (
  <textarea
    {...props}
    rows={4}
    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
  />
);
