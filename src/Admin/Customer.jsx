import React, { useRef, useState, useEffect } from 'react'
import close from '../assets/image/close.png'
import 'react-quill/dist/quill.snow.css';
import ReactQuill, { Quill } from 'react-quill';
import axios from 'axios'
import Modal from 'react-modal';
import Add from '@material-ui/icons/Add';
import qs from 'qs'
import DataTable from 'react-data-table-component';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'
import DeleteIcon from '@material-ui/icons/Delete';
import FileBase64 from 'react-file-base64';
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
            <Modal
                closeTimeoutMS={500}
                isOpen={showModal}

                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal" >

                <img className='mdclose' src={close} style={{ float: 'right', width: 20, height: 20 }} onClick={() => closeModal()}></img>
                <h2>{action === 'Thêm' ? 'Thêm icon khách hàng' : 'Sửa icon khách hàng'}</h2>
                <div class="card card-body">
                    <div class="form-group">
                        <label for="title">Chọn ảnh khách hàng</label>
                        <div>

{checked === false ? <FileBase64
    multiple={false}
    onDone={(file) => setUrl(file.base64)} /> : <input
        type="text"

        class="form-control"
        placeholder="image"
        value={url}
        onChange={(text) => setUrl(text.target.value)}

    />}    {url === '' ? null : <img style={{ width: 100, height: 50, marginTop: true ? 3 : 0 }} src={url}></img>}
<label>Chọn ảnh</label>   <input type='radio' checked={checked === false ? true : false} onClick={() => setChecked(false)} name="cbSlider" />
<label>Nhập link</label>     <input type='radio' onClick={() => setChecked(true)} name="cbSlider" />
</div>

                    </div>



                    <div style={{ marginTop: 30 }} class="form-group">
                        <button onClick={() => {
                            action === 'Thêm' ?
                                insertupdate({
                                    imagecustomer: url
                                }, '/postCustomer', 'post').then(() => getCustomer()) : insertupdate({
                                    id: id,
                                    imagecustomer: url
                                }, '/updateCustomer', 'put').then(() => getCustomer())
                        }} className="btn btn-info">{action}</button>
                    </div>
                </div>


            </Modal>

            <div>
            <button onClick={()=>openModal('Thêm')} style={{float:'right'}} type="button" class="btn btn-info d-none d-lg-block m-l-15"> <FontAwesomeIcon icon={faPlus} /> Create New</button>
                <h2>Ảnh khách hàng</h2>

   
                <div style={{ marginTop: 3 }} class="row">
                    {listNews.map((list) => (
                                <div  key={list._id} class="col-lg-3 col-md-12 mt-4">
                                <div class="card">
                              
                                    <img style={{height:200}} class="card-img-top img-responsive" src={list.imagecustomer}  alt="Card image cap" />
                                    <div class="card-body">
                      
                                    </div>
                                    <div class="card-footer border-top-blue-grey border-top-lighten-5 text-muted">
                                        <span class="float-left"></span>
                                    
                                        <span class="float-right">
                                            <FontAwesomeIcon style={{marginRight:4,paddingTop:2}} className='icon-edit' onClick={() => openModal('Sửa', list._id, list.imagecustomer)} size="lg" title="Sửa" icon={faEdit} >
                                            </FontAwesomeIcon>
                                            <DeleteIcon onClick={() => deleteItem({ id: list._id }, '/deleteCustomer').then(() => getCustomer())} className='delete-icon' titleAccess='Xóa'></DeleteIcon>
                                        </span>
                                    </div>
                                </div>
                            </div>
                                     
                    ))}



                </div>
            </div>

        </div>
    )
}
export default Customer