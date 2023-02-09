import "./styles/index.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { AppRouter } from "./providers/router";
import { Navbar } from "widgets/Navbar";
import { useTheme } from "./providers/ThemeProvider/lib/useTheme";

const App = () => {
  const { theme } = useTheme();
  return (
    <div className={classNames("app", [theme])}>
      <Navbar />
      <AppRouter />
    </div>
  );
};

export default App;
