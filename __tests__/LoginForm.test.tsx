import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from 'next/router';
import { login } from '../services/loginService';
import LoginForm from '../src/Components/LoginForm';
import Home from '../pages/index';

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));

jest.mock('../services/loginService', () => ({
  login: jest.fn()
}));

describe("LoginForm Component", () => {
  describe("Rendering", () => {
    it("should render the Home component", () => {
      render(<Home />);

      const usernameInput = screen.getByLabelText(/username/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByText(/login/i);

      expect(usernameInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(loginButton).toBeInTheDocument();
    });
  });

  describe("Unsuccessful Login", () => {
    it("should display error message on unsuccessful login", async () => {
      // Mocking login function to return false (unsuccessful login)
      login.mockResolvedValue(false);

      render(<Home />);

      const usernameInput = screen.getByLabelText(/username/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByText(/login/i);

      // Fill in the form fields
      fireEvent.change(usernameInput, { target: { value: 'admin' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

      // Submit the form
      fireEvent.click(loginButton);

      // Wait for the error message to be displayed
      await screen.findByText('Invalid username or password');

      // Check if the error message is displayed
      const errorMessage = screen.getByText('Invalid username or password');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe("Successful Login", () => {
    it("should redirect to profile on successful login", async () => {
      // Mocking login function to return true (successful login)
      login.mockResolvedValue(true);

      const mockedPush = jest.fn();
      useRouter.mockReturnValue({ push: mockedPush });

      render(<Home />);

      const usernameInput = screen.getByLabelText(/username/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByText(/login/i);

      // Fill in the form fields
      fireEvent.change(usernameInput, { target: { value: 'admin' } });
      fireEvent.change(passwordInput, { target: { value: 'admin' } });

      // Submit the form
      fireEvent.click(loginButton);

      await waitFor(() => expect(mockedPush).toHaveBeenCalledWith('/profile'));
    });
  });
});
