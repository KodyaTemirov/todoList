import React from "react";
import s from "./index.module.scss";

import Input from "../components/Input";
import Empty from "../components/Empty";
import Task from "../components/Task";

import { useToDoStore } from "../../data/stores/useToDoStore";

export const App: React.FC = () => {
  const [tasks, createTask, updateTask, removeTask] = useToDoStore((state) => [
    state.tasks,
    state.createTask,
    state.updateTask,
    state.removeTask,
  ]);

  return (
    <article className={s.article}>
      <h1 className={s.articleTitle}>To Do App</h1>
      <section className={s.articleSection}>
        <Input
          onAdd={(title) => {
            if (title) {
              createTask(title);
            }
          }}
        />
      </section>
      <section className={s.articleSection}>
        {!tasks.length ? (
          <Empty />
        ) : (
          <div>
            {tasks.map(({ title, id }) => {
              return (
                <Task
                  id={id}
                  key={id}
                  title={title}
                  onDone={removeTask}
                  onEdited={updateTask}
                  onRemoved={removeTask}
                />
              );
            })}
          </div>
        )}
      </section>
    </article>
  );
};
