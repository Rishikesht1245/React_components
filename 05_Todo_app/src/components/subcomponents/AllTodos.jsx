import { FiEdit } from "react-icons/fi";
import { RiDeleteBin3Fill } from "react-icons/ri";
const AllTodos = ({ setEditTodo, todos, handleDelete, handleComplete }) => {
  return (
    <div className="all-todo-container">
      <h3>My Todos</h3>
      {/* loop here */}
      {todos.length !== 0 ? (
        todos.map((todo, index) => {
          return (
            <div className="todo-item" key={todo.id}>
              <span>{index + 1}.</span>
              <span
                className={`${todo.completed && "strike"} title`}
                onClick={() => handleComplete(todo.id)}
              >
                {todo.title}
              </span>
              <div>
                <FiEdit
                  className="edit-icon"
                  onClick={() =>
                    setEditTodo({ id: todo.id, title: todo.title })
                  }
                />
                <RiDeleteBin3Fill
                  className="delete-icon"
                  onClick={() => handleDelete(todo.id)}
                />
              </div>
            </div>
          );
        })
      ) : (
        <div className="todo-item">
          <p className="title">No Todo to display</p>
        </div>
      )}
    </div>
  );
};
export default AllTodos;
