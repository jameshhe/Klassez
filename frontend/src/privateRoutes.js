import ClassDetails from "./components/classDetails";
import Schedule from "./components/schedule/schedule";
import Home from "./components/home";
import ClassForm from "./components/classForm";

export const PRIVATE_ROUTES = [
    {path: "/home", component: Home},
    {path: "/classes/:classId", component: ClassDetails },
    {path: "/schedule", component: Schedule},
    {path: "/classes/new", component: ClassForm},
    {path: "/classes/edit/:classId", component: ClassForm}
]
