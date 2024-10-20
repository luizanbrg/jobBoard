import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ButtonAdd from '../components/buttons/ButtonAdd';

export default function AdminAdvertising() {
  const { id } = useParams();

  const urlAdvertisementShow = `${process.env.REACT_APP_API_ADVERTISEMENT_INDEX}`;
  const [advertisement, setAdvertisement] = useState([]);

  // ----- retrouver un advertisement par l'id ------
  const getAdvertisementById = async () => {
    if (!id) {
      console.error('No advertisement ID');
      return;
    }

    try {
      const authToken = localStorage.getItem('token');

      let options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      };
      console.log(`Get Advertisement Page | Options :`, options);

      const response = await fetch(`${urlAdvertisementShow}/${id}`);

      if (!response.ok) {
        throw new Error('Erreur de fetch ');
      }

      const data = await response.json();
      setAdvertisement([data]);
      console.log('Get Advertisement Show data: ', data);
    } catch (error) {
      console.error('Erreur de fetch advertisement:', error);
    }
  };

  const getAdvertisementIndex = async () => {
    try {
      const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      console.log(`Advertisement List | Options: `, options);

      const response = await fetch(urlAdvertisementShow, options);
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


  // =================================================================================================
  // ----------- Function : Apply  | DELETE ---------------
  const deleteAdvertisement = async id => {
    const authToken = localStorage.getItem('token');
    console.log(`Advertisement Delete (id) : `, id);
    let options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    };

    try {
      const response = await fetch(`${urlAdvertisementShow}/${id}`, options);
      console.log(`AdvertisementDelete (options) : `, options);

      if (!response.ok) {
        alert(`HTTP error! Status: ${response.status}`);
        return;
      }

      const data = await response.json();
      console.log(`Advertisement Delete (data) : `, data);

      setAdvertisement(prevAdvertisements => prevAdvertisements.filter(ad => ad.id !== id));

      alert('Annonce supprime !!!!!');
    } catch (error) {
      console.error("Erreur lors de la récupération de l'annonce : ", error);
    }
  };

  const renderAdvertisements = () => {
    return advertisement.map(element => {
      return (
        <tr key={element.id}>
          <td className="border px-4 py-2">{element.title}</td>
          <td className="border px-4 py-2 ">{element.company.name}</td>
          <td className="border px-4 py-2">{element.city}</td>
          <td className="border px-4 py-2">{element.wages} €</td>
          <td className="border px-4 py-2">
            <div className="flex space-x-2">
              {/* Supprimer */}
              <button
                className="bg-red-600 text-white px-4 py-2 mx-2 rounded hover:bg-red-700"
                onClick={() => deleteAdvertisement(element.id)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>

              {/* Voir */}
              <Link
                to={`/advertisement/${element.id}`}
                state={element.id}
              >
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 shadow"
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </Link>
            </div>
          </td>
        </tr>
      );
    });
  };

  useEffect(() => {
    if (id) {
      getAdvertisementById();
    } else {
      getAdvertisementIndex();
    }
  }, [id]);

  return (
    <section className="pt-20  bg-slate-100 min-h-screen">
      <div className="container mx-auto px-6">
        <h4 className="text-2xl font-bold text-center text-black mb-12 pt-2">Les annonces</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-200">Titre</th>
                <th className="py-2 px-4 bg-gray-200">Entreprise</th>
                <th className="py-2 px-4 bg-gray-200">Ville</th>
                <th className="py-2 px-4 bg-gray-200">Salaire</th>
                <th className="py-2 px-4 bg-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>{renderAdvertisements()}</tbody>
          </table>
        </div>
        <div>
          <Link to={`/advertisementCreate`}>
            <ButtonAdd />
          </Link>
        </div>
      </div>
    </section>
  );
}
