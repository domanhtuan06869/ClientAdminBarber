import React, { useState } from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import callApi from '../controller/resapi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'

export const GetStore = (data) => {
    return (
        <div style={{ marginTop: 10 }} className="">
            {data.data.map((item) =>
                <div style={{ marginTop: 5 }} class="card card-body">
                    <div key={item._id} className="row">
                        <div className="col-lg-11">{item.province} - {item.district} - {item.address}</div>
                        <div className="col-lg-1"><DeleteIcon onClick={() => callApi('delete', '/deleteStore', { id: item._id }).then(() => data.getNew())}></DeleteIcon></div>
                    </div>
                </div>
            )}
        </div>
    )
}

export const GetMenber = (data) => {
    return (
        <div style={{ marginTop: 10 }} className="">
            {data.data.map((item) =>
                <div style={{ marginTop: 5 }} class="card card-body">
                    <div key={item._id} className="row">
                        <div className="col-lg-11">Họ tên: {item.name}. SĐT:{item.phone}. Địa chỉ: {item.address}</div>
                        <div className="col-lg-1"><DeleteIcon onClick={() => callApi('delete', '/deleteMenber', { id: item._id }).then(() => { data.getNew() })}></DeleteIcon></div>
                    </div>
                </div>
            )}
        </div>
    )
}

export const AddMenberCut = (data) => {
    const [find, setFind] = useState('')
    let res = data.data.filter(item => item.name.includes(find));
    return (
        <div style={{ marginTop: 10 }} className="">
            <div class="form-group">
                <input
                    type="text"
                    class="form-control"
                    placeholder="Tìm kiếm"
                    value={find}
                    onChange={(e) => setFind(e.target.value)}

                />
            </div>
            {res.map((item) =>
                <div style={{ marginTop: 5 }} class="card card-body">
                    <div key={item._id} className="row">
                        <div className="col-lg-11">Họ tên: {item.name}. SĐT:{item.phone}. Địa chỉ: {item.address}</div>
                        <div className="col-lg-1"><FontAwesomeIcon onClick={() => data.setMenber(state => [...state, item])} icon={faPlus} /></div>
                    </div>
                </div>
            )}
        </div>
    )
}