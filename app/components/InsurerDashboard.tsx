type InsurerDashboardProps = {
  availableInsurers: any;
};

export default function InsurerDashboard({ data }: InsurerDashboardProps) {
  console.log(data);
  return (
    <div>
      {data?.availableInsurers?.map((insurer: any) => (
        <div key={insurer.uid}>
          <h3>{insurer.company_name}</h3>
          <p><strong>CNPJ:</strong> {insurer.cnpj}</p>
        </div>
      ))}
    </div>
  );
}
