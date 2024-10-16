import React, { useState, useEffect } from 'react';

export default function Login() {
  const urlLogin = `${process.env.REACT_APP_API_LOGIN}`;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async e => {
    e.preventDefault();

    const people = { email, password };
    console.log(urlLogin);

    try {
      const response = await fetch(urlLogin, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(people),
      });

      const responseData = await response.json();
      console.log(responseData);

      if (!response.ok) {
        console.error('Error:', responseData);
        throw new Error('Login failed');
      }
      // garde le token dans le localstorage
      localStorage.setItem('token', responseData.token);
      // injecter l'id dans le localstorage
      localStorage.setItem('id', responseData.id);
      // garde l'id du role
      localStorage.setItem('role_id', responseData.role_id);
      console.log('Role stored:', localStorage.getItem('role_id'));

      const role = Number(localStorage.getItem('role_id'));
      console.log('Role:', role);
      if (role === 1) {
        // redirection à la page souhaitée
        window.location.href = '/';
      } else {
        window.location = '/dashboard';
      }
    } catch (error) {
      setError('Mot de passe et/ou email incorrects');
      console.log('Login error:', error);
    }
  };

  return (
    <>
      <section className="pt-20  bg-teal-700 min-h-screen">
        <h2 className="text-5xl font-bold text-center text-white tracking-wider py-5">Connexion</h2>

        <form onSubmit={handleLogin}>
          <div className="grid gap-6 mb-6 md:grid-cols-1 items-between pt-2 px-3">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
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
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
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
              hover:bg-sky-800
              hover:border-sky-800"
            >
              Se connecter
            </button>
            {error && <p>{error}</p>}
          </div>
        </form>
      </section>
    </>
  );
}

// useEffect(() => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     window.location.href = '/';
//   }
// }, []);
