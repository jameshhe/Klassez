import Landing from "./components/landing";
import Login from "./components/login";
import Register from "./components/register/register";
import ClassList from "./components/classList/classList";
import ClassForm from "./components/classForm";
import { ProfilePage } from "./components/profile/profilePage";


export const ROUTES = [
    { path: "/", component: Landing },
    { path: "/landing", component: Landing },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/classList", component: ClassList },
    { path: "/classForm", component: ClassForm },
    { path: "/classForm/edit/:classId", component: ClassForm },
    { path: "/profile", component: ProfilePage }
]