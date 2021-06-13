import  React, {Component } from 'react';
// import './TodoEditor.scss'


class TodoEditor extends Component {
    state = { 
        message: ''
     }

    handlechange = e => {
        this.setState({message: e.currentTarget.value})
    };

    handleSubmit = e=> {
        e.preventDefault();
      
        this.props.onSubmit(this.state.message);
        this.setState({message:""});
    }

    render() { 
        return (  
            <form className='TodoEditor' onSubmit={this.handleSubmit}>
                <textarea 
                className="TodoEditor__textarea"
                value={this.state.message} 
                onChange={this.handlechange}
                ></textarea>
                <button type="submit" className="TodoEditor__button">Сохранить</button>
            </form>            
        );
    }
}
 
export default TodoEditor;

