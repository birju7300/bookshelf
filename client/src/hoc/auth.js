import React, { Component } from 'react'
import { auth } from '../action'
import { connect } from 'react-redux'

export default function(ComposedClass,reload) {
    class AuthenticationCheck extends Component {

        state = {
            loading: true
        }

        componentWillMount(){
            this.props.dispatch(auth())            
        }

        componentWillReceiveProps(nextProps){            
            this.setState({loading:false})
            if(nextProps.user && !nextProps.user.login.isAuth){
                if(reload === true){
                this.props.history.push('/login')}
            }else{
               if(reload === false){ this.props.history.push('/user')}
            }
        }

        render (){            
            if(this.state.loading){
                return <div className="loader">Loading...</div>
            }
            return (
                <ComposedClass {...this.props} user={this.props.user}/>
            )
        }
    }

    function mapStateToProps(state){
        return {
            user: state.user
        }
    }

    return connect(mapStateToProps)(AuthenticationCheck)
}

