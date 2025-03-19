"use client"; // ✅ Required for client-side components

import React from "react";
import styled from "styled-components";
import Image from "next/image"; // ✅ Import optimized Image component
import LoginForm from "./LoginForm"; // ✅ Import the login form

const LoginPage: React.FC = () => {
  return (
    <Background>
      <Container>
        <LogoWrapper>
            <Image style={{width:"100px",height:"70px",marginBottom:"30px"}}src="/logo.svg" alt="OraLuiRobert Logo" width={150} height={150} priority />
        </LogoWrapper>
        <LoginForm />
      </Container>
    </Background>
  );
};

// ✅ Styled Components
const Background = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background: white;
`;

const Container = styled.div`
  width: 400px;
  padding: 30px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 5px 20px 50px rgba(0, 0, 0, 0.2);
`;


const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export default LoginPage;
