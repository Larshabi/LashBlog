import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';



function BlogDetail(props){
    const [blog, setBlog] = useState({})
    const {id} = useParams();
    useEffect(()=>{
        
        const fetchData = async ()=>{
            try{
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/${id}`)
                setBlog(res.data)
            }
            catch(err) {

            }
        }
        fetchData();
    },[id])

    const createBlog = ()=>{
        return {__html: blog.content}
    }
    
    const capitalizedFirstLetter = (word)=>{
        if (word){
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
        }
    }

    return(
        <div className='container mt-3'>
            <h1 className='display-2'>{blog.title}</h1>
            <h3 className='text-muted mt-3'>Category: {capitalizedFirstLetter(blog.category)}</h3>
            <h4>{blog.month} {blog.day}</h4>
            <div className='mt-5 mb-5' dangerouslySetInnerHTML ={createBlog()}/>
            <hr />
            <p className="lead mb-5"><Link to="/blog" className="fw-bold text-decoration-none">Back to Blogs</Link></p>
        </div>
    );
}

export default BlogDetail;