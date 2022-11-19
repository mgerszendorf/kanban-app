import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { Store } from "../redux/types";
import UserOptions from "../components/UserOptions";
import { setNavigationElement } from "../redux/features/navigationElementSlice";
import dashboardApi from "../api/dashboardApi";
import { setDashboards } from "../redux/features/dashboardSlice";
import FavouriteList from "../components/DashboardLists/FavouriteList";
import PrivateList from "../components/DashboardLists/PrivateList";
import Loader from "../components/Loader";

function MobileMenu() {
  const [loader, setLoader] = useState(false);
  const dashboardState = useSelector(
    (state: Store) => state.dashboardState.value
  );
  const menuState = useSelector((state: Store) => state.navigationElementState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Fetching data
  useEffect(() => {
    const getDashboards = async () => {
      try {
        setLoader(true);
        const res = await dashboardApi.getAll();
        dispatch(setDashboards(res));
      } catch (err) {
        console.log(err);
      } finally {
        setLoader(false);
      }
    };
    getDashboards();
  }, [dispatch]);

  const addDashboard = async () => {
    try {
      setLoader(true);
      const res = await dashboardApi.create();
      const newList = [res, ...dashboardState];
      dispatch(setDashboards(newList));
      navigate(`/dashboards/${res.id}`);
    } catch (err) {
      alert(err);
    } finally {
      setLoader(false);
    }
  };

  if (loader) return <Loader />;

  return (
    <section className="mobile-menu">
      <div className="nav-bar">
        <div className="logo">Kanban App</div>
        <div
          className="menu-button"
          onClick={() => dispatch(setNavigationElement(false))}
        >
          {menuState ? (
            <input
              className="menu-button__cheeckbox"
              type="checkbox"
              readOnly
              checked
            />
          ) : (
            <input
              className="menu-button__cheeckbox"
              type="checkbox"
              readOnly
            />
          )}

          <div>
            <span></span>
            <span></span>
          </div>
        </div>
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
    </section>
  );
}

export default MobileMenu;
