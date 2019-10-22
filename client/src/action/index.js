import axios from 'axios'

export function getBooks(
    limit = 10,
    start = 0,
    order = 'asc',
    list = ''
){
    
    const req = axios.get(`/api/books?limit=${limit}&skip=${start}&order=${order}`)
                    .then(response=> {
                        if(list){
                            return [...list,...response.data]
                        }else{
                            return response.data
                        }
                    })
    
    return {
        type:'GET_BOOKS',
        payload:req
    }
}

export function gettBookWithReviewer(id){
    const req = axios.get(`/api/getBook?id=${id}`)
    
    return (dispatch) => {
        req.then(({data})=>{
            let book = data            
            axios.get(`/api/getReviewer?id=${book.ownerId}`)
            .then(({data})=>{
                let response = {
                    book,
                    reviewer:data
                }
                
                dispatch({
                    type:'GET_BOOK_WITH_REVIEWER',
                    payload:response
                })
            })
            
        })
    }
}

export function getClearBookWithReviewer(){
    return {
         type:'CLEAR_BOOK_WITH_REVIEWER',
         payload:{
            book:{},
            reviewer:{}
         }
    }
}

export function addBook(book){    
    const request = axios.post(`/api/book`,book)
        .then(response => response.data)

        return {
            type:'ADD_BOOK',
            payload:request
        }
}

export function clearNewBook(){
    return {
         type:'CLEAR_NEWBOOK',
         payload:{            
         }
    }
}

export function getUserPosts(userId){    
    const req = axios.get(`/api/user/posts?user=${userId}`)
        .then(response => response.data)
        
    return {
        type:'GET_USER_POSTS',
        payload:req
    }
}

export function getBook(id){
    const req = axios.get(`/api/getBook?id=${id}`)
        .then(response => response.data)

    return {
        type: 'GET_BOOK',
        payload:req
    }
}

export function updateBook(data){
    const req = axios.post(`/api/bookUpdate`,data)
        .then(response=>response.data)

    return {
        type:'UPDATE_BOOK',
        payload:req
    }
}

export function deleteBook(id){
    const req = axios.delete(`/api/deleteBook?id=${id}`)
        .then(response => response.data)

        return {
            type:'DELETE_BOOK',
            payload:req
        }
}

export function clearBook(){
    return {
        type:'CLEAR_BOOK',
        payload:{
            book:{},
            updateBook:false,
            postDeleted:false
        }
    }
}
/*======================User ===================*/
export function loginUser({email,password}){
    const req = axios.post(`/api/user/login`,{email,password})
                        .then(response=>response.data)

    return {
        type: 'USER_LOGIN',
        payload:req
    }
}

export function auth(){
    const req = axios.get(`/api/auth`)
                .then(response=>response.data)

    return {
        type:'USER_AUTH',
        payload:req
    }
}

export function getUsers(){
    const req = axios.get('/api/users')
        .then(response=>response.data)
    return {
        type:'GET_USERS',
        payload:req
    }
}

export function registerUser(user, existingUsers){
    const req = axios.post(`/api/user/register`,user)

    return (dispatch) => {
        req.then( ({data})=> {
            let users = data.success ? [...existingUsers,data.user]:existingUsers
            let response = {
                success:data.success,
                users
            }
console.log(req)
            dispatch({
                type:'USER_REGISTERED',
                payload:response
            })
        })
    }
}