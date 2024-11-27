import { useState } from 'react';
import { Form, useNavigate } from '@remix-run/react';

import Navbar from '~/components/Navbar/Navbar';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'user' | 'insurer'>('user');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
      phone: formData.get("phone"),
      address: formData.get("address"),

      ...(userType === 'user'
        ? {
          name: formData.get("name"),
          cpf: formData.get("cpf"),
          sex: formData.get("sex"),
          dateOfBirth: formData.get("dateOfBirth"),
        }
        : {
          company_name: formData.get("company_name"),
          cnpj: formData.get("cnpj"),
        }),
    };
    const apiUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${apiUrl}/${userType}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      navigate('/login');
    } else {
      console.error('Erro ao registrar');
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.formWrapper}>
        <h1 style={styles.title}>Cadastro</h1>
        <Form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" required style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password">Senha:</label>
            <input type="password" name="password" id="password" required style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="phone">Telefone:</label>
            <input type="text" name="phone" id="phone" required style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="address">Endereço:</label>
            <input type="text" name="address" id="address" required style={styles.input} />
          </div>

          {userType === 'user' && (
            <>
              <div style={styles.formGroup}>
                <label htmlFor="name">Nome:</label>
                <input type="text" name="name" id="name" required style={styles.input} />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="cpf">CPF:</label>
                <input type="text" name="cpf" id="cpf" required style={styles.input} />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="sex">Sexo:</label>
                <select name="sex" id="sex" required style={styles.select}>
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="dateOfBirth">Data de Nascimento:</label>
                <input type="date" name="dateOfBirth" id="dateOfBirth" required style={styles.input} />
              </div>
            </>
          )}

          {userType === 'insurer' && (
            <>
              <div style={styles.formGroup}>
                <label htmlFor="company_name">Nome da Empresa:</label>
                <input type="text" name="company_name" id="company_name" required style={styles.input} />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="cnpj">CNPJ:</label>
                <input type="text" name="cnpj" id="cnpj" required style={styles.input} />
              </div>
            </>
          )}
          <div style={styles.formGroup}>
            <label>
              <input
                type="radio"
                value="user"
                checked={userType === 'user'}
                onChange={() => setUserType('user')}
              />
              Usuário
            </label>
            <label>
              <input
                type="radio"
                value="insurer"
                checked={userType === 'insurer'}
                onChange={() => setUserType('insurer')}
              />
              Seguradora
            </label>
          </div>

          <button type="submit" style={styles.button}>
            Cadastrar
          </button>
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
    maxWidth: '500px',
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
  select: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
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
};
