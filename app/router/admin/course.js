const {
  ChapterController,
} = require("../../http/controllers/admin/course/chapterController");
const {
  CourseController,
} = require("../../http/controllers/admin/course/courseController");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();

//? desc Get All Courses
//? GET /admin/courses/list
router.get("/list", CourseController.getAllCourses); //! get all courses

//? desc get a course by ID
//? GET /admin/courses/:id
router.get("/:id", CourseController.getCourseByID); //! get a course

//? desc Create New Course
//? POST /admin/courses/add
router.post(
  "/add",
  uploadFile.single("image"),
  stringToArray("tags"),
  CourseController.addNewCourse
); //! create new course

//? desc Remove Course
//? Delete /admin/category/add
// router.delete(); //! remove course

//? desc Update A Category
//? PATCH /admin/category/update/:courseID
router.patch(
  "/update/:courseID",
  uploadFile.single("image"),
  CourseController.updateCourse
); //! edit course

module.exports = {
  CourseAdminApiRoutes: router,
};
