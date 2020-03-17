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
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [addressStore, setAddresStore] = useState('');
  const [listStoreMenber, setListStoreMenber] = useState('');
  const [nameMenber, setNameMenber] = useState('');
  const [addressMenber, setAddressMenber] = useState('');
  const [phone, setPhone] = useState('');
  const [listDomMenber, setListDomMenber] = useState([])
  const [listDomAddres, setListDomAddress] = useState([])

  ////state time
  const [time, setTime] = useState()

  const listStore = useSelector(state => state.reducerStore.data);
  const dispacth=useDispatch();

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
      type:'FETCH_STORE',
      data:data
    })

  }
  const getMenber = async () => {
    const { data } = await axios('/getMenber')
    setListMenber(data)
  }
  const postBookMenberCut = () => {
    listDomMenber.map((item) => {
      callApi('post', '/postBook', {
        province: listDomAddres[0].province,
        district: listDomAddres[0].district,
        address: listDomAddres[0].address,
        name: item.name,
        datetime: time,
        phone:item.phone,
        id_store:listDomAddres[0]._id
      })
    })

  }
    const postMenber = async () => {
      callApi('post', '/postMenber', { name: nameMenber, address: addressMenber, phone: phone }).then(() => {
        setNameMenber('')
        setAddressMenber('');
        setPhone('');
        setAddressMenber('');
        swal()
      }).catch(() => swalErr())
    }

    useEffect(() => {
      getStore()
      props.setColor();
    }, [])
    useEffect(() => {

      if (listDomAddres.length > 1) {
        setListDomAddress(state => state.slice(1, 2));
      }
      console.log(listDomAddres)

    }, [listDomAddres])
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
          <ReturnModal />
        </Modal>
        <div style={{ marginTop: 5 }} class="card card-body">
          <div className="row">

            <div className="col-lg-6">
              <div class="form-group">
                <label for="content">Thêm chi nhánh</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Tỉnh Thành Phố"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                />

              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Quận huyện"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                />

              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Số - Phường Xã"
                  value={addressStore}
                  onChange={(e) => setAddresStore(e.target.value)}
                />
              </div>
              <button style={{ float: 'right', marginLeft: 15 }} onClick={() => openModal('Store')} className="btn btn-info">Xem</button>
              <button style={{ float: 'right' }}
                onClick={() => callApi('post', '/postStore', { address: addressStore, province: province, district: district }).then(() => {
                  getStore()
                  setAddresStore('');
                  setProvince('');
                  setDistrict('')
                  swal()
                }).catch(() => swalErr())}
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
        <div style={{ marginTop: 5 }} class="card card-body">
          <h5>Thêm lịch cắt</h5>
          <div className="row">
            <div className="col-lg-4">
              <button onClick={() => openModal('AddMenber')} type="button" class="btn btn-info d-none d-lg-block m-l-15"> <FontAwesomeIcon icon={faPlus} />Thêm Thợ cắt</button>
              <div style={{ marginTop: 20 }}>
                {
                  listDomMenber.map((item) =>
                    <div style={{ marginTop: 5 }} class="card card">
                      <div className="row" key={item._id}>
                        <div className="col-lg-10">Họ tên: {item.name}. SĐT:{item.phone}. Địa chỉ: {item.address}</div>
                        <div style={{ pointerEvents: 'auto' }} className="col-lg-2"><DeleteIcon onClick={() => { setListDomMenber(state => state.filter((itemf) => itemf._id != item._id)) }}></DeleteIcon></div>

                      </div>
                    </div>
                  )
                }
              </div>
            </div>

            <div className="col-lg-4">
              <button onClick={() => openModal('Add Address')} type="button" class="btn btn-info d-none d-lg-block m-l-15"> <FontAwesomeIcon icon={faPlus} />Thêm chi nhánh</button>
              <div style={{marginTop:20}}>
              </div>
              {
                listDomAddres.map((item) =>
                  <div style={{ marginTop: 5 }} class="card card">
                    <div className="row" key={item._id}>
                      <div className="col-lg-10">Tỉnh Thành: {item.province}. Quận Huyện:{item.district}. Địa chỉ: {item.address}</div>
                      <div className="col-lg-2"><DeleteIcon onClick={() => { setListDomAddress(state => state.filter((itemf) => itemf._id != item._id)) }}></DeleteIcon></div>

                    </div>
                  </div>
                )
              }
            </div>

            <div className="col-lg-4">
            <Calendar
              onChange={()=>{}}
              value={}
            ></Calendar>
     
              <button onClick={postBookMenberCut} type="button" class="btn btn-info d-none d-lg-block m-l-15"> <FontAwesomeIcon icon={faPlus} /> Hoàn thành tạo lịch</button>

            </div>

          </div>
        </div>
      </div>
    )
  }
  export default ManagerStoreMenber
