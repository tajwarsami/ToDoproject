import React, { useState } from 'react';

const Update = ({ display, task, save }) => {
  const [editInputs, setEditInputs] = useState({
    title: task.title,
    body: task.body,
    _id: task._id, 
    index: task.index 
  });

  const change = (e) => {
    const { name, value } = e.target;
    setEditInputs({ ...editInputs, [name]: value });
  };

  const handleSave = () => {
    if (!editInputs.title || !editInputs.body) {
      alert("Please fill all fields");
      return;
    }
    save(editInputs);
  };

  return (
    <div className='p-5 d-flex justify-content-center align-items-start flex-column update'>
      <h3>Update Your Task</h3>
      <input
        type="text"
        name="title"
        value={editInputs.title}
        onChange={change}
        className="todo-inputs my-4 w-100 p-3"
      />
      <textarea
        name="body"
        value={editInputs.body}
        onChange={change}
        className='todo-inputs w-100 p-3'
      />
      <div>
        <button className='btn btn-dark my-4' onClick={handleSave}>
          Update
        </button>
        <button
          className='btn btn-danger my-4 mx-3'
          onClick={() => display()}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Update;
