import React from 'react';
import Controls from './Controls';
import Value from './Value'
import './Counter.css';

class Counter extends React.Component{
    //объявляем дефолтные значения:
    static dafaultProps ={
        initialValue: 0,
    };

    //указываем propTypes:
    static propTypes = {
        //
    };

    // вместо конструктора объявляем state с данными:
    state = {
        value: this.props.initialValue,
    };

    //объявляем методы как публичное св-во через "="
    handleIncrement = () => {
        // чтобы изменить state не основываясь на предыдущем значении - объект:
        // this.setState({value: 123123})

        // основываясь на предыдущем значении - функция:
        this.setState(prevState => {
            return {
                value: prevState.value + 1,
            };        
        });
    };

    handleDecrement = () => {
        this.setState(prevState => {
            return {
                value: prevState.value - 1,
            };        
        });
    };

    render() {
        return (
            <div className="Counter">
                <Value value = {this.state.value}/>
                <Controls 
                onIncrement = {this.handleIncrement}
                onDecrement = {this.handleDecrement}
                />

            </div>
        );
    }
}

export default Counter