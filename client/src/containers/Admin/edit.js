import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getBook, updateBook, clearBook, deleteBook } from '../../action'

class EditBook extends PureComponent {

    state = {
        formdata:{
            _id:this.props.match.params.id,
            name:'',
            author:'',
            review:'',
            pages:'',
            rating:'',
            price:''
        }
    }  
    
    handleInput = (event, name) => {
        const newFormdata = {
            ...this.state.formdata
        }

        newFormdata[name] = event.target.value
        this.setState({
            formdata:newFormdata
        })
    }

    submitForm = (e) => {
        e.preventDefault()
      this.props.dispatch(updateBook(this.state.formdata))
    }

    componentDidMount(){
        this.props.dispatch(getBook(this.props.match.params.id))
    }

    componentWillReceiveProps(nextProps){
        let book = nextProps.books.book        
        this.setState({
            formdata:{
                _id:book._id,
                name:book.name,
                author:book.author,
                review:book.review,
                pages:book.pages,
                rating:book.rating,
                price:book.price
            }
        })
    }

    componentWillUnmount(){
        this.props.dispatch(clearBook())
    }

    deletePost = () => {
        this.props.dispatch(deleteBook(this.props.match.params.id))
    }

    redirectUser = () => {
        console.log(this.props)
        setTimeout(() => {
            this.props.history.push('/user/reviews')
        },1000)
    }

    render() {  
        let books = this.props.books      
        return (
            <div>
                <div className="rl_container article">
                    {
                        books && books.updateBook ?
                        <div className="edit_confirm"> 
                            Post Updated, <Link to={`/books/${books.book._id}`}>Click here</Link>
                            </div> : null
                    }
                    {
                        books && books.postDeleted ?
                            <div className="red_tag">
                                Post Deleted!!!
                                {this.redirectUser()}
                            </div>
                        :null
                    }
                    <form onSubmit={this.submitForm}>
                        <h2>Edit review</h2>
                        <div className="form_element">
                            <input 
                                type="text"
                                placeholder="Enter Name"
                                value={this.state.formdata.name}  
                                onChange={(event)=>this.handleInput(event,'name')}                              
                            />
                        </div>
                        <div className="form_element">
                            <input 
                                type="text"
                                placeholder="Enter Author"
                                value={this.state.formdata.author}                                
                                onChange={(event)=>this.handleInput(event,'author')}                              
                            />
                        </div>
                        <textarea
                            value={this.state.formdata.review}
                            onChange={(event)=>this.handleInput(event,'review')}   
                        />
                        <div className="form_element">
                            <input 
                                type="number"
                                placeholder="Enter Pages"
                                value={this.state.formdata.pages}                
                                onChange={(event)=>this.handleInput(event,'pages')}                                              
                            />
                        </div>
                        <div className="form_element">
                            <select
                                value={this.state.formdata.rating}
                                onChange={(event)=>this.handleInput(event,'rating')}                              
                            >
                                <option val="1">1</option>
                                <option val="2">2</option>
                                <option val="3">3</option>
                                <option val="4">4</option>
                                <option val="5">5</option>
                            </select>
                        </div>
                        <div className="form_element">
                            <input 
                                type="number"
                                placeholder="Enter Price"
                                value={this.state.formdata.price}                
                                onChange={(event)=>this.handleInput(event,'price')}                                              
                            />
                        </div>
                        <button type="submit">Edit Review</button>                        
                        <div className="delete_post">
                            <div className="button" onClick={this.deletePost}>
                                Delete Review
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){        
    return {
        books: state.books
    }
}

export default connect(mapStateToProps)(EditBook)
