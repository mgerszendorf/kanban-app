import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import dashboardApi from "../api/dashboardApi";
import Loader from "../components/Loader";
import { setDashboards } from "../redux/features/dashboardSlice";

function Home() {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createDashboard = async () => {
    try {
      setLoader(true);
      const res = await dashboardApi.create();
      dispatch(setDashboards([res]));
      navigate(`/dashboards/${res.id}}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  if (loader) return <Loader />;

  return (
    <>
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
    </>
  );
}

export default Home;
