import { useState } from "react";

type Insurance = {
  id: number;
  insurerUid: string;
  name: string;
  description: string;
  type: string;
  coverage: string;
  priceRange: number;
  conditions: string;
  createdAt: string;
  updatedAt: string;
};

type UserDashboardProps = {
  data: { insurances: Insurance[] };
};

export default function UserDashboard({ data }: UserDashboardProps) {
  const [applied, setApplied] = useState<number[]>([]);

  const handleApply = async (insurance: Insurance) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("jwt");

      const response = await fetch(`${apiUrl}/policy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(insurance),
      });

      if (!response.ok) {
        throw new Error("Erro ao aplicar para o seguro.");
      }

      setApplied((prev) => [...prev, insurance.id]);
      alert("Aplicação enviada com sucesso!");
    } catch (error) {
      console.error("Erro:", error);
      alert("Ocorreu um erro ao aplicar para o seguro.");
    }
  };

  if (!data || !data.insurances) {
    return <p style={styles.noDataMessage}>Nenhum dado de seguro disponível.</p>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.grid}>
        {data.insurances.map((insurance) => (
          <div key={insurance.id} style={styles.card}>
            <h3 style={styles.title}>{insurance.name}</h3>
            <p style={styles.text}>
              <strong>Descrição:</strong> {insurance.description}
            </p>
            <p style={styles.text}>
              <strong>Tipo:</strong> {insurance.type}
            </p>
            <p style={styles.text}>
              <strong>Cobertura:</strong> {insurance.coverage}
            </p>
            <p style={styles.text}>
              <strong>Preço:</strong> R$ {insurance.priceRange.toLocaleString()}
            </p>
            <p style={styles.text}>
              <strong>Condições:</strong> {insurance.conditions}
            </p>
            <p style={styles.timestamp}>
              <strong>Criado em:</strong>{" "}
              {new Date(insurance.createdAt).toLocaleDateString()} |{" "}
              <strong>Atualizado em:</strong>{" "}
              {new Date(insurance.updatedAt).toLocaleDateString()}
            </p>
            <button
              style={applied.includes(insurance.id) ? styles.buttonDisabled : styles.button}
              onClick={() => handleApply(insurance)}
              disabled={applied.includes(insurance.id)}
            >
              {applied.includes(insurance.id) ? "Aplicado" : "Aplicar"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
const styles = {
  container: {},
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1.5rem",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "1.5rem",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "auto",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)",
    },
  },
  title: {
    fontSize: "1.75rem",
    color: "#2d3748",
    marginBottom: "0.5rem",
    fontWeight: "600",
  },
  text: {
    fontSize: "1rem",
    color: "#4a5568",
    marginBottom: "0.75rem",
  },
  timestamp: {
    fontSize: "0.875rem",
    color: "#718096",
    marginTop: "1rem",
  },
  noDataMessage: {
    textAlign: "center",
    fontSize: "1.25rem",
    color: "#cbd5e0",
  },
  button: {
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    fontSize: "0.875rem",
    backgroundColor: "#0077ff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s",
    "&:hover": {
      backgroundColor: "#2b6cb0",
      transform: "scale(1.05)",
    },
  },
  buttonDisabled: {
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    fontSize: "0.875rem",
    backgroundColor: "#e2e8f0",
    color: "#718096",
    border: "none",
    borderRadius: "8px",
    cursor: "not-allowed",
    transition: "background-color 0.3s, transform 0.2s",
  },
};
