import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import Modal from 'react-modal';
import Swal from "sweetalert2";
import DeleteIcon from '@material-ui/icons/Delete';
import ExportExcel from '../componentsAdmin/ExcelExport';
import PrintOut from '../componentsAdmin/PrintOut';
import { BallBeat } from 'react-pure-loaders';

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
function Contact(props) {
  const [loading, setLoading] = useState(false);
  const [selectStore, setSelectStore] = useState('');
  const [calendarCut, setCalendarCut] = useState([]);
  const [find, setFind] = useState('')
  const rescalendar = calendarCut.filter(item => item.phone_menber_cut.includes(find
    ));
  const listStore = useSelector(state => state.reducerStore.data);
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
   await  setCalendarCut(data)
   setLoading(false)

  }
  useEffect(() => {
    getStore()
  }, [])

  const componentRef = useRef();

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
        <div style={{marginTop:20}} className="row">
          <div class="col-lg-3">
            <label class="mr-sm-2" for="SelectAdrress">Chi Nhánh</label>
            <select value={selectStore} onChange={handleChangeSelect} className="custom-select mr-sm-2" id="SelectAdrress">
              <option selected>Chọn một chi nhánh</option>
              {listStore.map((item) => (
                <option key={item._id} value={item._id}>{item.address}</option>
              ))}
            </select>
          </div>
          {calendarCut.length>0? <div class="col-lg-3">
          <div class="form-group">
                <label for="content">Tìm thợ</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Tìm thợ cắt theo số điện thoại"
                  value={find}
                  onChange={(e) => setFind(e.target.value)}
                />
              </div>
            </div>:null
            }
        </div>
        <div>
          {
            loading == true ? < div className='loading' >

              <BallBeat color={'#123abc'}
                loading={loading} />
            </div > : 
            <div ref={componentRef}>{
              rescalendar.map((item,index)=>
              <div  className="row" key={item._id} style={{backgroundColor:index %2==0?'#ccc':null}}>
                <div className="col-lg-3" style={{backgroundColor:item.ca1===true?'yellow':'green'}}>1h30 hahahahahahahahaha</div>

              </div>
              )
            }</div>
          }

        </div>
    </div>
  )
}
export default Contact
