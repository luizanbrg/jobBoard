import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function AdminPeople() {
  const { id } = useParams();

  const authToken = localStorage.getItem('token');
  // const urlAdminDashboard = `${process.env.REACT_APP_API_PROTECTED_ROUTE}`;
  const urlPeopleIndex = `${process.env.REACT_APP_API_PEOPLE_INDEX}`;

  const urlOnePeople = `${process.env.REACT_APP_API_ACCOUNT_CANDIDATE}`;

  const [people, setPeople] = useState([]);

  // ----- retrouver un people par l'id ------
  const getPeopleById = async () => {
    if (!id) {
      console.error('No people ID');
      return;
    }

    try {
      let options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      };
      console.log(`Get People Page | Options :`, options);
      // console.log(urlOnePeople);

      const response = await fetch(`${urlOnePeople}/${id}`, options);

      if (!response.ok) {
        throw new Error('Erreur de fetch ');
      }

      const data = await response.json();
      setPeople([data]);
      console.log('Get People Show data: ', data);
    } catch (error) {
      console.error('Erreur de fetch people:', error);
    }
  };

  const getAllPeople = async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        cache: 'no-store',
      };

      const response = await fetch(`${urlPeopleIndex}`, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setPeople(data);
      } else {
        console.error(`People Index | data : `, data);
      }
    } catch (error) {
      console.error('Fetch error back-end people Index: ', error);
    }
  };

  const deletePeople = async id => {
    const authToken = localStorage.getItem('token');
    console.log(`People Delete (id) : `, id);
    let options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    };

    try {
      const response = await fetch(`${urlOnePeople}/${id}`, options);
      console.log(`PeopleDelete (options) : `, options);

      if (!response.ok) {
        alert(`HTTP error! Status: ${response.status}`);
        return;
      }

      const data = await response.json();
      console.log(`People Delete (data) : `, data);

      setPeople(prevPeople => prevPeople.filter(user => user.id !== id));

      alert('People supprimé!');
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur : ", error);
    }
  };

  const renderPeople = () => {
    return people.map(element => {
      return (
        <tr key={element.id}>
          <td className="border px-4 py-2">{element.first_name}</td>
          <td className="border px-4 py-2">{element.last_name}</td>
          <td className="border px-4 py-2">{element.email} </td>
          <td className="border px-4 py-2">{element.city} </td>
          <td className="border px-4 py-2">{element.role_id} </td>
          <td className="border px-4 py-2">
            <button
              className="bg-red-600 text-white px-4 py-2 mx-2 rounded hover:bg-red-700"
              onClick={() => deletePeople(element.id)}
            >
              <i className="fa-solid fa-xmark"></i>
              {/* Supprimer */}
            </button>

            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={() => (window.location.href = `/people/${element.id}`)}
            >
              <i className="fa-solid fa-magnifying-glass"></i>
              {/* Voir */}
            </button>
          </td>
        </tr>
      );
    });
  };

  useEffect(() => {
    if (id) {
      getPeopleById();
    } else {
      getAllPeople();
    }
  }, [id]);

  return (
    <section className="pt-20  bg-slate-100 min-h-screen">
      <div className="container mx-auto px-6">
        <h4 className="text-2xl font-bold text-center text-black mb-12 pt-2">Les utilisateurs</h4>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200">First Name</th>
              <th className="py-2 px-4 bg-gray-200">Last name</th>
              <th className="py-2 px-4 bg-gray-200">Email</th>
              <th className="py-2 px-4 bg-gray-200">City</th>
              <th className="py-2 px-4 bg-gray-200">Role Id</th>
              <th className="py-2 px-4 bg-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>{renderPeople()}</tbody>
        </table>
      </div>
    </section>
  );
}
