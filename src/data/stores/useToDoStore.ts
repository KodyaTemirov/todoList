import create, { StateCreator, State } from "zustand";
import generateId from "../helpers";

interface Task {
  id: string;
  title: string;
  createdAt: number;
  isDone: boolean;
}

interface ToDoStore {
  tasks: Task[];
  createTask: (title: string) => void;
  updateTask: (id: string, title: string) => void;
  removeTask: (id: string) => void;
  doneTask: (id: string, isDone: boolean) => void;
}
function isToDoStore(object: any): object is ToDoStore {
  return "tasks" in object;
}
const localStorageUpdate =
  <T extends State>(config: StateCreator<T>): StateCreator<T> =>
  (set, get, api) =>
    config(
      (nextState, ...args) => {
        if (isToDoStore(nextState)) {
          window.localStorage.setItem("tasks", JSON.stringify(nextState.tasks));
        }
        set(nextState, ...args);
      },
      get,
      api
    );

const getCurrentState = () => {
  try {
    const currentState = JSON.parse(
      window.localStorage.getItem("tasks") || "[]"
    ) as Task[];
    return currentState;
  } catch (err) {
    window.localStorage.setItem("task", "[]");
  }
  return [];
};

export const useToDoStore = create<ToDoStore>(
  localStorageUpdate((set, get) => ({
    tasks: getCurrentState(),
    createTask: (title: string) => {
      const { tasks } = get();
      const newTask = {
        id: generateId(),
        title,
        createdAt: Date.now(),
        isDone: false,
      };
      set({
        tasks: [newTask].concat(tasks),
      });
    },
    updateTask: (id: string, title: string) => {
      const { tasks } = get();
      set({
        tasks: tasks.map((task) => ({
          ...task,
          title: task.id === id ? title : task.title,
        })),
      });
    },
    removeTask: (id: string) => {
      const { tasks } = get();
      set({
        tasks: tasks.filter((task) => task.id !== id),
      });
    },
    doneTask: (id: string, isDone: boolean) => {
      const { tasks } = get();
      set({
        tasks: tasks.map((task) => ({
          ...task,
          isDone: task.id === id ? !task.isDone : task.isDone,
        })),
      });
      console.log(tasks);
    },
  }))
);
