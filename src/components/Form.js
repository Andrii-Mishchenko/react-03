import React, {Component} from 'react';

class Form extends Component {
    state = {
        name: '',
        lastName: '',
        experience: 'junior',
        licence: false,
    }
 
    handleChange = e =>{
        const {name, value} = e.currentTarget;
        this.setState({
            [name]: value
        });
    }

    // handleNameChange = event =>{
    //     console.log(event.currentTarget.value);
    //     this.setState({name: event.currentTarget.value})
    // }
    // handleLastNameChange = event =>{
    //     console.log(event.currentTarget.value);
    //     this.setState({lastName: event.currentTarget.value})
    // }

    handleSubmit = e =>{
        e.preventDefault();
        // console.log(this.state)
        this.props.onSubmit(this.state);
        this.reset();
    };

    handleLicenceChange =e =>{
        console.log(e.currentTarget.checked);
        this.setState({licence: e.currentTarget.checked})
    }

    reset = () =>{
        this.setState({
            name: '',
            lastName: '',
        })
    }
    

    render() { 
  
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name <input 
                    type="text" 
                    name="name" 
                    value={this.state.name} 
                    onChange={this.handleChange}/>
                </label>
                <label>
                    Last Name <input 
                    type="text" 
                    name="lastName" 
                    value={this.state.lastName} 
                    onChange={this.handleChange}/>
                </label>

                <p>Your level:</p>

                <label>
                    <input 
                    type="radio" 
                    name="experience" 
                    value="junior"
                    onChange={this.handleChange}
                    checked={this.state.experience==='junior'}/> Junior
                </label>
                <label>
                    <input 
                    type="radio" 
                    name="experience" 
                    value="middle"
                    onChange={this.handleChange}
                    checked={this.state.experience==='middle'}/> Middle
                </label>
                <label>
                    <input 
                    type="radio" 
                    name="experience" 
                    value="senior"
                    onChange={this.handleChange}
                    checked={this.state.experience==='senior'}/> Senior
                </label>
                <br/>
                <label>
                    <input 
                    type="checkbox" 
                    name="licence" 
                    checked={this.state.licence} 
                    onChange={this.handleLicenceChange}
                    /> I accept all rules
                </label>

                <button type="submit" disabled={!this.state.licence}>Submit</button>
            </form>
        );
    };
}
 
export default Form;
