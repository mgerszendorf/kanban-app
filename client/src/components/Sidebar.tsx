import { FaPlus } from "react-icons/fa";
import UserOptions from "./UserOptions";
import dashboardApi from "../api/dashboardApi";
import { useDispatch, useSelector } from "react-redux";
import { setDashboards } from "../redux/features/dashboardSlice";
import { Store } from "../redux/types";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import FavouriteList from "./DashboardLists/FavouriteList";
import PrivateList from "./DashboardLists/PrivateList";
import { useState } from "react";

const Sidebar = () => {
  const dashboardState = useSelector(
    (state: Store) => state.dashboardState.value
  );
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addDashboard = async () => {
    try {
      setLoader(true);
      const res = await dashboardApi.create();
      const newList = [res, ...dashboardState];
      dispatch(setDashboards(newList));
      navigate(`/dashboards/${res.id}`);
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  if (loader) return <Loader />;

  return (
    <div className="sidebar">
      <div className="top-area">
        <h2 className="logo">Kanban App</h2>
      </div>
      <div className="categories">
        <div className="favourites">
          <div className="header">
            <p>Favourites</p>
          </div>
          <div className="content">
            <FavouriteList />
          </div>
        </div>
        <div className="private">
          <div className="header">
            <p>Private</p>
            <FaPlus onClick={addDashboard} />
          </div>
          <div className="content">
            <PrivateList />
          </div>
        </div>
      </div>
      <UserOptions />
    </div>
  );
};

export default Sidebar;
