import React, { useCallback, useState } from "react";
import s from "./input.module.scss";
import { KeyboardEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface InputProps {
  onAdd: (title: string) => void;
}

export const Input: React.FC<InputProps> = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState("");
  const addTask = useCallback(() => {
    onAdd(inputValue);
    setInputValue("");
  }, [inputValue]);

  const inputOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setInputValue(value);
  };
  const onKeyDownEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && addTask();
  };
  return (
    <div className={s.input}>
      <input
        type="text"
        placeholder="Type here..."
        value={inputValue}
        className={s.inputValue}
        onChange={inputOnChange}
        onKeyDown={onKeyDownEnter}
      />
      <button onClick={addTask} className={s.inputButton}>
        <FontAwesomeIcon icon={faPlus} />
        Добавить
      </button>
    </div>
  );
};
