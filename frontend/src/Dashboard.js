import React, { Component } from 'react';
import {
  Button, TextField, Dialog, DialogActions, LinearProgress,
  DialogTitle, DialogContent, TableBody, Table,
  TableContainer, TableHead, TableRow, TableCell
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import swal from 'sweetalert';
import { withRouter } from './utils';
const axios = require('axios');

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      openProductModal: false,
      openProductEditModal: false,
      id: '',
      name: '',
      desc: '',
      price: '',
      discount: '',
      file: '',
      fileName: '',
      page: 1,
      search: '',
      products: [],
      pages: 0,
      loading: false
    };
  }

  componentDidMount = () => {
    let token = localStorage.getItem('token');
    if (!token) {
      // this.props.history.push('/login');
      this.props.navigate("/login");
    } else {
      this.setState({ token: token }, () => {
        this.getProduct();
      });
    }
  }

  getProduct = () => {
    
    this.setState({ loading: true });

    let data = '?';
    data = ${data}page=${this.state.page};
    if (this.state.search) {
      data = ${data}&search=${this.state.search};
    }
    axios.get(http://localhost:2000/get-product${data}, {
      headers: {
        'token': this.state.token
      }
    }).then((res) => {
      this.setState({ loading: false, products: res.data.products, pages: res.data.pages });
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
      this.setState({ loading: false, products: [], pages: 0 },()=>{});
    });
  }

  deleteProduct = (id) => {
    axios.post('http://localhost:2000/delete-product', {
      id: id
    }, {
      headers: {
        'Content-Type': 'application/json',
        'token': this.state.token
      }
    }).then((res) => {

      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });

      this.setState({ page: 1 }, () => {
        this.pageChange(null, 1);
      });
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
    });
  }

  pageChange = (e, page) => {
    this.setState({ page: page }, () => {
      this.getProduct();
    });
  }

  logOut = () => {
    localStorage.setItem('token', null);
    // this.props.history.push('/');
    this.props.navigate("/");
  }

  onChange = (e) => {
    if (e.target.files && e.target.files[0] && e.target.files[0].name) {
      this.setState({ fileName: e.target.files[0].name }, () => { });
    }
    this.setState({ [e.target.name]: e.target.value }, () => { });
    if (e.target.name == 'search') {
      this.setState({ page: 1 }, () => {
        this.getProduct();
      });
    }
  };

  addProduct = () => {
    const fileInput = document.querySelector("#fileInput");
    const file = new FormData();
    file.append('file', fileInput.files[0]);
    file.append('name', this.state.name);
    file.append('desc', this.state.desc);
    file.append('discount', this.state.discount);
    file.append('price', this.state.price);

    axios.post('http://localhost:2000/add-product', file, {
      headers: {
        'content-type': 'multipart/form-data',
        'token': this.state.token
      }
    }).then((res) => {

      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });

      this.handleProductClose();
      this.setState({ name: '', desc: '', discount: '', price: '', file: null, page: 1 }, () => {
        this.getProduct();
      });
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
      this.handleProductClose();
    });

  }

  updateProduct = () => {
    const fileInput = document.querySelector("#fileInput");
    const file = new FormData();
    file.append('id', this.state.id);
    file.append('file', fileInput.files[0]);
    file.append('name', this.state.name);
    file.append('desc', this.state.desc);
    file.append('discount', this.state.discount);
    file.append('price', this.state.price);

    axios.post('http://localhost:2000/update-product', file, {
      headers: {
        'content-type': 'multipart/form-data',
        'token': this.state.token
      }
    }).then((res) => {

      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });

      this.handleProductEditClose();
      this.setState({ name: '', desc: '', discount: '', price: '', file: null }, () => {
        this.getProduct();
      });
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
      this.handleProductEditClose();
    });

  }

  handleProductOpen = () => {
    this.setState({
      openProductModal: true,
      id: '',
      name: '',
      desc: '',
      price: '',
      discount: '',
      fileName: ''
    });
  };

  handleProductClose = () => {
    this.setState({ openProductModal: false });
  };

  handleProductEditOpen = (data) => {
    this.setState({
      openProductEditModal: true,
      id: data._id,
      name: data.name,
      desc: data.desc,
      price: data.price,
      discount: data.discount,
      fileName: data.image
    });
  };

  handleProductEditClose = () => {
    this.setState({ openProductEditModal: false });
  };

  render() {
    return (
      <div>
        {this.state.loading && <LinearProgress size={40} />}
        <div className="no-printme">
          <h2>Dashboard</h2>
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            onClick={this.handleProductOpen}
          >
            Add Product
          </Button>
          <Button
            className="button_style"
            variant="contained"
            size="small"
            onClick={this.logOut}
          >
            Log Out
          </Button>
        </div>

        {/* Edit Product */}
        <Dialog
          open={this.state.openProductEditModal}
          onClose={this.handleProductClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Edit Product</DialogTitle>
          <DialogContent>
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              placeholder="Product Name"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="desc"
              value={this.state.desc}
              onChange={this.onChange}
              placeholder="Description"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="number"
              autoComplete="off"
              name="price"
              value={this.state.price}
              onChange={this.onChange}
              placeholder="Price"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="number"
              autoComplete="off"
              name="discount"
              value={this.state.discount}
              onChange={this.onChange}
              placeholder="Discount"
              required
            /><br /><br />
            <Button
              variant="contained"
              component="label"
            > Upload
            <input
                type="file"
                accept="image/*"
                name="file"
                value={this.state.file}
                onChange={this.onChange}
                id="fileInput"
                placeholder="File"
                hidden
              />
            </Button>&nbsp;
            {this.state.fileName}
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleProductEditClose} color="primary">
              Cancel
            </Button>
            <Button
              disabled={this.state.name == '' || this.state.desc == '' || this.state.discount == '' || this.state.price == ''}
              onClick={(e) => this.updateProduct()} color="primary" autoFocus>
              Edit Product
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add Product */}
        <Dialog
          open={this.state.openProductModal}
          onClose={this.handleProductClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Add Product</DialogTitle>
          <DialogContent>
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              placeholder="Product Name"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="desc"
              value={this.state.desc}
              onChange={this.onChange}
              placeholder="Description"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="number"
              autoComplete="off"
              name="price"
              value={this.state.price}
              onChange={this.onChange}
              placeholder="Price"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="number"
              autoComplete="off"
              name="discount"
              value={this.state.discount}
              onChange={this.onChange}
              placeholder="Discount"
              required
            /><br /><br />
            <Button
              variant="contained"
              component="label"
            > Upload
            <input
                type="file"
                accept="image/*"
                name="file"
                value={this.state.file}
                onChange={this.onChange}
                id="fileInput"
                placeholder="File"
                hidden
                required
              />
            </Button>&nbsp;
            {this.state.fileName}
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleProductClose} color="primary">
              Cancel
            </Button>
            <Button
              disabled={this.state.name === '' || this.state.desc === '' || this.state.discount === '' || this.state.price === '' || this.state.file === null}
              onClick={(e) => this.addProduct()} color="primary" autoFocus>
              Add Product
            </Button>
          </DialogActions>
        </Dialog>

        <br />

        <TableContainer>
          <TextField
            id="standard-basic"
            className="no-printme"
            type="search"
            autoComplete="off"
            name="search"
            value={this.state.search}
            onChange={this.onChange}
            placeholder="Search by product name"
            style={{width:'190px'}}
            required
          />
          <Button
            className="button_style no-printme"
            variant="outlined"
            color="primary"
            size="small"
            onClick={(e)=>{window.print()}}
          >
            Print product details
          </Button>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Discount</TableCell>
                <TableCell align="center" className="no-printme">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.products.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="center" component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center"><img src={http://localhost:2000/${row.image}} width="70" height="70" /></TableCell>
                  <TableCell align="center">{row.desc}</TableCell>
                  <TableCell align="center">{row.price}</TableCell>
                  <TableCell align="center">{row.discount}</TableCell>
                  <TableCell align="center">
                    <Button
                      className="button_style no-printme"
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={(e) => this.handleProductEditOpen(row)}
                    >
                      Edit
                  </Button>
                    <Button
                      className="button_style no-printme"
                      variant="outlined"
                      color="secondary"
                      size="small"
                      onClick={(e) => this.deleteProduct(row._id)}
                    >
                      Delete
                  </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <br />
          <Pagination className="no-printme" count={this.state.pages} page={this.state.page} onChange={this.pageChange} color="primary" />
        </TableContainer>

      </div>
    );
  }
}

