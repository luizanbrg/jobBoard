import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function CompanyShow() {
    // const { id } = useParams();
    const value = useLocation().state;

    const urlCompanyUpdate = `${process.env.REACT_APP_API_COMPANY_UPDATE}`;
    const urlCompanyShow = `${process.env.REACT_APP_API_COMPANY_SHOW}`;

    const [company, setCompany] = useState({});
    const [editing, setEditing] = useState(false);




    // =================================================================================================
    // ----------- Function : COMPANY | GET ---------------   
    useEffect(() => {
    const getCompanyShow = async () => {
        try {
        const authToken = localStorage.getItem('token');

        let options = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
            },
        };
        console.log(`Get Company Show | Options :`, options);

        console.log(`URL utilisée: ${urlCompanyShow}/${value}`);

        const response = await fetch(`${urlCompanyShow}/${value}`, options);
        const data = await response.json();

        console.log('Get Company Show | Response: ', response);

        if (response.ok) {
            setCompany(data);

        } else {
            throw new Error('Erreur de fetch ');
        }

        } catch (error) {
        console.error('Erreur de fetch Company:', error);

        }
    };
    console.log(`Miaou`);
    getCompanyShow();
    }, []);


    // =================================================================================================
    // ----------- Function : Application | UPDATE ---------------
    const handleUpdateProfile = async () => {
        const authToken = localStorage.getItem('token');
        const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(company),
        };

        try {
        const response = await fetch(`${urlCompanyUpdate}/${value})`, options);

        console.log(`Application Update | Options:`, options);

        if (!response.ok) {
            alert(`HTTP error. Status: ${response.status}`);
        }

        const data = await response.json();

        if (data) {
            window.location.href = `/dashboard`;
        }
        } catch (error) {
        console.error("Erreur lors de la modification de la candidature: ", error);
        }
    };

  


    const handleSave = () => {
        handleUpdateProfile();
        setEditing(false);
    };

    return (
        <>
        {/* ------------------- UPDATE | Start --------------------- */}
            <section className="py-28 min-h-screen bg-gray-100 pt-20">
                {editing ? (
                    <>
                        <h2 className="text-1xl font-bold text-center uppercase tracking-wider text-black mb-2 pt-2">
                        Modification de l'entreprise
                        </h2>
                        <div>
                        <p className="text-1xl text-center italic text-black mb-4">
                            <span className="font-bold border-b">Information</span> : Les éléments munis d'un *
                            doivent être remplis obligatoirement pour valider votre demande
                        </p>
                        </div>
                        <form method="post" action="" className="p-2">
                            <div className="grid gap-6 mb-6 md:grid-cols-2 items-between pt-2">
                            
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                    >
                                        Nom*
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={company.name || ''}
                                        onChange={e => setCompany({ ...company, name: e.target.value })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="address"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                    >
                                        Adresse de la société*
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={company.address || ''}
                                        onChange={e => setCompany({ ...company, address: e.target.value })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="location"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                    >
                                        Ville*
                                    </label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="city"
                                        value={company.city || ''}
                                        onChange={e => setCompany({ ...company, city: e.target.value })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="picture"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                    >
                                        Logo de la société
                                    </label>
                                    <input
                                        type="file"
                                        accept=".jpg, .jpeg, .png"
                                        size="small"
                                        id="picture"
                                        name='picture'
                                        value={company.picture || ''}
                                        onChange={e => setCompany({ ...company, picture: e.target.value })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        disabled
                                        // required
                                    />
                                    {/* <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                                        <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
                                        <span>Download</span>
                                        </button> */}
                                </div>
                            </div>
                            <div>
                                <label
                                htmlFor="content"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                >
                                Description*
                                </label>
                                <textarea
                                type="text"
                                id="content"
                                name='content'
                                rows={10}
                                value={company.content || ''}
                                onChange={e => setCompany({ ...company, content: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                
                                />
                            </div>


                                {/* Buttons */}
                            <div className="grid gap-6 mb-6 md:grid-cols-2 items-between pt-2">  
                                    <button
                                    type="submit"
                                    onClick={handleSave}
                                    className="bg-teal-700 transition-colors delay-50 duration-300 font-bold text-center rounded text-1xl px-4 py-2 mt-4 border text-white hover:bg-teal-400"
                                    >
                                    Sauvegarder
                                    </button>
                                    <button
                                    type="button"
                                    onClick={() => window.location.reload()}
                                    className="bg-grey-700 transition-colors delay-50 duration-300 hover:text-white font-bold text-center rounded text-1xl px-4 py-2 mt-4 border text-gray-800 hover:bg-rose-600"
                                    >
                                    Annuler
                                    </button>
                            </div>
                        </form>
                    </>
                ) : (
                    <>
                        <h2 className="text-1xl font-bold text-center uppercase tracking-wider text-black mb-2 pt-2">
                        Fiche de l'entreprise
                        </h2>
                        <div className="p-2">
                            <div className="grid gap-6 mb-6 md:grid-cols-2 items-between pt-2">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                    >
                                        Nom de la société
                                    </label>
                                    <input
                                        type="text"
                                        id="last_name"
                                        value={company.name || ''}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        disabled
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="address"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                    >
                                        Adresse de la société
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        value={company.address || ''}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        disabled
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="location"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                    >
                                        Ville
                                    </label>
                                    <input
                                        type="text"
                                        id="location"
                                        value={company.city || ''}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        disabled
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="picture"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                    >
                                        Logo de la société
                                    </label>
                                    <input
                                        type="file"
                                        accept=".jpg, .jpeg, .png"
                                        size="small"
                                        id="picture"
                                        value={company.picture || ''}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        disabled
                                    />
                                    {/* <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                                        <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
                                        <span>Download</span>
                                        </button> */}
                                </div>
                            </div>
                            <div>
                                <label
                                htmlFor="content"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                >
                                Description*
                                </label>
                                <textarea
                                type="text"
                                id="content"
                                rows={10}
                                value={company.content || ''}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                disabled
                                />
                            </div>
                        </div>
                            <div className="grid gap-6 mb-6 md:grid-cols-1 items-between pt-2 px-2">
                            <button
                                type="button"
                                onClick={() => setEditing(true)}
                                className="bg-orange-400 transition-colors delay-50 duration-300 font-bold text-center rounded text-1xl px-4 py-2 mt-4 border text-white hover:bg-orange-600
                                hover:border-orange-600"
                            >
                                Modifier
                            </button>
                        </div>
                    </>
                )}
            </section>
        </>
    );
}
