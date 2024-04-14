import "./App.css";

import Loader from "../Loader/Loader";
import { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../Layout/Layout";

import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { refreshUser } from "../../redux/auth/operations";
import { selectIsRefreshing } from "../../redux/auth/selectors";
import { RestrictedRoute } from "../RestrictedRoute";
import { PrivateRoute } from "../PrivateRoute";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";

const HomePage = lazy(() => import("../../pages/Home/Home"));
const RegisterPage = lazy(() =>
  import("../../pages/Registration/Registration")
);
const LoginPage = lazy(() => import("../../pages/Login/Login"));
const ContactsPage = lazy(() => import("../../pages/Contacts/Contacts"));

export default function App() {
  const isRefreshing = useSelector(selectIsRefreshing);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  // return (
  //   <div>
  //     <div className="headerContainer">
  //       <BiSolidContact
  //         // style={{ width: "44px", height: "44px" }}
  //         className="headerIcon"
  //       />
  //       <h1>Phonebook</h1>
  //     </div>

  //     <ContactForm />
  //     <SearchBox />
  //     {error && <Error>Something went wrong! Reload the page.</Error>}
  //     {loading && <Loader />}
  //     <ContactList />
  //     <Toaster />
  //   </div>
  // );

  return (
    <Layout>
      {isRefreshing ? (
        <Loader />
      ) : (
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/register"
              element={
                <RestrictedRoute
                  component={<RegisterPage />}
                  redirectTo="/contacts"
                />
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute
                  component={<LoginPage />}
                  redirectTo="/contacts"
                />
              }
            />
            <Route
              path="/contacts"
              element={
                <PrivateRoute
                  component={<ContactsPage />}
                  redirectTo="/login"
                />
              }
            />
            <Route path="*" element={<NotFoundPage />}></Route>
          </Routes>
        </Suspense>
      )}
      <Toaster />
    </Layout>
  );
}
