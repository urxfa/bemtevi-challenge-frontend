import { useEffect, useState } from "react";
import DashboardNavbar from "~/components/Navbar/DashboardNavbar";

type Policy = {
  id: number;
  policyHolderName: string;
  createdAt: string;
  InsuranceType: {
    name: string;
    description: string;
    priceRange: number;
  };
};

export default function NewInsurance() {
  const [approvedPolicies, setApprovedPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState<boolean>(false);

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = typeof window !== "undefined" ? localStorage.getItem("jwt") : null;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && token) {
      const fetchApprovedPolicies = async () => {
        setLoading(true);
        setError(null);

        try {
          const response = await fetch(`${apiUrl}/policy/approved`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error("Erro ao buscar as políticas aprovadas.");
          }

          const policies: Policy[] = await response.json();
          setApprovedPolicies(policies);
          setLoading(false);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Erro desconhecido");
          setLoading(false);
        }
      };

      fetchApprovedPolicies();
    }
  }, [apiUrl, token, isClient]);

  const containerStyle = {
    padding: "30px",
    fontFamily: "'Roboto', sans-serif",
    backgroundColor: "#f4f7fb",
    minHeight: "100vh",
  };

  const loadingMessageStyle = {
    color: "#6c757d",
    fontSize: "16px",
    textAlign: "center",
  };

  const errorMessageStyle = {
    color: "#dc3545",
    fontSize: "16px",
    textAlign: "center",
  };

  const policyCardStyle = {
    border: "1px solid #e0e0e0",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "20px",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease",
  };

  const policyHeaderStyle = {
    marginBottom: "15px",
  };

  const policyInfoStyle = {
    fontSize: "15px",
    color: "#495057",
    lineHeight: "1.6",
  };

  const policyTitleStyle = {
    fontSize: "18px",
    fontWeight: "600",
    color: "#343a40",
    marginBottom: "10px",
  };

  const policyDescriptionStyle = {
    fontSize: "14px",
    color: "#6c757d",
    fontStyle: "italic",
    marginBottom: "10px",
  };

  const priceRangeStyle = {
    fontSize: "16px",
    fontWeight: "500",
    color: "#007bff",
  };

  return (
    <div style={containerStyle}>
      <DashboardNavbar isInsurer={false} />

      <main>
        {loading && <p style={loadingMessageStyle}>Carregando políticas aprovadas...</p>}
        {error && <p style={errorMessageStyle}>{error}</p>}

        {!loading && !error && approvedPolicies.length === 0 && (
          <p style={loadingMessageStyle}>Nenhuma política aprovada encontrada.</p>
        )}

        <div>
          {approvedPolicies.map((policy) => (
            <div
              key={policy.id}
              style={policyCardStyle}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              <div style={policyHeaderStyle}>
                <h3 style={policyTitleStyle}>{policy.policyHolderName}</h3>
                <p style={{ color: "#adb5bd" }}>
                  Criada em: {new Date(policy.createdAt).toLocaleDateString()}
                </p>
                <p style={{ color: "#007bff", fontWeight: "bold" }}>
                  ID da Política: {policy.id}
                </p>
              </div>

              <div style={policyInfoStyle}>
                <p style={policyDescriptionStyle}>{policy.InsuranceType.description}</p>
                <p style={priceRangeStyle}>
                  Faixa de Preço: R${policy.InsuranceType.priceRange.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
