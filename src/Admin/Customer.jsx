import React, { useRef, useState, useEffect } from 'react'
import close from '../assets/image/close.png'
import 'react-quill/dist/quill.snow.css';
import axios from 'axios'
import Modal from 'react-modal';
import callApi from '../controller/resapi'
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'
import { swal, swalErr } from '../controller/swal'
import { BallBeat } from 'react-pure-loaders';

const customStyles = {
    content: {

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
function Customer(props) {
    /*Contact */
    const [listProduct, setListProduct] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [action, setAction] = useState('')
    const [name, setName] = useState('')
    const [id, setId] = useState('')
    const [image, setImage] = useState('')
    const [type, setType] = useState('')
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('')


    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getProduct()
        props.setColor()
    }, [])
    async function getProduct() {
        setLoading(true)
        const result = await axios('/getProducts')
        setListProduct(result.data)
        setLoading(false);
    }
    function openModal(action) {
        setAction(action)
        setShowModal(true)

    }
    const openModalEdit = (action, id, price, name, des, type, img) => {
        openModal(action)
        setAction(action)
        setImage(img)
        setId(id)
        setDescription(des)
        setPrice(price)
        setType(type)
        setName(name)
    }
    function closeModal() {
        setShowModal(false)
        setTimeout(() => {
            setImage('')
            setId('')
            setDescription('')
            setPrice('')
            setType('')
            setName('')
        }, 500)

    }

    const postImage = async (file) => {
        let formData = new FormData();
        formData.append('file', file);
        axios.post(
            '/Uploadfile',
            formData,
            {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            })
            .then(res => {
                setImage(res.data[0])
            }).catch(() => {
            })
    }

    const addProduct = async () => {
        if (!checkValidate()) {
            callApi('post', '/postProduct', {
                imageProduct: image,
                nameProduct: name,
                priceProduct: price,
                typeProduct: type,
                descriptionProduct: description,
            }).then(() => {
                swal()
                closeModal()
                getProduct()
            })
        }
    }

    const editProduct = async () => {
        if (!checkValidate()) {
            callApi('post', '/updateProduct', {
                id: id,
                imageProduct: image,
                nameProduct: name,
                priceProduct: price,
                typeProduct: type,
                descriptionProduct: description,
            }).then(() => {
                swal()
                closeModal()
                getProduct()
            })
        }

    }


    const deleteProduct = async (id) => {
        callApi('delete', '/deleteProduct', {
            id: id,
        }).then(() => {
            swal()
            setListProduct(state => state.filter((item) => item._id != id))
        })
    }
    const checkValidate = () => {
        if (name === '' || type === '' || image === '' || price === '' || description === '') {
            alert('vui lòng nhập đủ các trường dữ liệu')
            return true;
        } else {
            return false;
        }
    }

    return (
        <div>
            <button onClick={() => openModal('Thêm')} style={{}} type="button" className="btn btn-info d-none d-lg-block m-l-15"> <FontAwesomeIcon icon={faPlus} /> Create New</button>
            {loading ? < div className='loading' >
                <BallBeat color={'#123abc'}
                    loading={loading} />
            </div > :
                <div style={{ marginTop: 10 }} className="row">
                    {listProduct.map((item) =>
                        <div className="col-lg-3">
                            <div class="card">
                                <img style={{ height: 180 }} className="card-img-top img-fluid img-thumbnail" src={item.imageProduct} alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">{item.typeProduct}</h5>
                                    <p style={{ fontWeight: 'bold' }} class="card-text">{item.priceProduct} đ</p>
                                    <p className="card-text">{item.nameProduct}</p>
                                    <button onClick={() => openModalEdit('Sửa', item._id, item.priceProduct, item.nameProduct, item.descriptionProduct, item.typeProduct, item.imageProduct)} class="btn btn-primary">Sửa</button>
                                    <button onClick={() => deleteProduct(item._id)} style={{ marginLeft: 10 }} class="btn btn-danger">Xóa</button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            }

            <Modal
                closeTimeoutMS={500}
                isOpen={showModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal">
                <img className='mdclose' src={close} style={{ float: 'right', width: 20, height: 20 }} onClick={() => closeModal()}></img>
                <h2> {action}</h2>
                <div>
                    <div>
                        <label>Tên sản phẩm</label>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tên sản phẩm"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="form-group">
                            <label>Ảnh sản phẩm</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="form-control"
                                onChange={(e) => postImage(e.target.files[0])}
                            />
                        </div>
                    </div>
                    <div>
                        <label>Giá</label>
                        <div className="form-group">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Giá sản phẩm"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label>Kiểu</label>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Kiểu sản phẩm"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label>Mô tả</label>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Mô tả sản phẩm"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                    <button onClick={action === 'Thêm' ? addProduct : editProduct} className="btn btn-success">{action}</button>
                </div>
            </Modal>
        </div>
    )

}
export default Customer