import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { IDashboard, Store } from "../redux/types";
import UserOptions from "../components/UserOptions";
import { setNavigationElement } from "../redux/features/navigationElementSlice";
import dashboardApi from "../api/dashboardApi";
import { setDashboards } from "../redux/features/dashboardSlice";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function MobileMenu() {
  const [activeIndex, setActiveIndex] = useState(0);
  const dashboardState = useSelector(
    (state: Store) => state.dashboardState.value
  );
  const menuState = useSelector((state: Store) => state.navigationElementState);
  const { dashboardId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
                    {dashboardState?.map((element: any, index: any) => (
                      <Draggable
                        key={element.id}
                        draggableId={element.id}
                        index={index}
                      >
                        {(provided: any, snapshot: any) => (
                          <div
                            className="private-element"
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                          >
                            <p>{element?.icon}</p>
                            <p>{element?.title}</p>
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
    </section>
  );
}

export default MobileMenu;
