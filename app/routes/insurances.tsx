import { useState } from "react";
import DashboardNavbar from "~/components/Navbar/DashboardNavbar";
import styles from "app/css/UserInfoSidebar.module.css";

export default function NewInsurance() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    coverage: "",
    priceRange: "",
    conditions: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    const token = localStorage.getItem("jwt");
    if (!token) {
      setError("Token de autorização não encontrado.");
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      const response = await fetch(`${apiUrl}/insurer/create/insurance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar o seguro. Tente novamente.");
      }

      alert("Seguro cadastrado com sucesso!");
      setFormData({
        name: "",
        description: "",
        type: "",
        coverage: "",
        priceRange: "",
        conditions: "",
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <DashboardNavbar isInsurer={true}/>
      <div className={styles["form-container"]}>
        <form className={styles["form"]} onSubmit={handleSubmit}>
          <h2 className={styles["form-title"]}>Cadastrar Novo Seguro</h2>

          <div className={styles["form-group"]}>
            <label htmlFor="name" className={styles["form-label"]}>
              Nome
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className={styles["form-input"]}
              required
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="description" className={styles["form-label"]}>
              Descrição
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={styles["form-input"]}
              required
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="type" className={styles["form-label"]}>
              Tipo
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className={styles["form-input"]}
              required
            >
              <option value="">Selecione um tipo</option>
              <option value="homeowners">Homeowners</option>
              <option value="business">Business</option>
              <option value="general">General</option>
              <option value="education">Education</option>
            </select>
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="coverage" className={styles["form-label"]}>
              Cobertura
            </label>
            <textarea
              id="coverage"
              name="coverage"
              value={formData.coverage}
              onChange={handleInputChange}
              className={styles["form-input"]}
              required
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="priceRange" className={styles["form-label"]}>
              Faixa de Preço
            </label>
            <input
              id="priceRange"
              name="priceRange"
              type="number"
              value={formData.priceRange}
              onChange={handleInputChange}
              className={styles["form-input"]}
              required
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="conditions" className={styles["form-label"]}>
              Condições
            </label>
            <textarea
              id="conditions"
              name="conditions"
              value={formData.conditions}
              onChange={handleInputChange}
              className={styles["form-input"]}
              required
            />
          </div>

          {error && <p className={styles["error"]}>{error}</p>}

          <button type="submit" className={styles["form-button"]}>
            Cadastrar Seguro
          </button>
        </form>
      </div>
    </div>
  );
}
