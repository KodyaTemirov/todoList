import React, { useState } from "react";
import s from "./task.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faEdit } from "@fortawesome/free-solid-svg-icons";

interface TaskProps {
  id: string;
  title: string;
  onDone: (id: string) => void;
  onEdited: (id: string, title: string) => void;
  onRemoved: (id: string) => void;
}

export const Task: React.FC<TaskProps> = ({
  id,
  title,
  onDone,
  onEdited,
  onRemoved,
}) => {
  const [checked, setChecked] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(title);

  const checkboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setChecked(checked);
    checked && onDone(id);
  };

  const removeHandler = () => {
    confirm("Are you sure?") && onRemoved(id);
  };

  const editModeHandler = () => {
    setIsEditMode(true);
  };
  const editOnChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };
  return (
    <div className={s.task}>
      <label htmlFor="" className={s.taskLabel}>
        <input
          type="checkbox"
          disabled={isEditMode}
          checked={checked}
          className={s.taskCheckbox}
          onChange={checkboxChange}
        />
        {!isEditMode ? (
          <h3 className={s.taskTitle}>{title}</h3>
        ) : (
          <input
            value={inputValue}
            onChange={editOnChange}
            className={s.taskEditInput}
          />
        )}
      </label>
      <div className={s.taskActions}>
        <button
          aria-label="Edit"
          className={s.taskEdit}
          onClick={editModeHandler}
        >
          <FontAwesomeIcon icon={faEdit} className={s.taskButtonIcon} />
        </button>
        <button
          aria-label="Remove"
          className={s.taskRemove}
          onClick={removeHandler}
        >
          <FontAwesomeIcon icon={faTrashCan} className={s.taskButtonIcon} />
        </button>
      </div>
    </div>
  );
};
