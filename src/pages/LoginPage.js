import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import isLoggedIn from "./../helpers/is_logged_in";
import store from "store";
import {getUser1} from "../API";
// import { Link } from "react-router-dom";

//const apiServer = ".";

export default function LoginPage(props) {
  const [billsList, setBillsList] = useState([]);
  const [token, setToken] = useState("");
  const [islogin, setIslogin] = useState(0);

  const getToken = isLoggedIn();

  //console.log("user ", getToken);

  if (getToken) {
    return <Redirect to="/billList" />;
  }

  const handleSubmit = evt => {
    evt.preventDefault();
    //alert(`Submitting Name ${token}`)
    let data = { token: token };
    //axios.post(`${apiServer}/ci-api/bills/getUser`, data).then(result => {
    getUser1(data).then(result => {
      //console.log(result.data);
      if (result.data.result == "SUCCESS") {
        //alert("Login Success");
        store.set("user", result.data.data);
        setIslogin(islogin + 1);
        checklogin();
      } else {
        alert("ไม่มี Token นี้ในระบบ!");
      }
    });
  };

  const checklogin = () => {
    if (islogin > 0) {
      return <Redirect to="/billList" />;
    }
  };

  return (
    <section className="hero is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="column is-4 is-offset-4">
            <h3 className="title has-text-grey">เข้าสู่ระบบ</h3>
            <p className="subtitle has-text-grey">กรุณากรอก Token.</p>
            <div className="box">
              <form onSubmit={handleSubmit}>
                <div className="field">
                  <div className="control">
                    <input
                      className="input is-large"
                      type="text"
                      placeholder="ป้อน Token"
                      onChange={e => setToken(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="field is-grouped">
                  <label className="checkbox"></label>
                {/*<button className="button is-block is-info is-large is-fullwidth">*/}
				<p class="control is-expanded">
                <button className="button is-info is-large is-fullwidth">
                  เข้าสู่ระบบ
                </button>
				</p>
				<p class="control my-margin-top">
                <a
                  href="/#/login"
                  onClick={e => {
                    e.preventDefault();
                    window.location.reload();
                    window.localStorage.removeItem('user');
                    //store.removeItem("user");
                  }}
                >
                  <i className="fas fa-redo-alt is-large" />
                </a>
				</p>
				</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
