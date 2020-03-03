import React, { useRef, useState, useEffect } from 'react'
import Footer from '../components/Footer'
import backgr from '../assets/image/header.png'
import close from '../assets/image/close.png'
import axios from 'axios'
import Modal from 'react-modal';
import icon1 from '../assets/image/icon1.png'
import icon2 from '../assets/image/icon2.png'
import icon3 from '../assets/image/icon3.png'
import renderHTML from 'react-render-html';

const customStyles = {
    content: {
        width: '70%',
        height: '70%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        opacity: '80%',
        background: 'linear-gradient(90deg, rgba(41,37,105,1) 0%, rgba(22,21,117,1) 33%, rgba(15,85,158,1) 65%, rgba(10,137,163,1) 100%)',
    }
};
function Header(props) {
    const [showModal, setShowModal] = useState(false)
    const [intro, setIntro] = useState('')
    const [contenNews, setContenNews] = useState()
    const project=useRef(null)
    function openModal() {
        setShowModal(true)
    }


    function closeModal() {
        setShowModal(false)
    }
    async function getIntro() {
        const result = await axios('/getIntroduction')
        setIntro(result.data.content)
    }
    async function getOneNews() {

        const result = await axios('/getOneNews?id=' + props.match.params.id)

        setContenNews(result.data.content)
        project.current.scrollIntoView({ behavior: "auto" })


    }
    useEffect(() => {
        getOneNews()
        getIntro()


    }, [])

    return (
        <div className='Main'>
            <div className='header'>
                <Modal
                    closeTimeoutMS={1000}
                    isOpen={showModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >

                    <img className='mdclose' src={close} style={{ float: 'right' }} onClick={() => closeModal()}></img>
                    <p style={{ textAlign: 'justify', color: 'white', marginTop: '6%' }}>{intro}</p>

                </Modal>

                <img style={{ width: '100%' }} src={backgr}></img>
                <button onClick={() => openModal()} className='btn-xemthem'>Xem thêm</button>
                <div ref={project}  className='box-header'>


                    <div className='item-box-header' id='item-box-header1'>
                        <img className='img-box-header' src={icon1}></img>
                        <h5 className='title-box-header'>Các dự án tiêu biểu</h5>
                        <p className='content-box-header'>This should be used to tell a story and let your users know a l</p>

                    </div>
                    <div className='item-box-header' id='item-box-header2'>
                        <img className='img-box-header' src={icon2}></img>
                        <h5 className='title-box-header'>Tin tức & sự kiện</h5>
                        <p className='content-box-header'>This should be used to tell a story and let your users know a l</p>
                    </div>
                    <div className='item-box-header' id='item-box-header3'>
                        <img className='img-box-header' src={icon3}></img>
                        <h5 className='title-box-header'>Liên hệ</h5>
                        <p className='content-box-header'>This should be used to tell a story and let your users know a l</p>
                    </div>

                </div>
            </div>
            <div   className='page-news'>
                <div style={{maxWidth:900, margin:'0 auto'}}>
                {renderHTML(contenNews == undefined ? '<h1>Loading</h1>' : '' + contenNews + '')}
                </div>
              
            </div>

            <Footer></Footer>
        </div>
    )
}
export default Header