import ClassDetails from "./components/classDetails";
import Schedule from "./components/schedule";
import Home from "./components/home";
import ProfilePage from "./components/profile/profilePage";

export const ROUTES = [
    {path: "/home", component: Home},
    {path: "/classes/:classId", component: ClassDetails },
    {path: "/schedule", component: Schedule},
    // {path: "/students/:id", component: ProfilePage}
]
