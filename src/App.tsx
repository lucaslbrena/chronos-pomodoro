import { TaskContextProvider } from "./contexts/TaskContexts/TaskContextProvider";

import "./styles/global.css";
import "./styles/themes.css";
import { MessagesContainer } from "./components/MessagesContainer";
import { MainRouter } from "./routers/MainRouter";

export function App() {
  return (
    <TaskContextProvider>
      <MessagesContainer>
        <MainRouter />
      </MessagesContainer>
    </TaskContextProvider>
  );
}
