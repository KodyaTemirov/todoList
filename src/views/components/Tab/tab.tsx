import React from "react";
import s from "./tab.module.scss";
import clsx from "clsx";

interface TabProps {
  tabStatus: boolean;
  changeHandler: () => void;
}

export const Tab: React.FC<TabProps> = ({ changeHandler, tabStatus }) => {
  return (
    <div className={s.tab}>
      <button
        className={clsx(s.tabButton, { [s.tabActive]: tabStatus })}
        onClick={changeHandler}
      >
        To Do
      </button>
      <button
        className={clsx(s.tabButton, { [s.tabActive]: !tabStatus })}
        onClick={changeHandler}
      >
        Done
      </button>
    </div>
  );
};
