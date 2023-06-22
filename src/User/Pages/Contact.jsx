import React from "react";
import Footer from "../layout/Footer";

const Contact = () => {
  // const item = products.find((item) => item.id == id);

  return (
    <>
    <div>
      <div className="container mb-5">
        <div className="row">
          <div className="col-12 text-center py-4 my-4">
            <h1 style={{marginTop: "45px"}}>Have Some Question?</h1>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-md 5 d-flex justify-content-center">
            {/* <img src="/assets/image/images.png" alt="Contact Us" height="400px" width="400px" /> */}
          <img src="/assets/image/Myproj.png" alt="Contact Us" height="400px" width="600px" />
          </div> 
          <div className="col-md-6">
            <form>
              <div className="mb-3 ">
                <label htmlFor="exampleForm" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleForm"
                  placeholder="Full Name"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">
                  Example textarea
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="5"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-outline-primary">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
 
    </>
  );
};

export default Contact;