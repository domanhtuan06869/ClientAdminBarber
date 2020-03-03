import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import qs from 'qs'
import axios from 'axios'

import 'react-quill/dist/quill.snow.css';
import ReactQuill, { Quill } from 'react-quill';
var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],
  [{ 'color': [] }, { 'background': [] }],
  ['link', 'image'],
  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'font': [] }],
  [{ 'align': [] }],


  ['clean']                                         // remove formatting button
];

export default class Secret extends Component {
  constructor() {
    super();
    this.state = {
      message: 'Loading...',
      title: '',
      description: '',
      content: '',
      image: '',
      contentIntro: '',
      stt: '',
      titleSilde: '',
      contentSilde: '',
      urlimageSilde: '',
      nameTeam: '',
      positionTeam: '',
      descriptionTeam: '',
      urlAvatar: '',
      iconUrl: ''


    }

  }

  componentDidMount() {

    fetch('/api/secret')
      .then(res => res.text())
      .then(res => this.setState({ message: res }));
  }
  logout() {
    fetch('/logout', {
      method: 'GET',
    })
      .then(res => {
        if (res.status === 200) {
          this.props.history.push('/admin');
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error logging in please try again');
      })
  }
  async postNew() {
    await axios({
      method: 'post',
      url: '/postNews',
      data: qs.stringify({
        content: this.state.content,
        description: this.state.description,
        title: this.state.title,
        image: this.state.image
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    }).then((res) => {
      alert('success')
    })
  }
  async updateIntro() {
    await axios({
      method: 'put',
      url: '/updateIntro',
      data: {
        content: this.state.contentIntro
      },

      headers: {
        'content-type': 'application/json'
      }
    }).then((res) => {
      alert('success')
    }).catch(() => {
      alert('error')
    })
  }
  async postSilde() {
    await axios({
      method: 'post',
      url: '/postSlide',
      data: {
        content: this.state.contentSilde,
        urlimage: this.state.urlimageSilde,
        stt: this.state.stt,
        title: this.state.titleSilde
      },

      headers: {
        'content-type': 'application/json'
      }
    }).then((res) => {
      alert('success')
    }).catch(() => {
      alert('error')
    })
  }
  ////////////
  async postTeam() {
    await axios({
      method: 'post',
      url: '/postTeam',
      data: {
        name: this.state.nameTeam,
        position: this.state.positionTeam,
        description: this.state.descriptionTeam,
        avatar: this.state.urlAvatar
      },

      headers: {
        'content-type': 'application/json'
      }
    }).then((res) => {
      alert('success')
    }).catch(() => {
      alert('error')
    })
  }
  async postIConCustomer() {
    await axios({
      method: 'post',
      url: '/postCustomer',
      data: {
        imagecustomer: this.state.iconUrl,
      },

      headers: {
        'content-type': 'application/json'
      }
    }).then((res) => {
      alert('success')
    }).catch(() => {
      alert('error')
    })
  }

  render() {
    return (
      <div style={{ maxWidth: '100%', margin: '0 auto' }}>
     
        <div class="" style={{ display: 'inline-block', float: 'right', marginRight: 5 }}>
          <FontAwesomeIcon size="lg" onClick={() => this.logout()} title="Đăng xuất" icon={faSignOutAlt} />
        </div>

     
        <div class="card card-body" style={{ maxWidth: '100%' }}>

          <h1>Đăng bản tin</h1>
          <form style={{ height: 950, maxWidth: '100%', margin: 10 }}>
            <div class="form-group">
              <label for="title">title</label>
              <input
                type="text"

                class="form-control"
                placeholder="title"
                value={this.state.title}
                onChange={(text) => this.setState({ title: text.target.value })}
              />
            </div>
            <div class="form-group">
              <label for="image">Image</label>
              <input
                type="text"

                class="form-control"
                placeholder="image"
                value={this.state.image}
                onChange={(text) => this.setState({ image: text.target.value })}
              />
            </div>
            <div class="form-group">
              <label for="description">Descripton</label>
              <input
                type="text"

                class="form-control"
                placeholder="descripton"
                value={this.state.description}
                onChange={(text) => this.setState({ description: text.target.value })}

              />

            </div>
            <div class="form-group">
              <label for="content">Content</label>
              <ReactQuill style={{ height: 450, margin: 10 }} id='content' theme="snow"
                modules={{ toolbar: toolbarOptions }}
                formats={[
                  'header',
                  'bold', 'italic', 'underline', 'strike', 'blockquote', 'background',
                  'list', 'bullet', 'indent',
                  'link', 'image'
                ]}
                onChange={(e) => this.setState({ content: e })}
              >
              </ReactQuill>

            </div>
            <div style={{ maxWidth: '50%', margin: '0 auto', marginTop: 100 }} onClick={() => this.postNew()} class="btn btn-primary btn-block">Đăng tin</div>
          </form>
        </div>

        <div class="card card-body" style={{ maxWidth: '100%', marginTop: 30 }}>
          <h1>Thêm Slide</h1>
          <form style={{ maxWidth: '100%', textAlign: 'center', margin: 10 }}>
            <div class="form-group">
              <label for="Stt">Stt</label>
              <input
                type="text"

                class="form-control"
                placeholder="Stt"
                value={this.state.stt}
                onChange={(text) => this.setState({ stt: text.target.value })}
              />
            </div>
            <div class="form-group">
              <label for="Title">Title</label>
              <input
                type="text"

                class="form-control"
                placeholder="title"
                value={this.state.titleSilde}
                onChange={(text) => this.setState({ titleSilde: text.target.value })}
              />
            </div>
            <div class="form-group">
              <label for="content">Content</label>
              <input
                type="text"

                class="form-control"
                placeholder="content"
                value={this.state.contentSilde}
                onChange={(text) => this.setState({ contentSilde: text.target.value })}

              />
            </div>
            <div class="form-group">
              <label for="content">UrlImage</label>
              <input
                type="text"

                class="form-control"
                placeholder="image"
                value={this.state.urlimageSilde}
                onChange={(text) => this.setState({ urlimageSilde: text.target.value })}

              />
            </div>
            <div style={{ maxWidth: '50%', margin: '0 auto' }} onClick={() => this.postSilde()} class="btn btn-primary btn-block">Đăng Slide</div>
          </form>
        </div>

        <div class="card card-body" style={{ maxWidth: '100%', marginTop: 30 }}>

          <h1>Thêm Cán Bộ</h1>
          <form style={{ maxWidth: '100%', textAlign: 'center' }}>
            <div class="form-group">
              <label for="name">Tên</label>
              <input
                type="text"

                class="form-control"
                placeholder="Tên"
                value={this.state.nameTeam}
                onChange={(text) => this.setState({ nameTeam: text.target.value })}
              />
            </div>
            <div class="form-group">
              <label for="position">Vị trí</label>
              <input
                type="text"

                class="form-control"
                placeholder="Vị trí"
                value={this.state.positionTeam}
                onChange={(text) => this.setState({ positionTeam: text.target.value })}
              />
            </div>
            <div class="form-group">
              <label for="content">Nội dung</label>
              <input
                type="text"

                class="form-control"
                placeholder="Description"
                value={this.state.descriptionTeam}
                onChange={(text) => this.setState({ descriptionTeam: text.target.value })}

              />
            </div>
            <div class="form-group">
              <label for="content">Avatar</label>
              <input
                type="text"

                class="form-control"
                placeholder="Avatar"
                value={this.state.urlAvatar}
                onChange={(text) => this.setState({ urlAvatar: text.target.value })}

              />
            </div>
            <div style={{ maxWidth: '50%', margin: '0 auto' }} onClick={() => this.postTeam()} class="btn btn-primary btn-block">Thêm cán bộ</div>
          </form>
        </div>
        <div class="card card-body" style={{ maxWidth: '100%', marginTop: 30, marginBottom: 10 }}>

          <h1>Cập nhập giới thiệu</h1>
          <form style={{ maxWidth: '100%', textAlign: 'center' }}>
            <div class="form-group">
              <label for="intro">Giới thiệu</label>
              <input
                type="text"

                class="form-control"
                placeholder="Giới thiệu"
                value={this.state.contentIntro}
                onChange={(text) => this.setState({ contentIntro: text.target.value })}
              />
            </div>
            <div style={{ maxWidth: '50%', margin: '0 auto' }} onClick={() => this.updateIntro()} class="btn btn-primary btn-block">Cập nhập giới thiệu</div>
          </form>
        </div>
        <div class="card card-body" style={{ maxWidth: '100%', marginTop: 30, marginBottom: 10 }}>

          <h1>Thêm icon đối tác</h1>
          <form style={{ maxWidth: '100%', textAlign: 'center' }}>
            <div class="form-group">
              <label for="intro">Url</label>
              <input
                type="text"

                class="form-control"
                placeholder="Url"
                value={this.state.iconUrl}
                onChange={(text) => this.setState({ iconUrl: text.target.value })}
              />
            </div>
            <div style={{ maxWidth: '50%', margin: '0 auto' }} onClick={() => this.postIConCustomer()} class="btn btn-primary btn-block">Thêm icon đối tác</div>
          </form>
        </div>
      </div>

    );
  }
}