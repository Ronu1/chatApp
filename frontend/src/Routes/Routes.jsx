import { BrowserRouter, Routes, Route , Navigate} from "react-router-dom";
import LogIn from "../Pages/LogIn";
import SignUp from "../Pages/SignUp";
import Home from "../Pages/Home";
import {useSelector} from "react-redux"

const AppRouter = () => {
  // const { currentUser } = useContext(AuthContext);
const currentUser = useSelector(state => state.user.currentUser)
  const ProtectedRoute = ({ children }) => {
    if (currentUser?.length<=0) {
      return <Navigate to="/login" />;
    }

    return children;
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" >
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                 </ProtectedRoute>
              }
            />
            <Route path="login" element={ <LogIn />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
