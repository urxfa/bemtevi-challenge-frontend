type InsurerProps = {
  insurer: {
    uid: string;
    company_name: string;
    cnpj: string;
    address: string;
    phone: string;
    InsuranceTypes: { type: string; description: string }[];
  };
};

export default function InsurerCard({ insurer }: InsurerProps) {
  return (
    <div style={styles.card}>
      <h3>{insurer.company_name}</h3>
      <p><strong>CNPJ:</strong> {insurer.cnpj}</p>
      <p><strong>Endereço:</strong> {insurer.address}</p>
      <p><strong>Telefone:</strong> {insurer.phone}</p>

      <h4>Tipos de Seguros</h4>
      {insurer.InsuranceTypes.length > 0 ? (
        <ul style={styles.insuranceList}>
          {insurer.InsuranceTypes.map((insurance, index) => (
            <li key={index} style={styles.insuranceItem}>
              <p><strong>Tipo:</strong> {insurance.type}</p>
              <p><strong>Descrição:</strong> {insurance.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum serviço disponível.</p>
      )}
    </div>
  );
}

// Estilo para o componente
const styles = {
  card: {
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  insuranceList: {
    listStyleType: 'none',
    padding: 0,
  },
  insuranceItem: {
    marginBottom: '1rem',
    padding: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '6px',
    backgroundColor: '#f9f9f9',
  },
};
