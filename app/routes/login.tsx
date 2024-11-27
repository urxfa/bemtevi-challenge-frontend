import { Form, useActionData, useNavigate } from '@remix-run/react';
import { json } from "@remix-run/node";
import { useEffect } from 'react';

import Navbar from '~/components/Navbar/Navbar';

interface LoginActionData {
  error?: string;
  success?: boolean;
  token?: string;
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const isInsurer = formData.get("isInsurer") === 'on';

  if (!email || !password) {
    return json<LoginActionData>({ error: "Email and password are required" }, { status: 400 });
  }

  const apiLoginType = isInsurer ? "insurer" : "user";

  const apiUrl = import.meta.env.VITE_API_URL;

  const response = await fetch(`${apiUrl}/auth/` + apiLoginType, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    return json<LoginActionData>({ error: "Invalid credentials" }, { status: 401 });
  }

  const { token } = await response.json();
  return json<LoginActionData>({ success: true, token });
}

export default function LoginPage() {
  const actionData = useActionData<LoginActionData>();
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData?.success && actionData?.token) {
      if (typeof window !== 'undefined' && actionData.token) {
        localStorage.setItem('jwt', actionData.token);
        navigate('/dashboard');
      }
    }
  }, [actionData, navigate]);

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.formWrapper}>
        <h1 style={styles.title}>Login</h1>
        <Form method="post" style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="Enter your email"
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              placeholder="Enter your password"
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>
              <input
                type="checkbox"
                name="isInsurer"
                id="isInsurer"
                style={styles.checkbox}
              />
              Are you an Insurer?
            </label>
          </div>
          <button type="submit" style={styles.button}>
            Login
          </button>
          {actionData?.error && <p style={styles.error}>{actionData.error}</p>}
          <div>
            <a href="/register" style={styles.link}>Create an Account</a>
          </div>
        </Form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    padding: '2rem',
    minHeight: '100vh',
  },
  formWrapper: {
    maxWidth: '400px',
    width: '100%',
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '1.5rem',
    color: '#333',
    textAlign: 'center',
    marginBottom: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  checkbox: {
    marginRight: '0.5rem',
  },
  button: {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: '0.75rem',
    borderRadius: '4px',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  error: {
    color: 'red',
    fontSize: '1rem',
    textAlign: 'center',
    marginTop: '1rem',
  },
  link: {
    display: 'block',
    textAlign: 'center',
    marginTop: '1rem',
    color: '#007BFF',
    textDecoration: 'none',
  },
  linkHover: {
    textDecoration: 'underline',
  },
};
