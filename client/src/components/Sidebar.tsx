import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import UserOptions from "./UserOptions";
import dashboardApi from "../api/dashboardApi";
import { useDispatch, useSelector } from "react-redux";
import { setDashboards } from "../redux/features/dashboardSlice";
import { IDashboard, Store } from "../redux/types";
import { useNavigate, useParams } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Loader from "./Loader";

const Sidebar = () => {
  const authState = useSelector((state: Store) => state.authState.value);
  const dashboardState = useSelector(
    (state: Store) => state.dashboardState.value
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dashboardId } = useParams();
  const [activeIndex, setActiveIndex] = useState(0);

  //Fetching data
  useEffect(() => {
    const getDashboards = async () => {
      try {
        const res = await dashboardApi.getAll();
        dispatch(setDashboards(res));
      } catch (err) {
        alert(err);
      }
    };
    getDashboards();
  }, [dispatch]);

  useEffect(() => {
    const activeItem = dashboardState?.findIndex(
      (e: any) => e.id === dashboardId
    );
    if (dashboardState?.length > 0 && dashboardId === undefined) {
      navigate(`/dashboards/${dashboardState[0].id}`);
    }
    setActiveIndex(activeItem);
  }, [dashboardState, dashboardId, navigate]);

  const onDragEndHandler = async ({ source, destination }: any) => {
    const newList = [...dashboardState];
    const [removed] = newList.splice(source.index, 1);
    newList.splice(destination.index, 0, removed);

    const activeItem = newList.findIndex((e) => e.id === dashboardId);
    setActiveIndex(activeItem);
    dispatch(setDashboards(newList));

    try {
      await dashboardApi.updatePosition({ dashboards: newList });
    } catch (err) {
      alert(err);
    }
  };

  const addDashboard = async () => {
    try {
      const res = await dashboardApi.create();
      const newList = [res, ...dashboardState];
      dispatch(setDashboards(newList));
      navigate(`/dashboards/${res.id}`);
    } catch (err) {
      alert(err);
    }
  };

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
            <div className="favourite-element">
              <p>📃</p>
              <p>Untitled</p>
            </div>
          </div>
        </div>
        <div className="private">
          <div className="header">
            <p>Private</p>
            <FaPlus onClick={addDashboard} />
          </div>
          <div className="content">
            <DragDropContext onDragEnd={onDragEndHandler}>
              <Droppable
                key={"list-dashboard-droppable-key"}
                droppableId={"list-dashboard-droppable"}
              >
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {dashboardState?.map((item: any, index: any) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided: any, snapshot: any) => (
                          <div
                            className="private-element"
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            selected={index === activeIndex}
                          >
                            <p>{item?.icon}</p>
                            <p>{item?.title}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>
      <UserOptions />
    </div>
  );
};

export default Sidebar;
