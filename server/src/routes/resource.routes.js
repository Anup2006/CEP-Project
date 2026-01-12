import {Router} from "express";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/multer.middleware.js";
import { addVideoByAdmin, getAllVideos, searchYoutubeVideos } from "../controllers/video.controller.js";
const router = Router()

router.route("/videos").get(getAllVideos)
router.route("/videos/search").get(searchYoutubeVideos)
router.route("/videos/create-video").post(verifyJwt,authorizeRoles("admin"),
    upload.single("video"),
    addVideoByAdmin
)

export default router;