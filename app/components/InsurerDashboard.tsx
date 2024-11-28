import { useState } from "react";

type Policy = {
  id: number;
  userUid: string;
  policyHolderName: string;
  policyHolderCnpj: string;
  rejectedReason: string | null;
  createdAt: string;
  updatedAt: string;
  User: {
    name: string;
    email: string;
  };
};

type InsurerDashboardProps = {
  data: {
    totalCount: number;
    policies: Policy[];
    totalPages: number;
    currentPage: number;
  };
};

export default function InsurerDashboard({ data }: InsurerDashboardProps) {
  const [rejectedReason, setRejectedReason] = useState<string | null>(null);
  const [isRejecting, setIsRejecting] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleApprove = async (policyId: number) => {
    try {
      const token = localStorage.getItem("jwt");

      setLoading(true);
      const response = await fetch(`${apiUrl}/policy/status/${policyId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "approved" }),
      });

      if (!response.ok) {
        throw new Error("Erro ao aprovar a política.");
      }

      alert("Política aprovada com sucesso!");
      setLoading(false);
    } catch (error) {
      console.error("Erro ao aprovar política:", error);
      setLoading(false);
      alert("Erro ao aprovar a política.");
    }
  };

  const handleReject = async (policyId: number) => {
    const token = localStorage.getItem("jwt");

    if (!rejectedReason) {
      alert("Por favor, forneça um motivo para a rejeição.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/policy/status/${policyId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "rejected", rejectedReason }),
      });

      if (!response.ok) {
        throw new Error("Erro ao rejeitar a política.");
      }

      alert("Política rejeitada com sucesso!");
      setLoading(false);
    } catch (error) {
      console.error("Erro ao rejeitar política:", error);
      setLoading(false);
      alert("Erro ao rejeitar a política.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Seguros Pendente</h2>

      {data.policies.length === 0 ? (
        <p style={styles.noPoliciesText}>Nenhuma política pendente.</p>
      ) : (
        data.policies.map((policy) => (
          <div key={policy.id} style={styles.card}>
            <h3 style={styles.cardTitle}>{policy.policyHolderName}</h3>
            <p style={styles.cardText}>CNPJ: {policy.policyHolderCnpj}</p>
            <p style={styles.cardText}>
              Solicitante: {policy.User.name} ({policy.User.email})
            </p>
            <p style={styles.cardText}>Status: Pendente</p>
            <p style={styles.cardText}>
              Criada em: {new Date(policy.createdAt).toLocaleDateString()}
            </p>

            <div style={styles.buttonsContainer}>
              <button
                onClick={() => handleApprove(policy.id)}
                disabled={loading}
                style={styles.approveButton}
              >
                <span style={styles.icon}>✅</span> Aprovar
              </button>
              <button
                onClick={() => setIsRejecting(!isRejecting)}
                disabled={loading}
                style={styles.rejectButton}
              >
                <span style={styles.icon}>❌</span> Rejeitar
              </button>
            </div>

            {isRejecting && (
              <div style={styles.rejectSection}>
                <textarea
                  placeholder="Digite o motivo da rejeição"
                  value={rejectedReason || ""}
                  onChange={(e) => setRejectedReason(e.target.value)}
                  rows={3}
                  style={styles.textarea}
                />
                <button
                  onClick={() => handleReject(policy.id)}
                  disabled={loading || !rejectedReason}
                  style={styles.confirmRejectButton}
                >
                  Confirmar Rejeição
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    marginLeft: "35px",
    backgroundColor: "#f5f5f5",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "1.8rem",
    color: "#2c3e50",
    marginBottom: "30px",
    textAlign: "center",
  },
  noPoliciesText: {
    color: "#95a5a6",
    fontSize: "1.2rem",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    marginBottom: "20px",
    borderLeft: "5px solid #3498db",
    transition: "transform 0.3s, box-shadow 0.3s",
  },
  cardTitle: {
    fontSize: "1.4rem",
    color: "#34495e",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  cardText: {
    color: "#7f8c8d",
    fontSize: "1rem",
    margin: "5px 0",
  },
  buttonsContainer: {
    marginTop: "15px",
    display: "flex",
    justifyContent: "space-between",
  },
  approveButton: {
    padding: "12px 25px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s",
    display: "flex",
    alignItems: "center",
  },
  rejectButton: {
    padding: "12px 25px",
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginRight: "8px",
    fontSize: "1.2rem",
  },
  rejectButtonHover: {
    backgroundColor: "#c0392b",
  },
  approveButtonHover: {
    backgroundColor: "#218838",
  },
  rejectSection: {
    marginTop: "15px",
    backgroundColor: "#f2f2f2",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  },
  textarea: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "15px",
    resize: "none",
    fontSize: "1rem",
    transition: "border-color 0.2s",
  },
  confirmRejectButton: {
    padding: "12px 25px",
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

