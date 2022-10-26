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

//? desc Remove Episode
//? POST /admin/episodes/remove/:episodeID
router.delete("/remove/:episodeID", EpisodeController.removeEpisode);

//? desc Update Episode
//? POST /admin/episodes/update/:episodeID
router.patch(
  "/update/:episodeID",
  uploadVideo.single("video"),
  EpisodeController.updateEpisodeByID
);

module.exports = {
  EpisodeAdminApiRoutes: router,
};
