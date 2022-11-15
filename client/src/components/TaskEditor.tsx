import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { FaTrashAlt } from "react-icons/fa";
import taskApi from "../api/taskApi";
import Loader from "./Loader";
import { ITask } from "../types/ITasks";

interface ITaskEditorProps {
  setIsActiveTaskEditor: Dispatch<SetStateAction<boolean>>;
  selectedTask: ITask | undefined;
  dashboardId: string;
  onUpdateTask: (task: ITask) => void;
  onDeleteTask: (task: ITask) => void;
}

const TaskEditor = (props: ITaskEditorProps) => {
  const [title, setTitle] = useState("");
  const [selectedTask, setSelectedTask] = useState(props.selectedTask);
  const [taskContent, setTaskContent] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const { title, content } = props.selectedTask!;
    setSelectedTask(props.selectedTask);
    setTitle(title);
    setTaskContent(content);
  }, [props.selectedTask]);

  const updateTask = async () => {
    try {
      await taskApi.updateTask(props.dashboardId, props.selectedTask!.id, {
        title: title,
        content: taskContent,
      });
      selectedTask!.title = title;
      selectedTask!.content = taskContent;
      props.onUpdateTask(selectedTask!);
    } catch (err) {
      console.log(err);
    } finally {
      props.setIsActiveTaskEditor(false);
    }
  };

  const deleteTask = async () => {
    try {
      setLoader(true);
      await taskApi.deleteTask(props.dashboardId, props.selectedTask!.id);
      props.onDeleteTask(selectedTask!);
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
      props.setIsActiveTaskEditor(false);
    }
  };

  if (loader) return <Loader />;

  return (
    <div className="task-editor-wrapper">
      <div className="task-editor">
        <div className="top-bar">
          <FaTrashAlt className="trash" onClick={deleteTask} />
          <GrClose
            className="close-btn"
            onClick={() => props.setIsActiveTaskEditor(false)}
          />
        </div>
        <div className="title">
          <input
            type="text"
            value={title}
            placeholder="Untitled"
            defaultValue="Untitled"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
        </div>
        <div className="separator">
          <div></div>
        </div>
        <textarea
          className="task-content"
          value={taskContent}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setTaskContent(e.target.value)
          }
        ></textarea>
        <button className="save-btn" onClick={updateTask}>
          Save changes
        </button>
      </div>
    </div>
  );
};

export default TaskEditor;
