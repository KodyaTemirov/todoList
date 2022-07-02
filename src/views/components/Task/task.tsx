import React, { useEffect, useRef, useState } from "react";
import s from "./task.module.scss";
import dateFormat, { masks } from "dateformat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faEdit,
  faCheck,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

interface TaskProps {
  id: string;
  title: string;
  createdAt: number;
  isDone: boolean;
  onDone: (id: string, isDone: boolean) => void;
  onEdited: (id: string, title: string) => void;
  onRemoved: (id: string) => void;
}

export const Task: React.FC<TaskProps> = ({
  id,
  title,
  createdAt,
  isDone,
  onDone,
  onEdited,
  onRemoved,
}) => {
  const [checked, setChecked] = useState(isDone);
  const [isEditMode, setIsEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(title);
  const editTitleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    isEditMode && editTitleInputRef?.current?.focus();
  }, [isEditMode]);

  const checkboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setChecked(checked);
    onDone(id, checked);
  };

  const removeHandler = () => {
    confirm("Are you sure?") && onRemoved(id);
  };

  const editModeHandler = () => {
    setIsEditMode(true);
  };

  const saveModeHandler = () => {
    onEdited(id, inputValue);
    setIsEditMode(false);
  };

  const editOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };
  const date = dateFormat(createdAt, "d.mm.yy");
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
          <div className={s.taskInfo}>
            <h3 className={s.taskTitle}>{title}</h3>
            <span className={s.taskDate}>
              <FontAwesomeIcon
                icon={faCalendarDays}
                className={s.taskButtonIcon}
              />
              {date}
            </span>
          </div>
        ) : (
          <input
            ref={editTitleInputRef}
            value={inputValue}
            onChange={editOnChange}
            className={s.taskEditInput}
          />
        )}
      </label>
      <div className={s.taskActions}>
        {!isEditMode ? (
          <button
            aria-label="Edit"
            className={s.taskEdit}
            onClick={editModeHandler}
          >
            <FontAwesomeIcon icon={faEdit} className={s.taskButtonIcon} />
          </button>
        ) : (
          <button
            aria-label="Save"
            className={s.taskSave}
            onClick={saveModeHandler}
          >
            <FontAwesomeIcon icon={faCheck} className={s.taskButtonIcon} />
          </button>
        )}
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
