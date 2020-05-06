import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import ExportExcel from '../componentsAdmin/ExcelExport';
import PrintOut from '../componentsAdmin/PrintOut';
import { BallBeat } from 'react-pure-loaders';
import callApi from '../controller/resapi'
import { swal, swalErr } from '../controller/swal'

function Oders(props) {
    const [loading, setLoading] = useState(false);
    const [selected, setSelect] = useState('0');
    const [listOder, setListOder] = useState([])
    const [findOder, setFindOder] = useState('')
    let listFindOder = listOder.filter(item => item._id.includes(findOder));

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
                    <div> <button style={{ fontSize: 11, marginTop: 5 }} onClick={() => updateOder(3, props.id)} className="btn btn-danger"> Hủy</button></div>
                </div>
            )
        } else if (selected === "1") {
            return (
                <div>
                    <button onClick={() => updateOder(2, props.id)} style={{ fontSize: 11 }} className="btn btn-info"> Xác nhận thành công</button>
                    <div> <button style={{ fontSize: 11, marginTop: 5 }} onClick={() => updateOder(3, props.id)} className="btn btn-danger"> Hủy</button></div>
                </div>
            )
        } else if (selected === "3") {
            return (
                <button onClick={() => deleteOder(props.id)} style={{ fontSize: 11 }} className="btn btn-danger"> Xóa</button>
            )
        }
        else {
            return null
        }
    }

    return (
        <div>
            <div className="row">
                <div className="col-lg-1.9">
                    <ExportExcel dataset={listFindOder}></ExportExcel>
                </div>
                <div className="col-lg-2">
                    <PrintOut refdata={componentRef}></PrintOut>
                </div>
            </div>
            <div style={{ marginTop: 20 }} className="row">
                <div style={{ padding: 0 }} className="col-lg-3">
                    <label className="mr-sm-2" htmlFor="SelectAdrress">Trạng thái đơn hàng</label>
                    <select defaultValue="0" name="Chọn một trạng thái" onChange={handleChangeSelect} className="custom-select mr-sm-2" id="SelectAdrress">
                        <option value="0">Đơn đã nhận</option>
                        <option value="1">Đơn đã gửi</option>
                        <option value="2">Hoàn thành</option>
                        <option value="3">Đã hủy</option>
                    </select>
                </div>
                <div style={{ marginTop: 30 }} className="col-lg-2"><p style={{ fontWeight: 'bold', marginTop: 10 }}>Tổng : {listOder.length}</p></div>
            </div>
            <div style={{ paddingLeft: 0, paddingRight: 0 }} className="row">
                <div style={{ paddingLeft: 0, paddingRight: 0 }} className="col-lg-3">
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tìm kiếm theo mã đơn"
                            value={findOder}
                            onChange={(e) => setFindOder(e.target.value)}
                        />
                    </div>
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
                                <div style={{ marginTop: 10 }} className="row border border-dark">
                                    <div style={{ fontWeight: 'bold' }} className="col-lg-2 border-right border-dark">Mã đơn</div>
                                    <div style={{ fontWeight: 'bold' }} className="col-lg-2 border-right border-dark">Tên sản phẩm</div>
                                    <div style={{ fontWeight: 'bold' }} className="col-lg-1 border-right border-dark">Tên khách hàng</div>
                                    <div style={{ fontWeight: 'bold' }} className="col-lg-1 border-right border-dark">SĐT</div>
                                    <div style={{ fontWeight: 'bold' }} className="col-lg-2 border-right border-dark">Địa chỉ</div>
                                    <div style={{ fontWeight: 'bold' }} className="col-lg-1 border-right border-dark">Đơn giá</div>
                                    <div style={{ fontWeight: 'bold' }} className="col-lg-1 border-right border-dark">Số lượng</div>
                                    <div style={{ fontWeight: 'bold' }} className="col-lg-2">Thành tiền</div>
                                </div>
                            }
                            {
                                listFindOder.map((item) =>
                                    <div key={item._id}>
                                        <div style={{ marginTop: 10, paddingLeft: 0 }} key={item._id} className="row">
                                            <div style={{ paddingLeft: 0, paddingRight: 3 }} className="col-lg-2">
                                                {item._id}
                                            </div>
                                            <div className="col-lg-2">
                                                {item.nameProduct}
                                            </div>
                                            <div className="col-lg-1">{item.fullName}</div>
                                            <div className="col-lg-1">{item.phoneNumber}</div>
                                            <div className="col-lg-2">{item.address}</div>
                                            <div className="col-lg-1">{item.priceProduct} vnđ</div>
                                            <div className="col-lg-1">{item.amountProduct}</div>
                                            <div className="col-lg-2">
                                                <div>{item.amountProduct * item.priceProduct} vnđ</div>
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
