// import React from 'react';
// import { render, fireEvent, waitFor } from '@testing-library/react';
// import LoginPage from './LoginPage';

// describe('LoginPage', () => {
//     it('should render the login form', () => {
//     const { getByPlaceholderText, getByText } = render(<LoginPage />);
    
//     // Check if the required elements are rendered
//     expect(getByPlaceholderText('Phone number, username, or email')).toBeInTheDocument();
//     expect(getByPlaceholderText('Password')).toBeInTheDocument();
//     expect(getByText('Log in')).toBeInTheDocument();
// });
// it('should update email and password state when input values change', () => {
//     const { getByPlaceholderText } = render(<LoginPage />);
//     const emailInput = getByPlaceholderText('Phone number, username, or email');
//     const passwordInput = getByPlaceholderText('Password');

//     // Simulate typing in the input fields
//     fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
//     fireEvent.change(passwordInput, { target: { value: 'password123' } });

//     // Check if the state values are updated correctly
//     expect(emailInput.value).toBe('test@example.com');
//     expect(passwordInput.value).toBe('password123');
// });
// it('should submit the form with the correct email and password', async () => {
//     const { getByPlaceholderText, getByText } = render(<LoginPage />);
//     const emailInput = getByPlaceholderText('Phone number, username, or email');
//     const passwordInput = getByPlaceholderText('Password');
//     const loginButton = getByText('Log in');

//     // Simulate typing in the input fields
//     fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
//     fireEvent.change(passwordInput, { target: { value: 'password123' } });

//     // Submit the form
//     fireEvent.click(loginButton);

//     // Wait for the asynchronous loginHandler to complete
//     await waitFor(() => {});

//     // Add your assertions for the expected behavior after form submission
//     // For example, you can check if the loginError state is empty and if the page is redirected to '/newfeeds'
// });
// });


import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './LoginPage';

it('should render the login page correctly', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LoginPage />, div);

  expect(div.textContent).toContain('Login');
  expect(div.textContent).toContain('Email');
  expect(div.textContent).toContain('Password');
  expect(div.textContent).toContain('Login');
});