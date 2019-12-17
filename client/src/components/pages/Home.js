import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <main>
    <div className='row'>
      <div className='col '>
        <div className=' row py-5 justify-content-center'>
          <p>
            <b>Step 1.</b> Draft <b>Step 2.</b> Publish <b>Step 3.</b> Iterate
          </p>
        </div>
        <div className='row justify-content-center'>
          <Link to='/agenda/new' className='btn btn-primary btn-lg'>
            Get Started
          </Link>
        </div>
      </div>
    </div>
  </main>
);

export default Home;
