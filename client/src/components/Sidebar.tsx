import { FaPlus } from "react-icons/fa";
import UserOptions from "./UserOptions";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top-area">
        <h2 className="logo">Kanban App</h2>
        <div className="favourites">
          <div className="header">
            <p>Favourites</p>
          </div>
        </div>
        <div className="private">
          <div className="header">
            <p>Private</p>
            <FaPlus />
          </div>
        </div>
      </div>
      <UserOptions />
    </div>
  );
};

export default Sidebar;
