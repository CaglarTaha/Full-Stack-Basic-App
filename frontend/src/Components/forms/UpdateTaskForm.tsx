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
    id: number
}

interface Credentials {
  task: string;
  name: string;
}

export default function UpdateTaskForm({
    id,
  onClose,
}: TaskAddFormProps) {
  const [credentials, setCredentials] = useState<Credentials>({
    task: "",
    name: "",
  });



  const handleUpdate = (id:number, updatedData:any) => {

    instance.put(`${deploylink}/api/updateTask/${id}`, updatedData)
      .then((response) => {})
      .catch((error) => {
        console.error('Error updating data:', error);
      });
      onClose()
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

 
  return (
    <div>
      <Form
        onFinish={() => handleUpdate(id, credentials)
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
