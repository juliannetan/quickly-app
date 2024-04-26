import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SignupPage from '../components/SignupPage';

jest.mock('axios', () => ({
  post: jest.fn(),
}));

test('renders Signup Page without crashing', () => {
  render(
    <Router>
      <SignupPage />
    </Router>
  );
});
