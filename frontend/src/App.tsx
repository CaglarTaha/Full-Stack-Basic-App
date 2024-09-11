import { BrowserRouter, Navigate, Route, RouterProvider, Routes } from "react-router-dom";
import Login from "./Pages/loginPage";

import { routes } from "./Routes/routes";
import { useAppSelector } from "./Store/store";
import { useEffect, useState } from "react";
import Register from "./Pages/RegisterPage";
function App() {
  const user = useAppSelector((state) => JSON.parse(state.user.user));
  const token = useAppSelector((state) => state.user.token);

  const [Role, setRole] = useState(user?.data.role.name);

  const [roleList, setRoleList] = useState({
    Admin: false,
    Standart: false,
  });

  const [loading, setloading] = useState(true);
  useEffect(() => {
    setRoleList((prevRole) => ({
      ...prevRole,
      [Role]: true,
    }));

    console.log([Role]);
    console.log(roleList);
    setTimeout(() => {
      setloading(false);
    }, 1000);
  }, []);



  if (user && token && token !== "undefined") {
    return <RouterProvider router={routes} />;
  } else {
    return (
      <BrowserRouter>
        <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
