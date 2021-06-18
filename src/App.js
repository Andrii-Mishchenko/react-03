import React, {Component} from 'react';
// import Counter from './components/Counter';
// import Dropdown from './components/Dropdown';
// import ColorPicker from './components/ColorPicker';
// import TodoList from './components/TodoList';
// import Form from './components/Form';
// import TodoEditor from './components/TodoEditor/TodoEditor';
// import Filter from './components/TodoList/Filter'
import Modal from './components/Modal';
// import Clock from './components/Clock';
import Tabs from './components/Tabs';
import tabs from './tabs.json';

import initialTodos from './todos.json';
import shortid from 'shortid'


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
        filter: '',
        showModal: false
    };

    componentDidUpdate(prevProps, prevState){
        if(this.state.todos!==prevState.todos){
            console.log("обновилось todos")
            localStorage.setItem('todos', JSON.stringify(this.state.todos))
        }
    }

    componentDidMount() {
        const todos = localStorage.getItem('todos');
        const parsedTodos = JSON.parse(todos);

        if(parsedTodos){
            this.setState({todos: parsedTodos})
        }
    }

    addTodo = text => {
        console.log(text)
        const todo = {
            id: shortid.generate(),
            text,
            completed: false
        }

        this.setState(prevState => ({
            todos: [todo, ...prevState.todos]
        }))
    }

    deleteTodo =(todoId) =>{
        this.setState(prevState => ({
            todos: prevState.todos.filter(todo => todo.id!==todoId ),
        }))
    }

    formSubmitHandler = data =>{
        console.log(data);
    }

    toggleCompleted = todoId => {
        console.log(todoId);

        this.setState(prevState=> ({
            todos: prevState.todos.map(todo => {
                if (todo.id===todoId) {
                    return {
                        ...todo,
                        completed: !todo.completed
                    }
                }

                return todo;
            })
        }));
    }

    changeFilter = e => {
        this.setState({filter: e.currentTarget.value})
    }

    getVisibleTodos =() =>{
        const {filter, todos} = this.state;
        const normalizedFilter= filter.toLowerCase();
        return todos.filter(todo=>
            todo.text.toLowerCase().includes(normalizedFilter));
    }

    calculateCompletedTodos = () =>{
        const {todos} = this.state

        return todos.reduce((acc, todo) => (todo.completed ? acc+1 : acc), 0);
    }

    toggleModal = () => {
        this.setState(state =>({
            showModal:!state.showModal
        }))
    }


    render() { 
        const {todos, filter, showModal} = this.state;

        const completedTodos = this.calculateCompletedTodos();
        
        const visibleTodos = this.getVisibleTodos();

        return (    
            <>
           {/* <Tabs items={tabs}></Tabs> */}
            {/* <Clock></Clock> */}
            <button type="button" onClick={this.toggleModal}>Открыть модалку</button>
            {showModal && <Modal onClose={this.toggleModal}>
                <h1>Контент модалки как children</h1>
                <p>Мені тринадцятий минало;
                    Я пас ягнята за селом.
                    Чи то так сонечко сіяло,
                    Чи так мені чого було –
                    Мені так любо, любо стало,
                    Неначе в Бога…
                    Уже прокликали до паю,
                    А я собі у бур’яні
                    Молюся Богу, і не знаю,
                    Чого маленькому мені
                    Тоді так приязно молилось,
                    Чого так весело було.
                    Господнє небо і село,
                    Ягня, здається, веселилось,
                    І сонце гріло – не пекло.
                </p>
                <button type="button" onClick={this.toggleModal}>Закрыть</button>
                </Modal>}
                {/* <h1>Component`s state</h1>
                
                <Form onSubmit={this.formSubmitHandler}/>
                <Counter initialValue={0}/>
                <Dropdown />
                <ColorPicker options = {colorPickerOptions}/>
                
                <TodoEditor onSubmit={this.addTodo}/>

                <Filter value={filter} onChange={this.changeFilter}/>
                
                <TodoList 
                    todos = {visibleTodos} 
                    onDeleteTodo={this.deleteTodo}
                    onToggleCompleted={this.toggleCompleted}
                    />    

                <div>
                    <p>Общее кол-во: {todos.length}</p>
                   
                    <p>Кол-во выполненных todo: {completedTodos}</p>
                </div> */}
            </> 
        );
    }
}
 
export default App;
