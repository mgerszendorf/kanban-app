import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import sectionApi from "../api/sectionApi";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import taskApi from "../api/taskApi";
import TaskEditor from "./TaskEditor";
import Loader from "./Loader";
import { ISection } from "../types/ISections";
import { ITask } from "../types/ITasks";

interface IKanbanProps {
  sections: ISection[];
  dashboardId: string | undefined;
}

const Kanban = (props: IKanbanProps) => {
  const dashboardId = props?.dashboardId!;
  const [data, setData] = useState<ISection[]>([]);
  const [selectedTask, setSelectedTask] = useState<ITask>();
  const [isActiveTaskEditor, setIsActiveTaskEditor] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setData(props.sections);
  }, [props.sections]);

  const onDragEndHandler = async ({ source, destination }: any) => {
    if (!destination) return;
    const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
    const destinationColIndex = data.findIndex(
      (e) => e.id === destination.droppableId
    );
    const sourceCol = data[sourceColIndex];
    const destinationCol = data[destinationColIndex];

    const sourceSectionId = sourceCol.id;
    const destinationSectionId = destinationCol.id;

    const sourceTasks = [...sourceCol.tasks];
    const destinationTasks = [...destinationCol.tasks];

    if (source.droppableId !== destination.droppableId) {
      const [removed] = sourceTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, removed);
      data[sourceColIndex].tasks = sourceTasks;
      data[destinationColIndex].tasks = destinationTasks;
    } else {
      const [removed] = destinationTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, removed);
      data[destinationColIndex].tasks = destinationTasks;
    }

    try {
      await taskApi.updateTaskPosition(dashboardId, {
        resourceList: sourceTasks,
        destinationList: destinationTasks,
        resourceSectionId: sourceSectionId,
        destinationSectionId: destinationSectionId,
      });
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const createSection = async () => {
    try {
      setLoader(true);
      const section = await sectionApi.create(dashboardId);
      setData([...data, section]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  const deleteSection = async (sectionId: string) => {
    try {
      setLoader(true);
      await sectionApi.delete(dashboardId, sectionId);
      const newData = [...data].filter((e) => e.id !== sectionId);
      setData(newData);
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  const updateSectionTitle = async (
    e: React.ChangeEvent<HTMLInputElement>,
    sectionId: string
  ) => {
    const newTitle = e.target.value;
    const newData = [...data];
    const index = newData.findIndex((e) => e.id === sectionId);
    newData[index].title = newTitle;
    setData(newData);
    try {
      await sectionApi.update(dashboardId, sectionId, { title: newTitle });
    } catch (err) {
      console.log(err);
    }
  };

  const createTask = async (sectionId: string) => {
    try {
      setLoader(true);
      const task = await taskApi.createTask(dashboardId, { sectionId });
      const newData = [...data];
      const index = newData.findIndex((e) => e.id === sectionId);
      newData[index].tasks?.unshift(task?.task);
      setData(newData);
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  const handleTaskEditor = (task: ITask) => {
    setSelectedTask(task);
    setIsActiveTaskEditor(true);
  };

  const onUpdateTask = (task: ITask) => {
    const newData = [...data];
    const sectionIndex = newData.findIndex((e) => e.id === task.section.id);
    const taskIndex = newData[sectionIndex].tasks.findIndex(
      (e) => e.id === task.id
    );
    newData[sectionIndex].tasks[taskIndex] = task;
    setData(newData);
  };

  const onDeleteTask = (task: ITask) => {
    const newData = [...data];
    const sectionIndex = newData.findIndex((e) => e.id === task.section.id);
    const taskIndex = newData[sectionIndex].tasks.findIndex(
      (e) => e.id === task.id
    );
    newData[sectionIndex].tasks.splice(taskIndex, 1);
    setData(newData);
  };

  if (loader) return <Loader />;

  return (
    <div className="kanban">
      <div className="sections-info">
        <button className="new-section-btn" onClick={createSection}>
          New Section
        </button>
        <p>Sections: {data?.length}</p>
      </div>
      <div className="line">
        <div></div>
      </div>

      <DragDropContext onDragEnd={onDragEndHandler}>
        <div className="section-wrapper">
          {data?.map((section: ISection) => (
            <div key={section.id}>
              <Droppable key={section.id} droppableId={section.id}>
                {(provided) => (
                  <div
                    className="section"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div className="section-header">
                      <input
                        type="text"
                        value={section.title}
                        placeholder="Untitled"
                        onChange={(e) => updateSectionTitle(e, section.id)}
                      />
                      <div className="icons">
                        <FaTrashAlt
                          className="trash-icon"
                          onClick={() => deleteSection(section.id)}
                        />
                        <div className="plus-icon">
                          <FaPlus onClick={() => createTask(section.id)} />
                        </div>
                      </div>
                    </div>
                    {section?.tasks?.map((task: ITask, index: number) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided: any, snapshot: any) => (
                          <div
                            className="task"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => handleTaskEditor(task)}
                          >
                            <p>{task.title === "" ? "Untitled" : task.title}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
      {isActiveTaskEditor && (
        <TaskEditor
          setIsActiveTaskEditor={setIsActiveTaskEditor}
          selectedTask={selectedTask}
          dashboardId={dashboardId}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
        />
      )}
    </div>
  );
};

export default Kanban;
