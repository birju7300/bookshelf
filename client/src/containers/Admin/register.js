import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { getUsers, registerUser} from '../../action'

 class Register extends PureComponent {
    state={
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        error:''

    }

    handleInputEmail = (event) => {
        this.setState({email:event.target.value})
    }

    
    handleInputPassword = (event) => {
        this.setState({password:event.target.value})
    }

    
    handleInputFirstName = (event) => {
        this.setState({firstName:event.target.value})
    }

    
    handleInputLastName = (event) => {
        this.setState({lastName:event.target.value})
    }

    submitForm = (e) =>{
        e.preventDefault()
        this.setState({error:''})                
        this.props.dispatch(registerUser({
            email:this.state.email,
            password:this.state.password,
            firstName:this.state.firstName,
            lastName:this.state.lastName
        },this.props.user.users))
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.user.register === false){
            this.setState({
                error:'Error, try again'
            })
        }else{
            this.setState({
                firstName:'',
                lastName:'',
                email:'',
                password:'',
            })
        }
    }

    componentWillMount(){
        this.props.dispatch(getUsers())
    }
    showUsers = (user) =>(                
        user && user.users ?
            user.users.map(item=>(                
                <tr key={item._id}>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.email}</td>
                </tr>
            ))
        :null
    )
    render() {             
        let user = this.props.user
        return (
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2>Add User</h2>
                    <div className="form_element">
                        <input 
                            type="text"
                            placeholder="Enter First Name"
                            value={this.state.firstName}
                            onChange={this.handleInputFirstName}
                        />
                    </div>
                    <div className="form_element">
                        <input 
                            type="text"
                            placeholder="Enter Last Name"
                            value={this.state.lastName}
                            onChange={this.handleInputLastName}
                        />
                    </div>
                    <div className="form_element">
                        <input 
                            type="email"
                            placeholder="Enter Email"
                            value={this.state.email}
                            onChange={this.handleInputEmail}
                        />
                    </div>
                    <div className="form_element">
                        <input 
                            type="password"
                            placeholder="Enter Password"
                            value={this.state.password}
                            onChange={this.handleInputPassword}
                        />
                    </div>                    
                        <button type="submit">Add User</button>
                        <div className="error">{this.state.error}</div>
                    
                </form>
                <div className="current_users">
                    <h4>Current Users:</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>                            
                            {this.showUsers(user)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){    
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Register)