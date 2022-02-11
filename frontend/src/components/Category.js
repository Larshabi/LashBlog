import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';

function Category(){
    const [blogs, setBlogs] = useState([]);
    const [currentCategory, setCurrentCategory] = useState('');
    const {id} = useParams()
    // console.log(category)
    useEffect(()=>{
        
        setCurrentCategory(capitalizedFirstLetter(id));

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const fetchData = async ()=>{
            try{
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/blog/category`, {id}, config);
                setBlogs(res.data);
            }
            catch(err){}
        }
        fetchData();



    }, [id])

    const getCategoryBlogs = ()=>{
        let lists = [];
        let results= [];
        blogs.map((blogPost)=>{
            return lists.push(
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div className="col p-4 d-flex flex-column position-static">
                                <strong className="d-inline-block mb-2 text-primary">{capitalizedFirstLetter(blogPost.category)}</strong>
                                <h3 className="mb-0">{blogPost.title}</h3>
                                <div className="mb-1 text-muted">{blogPost.month} {blogPost.day}</div>
                                <p className="card-text mb-auto">{blogPost.excerpt}</p>
                                <Link to={`/blog/${blogPost.slug}`} className="stretched-link">Continue reading</Link>
                            </div>
                            <div className="col-auto d-none d-lg-block">
                                <img src={blogPost.thumbnail} width="200" height="250" alt="thumbnail" />
                                {/* <svg className="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg> */}
                            </div>
                        </div>
            )
        })
        for(let i=0; i<lists.length; i +=2 ){
            results.push(
                <div key={i} className="row mb-2">
                    <div className="col-md-6">
                        {lists[i]}
                    </div>
                    <div className="col-md-6">
                        {lists[i+1] ? lists[i+1]: null}
                    </div>
                </div>
            )
        }

        return results;
    }

    const capitalizedFirstLetter = (word)=>{
        if (word){
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
        }
    }
    return (
        <div className="container mt-3">
            <h3 className="display-4"> {currentCategory} Category</h3>      
            <div className="nav-scroller py-1 mb-2">
                <nav className="nav d-flex justify-content-between">
                    <Link className="p-2 link-secondary" to="/category/world">World</Link>
                    <Link className="p-2 link-secondary" to="/category/environment">Environment</Link>
                    <Link className="p-2 link-secondary" to="/category/technology">Technology</Link>
                    <Link className="p-2 link-secondary" to="/category/design">Design</Link>
                    <Link className="p-2 link-secondary" to="/category/culture">Culture</Link>
                    <Link className="p-2 link-secondary" to="/category/business">Business</Link>
                    <Link className="p-2 link-secondary" to="/category/politics">Politics</Link>
                    <Link className="p-2 link-secondary" to="/category/science">Science</Link>
                    <Link className="p-2 link-secondary" to="/category/health">Health</Link>
                    <Link className="p-2 link-secondary" to="/category/travel">Travel</Link>
                </nav>
            </div>
            {getCategoryBlogs()}
        </div>
    );
}

export default Category;