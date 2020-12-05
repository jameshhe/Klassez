import Schedule from "./components/schedule/schedule";
import ClassForm from "./components/classForm";
import { ProfileEditor } from "./components/profile/profileEditor";

export const PRIVATE_ROUTES = [
    { path: "/schedule", component: Schedule },
    { path: "/classes/teacher/new", component: ClassForm },
    { path: "/classes/edit/:classId", component: ClassForm },
    { path: "/editProfile", component: ProfileEditor }
]