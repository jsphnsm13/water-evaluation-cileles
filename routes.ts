import { createBrowserRouter } from "react-router";
import { MainLayout } from "./components/MainLayout";
import { HomePage } from "./components/HomePage";
import { DashboardPage } from "./components/DashboardPage";
import { EducationPage } from "./components/EducationPage";
import { AboutPage } from "./components/AboutPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "dashboard", Component: DashboardPage },
      { path: "tentang", Component: AboutPage },
      { path: "edukasi", Component: EducationPage },
    ],
  },
]);