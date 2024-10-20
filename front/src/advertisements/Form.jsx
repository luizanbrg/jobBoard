import React, { useState, useEffect } from 'react';

export default function Form({advertisement_id, company_id}) {
    const urlApplyCreate = `${process.env.REACT_APP_API_APPLY_CREATE}`;
    const urlProfileCandidate = `${process.env.REACT_APP_API_ACCOUNT_CANDIDATE}`;

    const authToken = localStorage.getItem('token');
    const people_id = localStorage.getItem('id');


    const [authenticated, setAuthenticated] = useState(false);
    const [candidate, setCandidate] = useState({});

    const [last_name, setLastName] = useState("");
    const [first_name, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [formData, setFormData] = useState({
        last_name: '',
        first_name: '',
        email: '',
        phone: '',
        advertisement_id: '',
        company_id: '',
        people_id: ''
      });

      
    console.log(`FormData ZUT :`,formData);

    

    const createApply = async (e) => {
        e.preventDefault();

        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(formData),
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

    // Mettre à jour les champs lorsqu'ils sont modifiés par l'utilisateur
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };

    useEffect(() => {
        if (candidate) {
        setFormData({
            last_name: candidate.last_name || '',
            first_name: candidate.first_name || '',
            email: candidate.email || '',
            phone: candidate.phone || '',
            people_id: candidate.id || null ,
            advertisement_id: advertisement_id,
            company_id: company_id,
        });
        }
    }, [candidate]);
    
    // Gestion de la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted with data: ', formData);

  };

    return (
        <>

            <section className="pt-2  bg-slate-100 px-2">
                <h2 className="text-2xl font-bold text-center uppercase tracking-wider text-black mb-2 pt-2">
                    Candidature
                </h2>                

                <div>
                    <p className="text-1xl  text-center italic text-black mb-4"><span className="font-bold border-b">Information</span> : Les éléments munient d'un * doivent être remplis obligatoirement pour valider votre demande</p>
                </div>
                <form onSubmit={handleSubmit}>
                            <div className="grid gap-6 mb-6 md:grid-cols-2 items-between pt-2">
                                <div>
                                    <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Nom*</label>
                                    <input type="text" id="last_name"
                                    name="last_name" 
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nom" required />
                                </div>
                                <div>
                                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Prénom*</label>
                                    <input type="text" id="first_name" 
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Prénom" required />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Téléphone*</label>
                                    <input type="tel" id="phone"
                                    name="phone" 
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Téléphone" required />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Email*</label>
                                    <input type="email" id="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required />
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
                {/* {authenticated ? (
                    <>
                        <form >
                            <div className="grid gap-6 mb-6 md:grid-cols-2 items-between pt-2">
                                <div>
                                    <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Nom*</label>
                                    <input type="text" id="last_name" value={candidate.last_name || ''} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nom" disabled required />
                                </div>
                                <div>
                                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Prénom*</label>
                                    <input type="text" id="first_name" value={candidate.first_name || ''} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Prénom" disabled required />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Téléphone*</label>
                                    <input type="tel" id="phone" value={candidate.phone || ''}  
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="Téléphone"
                                    disabled 
                                    required />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Email*</label>
                                    <input type="email" id="email" value={candidate.email || ''} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email" disabled required />
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
                                    <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Nom*</label>
                                    <input type="text" id="last_name" 
                                    value={last_name}
                                    onChange={e => setLastName(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nom" required />
                                </div>
                                <div>
                                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Prénom*</label>
                                    <input type="text" id="first_name" 
                                    value={first_name}
                                    onChange={e => setFirstName(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Prénom" required />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Téléphone*</label>
                                    <input type="tel" id="phone" 
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Téléphone" required />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Email*</label>
                                    <input type="email" id="email" 
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required />
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
                )} */}
                        

    
            </section>
        </>
    )
}