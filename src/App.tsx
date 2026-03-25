import { TaskContextProvider } from "./contexts/TaskContexts/TaskContextProvider";
import { Home } from "./pages/Home";

import "./styles/global.css";
import "./styles/themes.css";

export function App() {
  return (
    <TaskContextProvider>
      <Home />
    </TaskContextProvider>
  );
}
