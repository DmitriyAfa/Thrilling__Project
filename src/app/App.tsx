import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { Suspense, useContext, useState } from "react";
import "./styles/index.scss";
import { classNames } from "shared/lib/helpers/classNames/classNames";
import { useTheme } from "app/providers/ThemeProvider/lib/useTheme";
import { AboutPage } from "pages/AboutPage";
import { MainPage } from "pages/MainPage";

const App = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={classNames("app", [theme])}>
      <button onClick={toggleTheme}>TOGGLE</button>
      <Link to={"/"}>Главная страница</Link>
      <Link to={"/about"}>О сайте</Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
