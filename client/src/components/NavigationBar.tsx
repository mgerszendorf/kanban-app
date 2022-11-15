import { useDispatch } from "react-redux";
import { setNavigationElement } from "../redux/features/navigationElementSlice";

function NavigationBar() {
  const dispatch = useDispatch();

  return (
    <div className="navigation-bar">
      <div className="logo">Kanban App</div>
      <div
        className="menu-button"
        onClick={() => dispatch(setNavigationElement(true))}
      >
        <input className="menu-button__cheeckbox" type="checkbox" />
        <div>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
