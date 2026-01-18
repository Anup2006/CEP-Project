import {Router} from "express";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/multer.middleware.js";
import { addVideoByAdmin, deleteVideo, getAllVideos, searchYoutubeVideos } from "../controllers/video.controller.js";
import { getAllWebinars,createWebinar,registerForWebinar,getWebinarById,deleteWebinar,addRecordingLink} from "../controllers/webinar.controller.js";
import { createStudyMaterial, deleteStudyMaterial, getAllStudyMaterials } from "../controllers/studyMaterial.controller.js";
import { aiCareerChat } from "../controllers/aiChatBot.controller.js";
const router = Router()

//videos
router.route("/videos").get(getAllVideos)
router.route("/videos/search").get(searchYoutubeVideos)
router.route("/videos/create-video").post(verifyJwt,authorizeRoles("admin"),
    upload.single("video"),
    addVideoByAdmin
)
router.route("/videos/:id").delete(verifyJwt,authorizeRoles("admin"),deleteVideo)

//webinar
router.route("/webinars").get(getAllWebinars);
router.route("/webinar/:id").get(getWebinarById);
router.route("/create-webinar").post(
  verifyJwt,
  authorizeRoles("admin", "mentor"),
  createWebinar
);
router.route("/webinars/:id/register").post(
  verifyJwt,
  authorizeRoles("student"),
  registerForWebinar
);
router.route("/webinars/:id").delete(
  verifyJwt,
  authorizeRoles("admin"),
  deleteWebinar
);
router.route("/webinars/:id/recording").patch(
  verifyJwt,
  authorizeRoles("admin", "mentor"),
  addRecordingLink
);

//studyMaterials
router.route("/study-materials").get(getAllStudyMaterials);

router.route("/create-study-material").post(
  verifyJwt,
  authorizeRoles("admin"),
  upload.single("pdf"),
  createStudyMaterial
);
router.route("/study-material/:id").delete(
  verifyJwt,
  authorizeRoles("admin"),
  deleteStudyMaterial
);

//chat bot
router.route("/chatbot").post(verifyJwt, aiCareerChat)

export default router;