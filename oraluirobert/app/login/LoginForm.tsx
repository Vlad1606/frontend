"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { Form, Input, Button, Typography, notification } from "antd";
import { useRouter } from "next/navigation";
import AuthService from "@services/authService";
import { accessTokenKey } from "@utils/constants";

const { Paragraph } = Typography;

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🚀 Handle Login Attempt
  const handleLogin = async (values: { username: string; password: string }) => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await AuthService.login(values);
      localStorage.setItem(accessTokenKey, response.access);
  
      notification.success({
        message: "Autentificare reusita",
        description: "Redirectionare catre dashboard...",
      });
  
      router.replace("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
  
      setError("Nume utilizator sau parola invalida.");
      notification.error({
        message: "Autentificare esuata",
        description: "Te rugam sa verifici datele si sa incerci din nou.",
      });
  
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <FormContainer>
      <Form name="login" onFinish={handleLogin} layout="vertical">
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Introduceti numele utilizatorului" }]}
        >
          <StyledInput placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Introduceti parola" }]}
        >
          <StyledInput type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            {loading ? "Autentificare in curs..." : "Autentificare"}
          </Button>
        </Form.Item>
      </Form>

      {error && <ErrorText>{error}</ErrorText>}
    </FormContainer>
  );
};

// ✅ Styled Components
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const StyledInput = styled(Input)`
`;

const ErrorText = styled(Paragraph)`
  color: red;
`;

export default LoginForm;
