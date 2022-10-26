const {
  EpisodeController,
} = require("../../http/controllers/admin/course/episodeController");
const { uploadVideo } = require("../../utils/multer");

const router = require("express").Router();

//? desc Create New Episode
//? POST /admin/episodes/add/:id
router.post(
  "/add",
  uploadVideo.single("video"),
  EpisodeController.addNewEpisode
);

router.delete("/remove/:episodeID", EpisodeController.removeEpisode);

module.exports = {
  EpisodeAdminApiRoutes: router,
};
