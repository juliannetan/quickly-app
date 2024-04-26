import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Container, ContentContainer, LogoContainer, BrandText, StyledForm, StyledLinkButton, StyledTextField, Title } from '../components/LoginPage';
import { QuicklyIcon } from '../icons';
import { Button, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';

export const StyledButton = styled(Button)`
  && {
    width: 100%;
    background-color: #1F2A37;
    border-radius: 20px;
    color: white;
    &:hover {
      background-color: #374151;
    }
    text-transform: capitalize;
  }
`;

const FlexRow = styled.div`
  display: flex;
  gap: 16px;
`;

const SuccessContainer = styled.div`
  text-align: center;
`;

const SignupPage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [phone, setPhone] = useState('');
  const [legalName, setLegalName] = useState('');
  const [businessNumber, setBusinessNumber] = useState('');
  const [businessRegistration, setBusinessRegistration] = useState('');
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      return;
    }
    try {
      const response = await axios.post('https://api-dev.quicklyinc.com/auth/signup', {
        user: {
          first_name: firstName,
          last_name: lastName,
          email,
          password
        },
        company: {
          activity: {
            early_pay_intent: true,
            expected_activity: 'Get my invoices paid early'
          },
          early_pay_intent: true,
          industry: { value: 'Apps', label: 'Apps' },
          business_type: {
            label: 'Digital products',
            value: 'Digital products'
          },
          website: '',
          business_registration: businessRegistration,
          phone: phone,
          business_number: businessNumber,
          has_trade_name: false,
          legal_name: legalName,
          expected_activity: 'Get my invoices paid early'
        }
      });

      localStorage.setItem('token', response.data.token);
      setSuccessSnackbarOpen(true);
      setShowSuccessMessage(true);
    } catch (error) {
      console.error(error);
      setErrorMessage((error as any).response?.data?.message || 'Signup failed.');
      setErrorSnackbarOpen(true);
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleGoToLogin = () => {
    navigate('/login');
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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
    if (value.trim() === '') {
      setPasswordError('');
    } else if (!validatePassword(value)) {
      setPasswordError('Password must be at least 6 characters long.');
    } else {
      setPasswordError('');
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSuccessSnackbarClose = () => {
    setSuccessSnackbarOpen(false);
  };

  const handleErrorSnackbarClose = () => {
    setErrorSnackbarOpen(false);
  };
  
  return (
    <Container>
      {showSuccessMessage ? (
        <SuccessContainer>
          <StyledButton variant="contained" onClick={handleGoToLogin}>Go to Login</StyledButton>
        </SuccessContainer>
      ) : (
        <><ContentContainer>
            <LogoContainer>
              <QuicklyIcon />
              <BrandText className="text-gray-900 font-bold text-2xl font-gilroy ml-3">Quickly</BrandText>
            </LogoContainer>
            <StyledLinkButton onClick={handleLogin}>Log in</StyledLinkButton>
          </ContentContainer><Title>Sign up</Title><StyledForm onSubmit={handleSubmit}>
              <FlexRow>
                <StyledTextField
                  label="First Name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  variant="outlined"
                  size="small"
                  fullWidth />
                <StyledTextField
                  label="Last Name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  variant="outlined"
                  size="small"
                  fullWidth />
              </FlexRow>
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
                helperText={emailError} />
              <StyledTextField
                label="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
                variant="outlined"
                size="small"
                fullWidth
                error={!!passwordError}
                helperText={passwordError} />
              <StyledTextField
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                variant="outlined"
                size="small"
                fullWidth
                error={!!confirmPasswordError}
                helperText={confirmPasswordError} />
              <StyledTextField
                label="Phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                variant="outlined"
                size="small"
                fullWidth />
              <StyledTextField
                label="Business Number"
                type="text"
                value={businessNumber}
                onChange={(e) => setBusinessNumber(e.target.value)}
                variant="outlined"
                size="small"
                fullWidth />
              <StyledTextField
                label="Business Registration"
                type="text"
                value={businessRegistration}
                onChange={(e) => setBusinessRegistration(e.target.value)}
                variant="outlined"
                size="small"
                fullWidth />
              <StyledTextField
                label="Legal Name"
                type="text"
                value={legalName}
                onChange={(e) => setLegalName(e.target.value)}
                required
                variant="outlined"
                size="small"
                fullWidth />
              <StyledButton variant="contained" type="submit" className="transition-colors duration-300">
                Continue
              </StyledButton>
            </StyledForm></>
      )}

      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert
        onClose={handleSuccessSnackbarClose}
        severity="success"
        variant="filled"
        sx={{ width: '100%' }}
      >
        Sign up successful
      </Alert>
      </Snackbar>
      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert
        onClose={handleErrorSnackbarClose}
        severity="error"
        variant="filled"
        sx={{ width: '100%' }}
      >
        {errorMessage}
      </Alert>
        </Snackbar>
    </Container>
  );
};

export default SignupPage;
