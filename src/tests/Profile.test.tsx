import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProfilePage from '../components/ProfilePage';

jest.mock('axios', () => ({
  post: jest.fn(),
}));

test('renders Profile Page without crashing', () => {
  render(
    <Router>
      <ProfilePage />
    </Router>
  );
});

