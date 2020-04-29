import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import Modal from 'react-modal';
import Swal from "sweetalert2";
import DeleteIcon from '@material-ui/icons/Delete';
import ExportExcel from '../componentsAdmin/ExcelExport';
import PrintOut from '../componentsAdmin/PrintOut';
import { BallBeat } from 'react-pure-loaders';
import callApi from '../controller/resapi'

var dataSet2 = [
  {
    name: "Johnson",
    total: 25,
    remainig: 16
  },
  {
    name: "Josef",
    total: 25,
    remainig: 7
  }
];
function ManagerCalender(props) {
  const [loading, setLoading] = useState(false);
  const [selectStore, setSelectStore] = useState('');
  const [calendarCut, setCalendarCut] = useState([]);
  const [find, setFind] = useState('')

  const listStore = useSelector(state => state.reducerStore.data);
  const listCalendar = useSelector(state => state.reducerCalendar.data);
  const filterCalendar = listCalendar.filter(item => item.phone_menber_cut.includes(find));
  const dispacth = useDispatch();

  useEffect(() => {
    props.setColor()
  }, [])
  async function getStore() {
    const { data } = await axios('/getStore')
    dispacth({
      type: 'FETCH_STORE',
      data: data
    })
  }


  const handleChangeSelect = async text => {
    setLoading(true)
    setSelectStore(text.target.value)
    const id = text.target.value
    const { data } = await axios('/getmanagercalendarcrate?id_store=' + id);
    dispacth({
      type: 'FETCH_CALENDAR',
      data: data
    })
    setLoading(false)

  }
  useEffect(() => {
    getStore()
  }, [])

  const componentRef = useRef();

  const styleCalendar = isReady => {
    const style = { padding: 3, color: '#fff', backgroundColor: isReady ? '#009933' : '#ff9900', cursor: 'pointer' }
    return style
  }
  const updateCalendar = async (item) => {
    const { data } = await axios('/getmanagercalendarcrate?id_store=' + item.id_store)
    dispacth({
      type: 'FETCH_CALENDAR',
      data: data
    })

  }

  async function eventUpdateCalendarMenber(item, isReady, index) {
    callApi('post', '/updateCalendarMenber', {
      id: item._id,
      index: index,
      isReady: isReady
    }).then((res) => {
      updateCalendar(item)
    })

  }

  return (
    <div>
      <div className="row">
        <div className="col-lg-1.9">
          <ExportExcel dataset={dataSet2}></ExportExcel>
        </div>
        <div className="col-lg-2">
          <PrintOut refdata={componentRef}></PrintOut>
        </div>
      </div>
      <div style={{ marginTop: 20 }} className="row">
        <div class="col-lg-3">
          <label className="mr-sm-2" for="SelectAdrress">Chi Nhánh</label>
          <select value={selectStore} onChange={handleChangeSelect} className="custom-select mr-sm-2" id="SelectAdrress">
            <option selected>Chọn một chi nhánh</option>
            {listStore.map((item) => (
              <option key={item._id} value={item._id}>{item.address}</option>
            ))}
          </select>
        </div>
        <div style={{ marginTop: 26 }} className="col-lg-1.6">
          <button className="btn btn-info mt-20">Hôm nay</button>
        </div>
        <div style={{ marginTop: 26, marginLeft: 5 }} className="col-lg-1.6">
          <button className="btn btn-info mt-20">Ngày mai</button>
        </div>
        <div style={{ marginTop: 26, marginLeft: 5 }} className="col-lg-1.6">
          <button className="btn btn-info mt-20">Ngày kia</button>
        </div>

      </div>
      <div className="row">
        {listCalendar.length > 0 ? <div class="col-lg-3">
          <div className="form-group">
            <label>Tìm thợ</label>
            <input
              type="text"
              className="form-control"
              placeholder="Tìm thợ cắt theo số điện thoại"
              value={find}
              onChange={(e) => setFind(e.target.value)}
            />
          </div>
        </div> : null
        }
      </div>
      <div>

        <div style={{marginTop:20}} className="row">
          <div className="col-lg-1 border border-success">
            8h
          </div>
          <div className="col-lg-1 border border-danger">
            8h30
          </div>
          <div className="col-lg-1 border border-success">
            9h
          </div>
          <div className="col-lg-1 border border-danger">
            9h30
          </div>
          <div className="col-lg-1 border border-success">
            10h
          </div>
          <div className="col-lg-1 border border-danger">
            10h30
          </div>
          <div className="col-lg-1 border border-success">
           11h
          </div>
          <div className="col-lg-1 border border-danger">
            11h30
          </div>
          <div className="col-lg-1 border border-success">
          12h
          </div>
          <div className="col-lg-1 border border-danger">
            12h30
          </div>
          <div className="col-lg-1 border border-success">
            13h
          </div>
          <div className="col-lg-1 border border-danger">
            13h30
          </div>
          <div className="col-lg-1 border border-success">
          14h
          </div>
          <div className="col-lg-1 border border-danger">
          14h30
          </div>
          <div className="col-lg-1 border border-success">
          15h
          </div>
          <div className="col-lg-1 border border-danger">
            15h30
          </div>
          <div className="col-lg-1 border border-success">
           16h
          </div>
          <div className="col-lg-1 border border-danger">
            16h30
          </div>
          <div className="col-lg-1 border border-success">
            17h
          </div>
          <div className="col-lg-1 border border-danger">
            17h30
          </div>
          <div className="col-lg-1 border border-success">
            18h
          </div>
          <div className="col-lg-1 border border-danger">
            18h30
          </div>
          <div className="col-lg-1 border border-success">
          19h
          </div>
          <div className="col-lg-1 border border-danger">
            19h30
          </div>
          <div className="col-lg-1 border border-success">
           20h
          </div>
        </div>


      </div>
    </div>
  )
}
export default ManagerCalender
