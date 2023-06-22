import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [username, setUsernameUpdate] = useState("");
  const [password, setPasswordUpdate] = useState("");

  const navigate = useNavigate();

  // useEffect(() => {
  //   sessionStorage.clear();
  // }, []);

  const ProceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      fetch("http://localhost:3000/adminLog/" + username)
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          if (Object.keys(resp).length === 0) {
            toast.error("Please Enter valid username");
          } else {
            if (resp.password === password) {
              toast.success("Login Successfully");
              sessionStorage.setItem("username", username);
              sessionStorage.setItem("password", password);
              navigate("/dashboard");
            } else {
              toast.error("Please Enter valid password");
            }
          }
        })
        .catch((err) => {
          toast.error("Login Failed due to :" + err.message);
        });
    }
  };

  const setUsername = (e) => {
    setUsernameUpdate(e.target.value);
  };

  const setPassword = (e) => {
    setPasswordUpdate(e.target.value);
  };


  const validate = () => {
    let result = true;
    if (username === "" || username === null) {
      result = false;
      toast.warning("Please Enter Username");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Please Enter Password");
    }
    return result;
  };
  return (
    <div className="row">
      <div className="offset-lg-3 col-lg-6" style={{ marginTop: "100px" }}>
        <form onSubmit={ProceedLogin} className="container">
          <div className="card">
            <div className="card-header">
              <h2>Admin Login</h2>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>
                  UserName <span className="errmsg">*</span>
                </label>
                <input
                  value={username}
                  onChange={setUsername}
                  className="form-control"
                ></input>
              </div>
              <div className="form-group">
                <label>
                  Password <span className="errmsg" >*</span>
                </label>
                 <input
                    type="password"
                    value={password}
                    onChange={setPassword}
                    className="form-control"
                  ></input>
                </div>
              </div>
              <div className="card-footer">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>{" "}
                <Link className="btn btn-success" to={"/admin-signup"}>
                  New User
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };

export default AdminLogin;