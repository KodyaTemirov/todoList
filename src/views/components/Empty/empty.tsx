import React from "react";
import s from "./empty.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";

export const Empty: React.FC = () => {
  return (
    <div className={s.empty}>
      <FontAwesomeIcon icon={faListCheck} className={s.emptyIcon} />
      <p className={s.emptyText}>The list of tasks is empty</p>
    </div>
  );
};
