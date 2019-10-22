import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './components/Home/home'
import BookView from './components/Books'
import Layout from './hoc/layout'
import LoginComponent from './components/Login'
import User from './components/Admin'
import AddReview from './containers/Admin/add'
import UserPosts from './components/Admin/userPost'
import EditReview from './containers/Admin/edit'
import Register from './containers/Admin/register'
import Logout from './components/Admin/logout'
import Auth from './hoc/auth'

export default function Routes() {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Auth(Home, true)}/>
                <Route path="/books/:id" exact component={Auth(BookView,true)}/>                
                <Route path="/user" exact component={Auth(User,true)}/>
                <Route path="/user/addReviews" exact component={Auth(AddReview,true)}/>
                <Route path="/user/editReviews/:id" exact component={Auth(EditReview,true)}/>
                <Route path="/user/reviews" exact component={Auth(UserPosts,true)}/>
                <Route path="/user/register" exact component={Auth(Register,true)}/>
                <Route path="/user/logout" exact component={Auth(Logout,true)}/>
                <Route path="/login" exact component={Auth(LoginComponent,false)}/>
            </Switch>
        </Layout>
    )
}
