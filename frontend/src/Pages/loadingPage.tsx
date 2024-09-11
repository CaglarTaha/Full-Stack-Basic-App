import React from "react";
import Logo from "../assets/Image/logo.png";
import { Flex } from "antd";
import "../Style/Loading.scss"; // CSS dosyanızı ekleyin ve animasyonları tanımlayın

export default function LoadingPage() {
  return (
    <div className="loading-container">
      <Flex align="center" justify="center">
        <img alt="logo" className="logo2" src={Logo}></img>
      </Flex>
    </div>
  );
}
