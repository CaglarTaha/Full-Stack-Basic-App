import { Button, Col, Form, Input, Radio, Row, Select, Typography } from "antd";
import Card from "../Components/card/Card";
import { SaveOutlined } from "@ant-design/icons";
import { useAppSelector } from "../Store/store";
import Logo from "../assets/Image/logo.png";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  company?: string;
  email?: string;
  role?: string;
  subscription?: "free" | "pro" | "enterprise" | "custom";
  id?: string;
  status?: "active" | "inactive";
};

const UserProfileDetailsPage = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const user = useAppSelector((state) => JSON.parse(state.user.user));

  return (
    <>
      <Card style={{ backgroundColor: "#E51929" }}>
        <div
          style={{
            display: "flex",
            width: "%100",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            height={200}
            style={{ width: "%100", objectFit: "contain" }}
            src={Logo}
          ></img>
        </div>
      </Card>
      <Card>
        <Form
          name="user-profile-details-form"
          layout="vertical"
          initialValues={{
            role: user.data.role.name,
            firstName: user.data.firstName,
            lastName: user.data.lastName,
            email: user.data.email,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
          requiredMark={false}
        >
          <Row gutter={[16, 0]}>
            <Col sm={24} lg={12}>
              <Form.Item<FieldType>
                label="First name"
                name="firstName"
                rules={[
                  { required: true, message: "Please input your first name!" },
                ]}
              >
                <Input disabled />
              </Form.Item>
            </Col>

            <Col sm={24} lg={12}>
              <Form.Item<FieldType>
                label="Last name"
                name="lastName"
                rules={[
                  { required: true, message: "Please input your last name!" },
                ]}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col sm={24} lg={12}>
              <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col sm={24} lg={12}>
              <Form.Item<FieldType>
                label="Role"
                name="role"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col sm={24} lg={12}>
              <Form.Item<FieldType>
                label="Current Password"
                name="password"
                rules={[{ required: true, message: "Password" }]}
              >
                <Input type="password" />
              </Form.Item>
            </Col>
            <Col sm={24} lg={12}>
              <Form.Item
                label="NewPassword"
                name="newpassword"
                rules={[{ required: true, message: "Change Password" }]}
              >
                <Input type="password" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
              Save changes
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default UserProfileDetailsPage;
