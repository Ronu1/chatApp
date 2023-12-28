import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {  addUser } from "../redux/features/UserSlice";
import { useState } from "react";
import Add from "../img/add_image.png";
import { useEffect } from "react";

const SignUp = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(
    "https://bootdey.com/img/Content/avatar/avatar1.png"
  );
  const dispatch = useDispatch();

  const postDetails = (profilePic) => {
    const form = new FormData();
    form.append("file", profilePic);
    form.append("upload_preset", "chat-app");
    form.append("cloud_name", "ronitbrilworks");
    fetch("https://api.cloudinary.com/v1_1/ronitbrilworks/image/upload", {
      method: "post",
      body: form,
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.url))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (profilePic) {
      postDetails(profilePic);
    }
  }, [profilePic]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      profilePic: "https://bootdey.com/img/Content/avatar/avatar1.png",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      if(url){
        values.profilePic = url;
      }
      dispatch(addUser(values));
      resetForm();
      navigate("/");
    },
  });
  return (
    <div className="h-[80%] w-50%   flex items-center justify-center transition-all duration-[0.6s]  ease-[ease-in-out] ">
      <form
        onSubmit={formik.handleSubmit}
        className="my-6 mt-5 bg-slate-700 rounded-[4px] flex items-center justify-center flex-col h-full text-center px-[50px] py-0"
      >
        <h1 className="text-2xl text-white m-5">Sign Up</h1>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
          placeholder="Enter FullName..."
          className="bg-[#898888] w-full mx-0 my-3 px-[15px] py-3 border-[none] placeholder:text-slate-100"
        />
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}

        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder="Enter Email..."
          className="bg-[#898888] w-full mx-0 my-3 px-[15px] py-3 border-[none] placeholder:text-slate-100"
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}

        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="Enter Password..."
          className="bg-[#898888] w-full mx-0 my-3 px-[15px] py-3 border-[none] placeholder:text-slate-100"
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}

        <input
          style={{ display: "none" }}
          type="file"
          id="picFile"
          name="profilePic"
          onChange={(e) => {
            setProfilePic(e.target.files[0]);
          }}
        />
        <label
          htmlFor="picFile"
          className="flex gap-1 items-center justify-center"
        >
          <img className="h-5 w-5" src={Add} alt="" />
          <span className="text-white">Add an avatar</span>
        </label>
        <button
          className=" my-4 border bg-[#FF4B2B] text-white text-xs font-[bold] tracking-[1px] uppercase transition-transform duration-[80ms] ease-[ease-in] px-[45px] py-3 rounded-[20px] border-solid border-[#FF4B2B] active:scale-95 focus:outline-none"
          type="submit"
          disabled={loading}
        >
          Sign Up
        </button>
        {loading && "Uploading and compressing the image please wait..."}
        {err && <span>Something went wrong</span>}
        <p className="text-white mb-4 inline-block">
          Already have an account?{" "}
          <Link to={"/login"} className="text-violet-500">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
