import { useEffect, useState } from "react";
import { UserData } from "~/interfaces/DashboardAttributes";
import styles from "../css/UserInfoSidebar.module.css";

type UserInfoSidebarProps = {
  loading: boolean;
  error: string | null;
  onUpdate: (updatedUserData: UserData) => void;
};

export default function InfoSidebar({
  loading,
  error,
  onUpdate
}: UserInfoSidebarProps) {
  const [userInfo, setUserInfo] = useState<UserData | null>(null);
  const [fetchingUserData, setFetchingUserData] = useState<boolean>(true); // Para mostrar loading enquanto busca os dados
  const [fetchError, setFetchError] = useState<string | null>(null); // Para exibir erros ao buscar os dados
  const [isEditing, setIsEditing] = useState<boolean>(false); // Estado para controlar se está no modo de edição
  const [isInsurer, setIsInsurer] = useState<boolean | null>(null); // Estado para armazenar o tipo de usuário

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      setFetchError("Token de autenticação não encontrado.");
      setFetchingUserData(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const decoded = atob(token.split(".")[1]);
        const payload = JSON.parse(decoded);
        setIsInsurer(payload.isInsurer);

        const apiUrl = import.meta.env.VITE_API_URL;

        const aboutUrl = payload.isInsurer
          ? `${apiUrl}/insurer/about`
          : `${apiUrl}/user/me`;

        const response = await fetch(aboutUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Falha ao carregar informações do usuário.");
        }

        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        setFetchError(error instanceof Error ? error.message : "Erro desconhecido.");
      } finally {
        setFetchingUserData(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    if (!userInfo) return;

    const token = localStorage.getItem("jwt");
    if (!token) {
      setFetchError("Token de autenticação não encontrado.");
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      const updateUrl = isInsurer
        ? `${apiUrl}/insurer/about`
        : `${apiUrl}/user/me`;

      const response = await fetch(updateUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userInfo),
      });

      const updatedData = await response.json();

      if (response.ok) {
        onUpdate(updatedData);
        setIsEditing(false); // Após confirmar, desativa o modo de edição
      } else {
        throw new Error(updatedData.message || "Erro ao atualizar usuário");
      }
    } catch (error) {
      console.error("Erro ao atualizar o perfil:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof UserData) => {
    if (userInfo) {
      setUserInfo({
        ...userInfo,
        [field]: e.target.value,
      });
    }
  };

  return (
    <div className={styles.sidebar}>
      {fetchingUserData && <p className={styles.loading}>Carregando informações do usuário...</p>}
      {fetchError && <p className={styles.error}>{fetchError}</p>}
      {userInfo && !fetchingUserData && (
        <div className={styles.card}>
          <h2>{isInsurer ? userInfo.company_name : userInfo.name}</h2>
          <p>
            <strong>Email:</strong>{" "}
            <input
              type="email"
              value={userInfo.email}
              disabled={!isEditing}
              onChange={(e) => handleChange(e, "email")}
            />
          </p>
          <p>
            <strong>Endereço:</strong>{" "}
            <input
              type="text"
              value={userInfo.address}
              disabled={!isEditing}
              onChange={(e) => handleChange(e, "address")}
            />
          </p>
          <p>
            <strong>Telefone:</strong>{" "}
            <input
              type="text"
              value={userInfo.phone}
              disabled={!isEditing}
              onChange={(e) => handleChange(e, "phone")}
            />
          </p>
          <p>
            <strong>Data de Cadastro:</strong>{" "}
            {new Date(userInfo.createdAt).toLocaleDateString()}
          </p>
        </div>
      )}

      <div className={styles.buttons}>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)}>Update Profile</button>
        ) : (
          <>
            <button onClick={handleUpdate}>Confirm</button>
            <button className={styles.cancel_button} onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        )}
      </div>
    </div>
  );
}
