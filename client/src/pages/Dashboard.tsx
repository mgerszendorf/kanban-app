import { useEffect, useState, useRef } from "react";
import dashboardApi from "../api/dashboardApi";
import { useNavigate, useParams } from "react-router-dom";
import { FaTrashAlt, FaStar, FaRegStar } from "react-icons/fa";
import Kanban from "../components/Kanban";
import Emoji from "../components/Emoji";
import { useSelector } from "react-redux";
import { Store } from "../redux/types";
import { useDispatch } from "react-redux";
import { setFavouriteList } from "../redux/features/favouriteSlice";
import { setDashboards } from "../redux/features/dashboardSlice";
import useAutosizeTextArea from "../helpers/useAutosizeTextArea";
import Loader from "../components/Loader";
import { ISection } from "../types/ISections";

function Dashboard() {
  const { dashboardId } = useParams<string>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionLines, setDescriptionLines] = useState(1);
  const [sections, setSections] = useState<ISection[]>([]);
  const [isFavourite, setIsFavourite] = useState(false);
  const [icon, setIcon] = useState("");
  const [loader, setLoader] = useState(false);
  const dashboardState = useSelector(
    (state: Store) => state.dashboardState.value
  );
  const favouriteListState = useSelector(
    (state: Store) => state.favouriteListState.value
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(descriptionRef.current, description);

  const titleRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(titleRef.current, title);

  //Fetching data
  useEffect(() => {
    const getDashboard = async () => {
      try {
        setLoader(true);
        const res = await dashboardApi.getOne(dashboardId);
        const { title, description, favourite, icon } = res?.dashboard;
        setTitle(title as string);
        setDescription(description as string);
        setSections(res?.sections);
        setIsFavourite(favourite as boolean);
        setIcon(icon as string);
      } catch (err) {
        console.log(err);
      } finally {
        setLoader(false);
      }
    };
    getDashboard();
  }, [dashboardId, isFavourite]);

  //Checking how many lines a description has
  useEffect(() => {
    let lines = description.split(/\r|\r\n|\n/);
    let count = lines.length;
    setDescriptionLines(count);
  }, [description]);

  const onIconChange = async (newIcon: string) => {
    let temp = [...dashboardState];
    const index = temp.findIndex((e) => e.id === dashboardId);
    temp[index] = { ...temp[index], icon: newIcon };

    if (isFavourite) {
      let tempFavourite = [...favouriteListState];
      const favouriteIndex = tempFavourite.findIndex(
        (e) => e.id === dashboardId
      );
      tempFavourite[favouriteIndex] = {
        ...tempFavourite[favouriteIndex],
        icon: newIcon,
      };
      dispatch(setFavouriteList(tempFavourite));
    }

    setIcon(newIcon);
    dispatch(setDashboards(temp));
    setLoader(true);
    try {
      await dashboardApi.update(dashboardId, { icon: newIcon });
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  const updateTitle = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTitle = e.currentTarget.value;
    setTitle(newTitle);

    let temp = [...dashboardState];
    const index = temp.findIndex((e) => e.id === dashboardId);
    temp[index] = { ...temp[index], title: newTitle };

    if (isFavourite) {
      let tempFavourite = [...favouriteListState];
      const favouriteIndex = tempFavourite.findIndex(
        (e) => e.id === dashboardId
      );
      tempFavourite[favouriteIndex] = {
        ...tempFavourite[favouriteIndex],
        title: newTitle,
      };
      dispatch(setFavouriteList(tempFavourite));
    }

    dispatch(setDashboards(temp));

    try {
      await dashboardApi.update(dashboardId, { title: newTitle });
    } catch (err) {
      console.log(err);
    }
  };

  const updateDescription = async (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newDescription = e.target.value;
    setDescription(newDescription);
    try {
      await dashboardApi.update(dashboardId, { description: newDescription });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteDashboard = async () => {
    try {
      setLoader(true);
      await dashboardApi.delete(dashboardId);
      if (isFavourite) {
        const newFavouriteList = favouriteListState.filter(
          (e) => e.id !== dashboardId
        );
        dispatch(setFavouriteList(newFavouriteList));
      }

      const newList = dashboardState.filter((e) => e.id !== dashboardId);
      if (newList.length === 0) {
        navigate("/dashboards");
      } else {
        navigate(`/dashboards/${newList[0].id}`);
      }
      dispatch(setDashboards(newList));
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  const addFavourite = async () => {
    try {
      setLoader(true);
      const dashboard = await dashboardApi.update(dashboardId, {
        favourite: !isFavourite,
      });
      console.log(dashboard)
      let newFavouriteList = [...favouriteListState];
      if (isFavourite) {
        newFavouriteList = newFavouriteList.filter((e) => e.id !== dashboardId);
      } else {
        newFavouriteList.unshift(dashboard);
      }
      dispatch(setFavouriteList(newFavouriteList));
      setIsFavourite(!isFavourite);
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  if (loader) return <Loader />;

  return (
    <section className="dashboard">
      <div className="dashboard-info">
        <div className="options-bar">
          <div className="left">
            {isFavourite ? <FaStar className="star" onClick={addFavourite} /> : <FaRegStar className="star" onClick={addFavourite} />}

            <FaTrashAlt className="trash" onClick={deleteDashboard} />
          </div>
        </div>
        <div className="title-description-wrapper">
          <div className="title">
            <Emoji icon={icon} onIconChange={onIconChange} />
            <textarea
              value={title}
              onChange={updateTitle}
              ref={titleRef}
              rows={1}
            />
          </div>
          <textarea
            className="description"
            value={description}
            onChange={updateDescription}
            ref={descriptionRef}
            rows={descriptionLines}
          />
        </div>
      </div>
      <Kanban sections={sections} dashboardId={dashboardId} />
    </section>
  );
}

export default Dashboard;
