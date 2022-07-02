import React, { useState } from "react";
import s from "./index.module.scss";

import Tab from "../components/Tab";
import Input from "../components/Input";
import Empty from "../components/Empty";
import Task from "../components/Task";

import { useToDoStore } from "../../data/stores/useToDoStore";

export const App: React.FC = () => {
  const [tasks, createTask, updateTask, removeTask, doneTask] = useToDoStore(
    (state) => [
      state.tasks,
      state.createTask,
      state.updateTask,
      state.removeTask,
      state.doneTask,
    ]
  );
  const [tabStatus, setTabStatus] = useState(true);

  const handler = () => {
    setTabStatus(!tabStatus);
  };
  return (
    <article className={s.article}>
      <h1 className={s.articleTitle}>To Do App</h1>
      <Tab changeHandler={handler} tabStatus={tabStatus} />
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
          tasks
            .filter((task) => (tabStatus ? !task.isDone : task.isDone))
            .map(({ title, id, createdAt, isDone }) => {
              return (
                <Task
                  id={id}
                  key={id}
                  title={title}
                  isDone={isDone}
                  createdAt={createdAt}
                  onDone={doneTask}
                  onEdited={updateTask}
                  onRemoved={removeTask}
                />
              );
            })
        )}
      </section>
    </article>
  );
};
