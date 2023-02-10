import "./styles/index.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { AppRouter } from "./providers/router";
import { Navbar } from "widgets/Navbar";
import { useTheme } from "./providers/ThemeProvider/lib/useTheme";
import { Sidebar } from "widgets/Sidebar";

const App = () => {
  const { theme } = useTheme();
  return (
    <div className={classNames("app", [theme])}>
      <Navbar />
      <div className="content-page">
        <Sidebar />
        <AppRouter />
      </div>
    </div>
  );
};

export default App;
