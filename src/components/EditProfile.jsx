import React, { useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({user}) => {
  
    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
    const [age, setAge] = useState(user?.age || "");
    const [gender, setGender] = useState(user?.gender );
    const [about, setAbout] = useState(user?.about || "");

    const dispatch = useDispatch();  
    const [showToast,setShowToast] = useState(false);

  const [error,setError] = useState("");

  const saveProfile = async()=>{
    //clear error
    setError("");
    try{
        const res = await axios.patch(BASE_URL+"/profile/edit",{
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about
        },{withCredentials:true});

        dispatch(addUser(res?.data?.data));
        setShowToast(true);
        //hide toast after 3 sec
        setTimeout(()=>{
            setShowToast(false);
        },3000);
        
    }catch(err){
        setError(err.response.data);
    }
  }



  return (
    <>
        <div className='flex justify-center my-10'>
            <div className="flex justify-center mx-10">
            <div className="card bg-base-300 w-96 shadow-sm">
                <div className="card-body">
                <h2 className="card-title">Edit Profile</h2>
                <div className="my-3 flex flex-col gap-1">

                    <label className="label">First Name:</label>
                    <input
                    type="text"
                    value={firstName}
                    className="input"
                    onChange={(e) => setFirstName(e.target.value)}
                    />

                    <label className="label">Last Name:</label>
                    <input
                    type="text"
                    value={lastName}
                    className="input"
                    onChange={(e) => setLastName(e.target.value)}
                    />

                    <label className="label">Photo Url:</label>
                    <input
                    type="text"
                    value={photoUrl}
                    className="input"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    />

                    <label className="label">Age:</label>
                    <input
                    type="text"
                    value={age}
                    className="input"
                    onChange={(e) => setAge(e.target.value)}
                    />

                    <legend className="fieldset-legend">Gender:</legend>
                    <select value={gender} className="select"  onChange={(e) => setGender(e.target.value)}>
                        <option disabled={true}>Select your Gender</option>
                        <option value={"male"}>Male</option>
                        <option value={"female"}>Female</option>
                        <option value={"others"}>Others</option>
                    </select>

                    <label className="label">About:</label>
                    <textarea className="textarea h-24" value={about} onChange={(e) => setAbout(e.target.value)}></textarea>
                </div>
                <p className="text-red-500 text-center">{error}</p>
                <div className="card-actions justify-center">
                    <button className="btn btn-primary" onClick={saveProfile}>
                    Save Profile
                    </button>
                </div>
                </div>
            </div>
            </div>
            <UserCard user={{firstName,lastName,photoUrl,age,gender,about}}/>
        </div>

        { showToast && (<div className="toast toast-top toast-center">
            <div className="alert alert-info">
                <span>Profile Save Successfully</span>
            </div>
        </div>
        )}
    </>
  )
}

export default EditProfile