export default withRouter(Dashboard);
// import React, { Component } from 'react';
// import {
//   Button, TextField, Dialog, DialogActions, LinearProgress,
//   DialogTitle, DialogContent, TableBody, Table,
//   TableContainer, TableHead, TableRow, TableCell
// } from '@material-ui/core';
// import { Pagination } from '@material-ui/lab';
// import swal from 'sweetalert';
// import { withRouter } from './utils';
// const axios = require('axios');
// import React from "react";

// const Dashboard = () => {
//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold">Welcome</h1>
//       <h2 className="text-2xl mt-2">Karthik Rao</h2>
//       <p className="mt-4">
//         A passionate and dedicated software developer currently pursuing my B.Tech in Computer Science and Engineering at GITAM University Hyderabad. With a strong foundation in web development and programming, I specialize in creating modern, efficient, and user-friendly applications.
//       </p>

//       <div className="mt-6">
//         <h2 className="text-xl font-semibold">Contact Me</h2>
//         <p>Email: <a href="mailto:Karthikambeer4@gmail.com" className="text-blue-600">Karthikambeer4@gmail.com</a></p>
//         <p>LinkedIn: <a href="https://www.linkedin.com/in/ambeer-karthik-800b13301/" className="text-blue-600" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a></p>
//         <p>GitHub: <a href="https://github.com/Karthik-f1" className="text-blue-600" target="_blank" rel="noopener noreferrer">GitHub Profile</a></p>
//       </div>

