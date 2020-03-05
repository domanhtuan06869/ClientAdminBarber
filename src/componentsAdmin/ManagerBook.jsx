import React, { useRef, useState, useEffect } from 'react'
import close from '../assets/image/close.png'
import 'react-quill/dist/quill.snow.css';
import ReactQuill, { Quill } from 'react-quill';
import axios from 'axios'
import Modal from 'react-modal';
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
function ManagerBook(props) {
  const [loading,setLoading]=useState(true);
  const [list, setListNews] = useState([])


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


  return (
    <div style={{ width: '100%' }}>
      <h1>Màn tạo đặt lich</h1>
    </div>
  )
}
export default ManagerBook