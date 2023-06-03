import React from "react";
import "./todoStyle.scss";

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          text: "Learn React",
          id: 1,
          inputStyle: false
        },
        {
          text: "Learn Js",
          id: 2,
          inputStyle: false
        },
        {
          text: "Learn Scss",
          id: 3,
          inputStyle: false
        }
      ],
      inputValue: "",
      editInput: {
        edit: false,
        id: undefined,
        inputValue: ""
      }
    };
  }

  addTodo = () => {
    const { todos, inputValue } = this.state;
    const usedIds = todos.map((todo) => todo.id);
    const maxId = Math.max(...usedIds);
    const newId = maxId + 1;
  
    if (inputValue.trim() !== "") {
      const isDuplicate = todos.some((todo) => todo.text === inputValue);
  
      if (isDuplicate) {
        alert('Item already exists in the todo list');
      } else {
        const newTodo = {
          text: inputValue,
          id: newId,
          inputStyle: false
        };
  
        this.setState((prevState) => ({
          todos: [...prevState.todos, newTodo],
          inputValue: ""
        }));
      }
    }
  };
  

  deleteTodo = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => todo.id !== id)
    }));
  };

  editTodo = (id, inputValue) => {
    
    this.setState({
      editInput: {
        id,
        edit: true,
        inputValue
      }
    });
  };

  addEdit = () => {
    const { todos, editInput } = this.state;
    const { id, inputValue } = editInput;
  
    const isDuplicate = todos.some((todo) => todo.text === inputValue && todo.id !== id);
  
    if (isDuplicate) {
      alert('Item with the same text already exists in the todo list');
    } else {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, text: inputValue } : todo
      );
  
      this.setState({
        todos: updatedTodos,
        editInput: {
          edit: false,
          id: undefined,
          inputValue: "",
        },
      });
    }
  };
  

  handleDone = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) =>
        todo.id === id ? { ...todo, inputStyle: !todo.inputStyle } : todo
      )
    }));
  };

  handleDeleteCompletedTasks = () => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => !todo.inputStyle)
    }));
  };

  handleMoveUp = (id) => {
    const { todos } = this.state;
    const index = todos.findIndex((todo) => todo.id === id);

    if (index > 0) {
      const updatedTodos = [...todos];
      [updatedTodos[index], updatedTodos[index - 1]] = [
        updatedTodos[index - 1],
        updatedTodos[index]
      ];

      this.setState({
        todos: updatedTodos
      });
    }
  };

  handleMoveDown = (id) => {
    const { todos } = this.state;
    const index = todos.findIndex((todo) => todo.id === id);

    if (index < todos.length - 1) {
      const updatedTodos = [...todos];
      [updatedTodos[index], updatedTodos[index + 1]] = [
        updatedTodos[index + 1],
        updatedTodos[index]
      ];

      this.setState({
        todos: updatedTodos
      });
    }
  };

  deleteAll = () => {
    this.setState({
      todos: []
    });
  };

  render() {
    const { todos, inputValue, editInput } = this.state;

    return (
      <div className="todoWrapper">
        <div className="todo">
          <h1>Todo list</h1>

          {todos.length > 0 ? (
            <div className="list">
              <ul>
                {todos.map((todo) => (
                  <div key={todo.id}>
                    {editInput.edit && editInput.id === todo.id ? (
                      <div>
                        <input
                          type="text"
                          value={editInput.inputValue}
                          onChange={(e) => {
                            this.setState((prevState) => ({
                              editInput: {
                                ...prevState.editInput,
                                inputValue: e.target.value
                              }
                            }));
                          }}
                        />
                        <button onClick={this.addEdit}>Save</button>
                      </div>
                    ) : (
                      <div>
                        <li
                          style={
                            todo.inputStyle
                              ? {
                                  textDecoration: "line-through",
                                  color: "#E84A4A"
                                }
                              : null
                          }
                        >
                          {todo.text}
                        </li>
                        <button onClick={() => this.deleteTodo(todo.id)}>
                          Delete
                        </button>
                        <button
                          onClick={() =>
                            this.editTodo(todo.id, todo.text)
                          }
                        >
                          Edit
                        </button>
                        <button onClick={() => this.handleDone(todo.id)}>
                          Mark As Done
                        </button>
                        <button
                          onClick={() => this.handleMoveUp(todo.id)}
                          disabled={todos[0].id === todo.id}
                        >
                          Up
                        </button>
                        <button
                          onClick={() => this.handleMoveDown(todo.id)}
                          disabled={todos[todos.length - 1].id === todo.id}
                        >
                          Down
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </ul>
            </div>
          ) : (
            <p>No Todos</p>
          )}

          <input
            type="text"
            value={inputValue}
            onChange={(event) =>
              this.setState({ inputValue: event.target.value })
            }
          />
          <button onClick={this.addTodo}>Add Todo</button>
          <div className="buttons">
            <button onClick={this.handleDeleteCompletedTasks}>
              Delete Completed Tasks
            </button>
            <button onClick={this.deleteAll}>Delete All</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Todo;
