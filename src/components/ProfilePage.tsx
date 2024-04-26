import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { StyledButton } from './SignupPage';

function stringAvatar(name: any) {
  return {
    children: `${name.split(' ').map((part: any) => part[0]).join('').toUpperCase()}`,
  };
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f3f4f6;
`;

const ProfileContainer = styled.div`
  max-width: 600px;
  padding: 20px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const PersonalInfo = styled.div`
  flex: 1;
  padding-right: 20px;
`;

const AddressInfo = styled.div`
  flex: 1;
`;

const UserDetails = styled.div`
  text-align: left;
  padding-top: 10px;
`;

const UserDataItem = styled.div`
  margin-bottom: 10px;
`;

const UserDataLabel = styled.span`
  font-weight: bold;
`;

const LogoutButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ErrorMessage = styled.h3`
  margin-bottom: 20px;
`;

const ProfilePage = () => {
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://api-dev.quicklyinc.com/auth/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        if ((error as any).response && (error as any).response.status === 401) {
          setError('Unauthorized. Please log in.');
        } else {
          setError('Error fetching user data.');
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <Container>
      {error ? (
        <ErrorContainer>
          <ErrorMessage>{error}</ErrorMessage>
          <StyledButton variant="contained" color="primary" onClick={handleLogout}>
            Go to Login
          </StyledButton>
        </ErrorContainer>
      ) : (
        <ProfileContainer>
          <CardMedia
            sx={{
              height: 140,
              background: 'linear-gradient(to bottom, #F3F4F6 50%, transparent 50%)',
              position: 'relative',
              paddingTop: '40px',
              margin: '-20px',
              borderRadius: '20px',
            }}
          >
            <Avatar
              {...stringAvatar(`${userData?.user.first_name} ${userData?.user.last_name}`)}
              sx={{
                width: 100,
                height: 100,
                background: 'linear-gradient(117deg, #ff6661 -9.63%, #f24165 52.75%, #a80943 126.08%)',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
              }}
            />
          </CardMedia>
          <UserDetails>
            <PersonalInfo>
              <UserDataItem>
                <UserDataLabel>Name:</UserDataLabel> {`${userData?.user.first_name} ${userData?.user.last_name}`}
              </UserDataItem>
              <UserDataItem>
                <UserDataLabel>Email:</UserDataLabel> {userData?.user.email}
              </UserDataItem>
              <UserDataItem>
                <UserDataLabel>Company:</UserDataLabel> {userData?.user.Company.name}
              </UserDataItem>
              <UserDataItem>
                <UserDataLabel>Phone:</UserDataLabel> {userData?.user.Company.phone}
              </UserDataItem>
              <UserDataItem>
                <UserDataLabel>Business Type:</UserDataLabel> {userData?.user.Company.business_type}
              </UserDataItem>
              <UserDataItem>
                <UserDataLabel>Industry:</UserDataLabel> {userData?.user.Company.industry}
              </UserDataItem>
              <UserDataItem>
                <UserDataLabel>Business Registration:</UserDataLabel> {userData?.user.Company.business_registration}
              </UserDataItem>
              <UserDataItem>
                <UserDataLabel>Business Number:</UserDataLabel> {userData?.user.Company.business_number}
              </UserDataItem>
              <UserDataItem>
                <UserDataLabel>Expected Activity:</UserDataLabel> {userData?.user.Company.expected_activity}
              </UserDataItem>
            </PersonalInfo>
            <AddressInfo>
              <UserDataItem>
                <UserDataLabel>Address Line 1:</UserDataLabel> {userData?.user.Company.address_line_1}
              </UserDataItem>
              <UserDataItem>
                <UserDataLabel>Address Line 2:</UserDataLabel> {userData?.user.Company.address_line_2}
              </UserDataItem>
              <UserDataItem>
                <UserDataLabel>City:</UserDataLabel> {userData?.user.Company.address_city}
              </UserDataItem>
              <UserDataItem>
                <UserDataLabel>State:</UserDataLabel> {userData?.user.Company.address_state}
              </UserDataItem>
              <UserDataItem>
                <UserDataLabel>Zip Code:</UserDataLabel> {userData?.user.Company.address_zip}
              </UserDataItem>
              <UserDataItem>
                <UserDataLabel>Country:</UserDataLabel> {userData?.user.Company.address_country}
              </UserDataItem>
            </AddressInfo>
          </UserDetails>
          <Divider />
          <LogoutButtonContainer>
            <StyledButton variant="contained" color="primary" onClick={handleLogout}>
              Logout
            </StyledButton>
          </LogoutButtonContainer>
        </ProfileContainer>
      )}
    </Container>
  );
};

export default ProfilePage;
