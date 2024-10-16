import React, { useState, useEffect } from 'react';

let user_id;

export default function Form({advertisement_id}) {
    const urlApplyCreate = `${process.env.REACT_APP_API_APPLY_CREATE}`;
    const urlProfileCandidate = `${process.env.REACT_APP_API_ACCOUNT_CANDIDATE}`;

    const authToken = localStorage.getItem('token');


    const [authenticated, setAuthenticated] = useState(false);
    const [candidate, setCandidate] = useState({});
    const [people_id, SetPeopleId] = useState("");
    // const [advertisement_id, setAdvertisementId] = useState("");

    const [last_name, setLastName] = useState("");
    const [first_name, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    let apply = {last_name, first_name, email, phone, people_id, advertisement_id};

    console.log(`Apply Create | apply: `, apply);
    

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

  // =================================================================================================
  // ----------- Function : candidate | GET ---------------

  useEffect(()=>{



    const getCandidateProfile = async () => {
      try {

        const authToken = localStorage.getItem('token');
        const candidateId = localStorage.getItem('id');
        console.log(authToken);

        let options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          }
        };
  
        console.log(`Get Candidate Profil | Options :`, options);
        console.log(`Get Candidate Profil | Candidate Id APRES Fetch :`, candidateId);
  
        const response = await fetch(`${urlProfileCandidate}/${candidateId}`, options)
        const data = await response.json()
  
        console.log(`Get Candidate Profil | Response :`, response);

  
  
        if (response.ok) {
          setCandidate(data.data);
          console.log(`Candidate Profile data : `, data.data);

        } else {
          console.error(`Echec du fetch de la data du Candidate Profile`);
        }
  
      } catch (error) {
        console.error(`Fetch error back-end Candidate Profile: `, error);
      }
    }
    
    if (authToken) {
        const candidateId = localStorage.getItem('id');
          setAuthenticated(true);

            getCandidateProfile();
      }

  }, []);


    return (
        <>

            <section className="pt-2  bg-slate-100 px-2">
                <h2 className="text-2xl font-bold text-center uppercase tracking-wider text-black mb-2 pt-2">
                    Candidature
                </h2>                

                <div>
                    <p className="text-1xl  text-center italic text-black mb-4"><span className="font-bold border-b">Information</span> : Les éléments munient d'un * doivent être remplis obligatoirement pour valider votre demande</p>
                </div>
                {authenticated ? (
                    <>
                        <form >
                            <div className="grid gap-6 mb-6 md:grid-cols-2 items-between pt-2">
                                <div>
                                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Nom*</label>
                                    <input type="text" id="first_name" value={candidate.last_name || ''} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nom" required />
                                </div>
                                <div>
                                    <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Prénom*</label>
                                    <input type="text" id="last_name" value={candidate.first_name || ''} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Prenom" required />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Téléphone*</label>
                                    <input type="tel" id="phone" value={candidate.phone || ''}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Téléphone" 
                                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Email*</label>
                                    <input type="email" id="email" value={candidate.email || ''} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email" required />
                                </div> 
                                <button type="submit"
                                onClick={createApply}
                                className="bg-slate-300 mb-3 col-span-full transition-colors delay-50 duration-300 
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
                                    Soumettre
                                </button>
                            </div>
                        </form>
                    </>
                ):(
                    <>
                        <form method="post" action="">
                            <div className="grid gap-6 mb-6 md:grid-cols-2 items-between pt-2">
                                <div>
                                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Nom*</label>
                                    <input type="text" id="first_name" 
                                    value={first_name}
                                    onChange={e => setFirstName(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                                </div>
                                <div>
                                    <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Prénom*</label>
                                    <input type="text" id="last_name" 
                                    value={last_name}
                                    onChange={e => setLastName(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Téléphone*</label>
                                    <input type="tel" id="phone" 
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Email*</label>
                                    <input type="email" id="email" 
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
                                </div> 
                                <button type="submit"
                                onClick={createApply}
                                className="bg-slate-300 mb-3 col-span-full transition-colors delay-50 duration-300 
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
                                    Soumettre
                                </button>
                            </div>
                        </form>
                    </>
                )}
                        

    
            </section>
        </>
    )
}