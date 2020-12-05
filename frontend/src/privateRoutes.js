import Schedule from "./components/schedule/schedule";
import ClassForm from "./components/classForm";
import ClassSelector from "./components/classSelector/classSelector";
import { ProfilePage } from "./components/profile/profilePage";
import { ProfileEditor } from "./components/profile/profileEditor";

export const PRIVATE_ROUTES = [
    { path: "/schedule", component: Schedule },
    { path: "/classes/new", component: ClassForm },
    { path: "/classes/edit/:classId", component: ClassForm },
    { path: "/classSelector", component: ClassSelector },
    { path: "/profile", component: ProfilePage },
    { path: "/editProfile", component: ProfileEditor },
]