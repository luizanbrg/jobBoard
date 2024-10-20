import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

export default function AdvertisementShow() {
  // const { id } = useParams();
  const value = useLocation().state;

  const urlAdvertisementShow = `${process.env.REACT_APP_API_ADVERTISEMENT_SHOW}`;
  const urlAdvertisementUpdate = `${process.env.REACT_APP_API_ADVERTISEMENT_UPDATE}`;
  const urlContractTypes = `${process.env.REACT_APP_API_CONTRACT}`;
  const urlCompany = `${process.env.REACT_APP_API_COMPANY_LIST}`;

  const [advertisement, setAdvertisement] = useState({});
  const [editing, setEditing] = useState(false);
  const [contractTypeShow, setContractTypeShow] = useState('');
  const [contractTypes, setContractTypes] = useState([]);


  // =================================================================================================
  // ----------- Function : Application | UPDATE ---------------
  const updateAdvertisements = async () => {
    const authToken = localStorage.getItem('token');
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
    },
      body: JSON.stringify(advertisement),
    };

    console.log(`${urlAdvertisementUpdate}/${value})`);
    
    try {
      const response = await fetch(`${urlAdvertisementUpdate}/${value})`, options);

      console.log(`Advertisement Update | Options:`, options);

      if (!response.ok) {
        alert(`HTTP error. Status: ${response.status}`);
      }

      const data = await response.json();

      if (data) {
        window.location.href = `/listAdvertisement`;
      }
    } catch (error) {
      console.error("Erreur lors de la modification de l'annonce: ", error);
    }
  };

  useEffect(() => {
    const getAdvertisementById = async () => {
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

        const response = await fetch(`${urlAdvertisementShow}/${value}`, options);
        const data = await response.json();

        // if (!response.ok) {
        //   throw new Error('Erreur de fetch ');
        // }

        if (response.ok) {
          setAdvertisement(data);
          console.log(`Verif`, data);
          setContractTypeShow(data.contractType.name); 

      } else {
          throw new Error('Erreur de fetch ');
      }

        // setAdvertisement(data);
        // console.log('Get Advertisement Show data: ', data);
      } catch (error) {
        console.error('Erreur de fetch advertisement:', error);
      }
    };

    const fetchContractTypes = async () => {
      try {
        const response = await fetch(urlContractTypes);
        console.log('URL Contract Types:', urlContractTypes);

        if (!response.ok) {
          throw new Error('Error fetching contract types');
        }
        const data = await response.json();

        setContractTypes(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des types de contrat : ', error);
      }
    };

    fetchContractTypes();
    getAdvertisementById();
  }, []);


  const handleSave = () => {
    updateAdvertisements();
    setEditing(false);
  };

  return (
    <>
      <section className="py-28 min-h-screen bg-gray-100 pt-20">
        {editing ? (
          <>
            <h2 className="text-1xl font-bold text-center uppercase tracking-wider text-black mb-2 pt-2">
              Modification de l'annonce
            </h2>
            <div>
              <p className="text-1xl text-center italic text-black mb-4">
                <span className="font-bold border-b">Information</span> : Les éléments munis d'un *
                doivent être remplis obligatoirement pour valider votre demande
              </p>
            </div>
            <form method="post" action="" className="p-2">
              <div className="grid gap-6 mb-6 md:grid-cols-2 items-between pt-2">
                {/* Form Inputs */}
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Titre*
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={advertisement.title || ''}
                    onChange={e => setAdvertisement({ ...advertisement, title: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="city"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Ville*
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={advertisement.city || ''}
                    onChange={e => setAdvertisement({ ...advertisement, city: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="wages"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Salaires*
                  </label>
                  <input
                    type="number"
                    id="wages"
                    value={advertisement.wages || ''}
                    onChange={e => setAdvertisement({ ...advertisement, wages: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="working_time"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Temps de travail*
                  </label>
                  <input
                    type="text"
                    id="working_time"
                    value={advertisement.working_time || ''}
                    onChange={e =>
                      setAdvertisement({ ...advertisement, working_time: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="experiences"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Expériences*
                  </label>
                  <input
                    type="text"
                    id="experiences"
                    value={advertisement.experiences || ''}
                    onChange={e =>
                      setAdvertisement({ ...advertisement, experiences: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="contractType"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Type de contrat* :
                  </label>
                  <select
                    required
                    id="contractType"
                    name="contractType"
                    value={advertisement.contract_type_id || ''}
                    onChange={e => setAdvertisement({ ...advertisement, contract_type_id: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    <option value="">Sélectionner un type de contrat</option>
                    {contractTypes.map(type => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="content"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Description*
                </label>
                <textarea
                  type="text"
                  id="content"
                  rows={10}
                  value={advertisement.content || ''}
                  onChange={e => setAdvertisement({ ...advertisement, content: e.target.value })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>

                {/* Buttons */}
              <div className="grid gap-6 mb-6 md:grid-cols-2 items-between pt-2">  
                <button
                  type="submit"
                  onClick={handleSave}
                  className="bg-teal-700 transition-colors delay-50 duration-300 font-bold text-center rounded text-1xl px-4 py-2 mt-4 border text-white hover:bg-teal-400"
                >
                  Sauvegarder
                </button>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="bg-grey-700 transition-colors delay-50 duration-300 hover:text-white font-bold text-center rounded text-1xl px-4 py-2 mt-4 border text-gray-800 hover:bg-rose-600"
                >
                  Annuler
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-1xl font-bold text-center uppercase tracking-wider text-black mb-2 pt-2">
              Annonce
            </h2>
            <div className="p-2">
              <div className="grid gap-6 mb-6 md:grid-cols-2 items-between pt-2">
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Titre*
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={advertisement.title || ''}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    disabled
                  />
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Ville*
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={advertisement.city || ''}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    disabled
                  />
                </div>
                <div>
                  <label
                    htmlFor="wages"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Salaires*
                  </label>
                  <input
                    type="number"
                    id="wages"
                    value={advertisement.wages || ''}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    disabled
                  />
                </div>
                <div>
                  <label
                    htmlFor="working_time"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Temps de travail*
                  </label>
                  <input
                    type="text"
                    id="working_time"
                    value={advertisement.working_time || ''}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    disabled
                  />
                </div>
                <div>
                  <label
                    htmlFor="experiences"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Expériences*
                  </label>
                  <input
                    type="text"
                    id="experiences"
                    value={advertisement.experiences || ''}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    disabled
                  />
                </div>
                <div>
                  <label
                    htmlFor="contract_type"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Type de contrat*
                  </label>
                  <input
                    type="text"
                    id="contract_type"
                    value={contractTypeShow || ''}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    disabled
                  />
                </div>
                
              </div>
              <div>
                <label
                  htmlFor="content"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Description*
                </label>
                <textarea
                  type="text"
                  id="content"
                  rows={10}
                  value={advertisement.content || ''}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  disabled
                />
              </div>


            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-1 items-between pt-2 px-2">
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="bg-orange-400 transition-colors delay-50 duration-300 font-bold text-center rounded text-1xl px-4 py-2 mt-4 border text-white hover:bg-orange-600
                hover:border-orange-600"
              >
                Modifier
              </button>
              </div>
          </>
        )}
      </section>
    </>
  );
}
