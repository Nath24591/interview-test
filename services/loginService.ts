export interface LoginResponse {
  token: string;
}

export async function login(username: string, password: string): Promise<boolean> {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data: LoginResponse = await response.json();
      localStorage.setItem('token', data.token);
      return true; // Successfully logged in
    } else {
      return false; // Invalid username or password
    }
  } catch (error) {
    throw new Error('An error occurred. Please try again.');
  }
}
