import React, { useState, useEffect } from 'react';
export default function ApplicationCreate() {
    const urlApplyCreate = `${process.env.REACT_APP_API_APPLY_CREATE}`;
    const urlCompany = `${process.env.REACT_APP_API_COMPANY_LIST}`;
    // const authToken = localStorage.getItem('token');
    // const people_id = localStorage.getItem('id');


  const [last_name, setLastName] = useState("");
  const [first_name, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companies, setCompanies] = useState([]);
  const [company_id, setCompany] = useState("")

  // let apply = {last_name, first_name, email, phone, people_id, advertisement_id};
  let apply = {last_name, first_name, email, phone, company_id};

  const createApply = async (e) => {
    e.preventDefault();

    // const authToken = secureLocalStorage.getItem("@TokenUser");

    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(apply),
    };

     console.log(`Apply Create | options :`, options);

     try {
        const response = await fetch(urlApplyCreate, options);

        console.log(`Apply Create | response :`,response);

        if(!response.ok) {
            throw new Error(`HTTP error ! Status: ${response.status}`);
        }

        const data = await response.json();

        console.log(`Apply Create | data :`, data);

        if (data) {
            // navigate("/");
            window.location.href = `/`;
        }

     } catch (error) {
        console.error("Fetch error back-end Apply Create: ", error);
    }
}

useEffect(() => {
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
}, []);

  return (
    <>
       <section className="pt-20  bg-slate-100 min-h-screen">
        <h2 className="text-5xl font-bold text-center text-black mb-12 pt-2">Création d'une candidature</h2>

        <div>
          <p className="text-1xl  text-center italic text-black mb-4">
            <span className="font-bold border-b border-black">Information</span> : Les éléments munient d'un *
            doivent être remplis obligatoirement pour valider votre demande
          </p>
        </div>
        
        <form method="post" action="">
          <div className="grid gap-6 mb-6 md:grid-cols-1 items-between pt-2 px-3">
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
            {/* <div >
              <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Titre de l'annonce* :
              </label>
              <input
                // required
                type="text"
                name="titleAdvertisement"
                id="titleAdvertisement"
                value={advertisment}
                onChange={e => setAdvertisement(e.target.value)}
                placeholder="Titre de l'annonce"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              />
            </div> */}
            <div className="containerForm mt-4">
              <label htmlFor="lastNameApply" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Nom du candidat* :
              </label>
              <input
                required
                type="text"
                name="last_name"
                id="lastNameApply"
                value={last_name}
                onChange={e => setLastName(e.target.value)}
                placeholder="Nom du candidat"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 

              />
            </div>
            <div className="containerForm mt-4">
              <label htmlFor="firtNameApply" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Prénom du candidat* :
              </label>
              <input
                required
                type="text"
                name="first_name"
                id="firtNameApply"
                value={first_name}
                onChange={e => setFirstName(e.target.value)}
                placeholder="Prénom du candidat"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              />
            </div>
            <div className="containerForm mt-4">
              <label htmlFor="phoneApply" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Téléphone du candidat* :
              </label>
              <input
                required
                type="text"
                name="phone"
                id="phoneApply"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Téléphone du candidat"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 

              />
            </div>
            <div className="containerForm mt-4">
              <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Email du candidat* :
              </label>
              <input
                required
                type="text"
                name="emailApplication"
                id="emailApplication"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email du candidat"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              />
            </div>

            <button
              type="submit"
              onClick={createApply}
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
              Créer une nouvelle candidature
            </button>
            </div>
          </form>
      </section>
    </>
  );
}
