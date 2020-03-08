import React, { useRef, useState, useEffect } from 'react'
import close from '../assets/image/close.png'
import 'react-quill/dist/quill.snow.css';
import ReactQuill, { Quill } from 'react-quill';
import axios from 'axios'
import Modal from 'react-modal';
import Add from '@material-ui/icons/Add';
import qs from 'qs'
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'
import DeleteIcon from '@material-ui/icons/Delete';
import Swal from "sweetalert2";


function SliderManager(props) {
    /*Contact */
    const [listNews, setListNews] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [action, setAction] = useState('')
    const [id, setId] = useState('')
    const [stt, setStt] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [url, setUrl] = useState('')
    const [checked, setChecked] = useState(false)


    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = listNews.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setCurrentPage(pageNumber);
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


    /////////////////////////////////////////////////////////
    const Posts = ({ posts, loading, openModal, deleteItem }) => {

        if (loading) {
            return <h2 style={{ margin: '0 auto', textAlign: 'center' }}>Loading...</h2>;
        }

        return (
            <div class="row">

                {posts.map((list) => (
                    <div key={list._id} class="col-lg-3 col-md-12 mt-4">
                        <div class="card">

                            <img style={{ height: 200 }} class="card-img-top img-responsive" src={list.UrlImage} alt="Card image cap" />
                            <div class="card-body">
                                <p class="card-text">{list.Title}</p>

                            </div>
                            <div class="card-footer border-top-blue-grey border-top-lighten-5 text-muted">
                                <span class="float-left">{list.Stt}</span>
                                <span class="float-right">
                                    <FontAwesomeIcon style={{ marginRight: 4, paddingTop: 2 }} className='icon-edit' onClick={() => openModal('Sửa', list._id, list.Stt, list.Title, list.Content, list.UrlImage)} size="lg" title="Sửa" icon={faEdit} >
                                    </FontAwesomeIcon>
                                    <DeleteIcon onClick={() => deleteItem({ id: list._id }, '/deleteSlider').then(() => getSlider())} className='delete-icon' titleAccess='Xóa'></DeleteIcon>
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    /////////////////////////////////////
    useEffect(() => {
        getSlider()
        props.setColor()
    }, [])
    async function getSlider() {
        setLoading(true)
        const result = await axios('/getSlides')
        setListNews(result.data)
        setLoading(false);
    }

    function openModal(action, id, stt, title, content, url) {
        if (action === 'Thêm') {
            setAction('Thêm')
            setShowModal(true)
        } else {
            setAction('Sửa')
            setShowModal(true)
            setId(id)
            setUrl(url)
            setStt(stt)
            setContent(content)
            setTitle(title)


        }
    }

    function closeModal() {
        setShowModal(false)
        setTimeout(() => {
            setAction('')
            setShowModal('')
            setId('')
            setUrl('')
            setStt('')
            setContent('')
            setTitle('')
            setChecked(false)
        }, 300)

    }

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

    async function insertupdate(data, url, method) {
        await axios({
            method: method,
            url: url,
            data: data,
            headers: {
                'content-type': 'application/json'
            }
        }).then((res) => {
            swal()
            closeModal(false)
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
       <div>

        </div>
    )
}
export default SliderManager