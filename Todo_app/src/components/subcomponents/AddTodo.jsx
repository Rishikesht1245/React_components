import { useState } from "react";
import "./subtodo.css";
const AddTodo = ({ addTodo, handleInputChange, value, error }) => {
  return (
    <div className="add-container">
      <div className="add-input">
        <input
          type="text"
          name="todo"
          placeholder="Enter todo..."
          value={value}
          onChange={handleInputChange}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      {error && <p className="error">*Please enter your todo</p>}
    </div>
  );
};
export default AddTodo;
