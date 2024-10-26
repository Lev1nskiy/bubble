import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import { Main } from "./components/main/main";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { useSelector } from "react-redux";
import { selectTheme } from "./store/Theme/selectors";
import { Profile } from "./components/profile/profile";
import { LeaderBoardPage } from "./components/leaderBoardPage/leaderBoard";
import { AdminPage } from "./components/profile/adminPage/profile";
import { NotFound } from "./components/notFound/notFound";
import { EditCourses } from "./components/courses/EditCourses/EditCourses";
import { EditCourse } from "./components/courses/EditCourse/EditCourse";
import { PassCourse } from "./components/courses/PassCourse/PassCourse";
import LoginForm from "./components/loginForm/LoginForm";
import { Courses } from "./components/courses/courses";

function App() {
  const { theme } = useSelector(selectTheme);

  return (
    <Router>
      <div className={theme}>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/leaderboard" element={<LeaderBoardPage />} />
          <Route path="/adminpage" element={<AdminPage />} />
          <Route path="/edit_courses" element={<EditCourses />} />
          <Route path="/course/edit/:id" element={<EditCourse />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/pass/course/:id" element={<PassCourse />} />
          <Route path="/login" element={<LoginForm />} /> {/* Новый маршрут */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
