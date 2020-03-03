import React, { useRef, useState, useEffect } from 'react'
import close from '../assets/image/close.png'

import axios from 'axios'
import Modal from 'react-modal';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Swal from "sweetalert2";

const customStyles = {
    content: {
        width: '70%',
  
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
function UpdateInfomation(props) {
    const [showModal, setShowModal] = useState(false)
    const [id, setId] = useState('')
    const [content, setContent] = useState('')
    const[intro,setIntro]=useState({})

    useEffect(() => {
        getCustomer()
        props.setColor()
    }, [])
    async function getCustomer() {
        const result = await axios('/getIntroduction')
        setIntro(result.data)
    

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

    function openModal() {
        setId(intro._id)
        setContent(intro.content)
        setShowModal(true)

    }
    function closeModal() {
        setShowModal(false)
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


    return (
        <div>
            <Modal
                closeTimeoutMS={500}
                isOpen={showModal}

                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal" >

                <img className='mdclose' src={close} style={{ float: 'right', width: 20, height: 20 }} onClick={() => closeModal()}></img>
                <h2>{'Sửa Thông Tin Công Ty'}</h2>
                <div class="card card-body" style={{  maxWidth: '100%', margin: 10 }}>
                    <div class="form-group">
                        <label for="title">Thông tin</label>
                        <textarea rows="9" cols="100"
                            class="form-control"
                            placeholder="Giới thiệu"
                            value={content}
                            onChange={(text) => setContent(text.target.value)}
                        />
                    </div>



                    <div style={{ marginTop: 30 }} class="form-group">
                        <button onClick={() => {

                            insertupdate({
                                id: id,
                                content: content
                            }, '/updateIntro', 'put').then(() => getCustomer())
                        }} className="btn btn-info">Sửa</button>
                    </div>
                </div>


            </Modal>

            <div>
                <button onClick={() => openModal('Thêm')} style={{ float: 'right' }} type="button" class="btn btn-info d-none d-lg-block m-l-15"> <FontAwesomeIcon icon={faPlus} /> Update</button>

                <h2>Quản lí giới thiệu công ty</h2>
                <h6 style={{ textAlign: 'justify' }}>  {intro.content}  </h6>
            </div>

        </div>
    )
}
export default UpdateInfomation