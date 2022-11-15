import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import dashboardApi from "../../api/dashboardApi";
import { setFavouriteList } from "../../redux/features/favouriteSlice";
import { useSelector } from "react-redux";
import { IDashboard, Store } from "../../redux/types";
import { Link, useParams } from "react-router-dom";
import { setNavigationElement } from "../../redux/features/navigationElementSlice";

const FavouriteList = () => {
  const favouriteListState = useSelector(
    (state: Store) => state.favouriteListState.value
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const { dashboardId } = useParams();
  const dispatch = useDispatch();

  //Fetching data
  useEffect(() => {
    const getFavourites = async () => {
      try {
        const res = await dashboardApi.getFavourites();
        dispatch(setFavouriteList(res));
      } catch (err) {
        console.log(err);
      }
    };
    getFavourites();
  }, [dispatch]);

  //Navigating to active dashboard
  useEffect(() => {
    const activeItem = favouriteListState?.findIndex(
      (e: IDashboard) => e.id === dashboardId
    );
    setActiveIndex(activeItem);
  }, [favouriteListState, dashboardId]);

  //Drag and drop handler
  const onDragEndHandler = async ({ source, destination }: any) => {
    const newList = [...favouriteListState];
    const [removed] = newList.splice(source.index, 1);
    newList.splice(destination.index, 0, removed);

    const activeItem = newList.findIndex((e) => e.id === dashboardId);
    setActiveIndex(activeItem);
    dispatch(setFavouriteList(newList));

    try {
      await dashboardApi.updateFavouritePosition({ dashboards: newList });
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
              {favouriteListState?.map((item: any, index: any) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided: any, snapshot: any) => (
                    <Link
                      className={
                        index === activeIndex
                          ? "favourite-element active"
                          : "favourite-element"
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

export default FavouriteList;
