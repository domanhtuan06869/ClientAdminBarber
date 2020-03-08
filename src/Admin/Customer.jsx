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

const customStyles = {
    content: {
     
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
function Customer(props) {
    /*Contact */
    const [listNews, setListNews] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [action, setAction] = useState('')
    const [id, setId] = useState('')
    const [url, setUrl] = useState('')
    const [checked, setChecked] = useState(false)

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getCustomer()
        props.setColor()
    }, [])
    async function getCustomer() {
        setLoading(true)
        const result = await axios('/getCustomer')
        setListNews(result.data)
        setLoading(false);
    }

    function openModal(action, id, url) {
        if (action === 'Thêm') {
            setAction('Thêm')
            setShowModal(true)
        } else {
            setAction('Sửa')
            setShowModal(true)
            setId(id)
            setUrl(url)


        }




    }
    function closeModal() {
        setShowModal(false)
        setUrl('')
        setChecked(false)
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
    function swal(){
        Swal.fire({  
            title: 'Thành công',  
            type: 'success', 
            icon: 'success' 
        }); 
    }
    function swalErr(){
      Swal.fire({  
          title: 'Xóa Thành công',  
          type: 'success',  
          icon: 'error'
      }); 
    }
    function getFiles(files) {
        setUrl(files.base64)
    }
    return (
        <div>
       

        </div>
    )
}
export default Customer