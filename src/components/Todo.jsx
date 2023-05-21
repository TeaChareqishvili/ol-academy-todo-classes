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
        },
        {
          text: "Learn Js",
          id: 2,
        },
        {
          text: "learn Scss",
          id: 3,
        },
      ],
      inputValue: " ",
      editInput: {
        edit: false,
        id: undefined,
        inputValue: "",
      },
    };
  }

  // პირველად თუ დავაკლიკე ცარიელ ინფუთს ლისტში ამატებს ცარიელს და მერე აღარ. ????
  addTodo = () => {
    const usedId = this.state.todos.map((e) => e.id);
    const addId = Math.max(...usedId) + 1;

    if (this.state.inputValue !== "") {
      this.setState({
        todos: [
          ...this.state.todos,
          { text: this.state.inputValue, id: addId },
        ],
      });
      this.setState({ inputValue: "" });
    }
  };
  deleteTodo = (id) => {
    const deleteTodosItems = this.state.todos.filter((todo) => todo.id !== id);
    this.setState({ todos: deleteTodosItems });
  };

  editTodo = (id, inputValue) => {
    this.setState({
      editInput: {
        id,
        edit: true,
        inputValue,
      },
    });
  };

  addEdit=()=>{
    const todo = [...this.state.todos]
    todo.map((e)=>{
        if (e.id === this.state.editInput.id){
            e.text = this.state.editInput.inputValue
        }
       
    })
    this.setState({todos:todo})
    this.setState({
        editInput:{
           edit:false
        }
    })
   
   
  }

  render() {
    return (
      <div className="todoWrapper">
        <div className="todo">
          <h1>Todo list</h1>

          {this.state.todos.length > 0 ? (
            <div className="list">
              <ul>
                {this.state.todos.map((todo) => (
                  <>
                    <li key={todo.id}>{todo.text}</li>
                    <button onClick={() => this.deleteTodo(todo.id)}>
                      Delete
                    </button>
                    <button onClick={() => this.editTodo(todo.id, todo.text)}>
                      Edit
                    </button>
                  </>
                ))}
              </ul>
            </div>
          ) : (
            <p>No Todos</p>
          )}

          <input
            type="text"
            value={this.state.inputValue}
            onChange={(event) =>
              this.setState({ inputValue: event.target.value })
            }
          />
          <button onClick={this.addTodo}>Add Todo</button>
          {this.state.editInput.edit && (
            <div>
              <h2>Edit yout list</h2>
              <input
                type="text"
                value={this.state.editInput.inputValue}
                onChange={(e) => {
                  this.setState({
                    editInput: {
                      ...this.state.editInput,
                      inputValue: e.target.value,
                    },
                  });
                }}
              />
              <button onClick={this.addEdit}>Edit Item</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Todo;
