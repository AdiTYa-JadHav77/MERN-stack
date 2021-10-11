//New header 
import React from "react";
import '../Styles/Filter.css';
import Modal from "react-modal";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from "react-router-dom";
import queryString from 'query-string'
import { withRouter } from "react-router";


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'solid 1px brown'
  },
};
const customStyles2 = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: " 600px",
    height: "600px"
  },
};
class Headers extends React.Component {

  constructor() {
    super();
    this.state = {
      show: false,
      loginModalIsOpen: false,
      isLoggedIn: false,
      formModalIsOpen: false,
      loggedInUser: '',
      loggedInEmail: '',
      createAccountModalIsOpen: false,
      profileModalIsOpen: false,
      orderModalIsOpen: false,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone_number: '',
      googleProfile: '',
      User: [],
      orders: []

    }
  }

  handleModalState = (state, value) => {
    this.setState({ [state]: value })
  }

  responseGoogle = (response) => {
    this.setState({ isLoggedIn: true, loggedInUser: response.profileObj.name, loggedInEmail: response.profileObj.email, email: response.profileObj.email, googleProfile: response.profileObj.imageUrl, loginModalIsOpen: false })
    toast.success(`${response.profileObj.name} login successfull !`, { position: "top-center" });
    console.log(response)
  }
  responseGoogleFail = (response) => {
    this.setState({ isLoggedIn: false })
    toast.error("login Failed !", { position: "top-center" });
  }
  responseFacebook = (response) => {
    // console.log(response)
    // toast.success("login successfull !",{position:"top-center"});   
    // this.setState({ isLoggedIn: true, loggedInUser: response.name, loginModalIsOpen: false })
    toast.error("login Failed !", { position: "top-center" });

  }
  componentClicked = (data) => {
    console.warn(data);
  }

  handleLogout = () => {
    this.setState({ isLoggedIn: false, loggedInUser: undefined, profileModalIsOpen: false });
    toast.success("Logout Successfull", { position: "top-center" })
  }
  handelInputChange = (event, state) => {
    this.setState({ [state]: event.target.value })
  }


  handleSignUp = () => {
    const { email, password, firstName, lastName } = this.state;
    const signUpObj = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName
    };
    axios({
      method: 'POST',
      url: 'http://localhost:2021/signup',
      headers: { 'Content-Type': 'application/json' },
      data: signUpObj
    })
      .then(response => {
        if (response.data.message == "user already exist") {
          toast.info(response.data.message, { position: "top-center" })
        }
        else {
          this.setState({

            createAccountModalIsOpen: false,
            isLoggedIn: true,
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
          });

          toast.success(response.data.message, { position: "top-center" });
        }
      })

