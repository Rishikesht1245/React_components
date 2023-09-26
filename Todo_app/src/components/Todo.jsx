import { useEffect, useState } from "react";
import AddTodo from "./subcomponents/AddTodo";
import AllTodos from "./subcomponents/AllTodos";
import EditTodo from "./subcomponents/EditTodo";
import "./todo.css";
const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState(false);

  // fetches data on mounting
  useEffect(() => {
    let allTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(allTodos);
  }, []);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
    if (value === "") {
      return setInputError(true);
    }
    setInputError(false);
  };

  // function to add todo to local Storage
  const addTodo = (event) => {
    if (inputValue === "") {
      return setInputError(true);
    }
    const newTodo = {
      id: Date.now(),
      title: inputValue,
      completed: false,
    };
    // todo is managed using state and on refresh it will be fetched from local storage (useEffect)
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    //provide updatedTodos here while setting JSON.stringify as setTodos will work asynchronously
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setInputValue("");
  };

  // function to edit todo
  const handleEdit = (id, value) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        //return the modified element
        return { ...todo, title: value };
      } else {
        //return the same element
        return todo;
      }
    });

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    // closing the modal for edit
    setEditTodo("");
  };

  //    function to delete todo
  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleComplete = (id) => {
    console.log("reacehd");
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        //return the modified element
        return { ...todo, completed: !todo.completed };
      } else {
        //return the same element
        return todo;
      }
    });

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  return (
    <div className="todo-container">
      <h1 className="heading">Todo List</h1>
      <AddTodo
        addTodo={addTodo}
        handleInputChange={handleInputChange}
        value={inputValue}
        error={inputError}
      />
      <AllTodos
        setEditTodo={setEditTodo}
        todos={todos}
        handleDelete={handleDelete}
        handleComplete={handleComplete}
      />
      {editTodo && (
        //editTodo will be set from allTodos when clicking the edit button : same is used for closing the box
        <EditTodo
          editTodo={editTodo}
          setEditTodo={setEditTodo}
          handleEdit={handleEdit}
        />
      )}
    </div>
  );
};
export default Todo;
