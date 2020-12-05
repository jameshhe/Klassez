import Landing from "./components/landing";
import Login from "./components/login";
import Register from "./components/register/register";
import ClassDetails from "./components/classDetails";
import ClassList from "./components/classList/classList";
import ClassSelector from "./components/classSelector/classSelector";
import { ProfilePage } from "./components/profile/profilePage";
import ClassReview from "./components/Naishur/classReview";
import TeacherRecommendations from "./components/Naishur/teacherRecommendations";
import Schedule from "./components/schedule/schedule";

export const ROUTES = [
    { path: "/", component: Landing },
    { path: "/landing", component: Landing },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/classList", component: ClassList },
    { path: "/classSelector", component: ClassSelector },
    { path: "/schedule", component: Schedule },
    { path: "/classes/:classId", component: ClassDetails },
    { path: "/profile", component: ProfilePage },
    { path: "/recommendations/classes/:classID", component: ClassReview},
    { path: "/recommendations/teachers/:teacherID", component: TeacherRecommendations},
]