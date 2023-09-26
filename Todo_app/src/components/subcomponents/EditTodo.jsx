import { useState } from "react";

const EditTodo = ({ editTodo: { title, id }, setEditTodo, handleEdit }) => {
  const [todo, setTodo] = useState(title);
  return (
    <div className="edit-todo-container">
      <h3>Edit Todo</h3>
      <div className="edit-todo-item">
        <input
          type="text"
          name="todo"
          value={todo}
          onChange={(event) => setTodo(event.target.value)}
        />
        <div className="buttons">
          <button className="btn cancel-btn" onClick={() => setEditTodo("")}>
            Cancel
          </button>
          <button className="btn save-btn" onClick={() => handleEdit(id, todo)}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditTodo;
