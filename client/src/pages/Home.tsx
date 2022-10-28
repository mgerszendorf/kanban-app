import React from "react";
import { useDispatch, useSelector } from "react-redux";
import dashboardApi from "../api/dashboardApi";
import { setGuestDashboards } from "../redux/features/guestDashboardSlice";
import { Store } from "../redux/types";

function Home() {
  const authState = useSelector((state: Store) => state.authState);
  const dispatch = useDispatch();

  const createDashboard = async () => {
    if (authState?.user) {
      try {
        const res = await dashboardApi.create();
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    } else {
      dispatch(
        setGuestDashboards({
          user: "guest",
          icon: "📃",
          title: "Untitle",
          description:
            "Please add a description here. If you need it, your description can be…",
        })
      );
    }
  };

  return (
    <section className="home">
      <div className="first-dashboard-wrapper">
        <p>
          You are currently in guest mode. If you want your boards to be saved
          please sign in or create an account.
        </p>
        <button className="first-dashboard" onClick={createDashboard}>
          Create your first dashboard
        </button>
      </div>
    </section>
  );
}

export default Home;
