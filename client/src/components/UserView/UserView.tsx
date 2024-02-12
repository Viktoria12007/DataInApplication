import "./UserView.css";
import {FC} from "react";

type IUserView = {
    username: string,
};

export const UserView: FC<IUserView> = ({ username }) => {
  return (
    <div className="user-view">
      <div className="user-view__logo">
        {username.slice(0, 1).toUpperCase()}
      </div>
      <span className="user-view__name">{username}</span>
    </div>
  );
};
