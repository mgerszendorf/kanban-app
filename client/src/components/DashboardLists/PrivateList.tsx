import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IDashboard, Store } from "../../redux/types";
import dashboardApi from "../../api/dashboardApi";
import { setDashboards } from "../../redux/features/dashboardSlice";
import { setNavigationElement } from "../../redux/features/navigationElementSlice";

const PrivateList = () => {
  const dashboardState = useSelector(
    (state: Store) => state.dashboardState.value
  );
  const [activeIndex, setActiveIndex] = useState(0);
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
        console.log(err);
      }
    };
    getDashboards();
  }, [dispatch]);

  //Navigating to active dashboard
  useEffect(() => {
    const activeItem = dashboardState?.findIndex(
      (e: IDashboard) => e.id === dashboardId
    );
    if (dashboardState?.length > 0 && dashboardId === undefined) {
      navigate(`/dashboards/${dashboardState[0].id}`);
    }
    setActiveIndex(activeItem);
  }, [dashboardState, dashboardId, navigate]);

  //Drag and drop handler
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
      console.log(err);
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEndHandler}>
        <Droppable
          key={"list-dashboard-droppable-key"}
          droppableId={"list-dashboard-droppable"}
        >
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {dashboardState?.map((item: any, index: any) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided: any, snapshot: any) => (
                    <Link
                      className={
                        index === activeIndex
                          ? "private-element active"
                          : "private-element"
                      }
                      onClick={() => dispatch(setNavigationElement(false))}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      to={`/dashboards/${item.id}`}
                    >
                      <p>{item?.icon}</p>
                      <p>{item?.title}</p>
                    </Link>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default PrivateList;
