import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Image/logo.png";
const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Result
        icon={Logo}
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button onClick={() => navigate("/")}>Back to Home</Button>}
      />
    </>
  );
};

export default NotFoundPage;
