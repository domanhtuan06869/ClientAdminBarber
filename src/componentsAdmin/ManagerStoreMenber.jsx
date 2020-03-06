import React, { useRef, useState, useEffect } from 'react'
import close from '../assets/image/close.png'
import axios from 'axios'
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'
import callApi from '../controller/resapi'
import customStyles from '../controller/custom_modal'
import DeleteIcon from '@material-ui/icons/Delete';

function ManagerStoreMenber(props) {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [listStore, setListStore] = useState([]);
  const [listMenber, setListMenber] = useState([]);
  const [addressStore, setAddresStore] = useState('');
  const [listStoreMenber, setListStoreMenber] = useState('');
  const [nameMenber, setNameMenber] = useState('');
  const [addressMenber, setAddressMenber] = useState('');
  const [phone, setPhone] = useState('');

  function openModal(id) {
    if (id === 'Store') {
      setListStoreMenber(id)
      getStore();
      setShowModal(true);
    } else {
      setListStoreMenber(id);
      getMenber();
      setShowModal(true);
    }
  }

  function closeModal() {
    setShowModal(false)
    setTimeout(() => {
    }, 500)
  }
  const getStore = async () => {
    const { data } = await axios('/getStore')
    setListStore(data)
  }
  const getMenber = async () => {
    const { data } = await axios('/getMenber')
    setListMenber(data)
  }
  const postMenber = async () => {
    callApi('post', '/postMenber', { name: nameMenber, address: addressMenber, phone: phone }).then(() => {
      setNameMenber('')
      setAddressMenber('');
      setPhone('');
      setAddressMenber('');
    });
  }
  useEffect(() => {
    props.setColor();
  }, [])
  const GetStore = (list) => {
    return (
      <div style={{marginTop:10}} className="">
        {list.data.map((item) =>
          <div style={{ marginTop: 5 }} class="card card-body">
            <div key={item._id} className="row">
              <div className="col-lg-11">{item.address}</div>
              <div className="col-lg-1"><DeleteIcon onClick={() => callApi('delete', '/deleteStore', { id: item._id }).then(() => getStore())}></DeleteIcon></div>
            </div>
          </div>
        )}
      </div>
    )
  }

  const GetMenber = (list) => {
    return (
      <div style={{marginTop:10}} className="">
        {list.data.map((item) =>
          <div style={{ marginTop: 5 }} class="card card-body">
            <div key={item._id} className="row">
        <div className="col-lg-11">Họ tên: {item.name}. SĐT:{item.phone}. Địa chỉ: {item.address}</div>
              <div className="col-lg-1"><DeleteIcon onClick={() => callApi('delete', '/deleteMenber', { id: item._id }).then(() => getMenber())}></DeleteIcon></div>
            </div>
          </div>
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
        <h2> {listStoreMenber}</h2>
        {listStoreMenber === 'Store' ? <GetStore data={listStore} /> : <GetMenber data={listMenber}/>}
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
          <button style={{ float: 'right', marginLeft: 15 }} onClick={() => openModal('Store')} className="btn btn-info">Xem</button>
          <button style={{ float: 'right' }}
            onClick={() => callApi('post', '/postStore', { address: addressStore }).then(() => setAddresStore(''))}
            className="btn btn-info">Thêm</button>
        </div>
        <div className="col-lg-6">
          <div class="form-group">
            <label for="content">Thêm thợ</label>
            <input
              type="text"
              class="form-control"
              placeholder="Tên thợ"
              value={nameMenber}
              onChange={(e) => setNameMenber(e.target.value)}

            />
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}

            />
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Địa chỉ"
              value={addressMenber}
              onChange={(e) => setAddressMenber(e.target.value)}

            />
          </div>
          <button style={{ float: 'right', marginLeft: 15 }} onClick={() => openModal('Menber')} className="btn btn-info">Xem</button>
          <button style={{ float: 'right' }} onClick={() => postMenber()} className="btn btn-info">Thêm</button>
        </div>
      </div>
    </div>
  )
}
export default ManagerStoreMenber