import React, {Component} from 'react';
import Counter from './components/Counter';
import Dropdown from './components/Dropdown';
import ColorPicker from './components/ColorPicker';
import TodoList from './components/TodoList'

// import TodoList from './components/TodoList';
import initialTodos from './todos.json';

const colorPickerOptions = [
  { label: 'red', color: '#F44336' },
  { label: 'green', color: '#4CAF50' },
  { label: 'blue', color: '#2196F3' },
  { label: 'grey', color: '#607D8B' },
  { label: 'pink', color: '#E91E63' },
  { label: 'indigo', color: '#3F51B5' },
];

class App extends Component {

    state = {  
        todos: initialTodos,
    };

    deleteTodo =(todoId) =>{
        this.setState(prevState => ({
            todos: prevState.todos.filter(todo => todo.id!==todoId ),
        }))
    }


    render() { 
        const {todos} = this.state;

        const completedTodos = todos.reduce((acc, todo) => (todo.completed ? acc+1 : acc), 0);

        return (    
            <>
                <h1>Component`s state</h1>
                <Counter initialValue={0}/>
                <Dropdown />
                <ColorPicker options = {colorPickerOptions}/>
                <TodoList todos = {todos} onDeleteTodo={this.deleteTodo}/>    

                <div>
                    <p>Общее кол-во: {todos.length}</p>
                   
                    <p>Кол-во выполненных todo: {completedTodos}</p>
                </div>
            </> 
        );
    }
}
 
export default App;
