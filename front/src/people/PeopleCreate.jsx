import React, { useState, useEffect } from 'react';


export default function PeopleCreate() {
  const urlPeopleCreate = `${process.env.REACT_APP_API_PEOPLE_CREATE}`;

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  // const [resume, setResume] = useState('');

  let people = { first_name, last_name, phone, city, email};

  // =================================================================================================
  // ----------- Function : People  | CREATE ---------------
  const createPeople = async e => {
    e.preventDefault();

    const authToken = localStorage.getItem('token');

    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(people),
    };

    console.log(`People Create | options :`, options);

    try {
      const response = await fetch(urlPeopleCreate, options);

      console.log(`People Create | response :`, response);

      if (!response.ok) {
        throw new Error(`HTTP error ! Status: ${response.status}`);
      }

      const data = await response.json();

      console.log(`People Create | data :`, data);

      if (data) {
        // navigate("/");
        window.location.href = `/people`;
      }
    } catch (error) {
      console.error('Fetch error back-end People Create: ', error);
    }
  };

  return (
    <>
      <section className="pt-20  bg-slate-100 min-h-screen">
        <h2 className="text-5xl font-bold text-center text-black mb-12 pt-2">Création d'un candidat</h2>

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
                htmlFor="last_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Nom du candidat* :
              </label>
              <input
                required
                type="text"
                name="last_name"
                id="last_name"
                value={last_name}
                onChange={e => setLastName(e.target.value)}
                placeholder="Nom"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="containerForm mt-4">
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Prénom du candidat* :
              </label>
              <input
                required
                type="text"
                name="first_name"
                id="first_name"
                value={first_name}
                onChange={e => setFirstName(e.target.value)}
                placeholder="Prénom"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="containerForm mt-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Email* :
              </label>
              <input
                required
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="containerForm mt-4">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Téléphone* :
              </label>
              <input
                required
                type="text"
                name="phone"
                id="phone"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Téléphone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="containerForm mt-4">
              <label
                htmlFor="city"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Ville* :
              </label>
              <input
                required
                type="text"
                name="city"
                id="city"
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="Ville"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            {/* <div className="containerForm mt-4">
              <label
                htmlFor="resume"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                CV à importer :
              </label>
              <input
                type="text"
                name="resume"
                id="resume"
                value={resume}
                onChange={e => setResume(e.target.value)}
                placeholder="CV à importer"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div> */}
            <button
              type="submit"
              onClick={createPeople}
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
              hover:bg-teal-800
              hover:border-teal-800"
            >
              Créer une nouvelle annonce
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
