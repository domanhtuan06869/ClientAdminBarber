import React, { useEffect, useState } from 'react';
import close from '../assets/image/close.png'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import axios from 'axios'
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'
const customStyles = {
  content: {
    height: '70%',
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
export default function StyleImage(props) {
  const [showModal, setShowModal] = useState(false);
  const [arrayImage, setArrayImage] = useState([]);
  function openModal() {
    setShowModal(true)

  }

  function closeModal() {
    setShowModal(false)
    setTimeout(() => {
      setArrayImage([])
    }, 500)

  }

  useEffect(() => {

  }, [])


  const postImage = async (file) => {
    let formData = new FormData();
    formData.append('file', file);
    axios.post(
      '/Uploadfile',
      formData,
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }
    )
      .then(res => {
        console.log(res.data);
        setArrayImage(state => [...state, res.data])
      }).catch(() => {
      })
  }
  const MyUploader = () => {
    const handleChangeStatus = ({ meta, file }, status) => {
    }
    const handleSubmit = async (files, allFiles) => {
      allFiles.map((item) => {
        postImage(item.file)
      })
      allFiles.forEach(f => f.remove())
    }

    return (
      <Dropzone
        multiple
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        inputContent={"Hãy chọn file"}
        submitButtonContent="Thêm ảnh"
        classNames={{ submitButton: 'btn btn-danger' }}
      //   accept="image/*,audio/*,video/*"
      />
    )
  }


  return (

    <div>
      <button onClick={() => openModal('Thêm')} style={{ float: 'right' }} type="button" class="btn btn-info d-none d-lg-block m-l-15"> <FontAwesomeIcon icon={faPlus} /> Create New</button>

      <Modal
        closeTimeoutMS={500}
        isOpen={showModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal">
        <img className='mdclose' src={close} style={{ float: 'right', width: 20, height: 20 }} onClick={() => closeModal()}></img>
        <h2> Thêm </h2>
        <div class="card card-body">
            <MyUploader />
            {arrayImage.map((item) =>
            <label>
              {item}
            </label>
          )}
          </div>
       <button style={{marginTop:10}} className="btn btn-info">Thêm kiểu</button>
      </Modal>

    </div>

      );
}