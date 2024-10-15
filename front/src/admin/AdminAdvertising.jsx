import React, { useState, useEffect } from 'react';

export default function AdminAdvertising() {
  const urlAdminDashboard = `${process.env.REACT_APP_API_PROTECTED_ROUTE}`;
  const urlAdvertisementIndex = `${process.env.REACT_APP_API_ADVERTISEMENT_INDEX}`;
  const [advertisement, setAdvertisement] = useState([]);

  // ----- retrouver un advertisement par l'id ------
  const getAdvertisementIndex = async () => {
    try {
      const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      console.log(`Advertisement List | Options: `, options);

      const response = await fetch(urlAdvertisementIndex, options);
      const data = await response.json();

      if (Array.isArray(data)) {
        setAdvertisement(data);
      } else {
        // console.error(`Advertisement Index | data : `, data);
      }
    } catch (error) {
      console.error(`Fetch error back-end advertisement Index: `, error);
    }
  };

  const deleteAdvertisement = async id => {
    const authToken = localStorage.getItem('token');
    console.log(`Advertisement Delete (id) : `, id);
    let options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      // body: JSON.stringify({
      //   id: id,
      // })
    };

    try {
      const response = await fetch(`${urlAdvertisementIndex}/${id}`, options);

      console.log(`AdvertisementDelete (options) : `, options);

      if (!response.ok) {
        alert(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      //console.log(`Advertisement Delete (data) : `, data);

      if (data) {
        //alert(data.message);
        window.location.href = `/`;
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'annonce : ", error);
    }
  };

  const renderAdvertisements = () => {
    return advertisement.map(element => {
      return (
        <tr key={element.id}>
          <td className="border px-4 py-2">{element.title}</td>
          <td className="border px-4 py-2">{element.city}</td>
          <td className="border px-4 py-2">{element.wages} €</td>
          <td className="border px-4 py-2">
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={() => deleteAdvertisement(element.id)}
            >
              Supprimer
            </button>

            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={() => (window.location.href = `/advertisement/${element.id}`)}
            >
              Voir
            </button>
          </td>
        </tr>
      );
    });
  };

  useEffect(() => {
    getAdvertisementIndex();
  }, []);

  return (
    <section className="pt-0 py-28 bg-gray-100">
      <div className="container mx-auto px-6">
        <h4 className="text-2xl font-bold text-center text-black mb-12 pt-2">Les annonces</h4>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200">Titre</th>
              <th className="py-2 px-4 bg-gray-200">Ville</th>
              <th className="py-2 px-4 bg-gray-200">Salaire</th>
              <th className="py-2 px-4 bg-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>{renderAdvertisements()}</tbody>
        </table>
      </div>
    </section>
  );
}
