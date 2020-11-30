import ClassDetails from "./components/classDetails";
import Schedule from "./components/schedule/schedule";
import Home from "./components/home";

export const PRIVATE_ROUTES = [
    {path: "/home", component: Home},
    {path: "/classes/:classId", component: ClassDetails },
    {path: "/schedule", component: Schedule}
]
