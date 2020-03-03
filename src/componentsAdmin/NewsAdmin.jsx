import React, { useRef, useState, useEffect } from 'react'
import close from '../assets/image/close.png'
import 'react-quill/dist/quill.snow.css';
import ReactQuill, { Quill } from 'react-quill';
import axios from 'axios'
import Modal from 'react-modal';
import Add from '@material-ui/icons/Add';
import qs from 'qs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'
import DeleteIcon from '@material-ui/icons/Delete';
import FileBase64 from 'react-file-base64';
import Swal from "sweetalert2";

var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],
  [{ 'color': [] }, { 'background': [] }],
  ['link', 'image'],
  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'font': [] }],
  [{ 'align': [] }],


  ['clean']                                         // remove formatting button
];
const customStyles = {
  content: {
    width: '70%',
    height: '90%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    opacity: '80%',
    background: 'linear-gradient(to right, #ffffff 29%, #ffffff 96%)',
    marginTop: '5%'
  }
};
function NewsAdmin(props) {
  /*Contact */
  const [listNews, setListNews] = useState([])
  const [showModal, setShowModal] = useState(false)

  const [idNews, setIdNews] = useState()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [image, setUrlImage] = useState('')
  const [action, setAction] = useState()
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);
  const [checked, setChecked] = useState(false)


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = listNews.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);
  function swal() {
    Swal.fire({
      title: 'Thành công',
      type: 'success',
      icon: 'success'
    });
  }
  function swalErr() {
    Swal.fire({
      title: 'Xóa Thành công',
      type: 'success',
      icon: 'error'
    });
  }

  var a = document.cookie
  useEffect(() => {
    getNews()
    props.setColor()
  }, [])
  async function getNews() {
    setLoading(true)
    const result = await axios('/getNews')
    setListNews(result.data)
    setLoading(false);
  }
  const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <ul className='pagination' style={{ marginTop: 0, position: 'relative' }}>
        {pageNumbers.map(number => (
          <li key={number} >
            <a onClick={() => paginate(number)} className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    );
  };
  const Posts = ({ posts, loading, openModal, deleteItem }) => {

    if (loading) {
      return <h2 style={{ margin: '0 auto', textAlign: 'center' }}>Loading...</h2>;
    }

    return (
      <div style={{ marginTop: 3 }} class="row">


        {posts.map((list) => (
          <div key={list._id} class="col-lg-3 col-md-12 mt-4">
            <div class="card">

              <img style={{ height: 200 }} class="card-img-top img-responsive" src={list.image} alt="Card image cap" />
              <div class="card-body">
                <h5 style={{ textAlign: 'justify' }} class="card-text">{list.title.length <= 50 ? list.title : list.title.slice(0, 50) + '...'}</h5>

              </div>
              <div class="card-footer border-top-blue-grey border-top-lighten-5 text-muted">
                <span class="float-left"></span>
                {list.email}
                <span class="float-right">
                  <FontAwesomeIcon style={{ marginRight: 4, paddingTop: 2 }} className='icon-edit' onClick={() => openModal('Sửa', list._id, list.title, list.description, list.content, list.image)} size="lg" title="Sửa" icon={faEdit} >
                  </FontAwesomeIcon>
                  <DeleteIcon onClick={() => deleteItem({ id: list._id }, '/deleteNews').then(() => getNews())} className='delete-icon' titleAccess='Xóa'></DeleteIcon>
                </span>
              </div>
            </div>
          </div>
        ))}



      </div>
    );
  };

  function openModal(action, id, title, description, content, image) {
    if (action === 'Thêm') {
      setAction('Thêm')
      setShowModal(true)
    } else {
      setAction('Sửa')
      setShowModal(true)
      setIdNews(id)
      setTitle(title)
      setDescription(description)
      setContent(content)
      setUrlImage(image)

    }




  }
  function closeModal() {
    setShowModal(false)
    setIdNews('')
    setTitle('')
    setDescription('')
    setContent('')
    setUrlImage('')
    setChecked(false)
  }



  async function insertupdate(data, url, method) {
    await axios({
      method: method,
      url: url,
      data: qs.stringify(data),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    }).then((res) => {
      swal()
      closeModal(false)
      getNews()
    })
  }
  async function deleteItem(data, url) {
    await axios({
      method: 'delete',
      url: url,
      data: data,

      headers: {
        'content-type': 'application/json'
      }
    }).then((res) => {
      swalErr()

    }).catch(() => {
      alert('error')
    })
  }




  return (
    <div style={{ width: '100%' }}>
      <Modal
        closeTimeoutMS={500}
        isOpen={showModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >

        <img className='mdclose' src={close} style={{ float: 'right', width: 20, height: 20 }} onClick={() => closeModal()}></img>
        <h2>{action === 'Thêm' ? 'Thêm bản tin' : 'Sửa bản tin'}</h2>
        <div class="card card-body" style={{ maxWidth: '95%', margin: 30 }}>
          <div class="form-group">
            <label for="title">Title</label>
            <input
              type="text"

              class="form-control"
              placeholder="title"
              value={title}
              onChange={(text) => setTitle(text.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="image">Image</label>
            <div>

              {checked === false ? <FileBase64
                multiple={false}
                onDone={(file) => setUrlImage(file.base64)} /> : <input
                  type="text"

                  class="form-control"
                  placeholder="image"
                  value={image}
                  onChange={(text) => setUrlImage(text.target.value)}

                />}    {image === '' ? null : <img style={{ width: 100, height: 50, marginTop: true ? 3 : 0 }} src={image}></img>}
              <label>Chọn ảnh</label>   <input type='radio' checked={checked === false ? true : false} onClick={() => setChecked(false)} name="cbSlider" />
              <label>Nhập link</label>     <input type='radio' onClick={() => setChecked(true)} name="cbSlider" />
            </div>

          </div>
          <div class="form-group">
            <label for="description">Descripton</label>
            <input
              type="text"

              class="form-control"
              placeholder="Descripton"
              value={description}
              onChange={(text) => setDescription(text.target.value)}

            />

          </div>
          <div class="form-group">
            <label for="content">Content</label>
            <ReactQuill value={content} style={{ height: 450, margin: 10 }} id='content' theme="snow"
              modules={{ toolbar: toolbarOptions }}
              formats={[
                'header',
                'bold', 'italic', 'underline', 'strike', 'blockquote', 'background',
                'list', 'bullet', 'indent',
                'link', 'image'
              ]}
              onChange={(e) => setContent(e)}
            >
            </ReactQuill>

          </div>
          <div style={{ marginTop: 80, marginLeft: 10 }} class="form-group">
            <button onClick={() => {
              action === 'Thêm' ?
                insertupdate({
                  content: content,
                  description: description,
                  title: title,
                  image: image,
                  email: localStorage.getItem('email')
                }, '/postNews', 'post').then(() => getNews()) : insertupdate({
                  id: idNews,
                  content: content,
                  description: description,
                  title: title,
                  image: image,
                  email: localStorage.getItem('email')
                }, '/updateNews', 'put').then(() => getNews())
            }} className="btn btn-info">{action}</button>
          </div>
        </div>


      </Modal>

      <button onClick={() => openModal('Thêm')} style={{ float: 'right' }} type="button" class="btn btn-info d-none d-lg-block m-l-15"> <FontAwesomeIcon icon={faPlus} /> Create New</button>


      <h2>Quản lí bản tin</h2>



      <Posts posts={currentPosts} loading={loading} openModal={openModal} deleteItem={deleteItem} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={listNews.length}
        paginate={paginate}
      />

    </div>
  )
}
export default NewsAdmin