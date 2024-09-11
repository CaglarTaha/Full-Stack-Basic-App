import React, { useState, ChangeEvent, useEffect } from "react";
import {
  Space,
  Button,
  Card,
  Drawer,
  Form,
  Input,
  Row,
  Col,
  Divider,
  Select,
} from "antd";
import instance from "../../Store/Instance";
import { deploylink } from "../../functions";
const { Option } = Select;

interface TaskAddFormProps {
  onClose: () => void;
  handleFetchData: () => void;
}

interface Credentials {
  task: string;
  name: string;
}

export default function TaskAddForm({
  onClose,
  handleFetchData,
}: TaskAddFormProps) {
  const [credentials, setCredentials] = useState<Credentials>({
    task: "",
    name: "",
  });



  const handleCreateTask = async (main: any) => {
    try {
      const response = await instance.post(`/create/task`, main, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      handleFetchData();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: ChangeEvent<any>) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
    console.log(name);
    console.log(credentials);
  };

  const handleSelectChange = (value: number) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      roleId: value,
    }));
    console.log("roleId", value);
    console.log(credentials);
  };

  return (
    <div>
      <Form
        onFinish={() =>
          handleCreateTask({
            task: credentials.task,
            name: credentials.name,
          })
        }
        layout="vertical"
      >
        <Col span={24}>
          <Form.Item
            name="name"
            label="name"
            rules={[
              {
                required: true,
                message: "Please Enter the Name of Task",
              },
            ]}
          >
            <Input
              name="name"
              placeholder="Please Enter the Name of Task"
              onChange={handleChange}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="task"
            label="Task"
            rules={[
              {
                required: true,
                message: "please enter the task",
              },
            ]}
          >
            <Input
              name="task"
              placeholder="please enter the task"
              onChange={handleChange}
            />
          </Form.Item>
        </Col>
  
   
       
        <Row className="flex justify-end items-end" gutter={16}>
          <Button onClick={onClose}>Cancel</Button>
          <Button htmlType="submit">Ekle</Button>
        </Row>
      </Form>
    </div>
  );
}
