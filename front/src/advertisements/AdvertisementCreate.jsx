import React, { useState, useEffect } from 'react';

export default function AdvertisementCreate() {
  const urlAdvertisementCreate = `${process.env.REACT_APP_API_ADVERTISEMENT_CREATE}`;
  const urlContractTypes = `${process.env.REACT_APP_API_CONTRACT}`;
  const urlCompany = `${process.env.REACT_APP_API_COMPANY_LIST}`;


  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [wages, setWages] = useState('');
  const [city, setCity] = useState('');
  const [working_time, setWorkingTime] = useState('');
  const [experiences, setExperiences]  = useState('');
  const [contract_type_id, setContractType] = useState('');
  const [contractTypes, setContractTypes] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [company_id, setCompany] = useState("");

  let offer = { title, content, wages, city,working_time, experiences, contract_type_id, company_id };

  const createAdvertisement = async e => {
    e.preventDefault();

    const authToken = localStorage.getItem('token');

    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(offer),
    };

    console.log(`Advertisement Create | options :`, options);

    try {
      const response = await fetch(urlAdvertisementCreate, options);

      console.log(`Advertisement Create | response :`, response);

      if (!response.ok) {
        throw new Error(`HTTP error ! Status: ${response.status}`);
      }

      const data = await response.json();

      console.log(`Advertisement Create | data :`, data);

      if (data) {
        // navigate("/");
        window.location.href = `/`;
      }
    } catch (error) {
      console.error('Fetch error back-end advertisement Create: ', error);
    }
  };

  useEffect(() => {
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
    const fetchCompanies = async () => {
      try {
        const response = await fetch(urlCompany);
        console.log('URL Company:', urlCompany);
  
        if (!response.ok) {
          throw new Error('Error fetching contract types');
        }
        const data = await response.json();
  
        setCompanies(data);
        console.log(`companies:`, data);
        
      } catch (error) {
        console.error('Erreur lors de la récupération de toutes les companies : ', error);
      }
    };
  
    fetchCompanies();
    fetchContractTypes();
  }, []);

  return (
    <>
      <section className="pt-20  bg-slate-100 min-h-screen">
        <h2 className="text-5xl font-bold text-center text-black mb-12 pt-2">Création d'une annonce</h2>

        <div>
          <p className="text-1xl  text-center italic text-black mb-4">
            <span className="font-bold border-b border-black">Information</span> : Les éléments
            munient d'un * doivent être remplis obligatoirement pour valider votre demande
          </p>
        </div>

        <form method="post" action="">
          <div className="grid gap-6 mb-6 md:grid-cols-1 items-between pt-2 px-3">
            <div>
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Titre de l'annonce* :
              </label>
              <input
                required
                type="text"
                name="titleAdvertisement"
                id="titleAdvertisement"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Titre de l'annonce"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="content"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Contenu* :
              </label>
              <textarea
                rows={10}
                required
                type="text"
                name="contentAdvertisement"
                id="contentAdvertisement"
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Description de l'annonce"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>

          {/* ---------> Entreprise | Start */}
          <div className="grid gap-6 mb-6 md:grid-cols-2 items-between pt-4 px-3 dark:bg-gray-400 pb-4">
            <div>
              <label
                htmlFor="contractType"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Société* :
              </label>
              <select
                required
                id="company"
                name="companies"
                value={company_id}
                onChange={e => setCompany(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="">Sélectionner l'entreprise</option>
                {companies.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Localisation* :
              </label>
              <input
                required
                type="text"
                name="cityAdvertisement"
                id="cityAdvertisement"
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="Localisation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-50 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                value={contract_type_id}
                onChange={e => setContractType(e.target.value)}
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
            <div>
              <label
                htmlFor="workingAdvertisement"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Temps de travail* :
              </label>
              <input
                required
                type="text"
                name="working_time"
                id="workingAdvertisement"
                value={working_time}
                onChange={e => setWorkingTime(e.target.value)}
                placeholder="Temps de travail"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-50 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="experiencesAdvertisement"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Expériences* :
              </label>
              <input
                required
                type="text"
                name="experiences"
                id="experiencesAdvertisement"
                value={experiences}
                onChange={e => setExperiences(e.target.value)}
                placeholder="Expériences"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-50 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Salaire* :
              </label>
              <input
                required
                type="number"
                name="wagesAdvertisement"
                id="wagesAdvertisement"
                value={wages}
                onChange={e => setWages(e.target.value)}
                placeholder="Salaire"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-50 dark:placeholder-gray-400 dark:bg-gray-50 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            </div>
            {/* ---------> Entreprise | End */}


            <div className="grid gap-6 mb-6 md:grid-cols-1 items-between pt-2 px-3">
              <button
                type="submit"
                onClick={createAdvertisement}
                className="bg-white transition-colors delay-50 duration-300
                hover:text-white
                font-bold
                text-center
                rounded text-2x1
                px-4 py-2
                mt-4
                bg-grey-700
                border
                border-grey
                text-gray-800
                shadow
                hover:bg-cyan-600
                hover:border-cyan-600"
              >
                Créer une nouvelle annonce
              </button>
            </div>
        </form>
      </section>
    </>
  );
}
