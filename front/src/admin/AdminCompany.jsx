import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ButtonAdd from '../components/buttons/ButtonAdd';

export default function AdminCompany() {
  // const { id } = useParams();

  const urlCompany = `${process.env.REACT_APP_API_COMPANY}`;
  const urlCompanyList = `${process.env.REACT_APP_API_COMPANY_LIST}`;
  const [company, setCompany] = useState([]);



  // =================================================================================================
  // ----------- Function : Apply all | GET ---------------
  const getCompaniesList = async () => {
    try {
      const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      console.log(`Application List | Options: `, options);

      const response = await fetch(urlCompanyList, options);
      const data = await response.json();

      if (Array.isArray(data)) {
        setCompany(data);
      } else {
        // console.error(`Application Index | data : `, data);
      }
    } catch (error) {
      console.error(`Fetch error back-end application List: `, error);
    }
  };


  // =================================================================================================
  // ----- retrouver un advertisement par l'id ------
  // const getApplicationById = async (id) => {
  //   if (!id) {
  //     console.error('No advertisement ID');
  //     return;
  //   }

  //   try {
  //     const authToken = localStorage.getItem('token');

  //     let options = {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${authToken}`,
  //       },
  //     };
  //     console.log(`Get Application Show | Options :`, options);

  //     const response = await fetch(`${urlApply}${id}`);

  //     if (!response.ok) {
  //       throw new Error('Erreur de fetch ');
  //     }

  //     const data = await response.json();
  //     setCompany([data]);
  //     console.log('Get Application Show data: ', data);
  //   } catch (error) {
  //     console.error('Erreur de fetch application:', error);
  //   }
  // };





  // =================================================================================================
  // ----------- Function : Apply  | DELETE ---------------
  const deleteApplication = async (id) => {
    const authToken = localStorage.getItem('token');
    console.log(`Application Delete (id) : `, id);
    let options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    };

    try {
      const response = await fetch(`${urlCompany}/${id}`, options);
      console.log(`Application Delete (options) : `, options);

      if (!response.ok) {
        alert(`HTTP error! Status: ${response.status}`);
        return;
      }

      const data = await response.json();
      console.log(`Application Delete (data) : `, data);

      setCompany(prevCompany => prevCompany.filter(ad => ad.id !== id));

      alert('La candidature a été supprimé');
    } catch (error) {
      console.error("Erreur lors de la récupération de la candidature : ", error);
    }
  };


  // =================================================================================================
  // ----------- Function : Apply  | RENDER ---------------
  const renderAdvertisements = () => {
    return company.map(element => {
      return (
        <tr key={element.id}>
          <td className="border px-4 py-2 text-center">{element.id}</td>
          <td className="border px-4 py-2 ">{element.name}</td>
          <td className="border px-4 py-2 text-center">{element.address}</td>
          <td className="border px-4 py-2 text-center">{element.city}</td>
          <td className="border px-4 py-2 text-center">
            {/* Supprimer */}
            <button
              className="bg-red-600 text-white px-4 py-2 mx-2 rounded shadow hover:bg-red-700"
              onClick={() => deleteApplication(element.id)}
            >
              <i className="fa-solid fa-xmark"></i>

            </button>

            {/* Voir */}
              <Link
                to={`/company/${element.id}`}
                state={element.id}
              >
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 shadow"
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </Link>
          </td>
        </tr>
      );
    });
  };

  // useEffect(() => {
  //   if (id) {
  //     getAdvertisementById();
  //   } else {
  //     getApplicationList();
  //   }
  // }, [id]);

  useEffect(() =>{
    getCompaniesList();
  },[])

  return (
    <section className="pt-20  bg-slate-100 min-h-screen">
      <div className="container mx-auto px-6 overflow-x-auto">
        <h4 className="text-2xl font-bold text-center text-black mb-12 pt-2">Les entreprises</h4>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200">Id</th>
              <th className="py-2 px-4 bg-gray-200">Nom de la société</th>
              <th className="py-2 px-4 bg-gray-200">Adresse</th>
              <th className="py-2 px-4 bg-gray-200">Localisation</th>
              <th className="py-2 px-4 bg-gray-200">Modification</th>
            </tr>
          </thead>
          <tbody>{renderAdvertisements()}</tbody>
        </table>
        <div>
        <Link to={`/companyCreate`}>
          <ButtonAdd />
        </Link>
      </div>
      </div>
    </section>
  );
}
