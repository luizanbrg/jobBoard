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
      // garde l'id du role
      localStorage.setItem('role_id', responseData.role_id);
      console.log('Role stored:', localStorage.getItem('role_id'));

      const role = localStorage.getItem('role_id');
      if (role == 1) {
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
      <section className="pt-0 py-28 bg-teal-900">
        <h2 className="text-5xl font-bold text-center text-white mb-12 pt-2">Login</h2>

        <div>
          <p className="text-1xl text-center italic text-white mb-4">
            <span className="font-bold border-b">Information</span> : Tous les champs avec * sont
            obligatoires
          </p>
        </div>
        <div className="containerForm">
          <form onSubmit={handleLogin}>
            <div className="containerForm">
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
                required
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
                required
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
              Login
            </button>
            {error && <p>{error}</p>}
          </form>
        </div>
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
