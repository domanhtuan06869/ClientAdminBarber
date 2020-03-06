import React, { useRef, useState, useEffect } from 'react'
import close from '../assets/image/close.png'
import axios from 'axios'
import Modal from 'react-modal';
import { GetMenber, GetStore, AddMenberCut } from '../componentsAdmin/ModalManager'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'
import callApi from '../controller/resapi'
import customStyles from '../controller/custom_modal'
import DeleteIcon from '@material-ui/icons/Delete';
const provinceAddress=['Hà Nội','TP Hồ Chí Minh']

function ManagerStoreMenber(props) {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [listStore, setListStore] = useState([]);
  const [listMenber, setListMenber] = useState([]);
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [addressStore, setAddresStore] = useState('');
  const [listStoreMenber, setListStoreMenber] = useState('');
  const [nameMenber, setNameMenber] = useState('');
  const [addressMenber, setAddressMenber] = useState('');
  const [phone, setPhone] = useState('');
  const [listDomMenber, setListDomMenber] = useState([])

  ////state add adres store
const [provinceSelect,setProvinceSelect]=useState('Hà Nội')
const [districtSelect,setDistrictSelect]=useState('Hà Nội')


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

const handelChaneProvince=text=>{
  setProvinceSelect(text.target.value)

}



  useEffect(() => {
    props.setColor();
    getStore()
  }, [])
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
        <AddMenberCut data={listMenber} setMenber={setListDomMenber}></AddMenberCut>
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
                setAddresStore('');
                setProvince('');
                setDistrict('')

              })}
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
        <h5>Thêm lịch</h5>
        <div className="row">
          <div className="col-lg-4">
            <button onClick={() => openModal('AddMenber')} type="button" class="btn btn-info d-none d-lg-block m-l-15"> <FontAwesomeIcon icon={faPlus} />Thêm Thợ cắt</button>
            {
              listDomMenber.map((item) =>
                <div className="row" key={item._id}>
                  <div className="col-lg-11">Họ tên: {item.name}. SĐT:{item.phone}. Địa chỉ: {item.address}</div>
                  <div className="col-lg-1"><DeleteIcon onClick={() => { setListDomMenber(state => state.filter((itemf) => itemf._id != item._id)) }}></DeleteIcon></div>

                </div>
              )
            }
          </div>
          <div className="col-lg-4">
      
            <div>
            <label>
              Tỉnh thành phố
          <select value={provinceSelect} onChange={handelChaneProvince}>
            {provinceAddress.map((item)=>
                 <option value={item}>{item}</option>
            )}
              </select>
            </label>
            </div>
            <div>
            <label>
              Tỉnh thành phố
          <select value={districtSelect} onChange={(e)=>setDistrictSelect(e.target.value)}>
            {listStore.filter(item => item.province.includes(provinceSelect)).
            map((item)=>
             <option value={item.district}>{item.district}</option>
        )
            }
              </select>
            </label>
            </div>
          </div>
          <div className="col-lg-4">
            <button type="button" class="btn btn-info d-none d-lg-block m-l-15"> <FontAwesomeIcon icon={faPlus} /> Tạo lịch</button>

          </div>

        </div>
      </div>
    </div>
  )
}
export default ManagerStoreMenber