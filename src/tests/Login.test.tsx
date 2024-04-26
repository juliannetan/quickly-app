import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginPage from '../components/LoginPage';

jest.mock('axios', () => ({
  post: jest.fn(),
}));

test('renders LoginPage without crashing', () => {
  render(
    <Router>
      <LoginPage />
    </Router>
  );
});
