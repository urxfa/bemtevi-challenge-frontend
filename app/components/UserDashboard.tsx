import { UserDashboardData } from "~/interfaces/DashboardAttributes";

type UserDashboardProps = {
  data: UserDashboardData;
};

export default function UserDashboard({ data }: UserDashboardProps) {
  const { availableInsurers } = data;

  return (
    <div>
      <div style={styles.card}>
        {availableInsurers && availableInsurers.length > 0 ? (
          <ul>
            {availableInsurers.map((insurer) => (
              <li key={insurer.uid}>
                <h4>
                  <strong>Seguradora:</strong> {insurer.company_name}
                </h4>
                <p>
                  <strong>CNPJ:</strong> {insurer.cnpj}
                </p>
                <p>
                  <strong>Endereço:</strong> {insurer.address}
                </p>
                <p>
                  <strong>Telefone:</strong> {insurer.phone}
                </p>

                <h5>Tipos de Seguros:</h5>
                {insurer.InsuranceTypes && insurer.InsuranceTypes.length > 0 ? (
                  <ul>
                    {insurer.InsuranceTypes.map((insurance) => (
                      <li key={insurance.id}>
                        <p>
                          <strong>Nome:</strong> {insurance.name}
                        </p>
                        <p>
                          <strong>Descrição:</strong> {insurance.description}
                        </p>
                        <p>
                          <strong>Tipo:</strong> {insurance.type}
                        </p>
                        <p>
                          <strong>Cobertura:</strong> {insurance.coverage}
                        </p>
                        <p>
                          <strong>Preço:</strong> {insurance.priceRange}
                        </p>
                        <p>
                          <strong>Condições:</strong> {insurance.conditions}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Não há tipos de seguros disponíveis.</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>Não há seguradoras disponíveis.</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  card: {
    width: "100%  ",
    padding: "1rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginBottom: "1rem",
    backgroundColor: "#fff",
  },
};
