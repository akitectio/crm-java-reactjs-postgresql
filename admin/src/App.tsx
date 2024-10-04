import { useWindowSize } from "@app/hooks/useWindowSize";
import { setWindowSize } from "@app/store/reducers/ui";
import { calculateWindowSize } from "@app/utils/helpers";
import Login from "@modules/login/Login";
import Main from "@modules/main/Main";
import { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Blank from "@pages/Blank";
import Dashboard from "@pages/Dashboard";
import Profile from "@pages/profile/Profile";
import SubMenu from "@pages/SubMenu";

import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

import { Loading } from "./components/Loading";
import CreateFormPermissions from "./pages/CreateFormPermissions";
import CreateFormRoles from "./pages/CreateFormRoles";
import CreateForm from "./pages/CreateFormUsers";

import EditFormRole from "./pages/editFolder/EditFormRole";
import EditForm from "./pages/editFolder/EditFormUser";

import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
import Permissions from "./pages/Permissions";
import Roles from "./pages/Roles";
import UserTable from "./pages/UserTable";
import { getUserInfo } from "./services/auth";
import { setCurrentUser } from "./store/reducers/auth";
import { useAppDispatch, useAppSelector } from "./store/store";

const { VITE_NODE_ENV } = import.meta.env;

const App = () => {
  const windowSize = useWindowSize();
  const screenSize = useAppSelector((state) => state.ui.screenSize);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Await the result of getUserInfo(), since it returns a promise
        let userInfo: any = await getUserInfo();

        console.log(userInfo);

        if (userInfo) {
          dispatch(setCurrentUser(userInfo));
        } else {
          dispatch(setCurrentUser(null));
        }
      } catch (error: any) {
        console.error("Error fetching user info:", error);

        // Handle error and reset user state
        dispatch(setCurrentUser(null));
      } finally {
        // Ensure loading state is set to false
        setIsAppLoading(false);
      }
    };

    fetchUserInfo();
  }, [dispatch]);

  useEffect(() => {
    const size = calculateWindowSize(windowSize.width);
    if (screenSize !== size) {
      dispatch(setWindowSize(size));
    }
  }, [dispatch, screenSize, windowSize]);

  useEffect(() => {
    if (location?.pathname && VITE_NODE_ENV === "production") {
      ReactGA.send({
        hitType: "pageview",
        page: location.pathname,
      });
    }
  }, [location]);

  if (isAppLoading) {
    return <Loading />;
  }

  return (
    <>
      <Routes>
        <Route path="/login" element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Main />}>
            <Route path="/sub-menu-2" element={<Blank />} />
            <Route path="/sub-menu-1" element={<SubMenu />} />
            <Route path="/blank" element={<Blank />} />
            <Route path="/users" element={<UserTable />} />
            <Route path="/users/create" element={<CreateForm />} />
            <Route path="/users/edit/:id" element={<EditForm />} />
            <Route path="/role" element={<Roles />} />

            <Route path="/role/create" element={<CreateFormRoles />}></Route>
            <Route path="role/edit/:id" element={<EditFormRole />}></Route>
            <Route path="/permission" element={<Permissions />}></Route>
            <Route
              path="/permission/create"
              element={<CreateFormPermissions />}
            ></Route>

            <Route path="/role/create" element={<CreateFormRoles />}></Route>
            <Route path="role/edit/:id" element={<EditFormRole />}></Route>
            <Route path="/permission" element={<Permissions />}></Route>
            <Route
              path="/permission/create"
              element={<CreateFormPermissions />}
            ></Route>

            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer
        autoClose={3000}
        draggable={false}
        position="top-right"
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnHover
      />
    </>
  );
};

export default App;
