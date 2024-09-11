import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../Store/useReducer";
import toast, { Toaster } from "react-hot-toast";
import deploylink from "../functions";
import Logo from "../assets/Image/Logo.png";
import "../Style/Login.scss";
import { Form, Input, Button, message } from "antd";
import instance from "../Store/Instance";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const handleRegister = async (values: any) => {
    try {
      const response = await fetch(`${deploylink}/public/user/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
    } catch (error: any) {
      messageApi.error("Ağ hatası", error);
    }
  };

  return (
    <div>
      {contextHolder}
      <div className="container">
        <div className="LoginForm-Container">
          <div className="Card">
            <div className="leftCard">
              <img className="logo" alt="logo" src={Logo} />
            </div>
            <div className="rigthCard">
              <h3 style={{ fontSize: 30 }}>
                <span style={{ color: "#E51A29" }}>Hello Ada</span> Login
              </h3>
              <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 700 }}
                initialValues={{ remember: true }}
                onFinish={handleRegister}
                autoComplete="off"
              >
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    {
                      type: "string",
                      required: true,
                      message: "Please input your Name!",
                    },
                  ]}
                ></Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      type: "email",
                      required: true,
                      message: "Please input your Email!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Create User
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
