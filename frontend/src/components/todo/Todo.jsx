import React, { useEffect, useState } from "react";
import "./todo.css";
import TodoCards from "./TodoCards";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Update from "./Update.jsx";
import axios from "axios";

let id = sessionStorage.getItem("id");

const Todo = () => {
  const [Inputs, setInputs] = useState({ title: "", body: "" });
  const [Array, setArray] = useState([]);

  const [showTextarea, setShowTextarea] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = async () => {
    if (!Inputs.title || !Inputs.body) {
      toast.error("Please fill all fields");
      return;
    }
    if (id) {
      try {
        await axios.post(`${window.location.origin}/api/v2/addTask`, {
          title: Inputs.title,
          body: Inputs.body,
          id,
        });
        toast.success("Your Task is Added ");
        setInputs({ title: "", body: "" });
        setShowTextarea(false);
        fetchTasks();
      } catch (error) {
        console.error(error);
        toast.error("Failed to add task");
      }
    } else {
      setArray([...Array, Inputs]);
      setInputs({ title: "", body: "" });
      toast.success("Your Task is Added ");
      toast.error("Your task is not saved! Please signup");
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${window.location.origin}/api/v2/getTasks/${id}`);
      if (response.data.list) {
        setArray(response.data.list);
      } else {
        setArray([]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    if (id) {
      fetchTasks();
    }
  }, []);

  const del = async (cardid) => {
    if(id){
    try {
      await axios.delete(`${window.location.origin}/api/v2/deleteTask/${cardid}`, {
        data: { userId: id },
      });
      toast.success("Your Task is Deleted");
      setArray((prev) => prev.filter((task) => task._id !== cardid));
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete task");
    }} else {
      toast.error("Please signup First");
    }
  };

const startEdit = (index) => {
  setCurrentEdit({ ...Array[index], index });
  setShowUpdateModal(true);
};


const saveEdit = async (updatedTask) => {
  try {
    await axios.put(`${window.location.origin}/api/v2/updateTask/${updatedTask._id}`, {
      title: updatedTask.title,
      body: updatedTask.body,
      userId: id
    });
    toast.success("Task Updated");

    setArray((prev) => {
      const newArr = [...prev];
      newArr[updatedTask.index] = {
        ...newArr[updatedTask.index],
        title: updatedTask.title,
        body: updatedTask.body
      };
      return newArr;
    });

    setShowUpdateModal(false);
  } catch (error) {
    console.error(error);
    toast.error("Failed to update task");
  }
};



  return (
    <>
      <div className="todo">
        <ToastContainer />
        <div className="todo-main container d-flex justify-content-center align-items-center my-4 flex-column">
          <div className="d-flex flex-column todo-inputs-div w-100 p-1">
            <input
              type="text"
              placeholder="TITLE"
              className="my-2 p-2 todo-inputs"
              onClick={() => setShowTextarea(true)}
              name="title"
              value={Inputs.title}
              onChange={change}
            />
            {showTextarea && (
              <textarea
                placeholder="BODY"
                name="body"
                className="p-2 todo-inputs"
                value={Inputs.body}
                onChange={change}
              />
            )}
          </div>
          <div className="w-lg-50 w -100 d-flex justify-content-end my-3">
            <button className="home-btn px-2 py-1" onClick={submit}>
              Add
            </button>
          </div>
        </div>

        <div className="todo-body">
          <div className="container-fluid">
            <div className="row">
              {Array.map((item, index) => (
                <div className="col-lg-3 col-10 mx-5 my-2" key={item._id}>
                  <TodoCards
                    title={item.title}
                    body={item.body}
                    id={item._id}
                    delid={del}
                    display={() => startEdit(index)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showUpdateModal && currentEdit && (
        <div className="todo-update">
          <div className="container update">
            <Update display={() => setShowUpdateModal(false)} task={currentEdit} save={saveEdit} />
          </div>
        </div>
      )}
    </>
  );
};

export default Todo;
