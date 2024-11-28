import { useEffect, useState } from "react";
import { useNavigate } from "@remix-run/react";

import UserDashboard from "~/components/UserDashboard";
import InsurerDashboard from "~/components/InsurerDashboard";

import InfoSidebar from "~/components/InfoSidebar";
import DashboardNavbar from "~/components/Navbar/DashboardNavbar";

import { DashboardData, UserData } from "~/interfaces/DashboardAttributes";

export default function Dashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isInsurer, setIsInsurer] = useState<boolean | null>(null);

  const getUserTypeFromToken = (token: string): boolean => {
    try {
      const decoded = atob(token.split(".")[1]);
      const payload = JSON.parse(decoded);
      console.log("Token decodificado:", payload);
      return payload.isInsurer;
    } catch (err) {
      console.error("Erro ao decodificar o token:", err);
      return false;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      console.warn("Nenhum token encontrado. Redirecionando para /login.");
      navigate("/login");
      return;
    }

    const userType = getUserTypeFromToken(token);
    console.log("Tipo de usuário identificado (isInsurer):", userType);
    setIsInsurer(userType);
    fetchDashboardData(userType, token);
  }, [navigate]);

  const fetchDashboardData = async (isInsurer: boolean, token: string) => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      const dashboardInfoResponse = await fetch(`${apiUrl}/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!dashboardInfoResponse.ok) {
        throw new Error("Falha ao carregar dados do dashboard");
      }

      const dashboardInfo = await dashboardInfoResponse.json();
      console.log("Dados do dashboard recebidos:", dashboardInfo);

      setDashboardData({ availableInsurers: dashboardInfo.availableInsurers });
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar os dados do dashboard:", error);
      setError("Erro ao carregar os dados do dashboard. Tente novamente.");
      setLoading(false);
    }
  };

  const handleUpdate = (updatedUserData: UserData) => {
    setUserData(updatedUserData);
  };

  return (
    <div>
      <DashboardNavbar isInsurer={isInsurer}/>

      <div style={{ display: "flex" }}>
        <InfoSidebar loading={loading} error={error} onUpdate={handleUpdate} />

        <main style={{ marginLeft: "260px", padding: "20px" }}>
          {loading && <p>Carregando dados do dashboard...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {dashboardData && isInsurer !== null && !loading ? (
            isInsurer ? (
              <InsurerDashboard data={dashboardData} />
            ) : (
              <UserDashboard data={dashboardData} />
            )
          ) : (
            <p>Carregando...</p>
          )}
        </main>
      </div>
    </div>
  );
}
