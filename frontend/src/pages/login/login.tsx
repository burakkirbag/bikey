import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { Input, Button, Form, Alert } from "antd";
import validationRules from "./login.validation";
import { LOGIN } from "./login.query";

const style = { padding: "8px 0" };

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [login] = useLazyQuery(LOGIN);

  useEffect(() => {
    const loggedIn = !!localStorage.getItem("auth-token");
    if (loggedIn) navigate("../bikes");
  }, []);

  const doLogin = (formData: any) => {
    setShowLoading(true);

    login({
      variables: { username: formData.username, password: formData.password },
      fetchPolicy: "network-only",
    })
      .then((response) => {
        if (response.data.login.token) {
          localStorage.setItem("auth-token", response.data.login.token);
          localStorage.setItem(
            "auth-user",
            JSON.stringify(response.data.login.user)
          );
          setErrorMessage("");
          navigate("../bikes");
        } else {
          setErrorMessage("The username or password you entered is incorrect.");
        }
      })
      .catch((err) => {
        setErrorMessage("The username or password you entered is incorrect.");
      })
      .finally(() => {
        setShowLoading(false);
      });
  };

  return (
    <Form name="login" onFinish={doLogin}>
      <h3>User Login</h3>

      <Form.Item style={style} name="username" rules={validationRules.username}>
        <Input type="text" placeholder="Username" />
      </Form.Item>

      <Form.Item style={style} name="password" rules={validationRules.password}>
        <Input type="password" placeholder="Password" />
      </Form.Item>

      <Form.Item style={style}>
        <Button type="primary" htmlType="submit" loading={showLoading}>
          Login
        </Button>
      </Form.Item>

      {errorMessage && errorMessage != "" && (
        <Form.Item name="errorMessage">
          <Alert message={errorMessage} type="error" />
        </Form.Item>
      )}
    </Form>
  );
};

export default LoginPage;
