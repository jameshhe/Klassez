import Landing from "./components/landing";
import Login from "./components/login";
import Register from "./components/register/register";
import ClassDetails from "./components/classDetails";
import ClassList from "./components/classList/classList";
import ClassSelector from "./components/classSelector/classSelector";
import ClassForm from "./components/classForm";
import { ProfilePage } from "./components/profile/profilePage";

export const ROUTES = [
    { path: "/", component: Landing },
    { path: "/landing", component: Landing },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/classList", component: ClassList },
    { path: "/classSelector", component: ClassSelector },
    { path: "/classes/new", component: ClassForm },
    { path: "/classes/edit/:classId", component: ClassForm },
    { path: "/classes/:classId", component: ClassDetails },
    { path: "/profile", component: ProfilePage }
]