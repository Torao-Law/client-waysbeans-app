import React from 'react'

//assets
import ImgProfile from '../assets/image/profile.png'

function Profile() {
  return (
    <div>
        {/* <h3 className="fw-bold" style={{color: "#613D2B", marginBottom: 26}}>My Profile</h3> */}
            <div className="img-wrapper"  style={{width: 200, height: 200}}>
                <img src={ImgProfile} style={{width: "100%", height: "100%", borderRadius: "100%"}} alt="profile" />
            </div>
            <div>
                <div className="name">
                    <p className="fs-4 m-0 mt-3 fw-bolder" style={{color: "#613D2B"}}>My Account</p>
                    <p className="m-0" >Dashboard</p>
                    <p className="m-0" >Profile</p>
                    <p className="m-0" >Address</p>
                    <p className="m-0" >Change Password</p>
                </div>
            </div>
        </div>
  )
}

export default Profile
