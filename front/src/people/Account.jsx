import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

export default function Account() {

  // const value = useLocation().state;
  const { value } = useParams(); // Supposons que l'ID du candidat soit passé dans l'URL
  const urlProfileCandidate = `${process.env.REACT_APP_API_ACCOUNT_CANDIDATE}`;
  
  const [candidate, setCandidate] = useState({});
  const [editing, setEditing] = useState(false);



  // =================================================================================================
  // ----------- Function : candidate | GET ---------------

  console.log(`Get Candidate Profil | Value AVANT Fetch :`, value);

  useEffect(()=>{
    const getCandidateProfile = async () => {
      try {

        const authToken = localStorage.getItem('token');
        console.log(authToken);

        let options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          }
        };
  
        console.log(`Get Candidate Profil | Options :`, options);
        console.log(`Get Candidate Profil | Value APRES Fetch :`, value);
  
        const response = await fetch(`${urlProfileCandidate}/${value}`, options)
        const data = await response.json()
  
        console.log(`Get Candidate Profil | Response :`, response);
  
  
        if (response.ok) {
          setCandidate(data)
          console.log(`Candidate Profile data : `, data);
        } else {
          console.error(`Echec du fetch de la data du Candidate Profile`);
        }
  
      } catch (error) {
        console.error(`Fetch error back-end Candidate Profile: `, error);
      }
    }
    
    getCandidateProfile();
  }, []);


  // =================================================================================================
  // ----------- Function : member | UPDATE ---------------b

  return(
    <>
      <section className="pt-0 py-28 bg-gray-100 pt-20">
        {editing ? (
          // ============================| BOX  UPDATE --- Start |========================================= //
          <>
            <h2 className="text-1xl font-bold text-center uppercase tracking-wider text-black mb-2 pt-2">
              Modification du profil
            </h2>                

            <div>
              <p className="text-1xl  text-center italic text-black mb-4"><span className="font-bold border-b">Information</span> : Les éléments munient d'un * doivent être remplis obligatoirement pour valider votre demande</p>
            </div>
            
            <form method="post" action="" className="p-2">
              <div className="grid gap-6 mb-6 md:grid-cols-2 items-between pt-2">
                  <div>
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Nom*</label>
                    <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" lastname={candidate.last_name} required />
                  </div>
                  <div>
                    <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Prénom*</label>
                    <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" firstname={candidate.first_name} required />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Téléphone*</label>
                    <input type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="06-00-00-00-00" pattern="[0-9]{2}-[0-9]{2}-[0-9]{2}" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Email*</label>
                    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
                  </div>
                  <div>
                    <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Localisation*</label>
                    <input type="location" id="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ville" required />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black" htmlFor="file_input">CV à importer</label>
                    <input className="block large p-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
                  </div> 
                  <button type="submit"
                  className="bg-teal-700 transition-colors delay-50 duration-300 
                  font-bold
                  text-center
                  rounded text-2x1
                  px-4 py-2
                  mt-4
                  border
                  border-grey
                  text-white
                  hover:text-white
                  hover:bg-teal-400
                  hover:border-teal-400">
                      Sauvegarder
                  </button>
                  <button type="submit"
                  onClick={() => window.location.reload()}
                  className="bg-red transition-colors delay-50 duration-300 
                  hover:text-white
                  font-bold
                  text-center
                  rounded text-2x1
                  px-4 py-2
                  mt-4
                  bg-grey-700
                  border
                  border-red
                  text-gray-800
                  hover:bg-rose-600
                  hover:border-rose-600">
                      Annuler
                  </button>
              </div>
            </form>
          </>
          // ============================| BOX  UPDATE --- End |========================================= //
        ):(
          // ============================| BOX  SHOW --- Start |========================================= //
          <>
            <h2 className="text-1xl font-bold text-center uppercase tracking-wider text-black mb-2 pt-2">
              Mon profil
            </h2>                
            <div className="p-2">
              <div className="grid gap-6 mb-6 md:grid-cols-2 items-between pt-2">
                <div>
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Nom*</label>
                    <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  placeholder="John" disabled>{candidate.last_name}</input>
                </div>
                <div>
                    <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Prénom*</label>
                    <input type="text" id="last_name" value={candidate.last_name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled />
                </div>
                <div>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Téléphone*</label>
                    <input type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="06-00-00-00-00" pattern="[0-9]{2}-[0-9]{2}-[0-9]{2}" disabled />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Email*</label>
                    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" disabled />
                </div>
                <div>
                    <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Localisation*</label>
                    <input type="location" id="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ville" disabled />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black" htmlFor="file_input">CV à importer</label>
                  <input className="block large p-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" disabled/>
                </div>
                <button
                className="bg-orange-400 transition-colors delay-50 duration-300 
                font-bold
                text-center
                rounded text-2x1
                px-4 py-2
                mt-4
                border
                border-grey
                text-white
                hover:text-white
                hover:bg-orange-600
                hover:border-orange-600"
                  onClick={() => setEditing(true)}
                >
                    Modifier
                </button>
              </div>
            </div>
          </>
          // ============================| BOX  SHOW --- End |========================================= //
        )}
      </section>
    </>
  )
}
