import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, TextField } from '@mui/material';
import { QuicklyIcon } from '../icons';
import axios from 'axios';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f3f4f6;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 24rem; /* Adjust as needed */
  padding: 0 20px; /* Add padding to adjust the layout */
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const BrandText = styled.div`
  --tw-text-opacity: 1;
  color: rgb(17 25 40 / var(--tw-text-opacity));
  font-size: 24px;
  line-height: 150%;
  font-weight: 700;
  font-family: Gilroy, ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
`;

export const StyledLinkButton = styled(Button)`
  && {
    color: #1F2A37;
    text-transform: none;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  max-width: 384px;
`;

export const StyledTextField = styled(TextField)`
  && {
    padding-bottom: 20px;
    width: 100%;
  }
`;

export const StyledButton = styled(Button)`
  && {
    width: 100%;
    background-image: linear-gradient(117deg, #ff6661 -9.63%, #f24165 52.75%, #a80943 126.08%);
    border-radius: 20px;
    color: white;
    text-transform: none;
    &:hover {
      background-image: linear-gradient(117deg, #ff6661 -9.63%, #f24165 52.75%, #a80943 126.08%);
    }
  }

  &&::first-letter {
    text-transform: capitalize;
  }
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 15px;
`;

export const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://api-dev.quicklyinc.com/auth/login', {
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
      navigate('/profile');
    } catch (error) {
      setError('Invalid email or password.');
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
    if (value.trim() === '') {
      setEmailError('');
    } else if (!validateEmail(value)) {
      setEmailError('Invalid email format.');
    } else {
      setEmailError('');
    }
  };

  const handleSignUp = () => {
    navigate('/signup');
  };
  
  return (
    <Container>
      <ContentContainer>
        <LogoContainer>
          <QuicklyIcon />
          <BrandText className="text-gray-900 font-bold text-2xl font-gilroy ml-3">Quickly</BrandText>
        </LogoContainer>
        <StyledLinkButton onClick={handleSignUp}>
          Create an account
        </StyledLinkButton>
      </ContentContainer>
      <Title>Log in</Title>
      <StyledForm onSubmit={handleSubmit}>
        <StyledTextField
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
          variant="outlined"
          size="small"
          fullWidth
          error={!!emailError}
          helperText={emailError}
        />
        <StyledTextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          variant="outlined"
          size="small"
        />
        <StyledButton variant="contained" type="submit" className="transition-colors duration-300">
          Log in
        </StyledButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </StyledForm>
    </Container>
  );
};

export default LoginPage;
