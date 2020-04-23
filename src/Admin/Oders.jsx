import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import ExportExcel from '../componentsAdmin/ExcelExport';
import PrintOut from '../componentsAdmin/PrintOut';
import { BallBeat } from 'react-pure-loaders';
import callApi from '../controller/resapi'
import { swal, swalErr } from '../controller/swal'

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
function Oders(props) {
    const [loading, setLoading] = useState(false);
    const [selected, setSelect] = useState('0');
    const [listOder, setListOder] = useState([])

    useEffect(() => {
        props.setColor()
    }, [])
    async function getOders() {
        setLoading(true)
        const { data } = await axios('/getOders?status=' + "0");
        setListOder(data)
        setLoading(false)
    }


    const handleChangeSelect = async text => {
        setLoading(true)
        setSelect(text.target.value)
        const value = text.target.value
        const { data } = await axios('/getOders?status=' + value);
        setListOder(data)
        setLoading(false)
    }

    const updateOder = async (v, id) => {
        callApi('post', '/updateOder', {
            id: id,
            v: v,
        }).then(() => {
            swal()
            setListOder(state => state.filter((item) => item._id != id))
        })
    }

    const deleteOder = async (id) => {
        callApi('delete', '/deleteOder', {
            id: id,
        }).then(() => {
            swal()
            setListOder(state => state.filter((item) => item._id != id))
        })
    }

    useEffect(() => {
        getOders()
    }, [])

    const componentRef = useRef();

    const CheckClick = (props) => {
        if (selected === "0") {
            return (
                <div>
                    <div> <button style={{ fontSize: 11 }} onClick={() => updateOder(1, props.id)} className="btn btn-info">Xác nhận gửi</button></div>
                    <div> <button style={{ fontSize: 11, marginTop: 5 }} onClick={() => deleteOder(props.id)} className="btn btn-danger"> Hủy</button></div>
                </div>
            )
        } else if (selected === "1") {
            return (
                <button onClick={() => updateOder(2, props.id)} style={{ fontSize: 11 }} className="btn btn-info"> Xác nhận thành công</button>
            )
        } else {
            return null
        }
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
                <div className="col-lg-3">
                    <label className="mr-sm-2" htmlFor="SelectAdrress">Trạng thái đơn hàng</label>
                    <select defaultValue="0" name="Chọn một trạng thái" onChange={handleChangeSelect} className="custom-select mr-sm-2" id="SelectAdrress">
                        <option value="0">Đơn đã nhận</option>
                        <option value="1">Đơn đã gửi</option>
                        <option value="2">Hoàn thành</option>
                    </select>
                </div>

            </div>
            <div>
                {
                    loading ?
                        < div className='loading' >
                            <BallBeat color={'#123abc'}
                                loading={loading} />
                        </div >
                        :
                        <div ref={componentRef}>
                            {
                                <div style={{ marginTop: 10, backgroundColor: '#ccc' }} className="row">
                                    <div className="col-lg-2">Tên sản phẩm</div>
                                    <div className="col-lg-2">Hình ảnh</div>
                                    <div className="col-lg-1">Tên khách hàng</div>
                                    <div className="col-lg-1">SĐT</div>
                                    <div className="col-lg-2">Địa chỉ</div>
                                    <div className="col-lg-1">Đơn giá</div>
                                    <div className="col-lg-1">Số lượng</div>
                                    <div className="col-lg-2">Thành tiền</div>
                                </div>
                            }
                            {
                                listOder.map((item) =>
                                    <div key={item._id}>
                                        <div style={{ marginTop: 10 }} key={item._id} className="row">
                                            <div className="col-lg-2">{item.nameProduct}</div>
                                            <div className="col-lg-2">
                                                <img style={{ height: 100 }} className="card-img-top img-fluid img-thumbnail" src={item.imageProduct} alt="Card image cap" />
                                            </div>
                                            <div className="col-lg-1">{item.fullName}</div>
                                            <div className="col-lg-1">{item.phoneNumber}</div>
                                            <div className="col-lg-2">{item.address}</div>
                                            <div className="col-lg-1">{item.priceProduct} vnđ</div>
                                            <div className="col-lg-1">{item.amountProduct} vnđ</div>
                                            <div className="col-lg-2">
                                                <div>{item.amountProduct * item.priceProduct}</div>
                                                <div>
                                                    <CheckClick id={item._id}></CheckClick>
                                                </div>
                                            </div>
                                        </div>
                                        <hr style={{ height: 0.5, backgroundColor: '#ccc', color: '#ccc' }} />
                                    </div>
                                )
                            }</div>
                }

            </div>
        </div>
    )
}
export default Oders
