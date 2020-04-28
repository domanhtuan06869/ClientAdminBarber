import React, { useRef, useState, useEffect } from 'react'
import close from '../assets/image/close.png'

import axios from 'axios'
import Modal from 'react-modal';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Swal from "sweetalert2";

const customStyles = {
    content: {
        width: '70%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        opacity: '80%',
        background: 'linear-gradient(to right, #ffffff 29%, #ffffff 96%)',
        marginTop: '5%'
    }
};
function Pushnotification(props) {

    useEffect(() => {
        props.setColor()
    }, [])

    return (
        <div>
            <h1>Thông báo tới ứng dụng</h1>
            <div>
                <label>Tiêu đề</label>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tiêu đề"
                    //  value={name}
                    // onChange={(e) => setName(e.target.value)}
                    />
                </div>
            </div>
            <div>
                <label>Tiêu đề</label>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nội dung"
                    //  value={name}
                    // onChange={(e) => setName(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}
export default Pushnotification