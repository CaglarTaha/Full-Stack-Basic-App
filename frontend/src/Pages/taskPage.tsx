import React, { useState, useEffect } from "react";
import { Space, Table, Tag, Button, Card, Drawer, Modal } from "antd";
import UserAddForm from "../Components/forms/taskAddForm";
import instance from "../Store/Instance";
import LoadingPage from "./loadingPage";
import { TRUE } from "sass";
import UpdateTaskForm from "../Components/forms/UpdateTaskForm";

export default function () {
  const [UpdateDrawer, setUpdateDrawer] = useState(false);
  const [taskId, setTaskId] = useState<any>();
  const [task, setTask] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const handleUpdate = (id: number) => {
    setUpdateDrawer(true);
    setTaskId(id);
  };
  const onCloseUpdate = () => {
    setUpdateDrawer(false);
  };
  const handleShowOpen = (id: number) => {
    showModal();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "id",
      render: (text: string) => <>{text}</>,
    },
    {
      title: "Task",
      dataIndex: "task",
      key: "id",
    },

    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle" className="row">
          <Button onClick={() => handleShowOpen(record.id)}>Delete</Button>
          <Button onClick={() => handleUpdate(record.id)}>Update</Button>
        </Space>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const response = await instance.get("/tasks");
      setLoading(true);
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      const data = response.data;
      setTask(data);
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await instance.delete(`/task/${taskId}`);
      if (response.status !== 204) {
        console.log(response.status);
        throw new Error("Network response was not ok");
      }
      console.log(taskId);
      setIsModalOpen(false);

      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);

      setLoading(false);
    }
  };

  return (
    <div>
      <Modal
        okType="default"
        title="Delete Permantly Are You Sure ?"
        open={isModalOpen}
        onOk={handleDelete}
        onCancel={handleCancel}
      />
      <Drawer
        title="Update Task"
        width={720}
        onClose={onCloseUpdate}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={<Space></Space>}
      >
        <UpdateTaskForm id={taskId} onClose={onCloseUpdate} />
      </Drawer>
      <Drawer
        title="Add New Task"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={<Space></Space>}
      >
        <UserAddForm handleFetchData={fetchData} onClose={onClose} />
      </Drawer>
      {loading ? (
        <LoadingPage></LoadingPage>
      ) : (
        <Card
          title="User Table"
          extra={<Button onClick={showDrawer}>Create User</Button>}
        >
          <Table columns={columns} dataSource={task} rowKey="id" />
        </Card>
      )}
    </div>
  );
}
