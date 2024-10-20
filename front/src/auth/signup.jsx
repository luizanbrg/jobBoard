import React, { useState } from 'react';

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
      <section className="pt-20  bg-slate-100 min-h-screen">
        <h2 className="text-5xl font-bold text-center text-black tracking-wider py-5">Création d'un compte</h2>

        <div>
          <p className="text-1xl text-center italic text-black mb-4">
            <span className="font-bold border-b">Information</span> : Tous les champs avec * sont
            obligatoires
          </p>
        </div>
      
        <form onSubmit={createPeople}>
          <div className="grid gap-6 mb-6 md:grid-cols-1 items-between pt-2 px-3">
            <div>
              <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Prénom*:
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={first_name}
                onChange={e => setFirstName(e.target.value)}
                placeholder="Prénom"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                required
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Nom de famille*:
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={last_name}
                onChange={e => setLastName(e.target.value)}
                placeholder="Nom de famille"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                required              
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Email*:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Mot de passe*:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Mot de passe"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                required
              />
            </div>

            <button
              type="submit"
              className="bg-slate-300   transition-colors delay-50 duration-300 
              font-bold
              text-center
              rounded text-2x1
              px-4 py-2
              mt-4
              bg-grey-700
              border
              border-grey
              text-gray-800
              hover:text-white
              hover:bg-teal-800
              hover:border-teal-800"
            >
              Créer compte
            </button>
            </div>
          </form> 

      </section>
    </>
  );
}
