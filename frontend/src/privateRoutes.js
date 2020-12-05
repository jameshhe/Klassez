import ClassForm from "./components/classForm";
import { ProfileEditor } from "./components/profile/profileEditor";
import TeacherReviewForm from "./components/Naishur/teacherReviewForm";
import ClassReviewForm from "./components/Naishur/classReviewForm";

export const PRIVATE_ROUTES = [
    { path: "/classes/teacher/new", component: ClassForm },
    { path: "/classes/edit/:classId", component: ClassForm },
    { path: "/editProfile", component: ProfileEditor },
    { path: "/recommendations/classes/new/:classID", component: ClassReviewForm},
    { path: "/recommendations/teachers/new/:teacherID", component: TeacherReviewForm}
]