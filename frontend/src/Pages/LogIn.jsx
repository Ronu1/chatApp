import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logUser } from "../redux/features/UserSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(logUser(values));
      navigate("/");
    },
  });
  return (
    <div className="h-[70%] w-50%   flex items-center justify-center transition-all duration-[0.6s] ease-[ease-in-out] ">
      <form
        onSubmit={formik.handleSubmit}
        className="my-6 bg-slate-700 rounded-[4px] flex items-center justify-center flex-col h-full text-center px-[50px] py-0"
      >
        <h1 className="text-2xl text-white m-5">Login</h1>

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

        <button
          className=" my-4 border bg-[#FF4B2B] text-white text-xs font-[bold] tracking-[1px] uppercase transition-transform duration-[80ms] ease-[ease-in] px-[45px] py-3 rounded-[20px] border-solid border-[#FF4B2B] active:scale-95 focus:outline-none"
          type="submit"
        >
          Login
        </button>
        <p className="text-white text-sm mb-4 max-w-[80%]">
          If you Don't have an account!!{" "}
          <Link to={"/signup"} className="text-violet-500">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LogIn;
