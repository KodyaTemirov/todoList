import React from "react";
import s from "./input.module.scss";
interface InputProps {
  onAdd: (title: string) => void;
}

export const Input: React.FC<InputProps> = ({ onAdd }) => {
  return <input></input>;
};
