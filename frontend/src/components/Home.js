import React from 'react';
import {Link} from 'react-router-dom';
function Home(){
return (
    <div className="container">
            <div className="p-5 mb-4 mt-5 bg-light rounded-3">
                <div className="container-fluid py-5">
                    <h1 className="display-5 fw-bold">Welcome to Lash Blog</h1>
                    <p className="col-md-8 fs-4">Where we give you our viewers latest news happening around the globe.</p>
                    {/* <button className="btn btn-primary btn-lg" href="/blog" type="button">Check out Our Blog</button> */}
                    {/* <a className="btn btn-primary btn-lg" href="/blog" type="button">Check out our Blog</a> */}
                    <Link className="btn btn-primary btn-lg" to="/blog">Check Out Our Blogs</Link>
                </div>
            </div>
    </div>
    
)
}

export default Home;