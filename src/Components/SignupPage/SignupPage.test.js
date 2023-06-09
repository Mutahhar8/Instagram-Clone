import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignupPage from './SignupPage';

describe('SignupPage', () => {
it('renders the signup page', () => {
    render(
    <MemoryRouter>
        <SignupPage />
    </MemoryRouter>
    );

    // Ensure the necessary elements are rendered
    expect(screen.getByText('Sign up to see photos and videos from your friends.')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Mobile Number or Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign up' })).toBeInTheDocument();
    expect(screen.getByText('Have an account?')).toBeInTheDocument();
    expect(screen.getByText('Get the app.')).toBeInTheDocument();
});

it('validates the form fields and displays error messages', async () => {
    render(
    <MemoryRouter>
        <SignupPage />
    </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText('Mobile Number or Email');
    const usernameInput = screen.getByPlaceholderText('Username');
    const fullNameInput = screen.getByPlaceholderText('Full Name');
    const passwordInput = screen.getByPlaceholderText('Password');
    const signupButton = screen.getByRole('button', { name: 'Sign up' });

    // Submit the form without filling any fields
    fireEvent.click(signupButton);

    await waitFor(() => {
      // Ensure error messages are displayed for all fields
    expect(screen.getByText('This field is required.')).toBeInTheDocument();
    });

    // Fill in invalid values for email and username
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    fireEvent.change(usernameInput, { target: { value: 'u' } });

    // Submit the form
    fireEvent.click(signupButton);

    await waitFor(() => {
      // Ensure corresponding error messages are displayed
    expect(screen.getByText('Enter a valid email address.')).toBeInTheDocument();
    expect(screen.getByText('Username must be at least 2 characters long.')).toBeInTheDocument();
    });
});

it('submits the form successfully', async () => {
    render(
    <MemoryRouter>
        <SignupPage />
    </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText('Mobile Number or Email');
    const usernameInput = screen.getByPlaceholderText('Username');
    const fullNameInput = screen.getByPlaceholderText('Full Name');
    const passwordInput = screen.getByPlaceholderText('Password');
    const signupButton = screen.getByRole('button', { name: 'Sign up' });

    // Fill in valid values for all fields
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(fullNameInput, { target: { value: 'Test User' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Mock the fetch request and response
    global.fetch = jest.fn().mockResolvedValue({
    status: 201,
    json: jest.fn().mockResolvedValue({}),
    });

    // Submit the form
    fireEvent.click(signupButton);

    await waitFor(() => {
      // Ensure the user is redirected after successful signup
    expect(screen.queryByText('Sign up to see photos and videos from your friends.')).toBeNull();
    expect(screen.queryByPlaceholderText('Mobile Number or Email')).toBeNull();
    expect(screen.queryByPlaceholderText('Username')).toBeNull();
    expect(screen.queryByPlaceholderText('Full Name')).toBeNull();
    expect(screen.queryByPlaceholderText('Password')).toBeNull();
    });
});
});
