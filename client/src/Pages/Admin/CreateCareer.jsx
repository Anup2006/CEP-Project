import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createCareer,
  updateCareer,
  fetchCareerBySlug,
  clearSelectedCareer
} from "../../redux/careerSlice";

export default function CreateCareer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id ,slug} = useParams();
  const isEditMode = Boolean(id);
  const { loading, error, selectedCareer } = useSelector(
    (state) => state.career
  );

  const initialFormState = {
    title: "",
    category: "",
    description: "",
    detailedDescription: "",
    averageSalary: "",
    jobGrowth: "",
    educationRequired: "",
    workEnvironment: "",
    workCulture: "",
    futureScope: "",
    keySkills: "",
    dailyActivities: "",
    careerLevels: "",
    streamRequired: "",
    popularCourses: "",
    entranceExams: "",
    topColleges: "",
    topEmployers: "",
  };

  const [form, setForm] = useState(initialFormState);
  const [salaryProgression, setSalaryProgression] = useState([
    { level: "", range: "" },
  ]);

  // FETCH CAREER FOR EDIT
  useEffect(() => {
    if (isEditMode && slug) {
      dispatch(fetchCareerBySlug(slug));
    }
    return () => {
      dispatch(clearSelectedCareer());
    };
  }, [dispatch, slug, isEditMode]);

  // PREFILL FORM 
  useEffect(() => {
    if (selectedCareer && isEditMode) {
      setForm({
        ...selectedCareer,
        keySkills: selectedCareer.keySkills.join(", "),
        dailyActivities: selectedCareer.dailyActivities.join(", "),
        careerLevels: selectedCareer.careerLevels.join(", "),
        streamRequired: selectedCareer.streamRequired.join(", "),
        popularCourses: selectedCareer.popularCourses.join(", "),
        entranceExams: selectedCareer.entranceExams.join(", "),
        topColleges: selectedCareer.topColleges.join(", "),
        topEmployers: selectedCareer.topEmployers.join(", "),
      });

      setSalaryProgression(
        selectedCareer.salaryProgression || [{ level: "", range: "" }]
      );
    }
  }, [selectedCareer, isEditMode]);

  // HANDLERS
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSalaryChange = (index, field, value) => {
    const updated = [...salaryProgression];
    updated[index][field] = value;
    setSalaryProgression(updated);
  };

  const addSalaryLevel = () => {
    setSalaryProgression([...salaryProgression, { level: "", range: "" }]);
  };

  const removeSalaryLevel = (index) => {
    const updated = salaryProgression.filter((_, i) => i !== index);
    setSalaryProgression(updated.length ? updated : [{ level: "", range: "" }]);
  };

  // SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      keySkills: form.keySkills.split(",").map((s) => s.trim()),
      dailyActivities: form.dailyActivities.split(",").map((a) => a.trim()),
      careerLevels: form.careerLevels.split(",").map((l) => l.trim()),
      streamRequired: form.streamRequired.split(",").map((s) => s.trim()),
      popularCourses: form.popularCourses.split(",").map((c) => c.trim()),
      entranceExams: form.entranceExams.split(",").map((e) => e.trim()),
      topColleges: form.topColleges.split(",").map((c) => c.trim()),
      topEmployers: form.topEmployers.split(",").map((e) => e.trim()),
      salaryProgression,
    };

    if (isEditMode) {
      dispatch(updateCareer({ careerId: id, updatedData: payload }))
        .unwrap()
        .then(() => {
          toast.success("Career updated successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
          setTimeout(() => {
            navigate("/app/explore-careers");
          }, 1500);
        })
        .catch((err) => {
           toast.error(err.message || "Failed to update career");
        });
    } else {
      dispatch(createCareer(payload))
        .unwrap()
        .then(() => {
          toast.success("Career updated successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
          setTimeout(() => {
            navigate("/app/explore-careers");
          }, 1500);
        })
        .catch((err) => {
           toast.error(err.message || "Failed to create career");
        });
    }
  };
  
  return (
    <div className="max-w-5xl mx-auto p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-gray-800">
           {isEditMode ? "Update Career" : "Create Career"}
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input name="title" placeholder="Career Title" value={form.title} onChange={handleChange} required />
          <Input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
          <Input name="averageSalary" placeholder="Average Salary" value={form.averageSalary} onChange={handleChange} />
          <Input name="jobGrowth" placeholder="Job Growth" value={form.jobGrowth} onChange={handleChange} />
        </div>

        <Textarea name="description" placeholder="Short Description" value={form.description} onChange={handleChange} required />
        <Textarea name="detailedDescription" placeholder="Detailed Description" value={form.detailedDescription} onChange={handleChange} />

        <Textarea name="educationRequired" placeholder="Education Required" value={form.educationRequired} onChange={handleChange} />
        <Textarea name="workEnvironment" placeholder="Work Environment" value={form.workEnvironment} onChange={handleChange} />
        <Textarea name="workCulture" placeholder="Work Culture" value={form.workCulture} onChange={handleChange} />
        <Textarea name="futureScope" placeholder="Future Scope" value={form.futureScope} onChange={handleChange} />

        {/* Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input name="keySkills" placeholder="Key Skills (comma separated)" value={form.keySkills} onChange={handleChange} />
          <Input name="dailyActivities" placeholder="Daily Activities (comma separated)" value={form.dailyActivities} onChange={handleChange} />
          <Input name="careerLevels" placeholder="Career Levels (comma separated)" value={form.careerLevels} onChange={handleChange} />
          <Input name="streamRequired" placeholder="Streams Required (comma separated)" value={form.streamRequired} onChange={handleChange} />
          <Input name="popularCourses" placeholder="Popular Courses (comma separated)" value={form.popularCourses} onChange={handleChange} />
          <Input name="entranceExams" placeholder="Entrance Exams (comma separated)" value={form.entranceExams} onChange={handleChange} />
          <Input name="topColleges" placeholder="Top Colleges (comma separated)" value={form.topColleges} onChange={handleChange} />
          <Input name="topEmployers" placeholder="Top Employers (comma separated)" value={form.topEmployers} onChange={handleChange} />
        </div>

        {/* Salary Progression */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-700">
            Salary Progression
          </h3>

          {salaryProgression.map((item, index) => (
            <div key={index} className="flex gap-3">
              <Input
                placeholder="Level (Entry, Mid, Senior)"
                value={item.level}
                onChange={(e) =>
                  handleSalaryChange(index, "level", e.target.value)
                }
              />
              <Input
                placeholder="Range (₹4–6 LPA)"
                value={item.range}
                onChange={(e) =>
                  handleSalaryChange(index, "range", e.target.value)
                }
              />
              <button type="button" onClick={() => removeSalaryLevel(index)} className="text-red-500 hover:underline">Remove</button>
            </div>
          ))}

          <button
            type="button"
            onClick={addSalaryLevel}
            className="text-sm text-blue-600 hover:underline"
          >
            + Add Salary Level
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-400 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-60"
        >
          {loading
            ? isEditMode ? "Updating..." : "Creating..."
            : isEditMode ? "Update Career" : "Create Career"
          }
        </button>
      </form>
    </div>
  );
}

/* Reusable Inputs */
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
