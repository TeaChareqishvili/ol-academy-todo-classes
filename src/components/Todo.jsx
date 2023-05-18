import React from "react";

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
            text: "Learn react",
            id: 1
        }
      ],
      inputValue: " ",
    }
    
  }
 
  addTodo=()=> {
    const usedId = this.state.todos.map((e)=>e.id);
    const addId = Math.max(...usedId)+1
   
     this.setState({ todos: [...this.state.todos, {text:this.state.inputValue, id:addId}] });
     this.setState({inputValue:''})
  }

  deleteTodo = (id)=>{
     const deleteTodosItems = this.state.todos.filter(todo => todo.id!==id)
       this.setState({todos:deleteTodosItems})
      
  }

  render() {
    return (
      <div>
        <h1>To do list</h1>

        {this.state.todos.length > 0 ? (
          <div>
            <ul>
              {this.state.todos.map((todo) => (
                <li key={todo.id}>
                <div>{todo.text}
                <button onClick={()=>this.deleteTodo(todo.id)}>Delete</button>
                </div>
             
                </li>
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
      </div>
    );
  }
}

export default Todo;