//       <div className="mt-6">
//         <h2 className="text-xl font-semibold">Education</h2>
//         <p><strong>B.Tech in Computer Science and Engineering</strong><br/>GITAM University Hyderabad (2023 - Present)<br/>CGPA: 7.4/10</p>
//         <p className="mt-2"><strong>Intermediate Education (10+2)</strong><br/>Sri Gaythri Junior College (2021 - 2023)<br/>Percentage: 80%</p>
//       </div>

//       <div className="mt-6">
//         <h2 className="text-xl font-semibold">Projects</h2>
//         <p><strong>Dyslexia Prediction</strong> (August 2023)</p>
//         <p>Developed a logistic regression model integrated into a quiz-based website for predicting dyslexia.</p>
//         <p>Tech Stack: Python (Machine Learning), HTML, CSS</p>

//         <p className="mt-4"><strong>The Machine Man</strong> (January 2023)</p>
//         <p>Developed a Python-based job scheduling system for optimizing business orders for cobblers.</p>
//         <p>Tech Stack: Python, Tkinter GUI</p>
//       </div>

//       <div className="mt-6">
//         <h2 className="text-xl font-semibold">Technical Skills</h2>
//         <ul className="list-disc pl-6">
//           <li>Python</li>
//           <li>Machine Learning</li>
//           <li>HTML/CSS</li>
//           <li>GUI Development</li>
//           <li>JavaScript</li>
//           <li>SQL</li>
//           <li>Git</li>
//           <li>Web Development</li>
//         </ul>
//       </div>

//       <div className="mt-6">
//         <h2 className="text-xl font-semibold">Resume</h2>
//         <p>
//           <a href="https://drive.google.com/file/d/1tWPGOaY5oDxYsZ_NmvUDOoV_JdRAP6Ix/view?usp=sharing" className="text-blue-600" target="_blank" rel="noopener noreferrer">
//             View Resume (PDF)
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };



// export default withRouter(Dashboard);