      .catch(err => console.log(err))
  }


  handleLogin = (e) => {
    const { email, password ,User} = this.state;
    const loginObj = {
      email: email,
      password: password
    };
    axios({
      method: 'POST',
      url: 'http://localhost:2021/login',
      headers: { 'Content-Type': 'application/json' },
      data: loginObj
    })
      .then(response => {

        if (response.data.message == "user Login Succesfully") {
          console.log(response)
          this.setState({
            loggedInUser: email,
            isLoggedIn: true,
            loginModalIsOpen: false,
            email: email,
            password: password,
            User:response.data.User
            
          });
          toast.success(response.data.message, { position: "top-center" });
        }
        else {
          toast.error(response.data.message, { position: "top-center" });

        }


      })
      .catch(err => console.log(err))

    //////profile orders////////





  }


  signUpClick = () => {
    this.setState({ loginModalIsOpen: false, createAccountModalIsOpen: true })
  }


  loginClick = () => {
    this.setState({ loginModalIsOpen: true, createAccountModalIsOpen: false })
  }


  myFunction = () => {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
      return (x.type = "text")
    } else {
      return (x.type = "password")
    }
  }


  handelProfile = () => {
    const { email, password, User } = this.state;
    const signUpObj = {
      email: email,
      password: password,

    };
    axios({
      method: 'POST',
      url: 'http://localhost:2021/login',
      headers: { 'Content-Type': 'application/json' },
      data: signUpObj
    })
      .then(response => {
        if (response) {
          this.setState({
            User: response.data.User,
            profileModalIsOpen: true,
            isLoggedIn: true,
            email: email,
            password: password,
            

          });

        }
      })

      .catch(err => console.log(err))
  }


  form = () => {
    const { email, firstName, lastName, address, phone_number } = this.state;

    if (!email || !firstName || !lastName || !address || !phone_number) {
      toast.info("Please enter all details", { position: "top-center" });
    }

    else {
      this.setState({
        formModalIsOpen: false
      });
      toast.success("Details Saved Successfully", { position: "top-center" })
    }


  }

  HandelOrderModalIsOpen = (e) => {
    const { email, orders } = this.state;
    // this.props.history.push(`?email=${email}`);
    //     const qs = queryString.parse(this.props.location.search);
    //     const {email} =qs;

    const filterObj = {
      email: email
    };
    axios({
      url: `http://localhost:2021/previousOrders/${email}`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      data: filterObj
    })
      .then(response => {
        this.setState({ orders: response.data.orders, orderModalIsOpen: true });

      })
      .catch(err => console.log(err))

  }

  render() {
    const { googleProfile, orders, formModalIsOpen, firstName, lastName, loginModalIsOpen, isLoggedIn, loggedInEmail, loggedInUser, createAccountModalIsOpen, show, profileModalIsOpen, email, orderModalIsOpen, User } = this.state;

    return (

      <>
        <section className="navbar-bg">
          <nav class="navbar navbar-expand-lg navbar-light ">
            <div class="container">
              <a class="" href="#">
                <span className="logo-span" style={{ margin: "-24px 0" }}>
                  <NavLink to="/"><a href="#" className="logo" >e!</a> </NavLink>
                </span>
              </a>
              <button
                class="navbar-toggler"
                type="button"

                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={() => { this.setState({ show: true }) }}>
                <span class="navbar-toggler-icon"></span>
              </button>
              {isLoggedIn ? <div class={`collapse navbar-collapse ${show ? "show" : ""}`}>
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <NavLink class="nav-link " to="/">
                      Home
                    </NavLink>
                  </li>
                  <li class="nav-item">
                    <NavLink class="nav-link" to="/about">
                      About
                    </NavLink>
                  </li>
                  <li class="nav-item">
                    <NavLink class="nav-link" to="/contact">
                      Contact
                    </NavLink>
                  </li>
                </ul>

                <button class="btn  btn-style-login" onClick={this.handleLogout}>
                  Logout
                </button>
                <a class="btn  btn-style btn-style-border" onClick={this.handelProfile} >
                  {loggedInUser ? loggedInUser : email}
                </a>

              </div>



                : <div class={`collapse navbar-collapse ${show ? "show" : ""}`}>
                  <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                      <NavLink class="nav-link " to="/">
                        Home
                      </NavLink>
                    </li>
                    <li class="nav-item">
                      <NavLink class="nav-link" to="/about">
                        About
                      </NavLink>
                    </li>
                    <li class="nav-item">
                      <NavLink class="nav-link" to="/contact">
                        Contact
                      </NavLink>
                    </li>
                  </ul>

                  <button class="btn  btn-style-login" onClick={() => this.handleModalState('loginModalIsOpen', true)}>
                    Log in
                  </button>
                  <button class="btn  btn-style btn-style-border" onClick={() => this.handleModalState('createAccountModalIsOpen', true)}>
                    Create account
                  </button>

                </div>}
            </div>
          </nav>

        </section>
        <Modal
          isOpen={loginModalIsOpen}
          style={customStyles}
          overlayClassName="Overlay"
        >
          <div style={{ float: 'right', margin: '5px' }} onClick={() => this.handleModalState('loginModalIsOpen', false)}><img src="../../Assets/x.svg" /></div>
          <div className="title-text">Login</div>

          <div><input type="email" className="input-login" placeholder="Enter your email id " onChange={(event) => this.handelInputChange(event, 'email')}></input></div>
          <div><input type="password" minlength="8" required id="pass" className="input-login" placeholder="Enter your password " onChange={(event) => this.handelInputChange(event, 'password')}></input></div>
          <div ><button className="btn btn-danger login-btn" onClick={(e) => this.handleLogin(e)}>Login</button></div>

          <div className="login-divider2"></div>
          <div className="text-center OR">or</div>

          <div className="google" ><GoogleLogin
            clientId="1030732577938-nn52oufujo4mln6llnor5ui2083cod9t.apps.googleusercontent.com"
            buttonText="Continue with Google"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogleFail}
            overlayClassName="google"
            cookiePolicy={'single_host_origin'}
            className="google"
          /></div>

          <div ><FacebookLogin
            appId="175579314718394"
            autoLoad={false}
            fields="name,email,picture"
            onClick={this.componentClicked}
            callback={this.responseFacebook}
            cssClass="facebook"
            textButton="Continue with facebook"
            icon="fa-facebook-square"
          />
          </div>


          <span style={{ marginLeft: "65px" }}>Don’t have account?  </span><a style={{ color: "blue" }} onClick={() => this.signUpClick()} style={{ color: "#dc3545" }}>Sign UP</a>

        </Modal>
        <Modal
          isOpen={createAccountModalIsOpen}
          style={customStyles}
          overlayClassName="Overlay"
        >
          <div>

            <div style={{ float: 'right', margin: '5px' }} onClick={() => this.handleModalState('createAccountModalIsOpen', false)}><img src="../../Assets/x.svg" /></div>
            <h3 className="restaurant-name rest-Name">Sign up</h3>
            <span className="form">  <input className="fname" type="text" placeholder="Enter first name" id="fName" onChange={(event) => this.handelInputChange(event, 'firstName')} /></span>
            <span className="form"> <input className="lname" type="text" placeholder="Enter last name" id="lName" onChange={(event) => this.handelInputChange(event, 'lastName')} /></span>
            <div className="form"><input className="input-acc" type="email" placeholder="Enter your email" id="email" onChange={(event) => this.handelInputChange(event, 'email')} /></div>
            <div className="form">   <input className="input-acc" type="password" minlength="8" required id="myInput" placeholder="Enter your password" onChange={(event) => this.handelInputChange(event, 'password')} /></div>
            <input type="checkbox" onClick={this.myFunction} style={{ margin: " 0 8px 0px 15px", width: "15px", height: "14px" }} />Show Password
            <div><button className="btn btn-danger create" onClick={this.handleSignUp} >Create Account</button></div>

            <div className="login-divider2"></div>
            <div className="text-center OR">or</div>

            <span className="google" style={{}} ><GoogleLogin
              clientId="1030732577938-nn52oufujo4mln6llnor5ui2083cod9t.apps.googleusercontent.com"
              buttonText="Google"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogleFail}
              overlayClassName="google"
              cookiePolicy={'single_host_origin'}
              className="google-signup"
            /></span>
            <span ><FacebookLogin
              appId="175579314718394"
              autoLoad={false}
              fields="name,email,picture"
              onClick={this.componentClicked}
              callback={this.responseFacebook}
              cssClass="facebook-signup"
              textButton="facebook"
              icon="fa-facebook-square"
            />
            </span>
            <br /> <span style={{ marginLeft: "95px" }}>Already have an account? </span><span style={{ color: "#dc3545" }} onClick={() => this.loginClick()}>Login</span>

          </div>
        </Modal>
        <Modal
          isOpen={profileModalIsOpen}
          style={customStyles2}
          overlayClassName="Overlay"

        >
          <div>
            <div style={{ float: 'right', margin: '5px' }} onClick={() => this.handleModalState('profileModalIsOpen', false)}><img src="../../Assets/x.svg" /></div>
            <div className="">
              <span className="" >

                {<img src={googleProfile} style={{ margin: " 20px 0px 35px 28px", border: "solid 1px #c7c7c7", borderRadius: "50%", padding: "15px" }} alt="profile image" /> ?
                  <img src={googleProfile} style={{ margin: " 20px 0px 35px 28px", border: "solid 1px #c7c7c7", borderRadius: "50%", padding: "15px" }} alt="profile image" /> :
                  <img src="../../Assets/profile.png" style={{ margin: "0 0 35px 0" }} alt="profile image" />}</span>

              <span style={{ position: "absolute", margin: " 60px 0px 0px 40px", fontSize: "20px", fontWeight: "600" }}>{User.firstName && User.lastName ? User.firstName && User.lastName : loggedInUser} {`${firstName} ${lastName}`}</span>
              <span style={{ position: " absolute", margin: " 100px 0 0 40px", fontSize: "15px" }}>{email}</span>
              <div className="login-divider2"></div>
              <div style={{ margin: "10px 0 0 0" }} onClick={(e) => this.HandelOrderModalIsOpen(e)}><img src="../../Assets/order.png" style={{ height: "30px", margin: "0 20px 0 0", verticalAlign: "middle" }} />My Orders</div>
              <div className="login-divider2"></div>
              <div style={{ margin: "10px 0 0 0" }} onClick={() => this.handleModalState('formModalIsOpen', true)}><img src="../../Assets/details.png" style={{ height: "30px", margin: "0 20px 0 0", verticalAlign: "middle" }} />Details</div>
              <div className="login-divider2"></div>
              <div style={{ margin: "10px 0 0 0" }}><img src="../../Assets/password.png" style={{ height: "30px", margin: "0 20px 0 0", verticalAlign: "middle" }} />change Password</div>
              <div className="login-divider2"></div>
              <div style={{ margin: "10px 0 0 0" }}><img src="../../Assets/heart.png" style={{ height: "30px", margin: "0 20px 0 0", verticalAlign: "middle" }} />Favorite Order's</div>
              <div className="login-divider2"></div>
              <div style={{ margin: "10px 0 0 0" }}><img src="../../Assets/bookmark.png" style={{ height: "30px", margin: "0 20px 0 0", verticalAlign: "middle" }} />Bookmark's</div>


              <div className="login-divider2"></div>
              <div style={{ margin: "10px 0 0 0" }} onClick={this.handleLogout}><img src="../../Assets/logout.png" style={{ height: "30px", margin: "0 20px 0 0", verticalAlign: "middle" }} />logout</div>


            </div>


          </div>
        </Modal>

        <Modal
          isOpen={orderModalIsOpen}
          style={customStyles2}
          overlayClassName="Overlay"
        >
          <div>
            <div className="" style={{ fontSize: "24px", float: 'left', margin: '5px', verticalAlign: "null" }} onClick={() => this.handleModalState('orderModalIsOpen', false)} ><img src="../../Assets/back-icon.png"></img></div>
            <div style={{ float: 'right', margin: '5px' }} onClick={() => this.handleModalState('orderModalIsOpen', false)}><img src="../../Assets/x.svg" />
            </div>
          </div>

          <div>
            <div className="" style={{ fontWeight: "600", fontSize: "15px" }}>{orders.length > 0 ? <h3>My Orders</h3> : null}</div>
            {orders.length > 0 ? orders.map((item) => {
              return <><span>{item.rest_name}</span>  <div>{item.menuItems.filter((filt) => filt == filt.qty === filt.qty < 1).map((item) => {
                return <div>

                  <div className="card" >
                  <span className="col-xs-2 col-sm-3 col-md-3 col-lg-2">&#8377;{item.price}</span>
                    <span className="col-xs-3 col-sm-3 col-md-3 col-lg-3" style={{ paddingLeft: "28px" }}> <img className="card-img" src={`../${item.image}`} />
                    </span>
                    
                    

                    <div className="row" >
                      <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 " style={{ paddingLeft: "28px", marginTop: '-5px' }}>
                        <span className="card-body">

                          <div style={{ color: "GrayText", margin: "8px 0 0px 0px" }}>Item</div>
                          <span>{item.qty}</span>x<span className="">{item.name}</span>
                          <div style={{ color: "GrayText", margin: "8px 0 0px 0px" }}>Ordered on</div>
                          <span>date</span> at <span>time</span>

                        </span>
                        
                      </div>
                      
                      <span className="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-center gx-0" >
                            <a style={{ float: "right", color: "rgb(220, 53, 69)",margin:"75px 35px 0 0px" }}><i class="fa fa-repeat  " />Repeat Order</a>
                          </span>
                    </div>
                  </div>
                </div>
              })}</div></>
            }) :
              <>

                <div style={{ position: "absolute", margin: "10% 0px 0px 27%", fontWeight: "600", fontSize: "30px" }}>No Orders yet!</div>

                <img src="../../Assets/order-now.gif" style={{ margin: "0 0 0 0" }} />
                <button className="btn btn-danger" style={{ margin: "75% 0 0 -53%", position: " absolute", padding: "15px" }}> Order Now &#10162;</button>
              </>}
          </div>
        </Modal>


        <Modal
          isOpen={formModalIsOpen}
          style={customStyles2}
          overlayClassName="Overlay"
        >
          <div>
            <div className="" style={{ fontSize: "24px", float: 'left', margin: '5px', verticalAlign: "null" }} onClick={() => this.handleModalState('formModalIsOpen', false)} ><img src="../../Assets/back-icon.png"></img></div>

            <div style={{ float: 'right', margin: '5px' }} onClick={() => this.handleModalState('formModalIsOpen', false)}><img src="../../Assets/x.svg" /></div>
            <h3 className="restaurant-name rest-Name">Details</h3>
            <div className="form">first Name:</div>  <input className="input" type="text" placeholder="Enter your first Name" id="fname" />
            <div className="form">last Name:</div>  <input className="input" type="text" placeholder="Enter your last Name" id="lname" />
            <div className="form">Mobile Number:</div>  <input className="input" type="text" placeholder="Enter mobile number" id="Mobile Number" />
            <div className="form">Email:</div>  <input className="input" type="text" placeholder="Enter your email" id="email" />
            <div className="form">Address:</div>   <textarea className="input_area" id="addr" placeholder="Enter your address" />

            <div><button className="btn btn-danger proceed" onClick={this.form}>Save</button></div>

          </div>
        </Modal>
        <ToastContainer theme="colored" />
      </>

    )
  }
}


export default withRouter(Headers);