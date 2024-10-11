import React, { useState, useEffect } from 'react';

export default function SignUp() {
  const urlSignUp = `${process.env.REACT_APP_API_SIGNUP}`;

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let people = { first_name, last_name, email, password };

  const createPeople = async e => {
    e.preventDefault();

    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(people),
    };
    console.log(`People Create | options :`, options);

    try {
      const response = await fetch(urlSignUp, options);
      console.log(`People Create | response :`, response);

      if (!response.ok) {
        console.log('deu ruim aqui');
        throw new Error(`HTTP error ! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(`People Create | data :`, data);

      if (data) {
        window.location.href = `/`;
      }
    } catch (error) {
      console.log('nao entrou no try');
      console.error('Fetch error back-end people Create: ', error);
    }
  };

  return (
    <>
      <section className="pt-0 py-28 bg-teal-900">
        <h2 className="text-5xl font-bold text-center text-white mb-12 pt-2">Créer un compte</h2>

        <div>
          <p className="text-1xl text-center italic text-white mb-4">
            <span className="font-bold border-b">Information</span> : Tous les champs avec * sont
            obligatoires
          </p>
        </div>
        <div className="containerForm">
          <form onSubmit={createPeople}>
            <div className="containerForm">
              <label htmlFor="firstName" className="text-1xl text-center text-white mb-2">
                Prénom*:
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={first_name}
                onChange={e => setFirstName(e.target.value)}
                placeholder="Prénom"
                className="border-2 p-2 rounded-sm"
              />
            </div>

            <div className="containerForm mt-4">
              <label htmlFor="lastName" className="text-1xl text-center text-white mb-2">
                Nom de famille*:
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={last_name}
                onChange={e => setLastName(e.target.value)}
                placeholder="Nom de famille"
                className="border-2 p-2 rounded-sm"
              />
            </div>

            <div className="containerForm mt-4">
              <label htmlFor="email" className="text-1xl text-center text-white mb-2">
                Email*:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                className="border-2 p-2 rounded-sm"
              />
            </div>

            <div className="containerForm mt-4">
              <label htmlFor="password" className="text-1xl text-center text-white mb-2">
                Mot de passe*:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Mot de passe"
                className="border-2 p-2 rounded-sm"
              />
            </div>

            <button
              type="submit"
              className="bg-white transition-colors delay-50 duration-300
            hover:text-white
            font-bold
            text-center
            rounded text-2xl
            px-4 py-2
            mt-4
            bg-grey-700
            border
            border-grey
            text-gray-800
            hover:bg-emerald-600
            hover:border-emerald-600"
            >
              Créer compte
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
