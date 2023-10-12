import "@testing-library/jest-dom";
import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfilePage from '../pages/profile';

describe('ProfilePage Component', () => {
  // Set the token in localStorage before each test
  beforeEach(() => {
    localStorage.setItem('token', '123');
  });

  // Clear localStorage after each test
  afterEach(() => {
    localStorage.clear();
  });

  describe("Error fetching profile data", () => {
    it('renders error message when there is an error fetching profile data', async () => {
      global.fetch = jest.fn().mockRejectedValueOnce(new Error('Error fetching profile data'));

      render(<ProfilePage />);
      expect(await screen.findByText('Error fetching profile data')).toBeInTheDocument();
    });
  });

  describe("Successful profile data fetch", () => {
    it('renders profile information when profile is available', async () => {
      const mockProfileData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
      };

      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => mockProfileData,
      });

      render(<ProfilePage />);
      expect(await screen.findByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    });
  });
});
