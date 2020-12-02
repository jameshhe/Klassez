import ClassDetails from "./components/classDetails";
import Schedule from "./components/schedule";
import Home from "./components/home";
import ClassForm from "./components/classForm";
import { ProfilePage } from "./components/profile/profilePage";
import { ProfileEditor } from "./components/profile/profileEditor";

export const ROUTES = [
    {path: "/home", component: Home},
    {path: "/classes/:classId", component: ClassDetails },
    {path: "/schedule", component: Schedule},
    {path: "/classes/new", component: ClassForm},
    {path: "/classes/edit/:classId", component: ClassForm},
    {path: "/profile", component: ProfilePage},
    {path: "/editProfile", component: ProfileEditor},
]
