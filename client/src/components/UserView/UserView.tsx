import "./UserView.css";

type IUserView = {
    username: string,
};

export const UserView = ({ username }: IUserView) => {
  return (
    <div className="user-view">
      <div className="user-view__logo">
        {username.slice(0, 1).toUpperCase()}
      </div>
      <span className="user-view__name">{username}</span>
    </div>
  );
};
