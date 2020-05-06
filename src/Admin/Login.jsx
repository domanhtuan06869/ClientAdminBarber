import React, { Component } from 'react';
export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email : '',
      password: ''
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    fetch('/api/authenticate', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200) {
       localStorage.setItem('email',this.state.email)
        this.props.history.push('/admin');
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      alert('Lỗi đăng nhập làm ơn thử lại');
    });
  }

  render() {
    return (
      
     
      <div class="row mt-5">
      <div class="col-md-6 m-auto">
        <div class="card card-body">
          <h1 class="text-center mb-3"><i class="fas fa-sign-in-alt"></i>  Login</h1>
         
          <form onSubmit={this.onSubmit}>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                class="form-control"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </div>
            <div class="form-group">
              <label for="password">Mật khâu</label>
              <input
                type="password"
                id="password"
                name="password"
                class="form-control"
                placeholder="Mật khẩu"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </div>
            <button type="submit" class="btn btn-primary btn-block">Đăng nhập</button>
          </form>
        
        </div>
      </div>
    </div>
    );
  }
}