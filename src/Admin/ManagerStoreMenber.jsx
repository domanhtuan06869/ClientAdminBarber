import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";

import close from '../assets/image/close.png'
import axios from 'axios'
import Modal from 'react-modal';
import { GetMenber, GetStore, AddMenberCut, AddAddressCut } from '../componentsAdmin/ModalManager'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'
import callApi from '../controller/resapi'
import customStyles from '../controller/custom_modal'
import DeleteIcon from '@material-ui/icons/Delete';
import { swal, swalErr } from '../controller/swal'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function ManagerStoreMenber(props) {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [listMenber, setListMenber] = useState([]);
  const [cityLocation, setCityLocation] = useState('');
  const [districtLocation, setDistrictLocation] = useState('');
  const [districtDetailLocation, setDistrictDetailLocation] = useState('');
  const [addressLocation, setAddressLocation] = useState('');
  const [listStoreMenber, setListStoreMenber] = useState('');
  const [nameMenber, setNameMenber] = useState('');
  const [ratingStylist, setRatingStylist] = useState('');
  const [listDomMenber, setListDomMenber] = useState([])
  const [listDomAddres, setListDomAddress] = useState([])

  ////state time
  const [time, setTime] = useState(new Date());

  const listStore = useSelector(state => state.reducerStore.data);
  const dispacth = useDispatch();

  function openModal(id) {
    if (id === 'Store') {
      setListStoreMenber(id)
      getStore();
      setShowModal(true);
    } else if ('Menber') {
      setListStoreMenber(id);
      getMenber();
      setShowModal(true);
    } else if ('AddMenber') {
      setListStoreMenber(id);
      getMenber();
      setShowModal(true);
    } else if ('Add Address') {
      setListStoreMenber(id);
      getStore();
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
    dispacth({
      type: 'FETCH_STORE',
      data: data
    })

  }
  const getMenber = async () => {
    const { data } = await axios('/getMenber')
    setListMenber(data)
  }

  const postMenber = async () => {
    callApi('post', '/postMenber', { nameStylist: nameMenber, ratingStylist: ratingStylist }).then(() => {
      setNameMenber('')
      setRatingStylist('');
      swal()
    }).catch(() => swalErr())
  }

  useEffect(() => {
    getStore()
    props.setColor();
  }, [])

  const checkValidateStore = () => {
    if (cityLocation === '' || districtLocation === '' || districtDetailLocation === '' || addressLocation === '') {
      alert('Vui lòng nhập đủ các trường dữ liệu')
      return true
    } else {
      return false
    }
  }

  const ReturnModal = () => {
    if (listStoreMenber === 'Store') {
      return (
        <GetStore data={listStore} getNew={getStore} />
      )
    } else if (listStoreMenber === 'Menber') {
      return (
        <GetMenber data={listMenber} getNew={getMenber} />
      )
    } else if (listStoreMenber === 'AddMenber') {
      return (
        <AddMenberCut data={listMenber} setMenber={setListDomMenber} deleteMenber={setListMenber}></AddMenberCut>
      )
    } else if (listStoreMenber === 'Add Address') {
      return (
        <AddAddressCut data={listStore} setAddress={setListDomAddress}> </AddAddressCut>
      )
    }
  }

  const postStore = () => {
    if (!checkValidateStore()) {
      callApi('post', '/postStore',
        {
          cityLocation: cityLocation,
          districtLocation: districtLocation,
          addressLocation: addressLocation,
          districtDetailLocation: districtDetailLocation
        }).then(() => {
          getStore()
          setAddressLocation('');
          setCityLocation('');
          setDistrictLocation('')
          setDistrictDetailLocation('')
          swal()
        }).catch(() => swalErr())
    }
  }

  const HeaderModal = () => {
    let title;
    if (listStoreMenber === 'Menber') {
      title = 'Danh sách thợ'
    } else if (listStoreMenber === 'Store') {
      title = 'Danh sách địa chỉ'
    }
    return (
      <h3>{title} </h3>
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
        <HeaderModal />
        <ReturnModal />
      </Modal>
      <div style={{ marginTop: 5 }} className="card card-body">
        <div className="row">

          <div className="col-lg-6">
            <div className="form-group">
              <label>Thêm chi nhánh</label>
              <input
                type="text"
                className="form-control"
                placeholder="Tỉnh thành phố"
                value={cityLocation}
                onChange={(e) => setCityLocation(e.target.value)}
              />

            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Quận huyện"
                value={districtLocation}
                onChange={(e) => setDistrictLocation(e.target.value)}
              />

            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Số"
                value={addressLocation}
                onChange={(e) => setAddressLocation(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Địa chỉ quận huyện chi tiết"
                value={districtDetailLocation}
                onChange={(e) => setDistrictDetailLocation(e.target.value)}
              />
            </div>

            <button style={{ float: 'right', marginLeft: 15 }} onClick={() => openModal('Store')} className="btn btn-info">Xem</button>
            <button style={{ float: 'right' }}
              onClick={postStore}
              className="btn btn-info">Thêm</button>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <label>Thêm thợ</label>
              <input
                type="text"
                className="form-control"
                placeholder="Tên thợ"
                value={nameMenber}
                onChange={(e) => setNameMenber(e.target.value)}

              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Số sao"
                value={ratingStylist}
                onChange={(e) => setRatingStylist(e.target.value)}

              />
            </div>
            <button style={{ float: 'right', marginLeft: 15 }} onClick={() => openModal('Menber')} className="btn btn-info">Xem</button>
            <button style={{ float: 'right' }} onClick={() => postMenber()} className="btn btn-info">Thêm</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ManagerStoreMenber
