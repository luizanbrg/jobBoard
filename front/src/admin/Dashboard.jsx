import React from 'react';

export default function Dashboard() {
  // const urlAdvertisementIndex = `${process.env.REACT_APP_API_ADVERTISEMENT_INDEX}`;

  // const [advertisements, setAdvertisements] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchAdvertisements = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetch(urlAdvertisementIndex);
  //       if (!response.ok) {
  //         throw new Error('Pas possible de trouver');
  //       }
  //       const data = await response.json();
  //       setAdvertisements(data);
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchAdvertisements();
  // }, []);

  return (
    <section className="pt-20 bg-slate-100 min-h-screen">
      <div className="container mx-auto px-6">
        <h4 className="text-2xl font-bold text-center text-black mb-12 pt-2">Dashboard</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-20">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h5 className="text-lg font-semibold mb-4">Annonces</h5>
            <p className="mb-4">Voir les annonces</p>
            <a href="/listAdvertisement" className="text-blue-500 hover:underline">
              Voir annonces
            </a>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h5 className="text-lg font-semibold mb-4">Utilisateurs</h5>
            <p className="mb-4">Voir les utilisateurs.</p>
            <a href="/people" className="text-blue-500 hover:underline">
              Voir utilisateurs
            </a>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h5 className="text-lg font-semibold mb-4">Candidatures</h5>
            {/* <p className="mb-4">Voir les utilisateurs.</p> */}
            <a href="/listApplication" className="text-blue-500 hover:underline">
              Voir les candidatures
            </a>
          </div>
        </div>
        {/* Passa os dados obtidos para o componente de Anúncios */}
        {/* <div className="pt-20">
          <Advertisements data={advertisements} />
        </div> */}
      </div>
    </section>
  );
}
