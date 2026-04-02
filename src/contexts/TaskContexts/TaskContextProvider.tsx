import { useRef, useEffect, useReducer } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./taskReducer";
import { TimerWorkerManager } from "../../workers/TimerWorkerManager";
import { TaskActionTypes } from "./taskActions";
import { loadBeep } from "../../utils/loadBeep";
import type { TaskStateModel } from "../../models/TaskStateModel";

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
    const storagedState = localStorage.getItem("state");

    if (storagedState === null) return initialTaskState;

    const parsedStorageState = JSON.parse(storagedState) as TaskStateModel;

    return {
      ...parsedStorageState,
      activeTask: null,
      secondsRemaining: 0,
      formattedSecondsRemaining: "00:00",
    };
  });

  const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);
  const worker = useRef<TimerWorkerManager | null>(null);

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
    if (!state.activeTask) {
      if (worker.current) {
        worker.current.terminate();
        worker.current = null;
      }
      return;
    }
    document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`;

    if (!worker.current) {
      worker.current = TimerWorkerManager.getInstance();
      worker.current.onmessage((e) => {
        const countDownSeconds = e.data;

        if (countDownSeconds <= 0) {
          if (playBeepRef.current) {
            playBeepRef.current();
            playBeepRef.current = null;
          }

          dispatch({
            type: TaskActionTypes.COMPLETE_TASK,
          });

          worker.current?.terminate();
          worker.current = null;
        } else {
          dispatch({
            type: TaskActionTypes.COUNT_DOWN,
            payload: { secondsRemaining: countDownSeconds },
          });
        }
      });
    }

    worker.current.postMessage(state);
  }, [state]);

  useEffect(() => {
    if (state.activeTask && playBeepRef.current === null) {
      playBeepRef.current = loadBeep();
    } else if (!state.activeTask) {
      playBeepRef.current = null;
    }
  }, [state.activeTask]);

  useEffect(() => {
    return () => {
      if (worker.current) {
        worker.current.terminate();
        worker.current = null;
      }
    };
  }, []);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
