import Landing from "./components/landing";
import Login from "./components/login";
import Register from "./components/register/register";
import ClassDetails from "./components/classDetails";
import ClassList from "./components/classList/classList";
import ClassSelector from "./components/classSelector/classSelector";
import { ProfilePage } from "./components/profile/profilePage";
import { TeacherRecommendations } from './Naishur/teacherrecommendations';
import { TeacherReviewForm } from './Naishur/teacherReviewForm';
import { ClassReview } from './Naishur/classReview';
import { ClassReviewForm } from './Naishur/classreviewForm'

export const ROUTES = [
    { path: "/", component: Landing },
    { path: "/landing", component: Landing },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/classList", component: ClassList },
    { path: "/classSelector", component: ClassSelector },
    { path: "/classes/:classId", component: ClassDetails },
    { path: "/profile", component: ProfilePage },
    { path: "/teacherrecommendations", component: TeacherRecommendations},
    { path: "/teacherReviewForm", component: TeacherReviewForm },
    { path: "/classReview", component: ClassReview },
    { path: "/classreviewForm", component: ClassReviewForm },
]