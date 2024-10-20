import React, { useState, useEffect } from 'react';


export default function CompanyCreate() {
  const urlCompanyCreate = `${process.env.REACT_APP_API_COMPANY_CREATE}`;

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [content, setContent] = useState('');
  const [picture, setPicture] = useState(null);

  let company = { name, address, content, city };

  const createCompany = async e => {
    e.preventDefault();

    // const formData = new FormData();
    // formData.append("name", name);
    // formData.append("content", content);
    // formData.append("city", city);
    // formData.append("address", address);
    // formData.append("picture", picture);

    const authToken = localStorage.getItem('token');

    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(company),
      // body: formData,
    };

    console.log(`Advertisement Create | options :`, options);

    try {
      const response = await fetch(urlCompanyCreate, options);

      console.log(`Advertisement Create | response :`, response);

      if (!response.ok) {
        throw new Error(`HTTP error ! Status: ${response.status}`);
      }

      const data = await response.json();

      console.log(`Advertisement Create | data :`, data);

      if (data) {
        // navigate("/");
        window.location.href = `/dashboard`;
      }
    } catch (error) {
      console.error('Fetch error back-end advertisement Create: ', error);
    }
  };

  // useEffect(() => {
  //     createAdvertisement();
  // })

  return (
    <>
      <section className="pt-20  bg-slate-100 min-h-screen">
        <h2 className="text-5xl font-bold text-center text-black mb-12 pt-2">Création d'une entreprise</h2>

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
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Nom de la société* :
              </label>
              <input
                required
                type="text"
                name="nameCompany"
                id="nameCompany"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Titre de l'annonce"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="containerForm mt-4">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Adresse* :
              </label>
              <input
                required
                type="text"
                name="addressCompany"
                id="addressCompany"
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="Adresse de la société"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="containerForm mt-4">
              <label
                htmlFor="content"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Description* :
              </label>
              <textarea
                rows={10}
                required
                type="text"
                name="contentCompany"
                id="contentCompany"
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Description de la société"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="containerForm mt-4">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Localisation* :
              </label>
              <input
                required
                type="text"
                name="cityCompany"
                id="cityCompany"
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="Ville"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            {/* <div className="containerForm mt-4">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Logo de la société* :
              </label>
              <input
                required
                accept=".jpg, .jpeg, .png"
                component="label"
                name="picture"
                size="large"
                type="file"
                id="pictureCompany"
                value={picture}
                onChange={e => setPicture(e.target.value)}
                placeholder="Salaire"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div> */}
            <button
              type="submit"
              onClick={createCompany}
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
              Créer une nouvelle société
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
