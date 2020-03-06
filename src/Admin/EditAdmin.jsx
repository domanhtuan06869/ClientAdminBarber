import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Modal from 'react-modal';
import close from '../assets/image/close.png'


const customStyles = {
  content: {
    width: '70%',
    height: '70%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    opacity: '80%',
    background: 'linear-gradient(to right, #ffffff 29%, #ffffff 96%)',

  }
};
export default function Home() {
  const [showModal, setShowModal] = useState(false)

  const [typemodal, setTypeModal] = useState('')
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);
  /*Teams */
  const [team, SetTeam] = useState([])
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = team.slice(indexOfFirstPost, indexOfLastPost);
 
  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(() => {
    getTeam()
  }, [])

  async function getTeam() {
    setLoading(true);
    const rs = await axios('/getNews')
    SetTeam(rs.data)
    setLoading(false);  

  }
  const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
        <ul className='pagination' style={{marginTop:0,position:'relative'}}>
          {pageNumbers.map(number => (
            <li key={number} >
              <a onClick={() => paginate(number)}  className='page-link'>
                {number}
              </a>
            </li>
          ))}
        </ul>
    );
  };
  const Posts = ({ posts, loading,openModal }) => {

    if (loading) {
      return <h2>Loading...</h2>;
    }
  
    return (
      <div class="row">
    
      {posts.map((list)=>(
  <div class="col-lg-3 col-md-12 ">
  <div class="card text-center">
    <div class="card-body  ">
  
      <p class="card-subtitle text-muted">Basic Card With Header &amp; Footer</p>
      <img height="100px" width="100px"class="img-responsive rounded-circle" src={list.image} alt="Card image cap"/>
    </div>

    <h4 class="card-title">Basic Card</h4>
      <h6 class="card-subtitle text-muted">Basic Card With Header &amp; Footer</h6>
    <div class="card-footer border-top-blue-grey border-top-lighten-5 text-muted">
      <span class="float-left">3 hours ago</span>
      <span class="float-right">
        <a href="#" class="card-link">Read More
          <i class="la la-angle-right"></i>
        </a>
      </span>
    </div>
  </div>
</div>
      ))}
  
      

    </div>
    );
  };
  return (

    <div>
    
    <Posts posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={team.length}
        paginate={paginate}
      />

    </div>
  );
}
