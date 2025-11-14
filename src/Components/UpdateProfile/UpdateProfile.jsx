import React, { use, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../../Contexts/AuthContext';

const UpdateProfile = () => {
    const {user,updateUserProfile} = use(AuthContext)
    const [name, setName] = useState(user?.displayName || "");
    const [email, setEmail] = useState(user?.email || "");
    const [photo, setPhoto] = useState(user?.photoURL || "");
    // console.log("from profile: ",users)

    const handleUpdate = (event) => {
    // event.preventDefault();
    // const photoUrl = event.target.photo.value;
    // const isValid = await checkPhotoUrl(photoUrl);
    // // let photo =  null;
    // if(isValid){
    //   photo = photoUrl;
    // }
    updateUserProfile(name,photo)
      .then(() => {
        toast.info("Profile updated successfully!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
    };

    return (
      <div className="bg-linear-to-br from-[#f1f9ff] to-[#a7d7fc]">
        {/* <Navbar></Navbar> */}
        <div className="flex justify-center items-center md:h-[70vh] p-7">
          <div className="card bg-[#a7d7fc] w-full max-w-3xl shrink-0 shadow-2xl">
            <h1 className="text-2xl font-semibold text-center text-primary-gradient py-5">
              Update Profile
            </h1>
            <div className="card-body grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 ">
            <div className="flex flex-col items-center py-3 space-y-3">
                <img
                src={
                    photo ||
                    "https://img.icons8.com/ios-filled/50/user-male-circle.png"
                }
                alt="Profile"
                className="md:w-60 h-40 md:h-60 rounded-full object-cover border-2 border-gray-300"
                />
                <div>
                <div className='flex gap-4'>
                  <img width="37" height="10" src="https://img.icons8.com/sf-regular-filled/48/name.png"  alt="name"/>
                  <h1 className="text-2xl font-semibold">{user.displayName}</h1>
                </div>
                <div className='flex gap-5 '>
                  <img width="30" height="10" src="https://img.icons8.com/ios-filled/50/new-post.png"  alt="new-post"/>
                  <p className="text-xl font-semibold">{user.email}</p>
                </div>
                </div>
            </div>
            <div className=''>
                <p className="text-gray-600 text-lg">
                Update your photo and name
                </p>

              <form onSubmit={handleUpdate}>
                <fieldset className="fieldset space-y-4">
                  <div>
                    <label className="label text-sm font-semibold mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="input w-full bg-[#FBF8E5] text-gray-800"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="label text-sm font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      className="input w-full bg-[#FBF8E5] "
                      value={email}
                      disabled
                    />
                  </div>

                  <div>
                    <label className="label text-sm font-semibold mb-2">
                      Photo URL
                    </label>
                    <input
                      type="text"
                      className="input w-full bg-[#FBF8E5] text-gray-800"
                      value={photo}
                      onChange={(e) => setPhoto(e.target.value)}
                      placeholder="Enter image URL"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn bg-[#5EBB2B] w-full mt-4 text-white font-semibold text-base shadow-none"
                  >
                    Update Profile
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
        </div>
        {/* <Footer></Footer> */}
        <ToastContainer position="top-center" autoClose={2500} theme="colored"/>
      </div>
    );
};

export default UpdateProfile;