import React ,{ useRef, useEffect,useState}from 'react'
import axios from 'axios'
import renderHTML from 'react-render-html';
import PostsNew from './PostsNews';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from "react-redux";
import Modal from 'react-modal';
import close from '../assets/image/close.png'
import { BrowserRouter, Route, Link } from "react-router-dom";

const customStyles = {
    content : {
      width                 : '70%',
      height                : '70%',
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      opacity: '80%',
      background:'linear-gradient(90deg, rgba(41,37,105,1) 0%, rgba(22,21,117,1) 33%, rgba(15,85,158,1) 65%, rgba(10,137,163,1) 100%)',
    }
  };
function News(props){
 // const listnews= useSelector(state => state.reducerNews.data);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = props.listnews.slice(indexOfFirstPost, indexOfLastPost);
 
  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);


useEffect(()=>{
  
},[])

return(
<div ref={props.refs} className='news'>
<hr className='hr-news'></hr>
  <div >
<p ref={props.refs} style={{color:'gray'}}>Tin tức</p>
    <PostsNew posts={currentPosts}  />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={props.listnews.length}
        paginate={paginate}
      />
  
  </div>
     
</div>
)
}
export default News