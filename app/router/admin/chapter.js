const {
  ChapterController,
} = require("../../http/controllers/admin/course/chapterController");

const router = require("express").Router();

//? desc Create New Chapter
//? POST /admin/chapters/add-chapter
router.put("/add", ChapterController.addNewChapter); //! create new chapter

//? desc Get list of chapters
//? GET /admin/chapters/:id
router.get("/list/:courseID", ChapterController.getChapters); //! get list of chapters

module.exports = {
  ChapterAdminApiRoutes: router,
};
