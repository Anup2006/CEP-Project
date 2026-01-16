import { useState,useRef } from "react";
import { Edit,FileText, Download, Search, Play, X,Trash2, ExternalLink, Calendar, Clock, Target, BookOpen, Users, Lightbulb } from "lucide-react";
import "./Resources.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,useLocation } from "react-router-dom";
import { useEffect } from "react";
import {
  deleteVideo,
  fetchAllVideos,
  searchYoutubeVideos,
} from "../../redux/videoSlice.js";
import { fetchWebinars, registerWebinar,deleteWebinar  } from "../../redux/webinarSlice.js";
import { deleteStudyMaterial, fetchStudyMaterials } from "../../redux/studyMaterialSlice.js";
import WebinarDetail from "./webinarDetail.jsx";
import AddRecording from "../Admin/AddRecording.jsx";

export default function Resources() {
  const [activeTab, setActiveTab] = useState("materials");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tabFromQuery = searchParams.get("tab") || "materials";
  
  useEffect(() => {
      setActiveTab(tabFromQuery);
  }, [tabFromQuery]);

  const [searchQuery, setSearchQuery] = useState("");
  const { videos, loading,error } = useSelector((state) => state.videos);
  const {user,token} = useSelector(state=>state.auth);
  const [playingVideo, setPlayingVideo] = useState(null); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { materials, loading:materialloading } = useSelector((state) => state.studyMaterials);
  const [preview, setPreview]=useState(null);

  useEffect(() => {
    if (activeTab === "materials") {
      dispatch(fetchStudyMaterials());
    }
  }, [activeTab, dispatch]);  

  const handleDeleteMaterial=(materialId)=>{
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this study material?"
    );

    if (!confirmDelete) return;

    dispatch(deleteStudyMaterial({ materialId,token}))
    .unwrap()
    .then(() => {
      toast.success("Successfully Deleted", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    })
    .catch((err) => {
        toast.error(err.message || "Failed to delete study material");
    });
  }

  const forceDownload = async () => {
    const res = await fetch(preview.fileUrl);
    const blob = await res.blob();

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${preview.title || "study-material"}.pdf`;

    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
  };


  useEffect(() => {
    if (activeTab === "videos") {
      dispatch(fetchAllVideos());
    }
  }, [activeTab, dispatch]);
  
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    dispatch(searchYoutubeVideos(searchQuery));
  };
  
  const mappedVideos = videos?.map((video, index) => ({
    id: video._id || index,
    title: video.title,
    description: video.description,
    source: video.source,      
    youtubeVideoId: video.youtubeVideoId,
    thumbnail: video.thumbnail || `https://img.youtube.com/vi/${video.youtubeVideoId}/hqdefault.jpg`,
    duration: video.duration || "N/A",
    videoUrl: video.videoUrl, 
    views: video.views || "—",
  }));
  
  const getVideoUrl = (video) => {
    if (!video) return "";
    if (video.source === "youtube" && video.youtubeVideoId) {
      return `https://www.youtube.com/watch?v=${video.youtubeVideoId}`;
    } else if (video.source === "cloudinary" && video.videoUrl) {
      return video.videoUrl;
    }
    return "";
  };

  const handleDeleteVideo=(videoId)=>{
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this video?"
    );

    if (!confirmDelete) return;

    dispatch(deleteVideo({ videoId,token}))
    .unwrap()
    .then(() => {
      toast.success("Successfully Deleted", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    })
    .catch((err) => {
        toast.error(err.message || "Failed to delete video");
    });
  }

  const { webinars, loading: webinarLoading } = useSelector((state) => state.webinars);

  useEffect(() => {
    if (activeTab === "webinars") {
      dispatch(fetchWebinars());
    }
  }, [activeTab, dispatch]);

  const handleDelete = (webinarId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this webinar?"
    );

    if (!confirmDelete) return;

    dispatch(deleteWebinar({webinarId: webinarId,token}))
    .unwrap()
    .then(() => {
      toast.success("Successfully Deleted", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    })
    .catch((err) => {
        toast.error(err.message || "Failed to delete webinar");
    });

  };

  const [selectedWebinarId, setSelectedWebinarId] = useState(null);
  const [showWebinarModal, setShowWebinarModal] = useState(false);

  const [showRecordingModal, setShowRecordingModal] = useState(false);
  const handleEdit=()=>{
      setShowRecordingModal(true);
  }

  const handleRegister = (webinarId) => {
    dispatch(
      registerWebinar({
        webinarId,
        token,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Successfully registered for webinar", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      })
      .catch((err) => {
        toast.error(err?.message || "Failed to register webinar", {
          position: "top-right",
        });
      });
  };

  const isRegistered = (webinar, userId) => {
    if (!webinar.registeredUsers || !userId) return false;

    return webinar.registeredUsers.some(
      (u) => u === userId || u?._id === userId
    );
  };

  const careerTips = [
    {
      icon: Target,
      title: "Set Clear Goals",
      description: "Define your short-term and long-term career objectives to stay focused and motivated."
    },
    {
      icon: BookOpen,
      title: "Continuous Learning",
      description: "Stay updated with industry trends and continuously develop new skills throughout your career."
    },
    {
      icon: Users,
      title: "Build Networks",
      description: "Connect with professionals, mentors, and peers in your field of interest."
    },
    {
      icon: Lightbulb,
      title: "Stay Curious",
      description: "Maintain an inquisitive mindset and explore different opportunities and experiences."
    }
  ];

  return (
    <div className="resources-section">
      <div className="resources-container">
        {/* Header */}
        <div className="resources-header">
          <h1 className="resources-title">
            Career Resources & Learning Materials
          </h1>
          <p className="resources-description">
            Access comprehensive study materials, expert guidance videos, live webinars, 
            and practical career tips to support your educational journey.
          </p>
        </div>

        {/* Tabs */}
        <div className="resources-tabs">
          <div className="tabs-navigation">
            {[
              { id: "materials", label: "Study Materials" },
              { id: "videos", label: "Expert Videos" },
              { id: "webinars", label: "Webinars" },
              { id: "tips", label: "Career Tips" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Study Materials Tab */}
          {activeTab === "materials" && (
            <div className="tab-content">
              {user?.role === "admin" ? (
                <button
                  onClick={() => navigate("/app/admin/addMaterial")}
                  className="bg-gray-400 text-white hover:bg-gray-600 px-4 py-2 rounded-lg w-full mb-2"
                >
                  + Add Material
                </button>
              ):(null)}
              <div className="materials-grid">
                {materials.map((material) => (
                  <div key={material._id} className="material-card">
                    <div className="material-header">
                      <div className="material-title-section">
                        <div className="material-title-content">
                          <h3 className="material-title">{material.title}</h3>
                          <div className="material-badges">
                            <span className="material-badge secondary">
                              {material.category}
                            </span>
                            <span className="material-badge outline">
                              {material.type}
                            </span>
                          </div>
                        </div>
                        <FileText className="material-icon pb-1" />
                        {(user?.role === "admin" || user?.role === "mentor")? (
                        <div>
                          <button 
                            className="delete-icon top-2 right-2 ml-2 px-1 hover:bg-red-100 rounded-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteMaterial(material._id);
                            }}
                          >
                            <Trash2 className="w-5 h-5 text-red-600" />
                          </button>
                        </div>):(null)}
                      </div>
                      <p className="material-description">{material.description}</p>
                    </div>
                    <div className="material-content">
                      <div className="material-footer">
                        <span className="material-pages">{material.pages} pages</span>
                        <div className="flex gap-2">
                          <button className="download-button mt-2"
                            onClick={()=>{setPreview(material)}}
                          >
                            Preview 
                          </button>
                          <button
                            onClick={forceDownload}
                            className="download-button mt-2"
                          >
                            <Download className="download-icon" />Download
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}


          {/* Expert Videos Tab */}
          {activeTab === "videos" && (
          <div>
            {/* Search bar */}
            <div className="bg-white p-2 search-container">
              <Search className="search-icon" />
              <input
                type="text"
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search videos..."
              />
              <button className="bg-gray-500 text-white font-bold px-4 rounded-lg" onClick={handleSearch}>Search</button>
              {user?.role === "admin" ? (
                <button
                className="bg-gray-500 text-white font-bold px-4 rounded-lg" onClick={() => navigate("/app/admin/createVideo")}
                >
                  +Add
                </button>
              ):(null)}
            </div>
            <div className="videos-grid mt-4">
              {loading && <p>Loading videos...</p>}
              {mappedVideos.map((video) => (
                <div key={video.youtubeVideoId || video.id} className="video-card">
                  <div className="video-thumbnail">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="video-image"
                      />
                    <div className="video-overlay">
                      <div className="play-button">
                        <Play className="play-icon" />
                      </div>
                    </div>
                    <div className="video-duration">
                      {video.duration || "-"}
                    </div>
                  </div>
                  <div className="video-header">
                    <h3 className="video-title">{video.title}</h3>
                    <p className="video-description">{video.description}</p>
                  </div>
                  <div className="video-content">
                    <div className="video-footer">
                      <span className="video-views">{video.views.toLocaleString() || "-"} views</span>
                      <div className="flex">
                        <button className="watch-button mt-2"
                          onClick={() => setPlayingVideo(video)}
                        >
                          <ExternalLink className="external-icon" />
                          Watch Video
                        </button>
                        {(user?.role === "admin" || user?.role === "mentor")? (
                          <div>
                            <button 
                              className="delete-icon top-2 mt-4 right-2 ml-2 px-1 hover:bg-red-100 rounded-full"
                              onClick={(e) => {
                                e.stopPropagation();                              
                                handleDeleteVideo(video.youtubeVideoId || video.id);
                              }}
                            >
                              <Trash2 className="w-5 h-5 text-red-600" />
                            </button>
                          </div>):(null)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          )}

          {/* Webinars Tab */}
          {activeTab === "webinars" && (
            <div className="webinars-list">
              {user?.role === "admin" ? (
                <button
                  onClick={() => navigate("/app/admin/createWebinar")}
                  className="bg-gray-400 text-white hover:bg-gray-600 px-4 py-2 rounded-lg w-full mb-2"
                >
                  + Create Webinar
                </button>
              ):(null)}
              {webinarLoading && <p>Loading webinars...</p>}
              {webinars.map((webinar) => (
                <div key={webinar._id} className="webinar-card">
                  <div className="webinar-content">
                    <div className="webinar-main" onClick={() => {
                    setSelectedWebinarId(webinar._id);
                    setShowWebinarModal(true);}}
                    >
                      <div className="webinar-info">
                        <div className="webinar-title-row">
                          <h3 className="webinar-title">{webinar.title}</h3>
                          <span className={`webinar-status ${webinar.status}`}>
                            {webinar.status}
                          </span>
                        </div>
                        <p className="webinar-description">{webinar.description}</p>
                        <div className="webinar-details">
                          <div className="webinar-detail">
                            <Calendar className="calendar-icon" />
                            <span>{new Date(webinar.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}</span>
                          </div>
                          <div className="webinar-detail">
                            <Clock className="calendar-icon" />
                            <span>{webinar.duration} min</span>
                          </div>
                        </div>
                      </div>
                      <div className="webinar-action">
                        {webinar.status === "upcoming" && user?.role === "student" &&
                          !isRegistered(webinar, user._id) &&(   
                          <button
                            className="register-button"
                            onClick={() => handleRegister(webinar._id)}
                          >
                            Register Now
                          </button>
                        )}

                        {webinar.status === "upcoming" &&
                          user?.role === "student" &&
                          isRegistered(webinar, user._id) && (
                            <span className="text-green-600 font-semibold">
                              Registered ✔
                            </span>
                        )}

                        {webinar.status === "live" &&
                          !isRegistered(webinar, user._id) && (
                            <p className="text-sm text-red-500">
                              You didn't register!!
                            </p>
                        )}

                        {webinar.status === "live" && webinar.meetingLink && 
                          user && 
                          isRegistered(webinar, user._id) &&  (
                          <a
                            href={webinar.meetingLink}
                            target="_blank"
                            rel="noreferrer"
                            className="view-recording-button"
                          >
                            Join Live
                          </a>
                        )}

                        {webinar.status === "completed" && webinar.recordingUrl && (
                          <a
                            href={webinar.recordingUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="view-recording-button"
                          >
                            View Recording
                          </a>
                        )}

                        {(user?.role === "admin" || user?.role === "mentor")? (
                          <div>
                            <button 
                              className="delete-icon top-2 right-2 ml-2 px-1 hover:bg-red-100 rounded-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(webinar._id);
                              }}
                            >
                              <Trash2 className="w-5 h-5 text-red-600" />
                            </button>
                            {webinar.status === "completed" &&<button 
                              className="delete-icon top-2 right-2 ml-2 px-1 hover:bg-gray-200 rounded-full"
                              onClick={(e)=>{
                                e.stopPropagation();
                                handleEdit()}
                              }
                            >
                              <Edit className="w-5 h-5 text-gray-600" />
                            </button>}
                            {showRecordingModal && webinar.status === "completed" &&(
                              <AddRecording
                                webinarId={webinar._id} 
                                token={token}          
                                onClose={() => setShowRecordingModal(false)} 
                              />
                            )}
                          </div>
                        ):(null)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {showWebinarModal && selectedWebinarId && (
                <WebinarDetail
                  webinarId={selectedWebinarId}
                  token={token}
                  show={showWebinarModal}
                  onClose={() => setShowWebinarModal(false)}
                />
              )}
            </div>
          )}

          {/* Career Tips Tab */}
          {activeTab === "tips" && (
            <div className="tab-content">
              <div className="tips-grid">
                {careerTips.map((tip, index) => (
                  <div key={index} className="tip-card">
                    <div className="tip-icon-wrapper">
                      <tip.icon className="tip-icon" />
                    </div>
                    <h3 className="tip-title">{tip.title}</h3>
                    <p className="tip-description">
                      {tip.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Pro Tips Section */}
              <div className="pro-tips-card">
                <div className="pro-tips-header">
                  <h3 className="pro-tips-title">💡 Pro Tips for Career Success</h3>
                </div>
                <div className="pro-tips-content">
                  <div className="pro-tips-grid">
                    <div className="pro-tips-section">
                      <h4 className="pro-tips-section-title">For Class 10 Students:</h4>
                      <div className="pro-tips-list">
                        <div className="pro-tips-item">
                          <span className="pro-tips-bullet">•</span>
                          <span>Focus on building strong fundamentals in core subjects</span>
                        </div>
                        <div className="pro-tips-item">
                          <span className="pro-tips-bullet">•</span>
                          <span>Explore different career options through internships or workshops</span>
                        </div>
                        <div className="pro-tips-item">
                          <span className="pro-tips-bullet">•</span>
                          <span>Develop time management and study habits early</span>
                        </div>
                        <div className="pro-tips-item">
                          <span className="pro-tips-bullet">•</span>
                          <span>Start building a portfolio of extracurricular activities</span>
                        </div>
                      </div>
                    </div>
                    <div className="pro-tips-section">
                      <h4 className="pro-tips-section-title">For Class 12 Students:</h4>
                      <div className="pro-tips-list">
                        <div className="pro-tips-item">
                          <span className="pro-tips-bullet">•</span>
                          <span>Research colleges and courses thoroughly before applying</span>
                        </div>
                        <div className="pro-tips-item">
                          <span className="pro-tips-bullet">•</span>
                          <span>Prepare for entrance exams with focused study plans</span>
                        </div>
                        <div className="pro-tips-item">
                          <span className="pro-tips-bullet">•</span>
                          <span>Network with seniors and industry professionals</span>
                        </div>
                        <div className="pro-tips-item">
                          <span className="pro-tips-bullet">•</span>
                          <span>Consider backup plans and alternative career paths</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {playingVideo && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            onClick={() => setPlayingVideo(null)}
          >
            <div
              className="relative w-11/12 md:w-3/4 lg:w-2/3 aspect-video bg-black rounded-lg shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-white absolute top-2 left-2 z-50">
                URL: {getVideoUrl(playingVideo)}
              </p>
              {playingVideo.source === "youtube" && playingVideo.youtubeVideoId ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${playingVideo.youtubeVideoId}?rel=0&autoplay=1&controls=1`}
                  title={playingVideo.title}
                  frameBorder="0"
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                />
              ) : playingVideo.source === "cloudinary" && playingVideo.videoUrl ? (
                <video
                  src={playingVideo.videoUrl}
                  poster={playingVideo.thumbnail}
                  controls
                  autoPlay
                  className="w-full h-full rounded-lg"
                />
              ) : (
                <p className="text-white p-4">Video URL not available</p>
              )}
              <button
                className="absolute top-2 right-2 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200 transition"
                onClick={() => setPlayingVideo(null)}
              >
                <X className="w-5 h-5 text-black" />
              </button>
            </div>
          </div>
        )}
        {preview&& (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            onClick={() => setPreview(null)}
          >
            <div
              className="bg-white w-11/12 md:w-3/4 lg:w-2/3 h-[85vh] rounded-lg relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="font-semibold">{preview.title}</h3>
                <button
                  onClick={forceDownload}
                  className="download-button mt-2 mr-10"
                >
                  <Download className="download-icon" />Download
                </button>

                <button
                  className="absolute top-2 right-2 mt-5 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200 transition"
                  onClick={() => setPreview(null)}
                  >
                  <X className="w-5 h-5  text-black" />
                </button>
              </div>
              {/* Browser PDF Viewer */}
              <iframe
                src={preview.fileUrl}
                className="w-full h-full"
                title="PDF Preview"
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}