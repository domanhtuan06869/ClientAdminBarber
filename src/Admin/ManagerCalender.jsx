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
        {
          loading == true ? < div className='loading' >

            <BallBeat color={'#123abc'}
              loading={loading} />
          </div > :
            <div ref={componentRef}>{
              filterCalendar.map((item, index) =>
                <div className="row border border-dark" key={item._id} style={{ marginTop: 5, backgroundColor: index % 2 == 0 ? '#ccc' : null }}>
                  <div className="col-lg-3 border-right border-dark">
                    <div>
                      Họ tên: {item.name_menber}
                    </div>
                    <div>
                      SĐT: {item.phone_menber_cut}
                    </div>
                  </div>
                  <div className="col-lg-9">
                    <div className="row border-bottom border-dark">
                      <div style={styleCalendar(item.shift_1.isReady)} onClick={() => eventUpdateCalendarMenber(item, item.shift_1.isReady, 0)} className="col-lg-1.5 border-right border-dark"> {item.shift_1.time}</div>
                      <div style={styleCalendar(item.shift_2.isReady)} onClick={() => eventUpdateCalendarMenber(item, item.shift_2.isReady, 1)} className="col-lg-1.5 border-right border-dark"> {item.shift_2.time}</div>
                      <div style={styleCalendar(item.shift_3.isReady)} onClick={() => eventUpdateCalendarMenber(item, item.shift_3.isReady, 2)} className="col-lg-1.5 border-right border-dark"> {item.shift_3.time}</div>
                      <div style={styleCalendar(item.shift_4.isReady)} onClick={() => eventUpdateCalendarMenber(item, item.shift_4.isReady, 3)} className="col-lg-1.5 border-right border-dark"> {item.shift_4.time}</div>
                      <div style={styleCalendar(item.shift_5.isReady)} onClick={() => eventUpdateCalendarMenber(item, item.shift_5.isReady, 4)} className="col-lg-1.5 border-right border-dark"> {item.shift_5.time}</div>
                      <div style={styleCalendar(item.shift_6.isReady)} onClick={() => eventUpdateCalendarMenber(item, item.shift_6.isReady, 5)} className="col-lg-1.5 border-right border-dark"> {item.shift_6.time}</div>
                      <div style={styleCalendar(item.shift_7.isReady)} onClick={() => eventUpdateCalendarMenber(item, item.shift_7.isReady, 6)} className="col-lg-1.5 border-right border-dark"> {item.shift_7.time}</div>
                      <div style={styleCalendar(item.shift_8.isReady)} onClick={() => eventUpdateCalendarMenber(item, item.shift_8.isReady, 7)} className="col-lg-1.5 border-right border-dark"> {item.shift_8.time}</div>
                      <div style={styleCalendar(item.shift_9.isReady)} onClick={() => eventUpdateCalendarMenber(item, item.shift_9.isReady, 8)} className="col-lg-1.5 border-right border-dark"> {item.shift_9.time}</div>
                    </div>
                    <div className="row">
                      <div style={styleCalendar(item.shift_10.isReady)} onClick={() => eventUpdateCalendarMenber(item, item.shift_10.isReady, 9)} className="col-lg-1.5 border-right border-dark"> {item.shift_10.time}</div>
                      <div style={styleCalendar(item.shift_11.isReady)} onClick={() => eventUpdateCalendarMenber(item, item.shift_11.isReady, 10)} className="col-lg-1.5 border-right border-dark"> {item.shift_11.time}</div>
                      <div style={styleCalendar(item.shift_12.isReady)} onClick={() => eventUpdateCalendarMenber(item, item.shift_12.isReady, 11)} className="col-lg-1.5 border-right border-dark"> {item.shift_12.time}</div>
                      <div style={styleCalendar(item.shift_13.isReady)} onClick={() => eventUpdateCalendarMenber(item, item.shift_13.isReady, 12)} className="col-lg-1.5 border-right border-dark"> {item.shift_13.time}</div>
                      <div style={styleCalendar(item.shift_14.isReady)} onClick={() => eventUpdateCalendarMenber(item, item.shift_14.isReady, 13)} className="col-lg-1.5 border-right border-dark"> {item.shift_14.time}</div>
                      <div style={styleCalendar(item.shift_15.isReady)} onClick={() => eventUpdateCalendarMenber(item, item.shift_15.isReady, 14)} className="col-lg-1.5 border-right border-dark"> {item.shift_15.time}</div>
                      <div style={styleCalendar(item.shift_16.isReady)} onClick={() => eventUpdateCalendarMenber(item, item.shift_16.isReady, 15)} className="col-lg-1.5 border-right border-dark"> {item.shift_16.time}</div>
                      <div style={styleCalendar(item.shift_17.isReady)} onClick={() => eventUpdateCalendarMenber(item, item.shift_17.isReady, 16)} className="col-lg-1.5 border-right border-dark"> {item.shift_17.time}</div>
                      <div style={styleCalendar(item.shift_18.isReady)} onClick={() => eventUpdateCalendarMenber(item, item.shift_18.isReady, 17)} className="col-lg-1.5 border-right border-dark"> {item.shift_18.time}</div>
                    </div>
                  </div>
                </div>
              )
            }</div>
        }

      </div>
    </div>
  )
}
export default ManagerCalender
