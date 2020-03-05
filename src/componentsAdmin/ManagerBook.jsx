import React, { useRef, useState, useEffect } from 'react'
import close from '../assets/image/close.png'
import axios from 'axios'
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'
import callApi from '../controller/resapi'
import { swal, swalErr } from '../controller/swal'
import customStyles from '../controller/custom_modal'

function ManagerBook(props) {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [list, setListNews] = useState([])
  const [addressStore, setAddresStore] = useState('')

  function  openModal() {
    getStore();
    setShowModal(true);


  }

  function closeModal() {
    setShowModal(false)
    setTimeout(() => {
    }, 500)

  }
const getStore=async()=>{
  const {data} = await axios('/getStore')
  setListNews(data)
}
  useEffect(async() => {
    props.setColor();
  }, [])
  const GetStore=(list)=> {
    return(
      <div className="">
        {list.data.map((item)=>
        <div>{item.address}</div>
          )}
      </div>
    )
  }


  return (
    <div style={{ width: '100%' }}>
      <Modal
          closeTimeoutMS={500}
          isOpen={showModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal">
          <img className='mdclose' src={close} style={{ float: 'right', width: 20, height: 20 }} onClick={() => closeModal()}></img>
          <h2> Thêm kiểu tóc</h2>
          <div class="card card-body">
            <GetStore data={list}/>
          </div>
        </Modal>
      <div className="row">

        <div className="col-lg-6">
          <div class="form-group">
            <label for="content">Thêm chi nhánh</label>
            <input
              type="text"
              class="form-control"
              placeholder="Địa chỉ chi nhánh"
              value={addressStore}
              onChange={(e) => setAddresStore(e.target.value)}

            />

          </div>
          <button style={{ float: 'right', marginLeft: 15 }} onClick={()=>openModal()} className="btn btn-info">Xem</button>
          <button style={{ float: 'right' }}
            onClick={() => callApi('post', '/postStore', { address: addressStore }, { swal: swal, swalErr: swalErr }).then(() => setAddresStore(''))}
            className="btn btn-info">Thêm</button>
        </div>
        <div className="col-lg-6">
          <div class="form-group">
            <label for="content">Thêm thợ</label>
            <input
              type="text"
              class="form-control"
              placeholder="Tên thợ"

            />
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Số điện thoại"

            />
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Địa chỉ"

            />
          </div>
          <button style={{ float: 'right', marginLeft: 15 }} className="btn btn-info">Xem</button>
          <button style={{ float: 'right' }} className="btn btn-info">Thêm</button>

        </div>
      </div>
    </div>
  )
}
export default ManagerBook