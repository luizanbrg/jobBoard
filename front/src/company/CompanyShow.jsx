import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function CompanyShow() {
    // const { id } = useParams();
    const value = useLocation().state;

    const urlApply= `${process.env.REACT_APP_API_APPLY}`;
    const urlApplyShow = `${process.env.REACT_APP_API_APPLY_SHOW}`;

    const [application, setApplication] = useState({});
    const [editing, setEditing] = useState(false);




    // =================================================================================================
    // ----------- Function : Application | GET ---------------   
    useEffect(() => {
    const getApplicationShow = async () => {
        try {
        const authToken = localStorage.getItem('token');

        let options = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
            },
        };
        console.log(`Get Application Show | Options :`, options);

        console.log(`URL utilisée: ${urlApplyShow}/${value}`);

        const response = await fetch(`${urlApplyShow}/${value}`, options);
        const data = await response.json();

        console.log('Get Application Show | Response: ', response);

        if (response.ok) {
            setApplication(data);

        } else {
            throw new Error('Erreur de fetch ');
        }

        } catch (error) {
        console.error('Erreur de fetch application:', error);

        }
    };
    console.log(`Miaou`);
        getApplicationShow();
    }, []);


    // =================================================================================================
    // ----------- Function : Application | Update ---------------
    // const updateAdvertisements = async id => {
    //     const authToken = localStorage.getItem('token');
    //     const options = {
    //     method: 'PUT',
    //     headers: {
    //         'Content-Type:': 'application/json',
    //         Authorization: `Bearer ${authToken}`,
    //     },
    //     };

    //     try {
    //     const response = await fetch(`${urlApply}${id})`, options);

    //     console.log(`Application Update | Options:`, options);

    //     if (!response.ok) {
    //         alert(`HTTP error. Status: ${response.status}`);
    //     }

    //     const data = await response.json();

    //     if (data) {
    //         window.location.href = `/dashboard`;
    //     }
    //     } catch (error) {
    //     console.error("Erreur lors de la modification de la candidature: ", error);
    //     }
    // };

  


    const handleSave = () => {
        // updateAdvertisements();
        setEditing(false);
    };

    return (
        <>
        {/* ------------------- UPDATE | Start --------------------- */}
            <section className="py-28 min-h-screen bg-gray-100 pt-20">
                {editing ? (
                    <>
                        <h2 className="text-1xl font-bold text-center uppercase tracking-wider text-black mb-2 pt-2">
                        Modification de l'annonce
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
                                        htmlFor="title"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                    >
                                        Nom*
                                    </label>
                                    <input
                                        type="text"
                                        id="titre"
                                        value={application.last_name || ''}
                                        onChange={e => setApplication({ ...application, last_name: e.target.value })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="city"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                    >
                                        Prénom*
                                    </label>
                                    <input
                                        type="text"
                                        id="titre"
                                        value={application.first_name || ''}
                                        onChange={e => setApplication({ ...application, first_name: e.target.value })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="wages"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                    >
                                        Email*
                                    </label>
                                    <input
                                        type="text"
                                        id="titre"
                                        value={application.email || ''}
                                        onChange={e => setApplication({ ...application, email: e.target.value })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        required
                                    />
                                </div>
                                <div>
                                <label
                                    htmlFor="working_time"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                >
                                    Téléphone*
                                </label>
                                <input
                                    type="text"
                                    id="working_time"
                                    value={application.phone || ''}
                                    onChange={e =>
                                    setApplication({ ...application, phone: e.target.value })
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    required
                                />
                                </div>
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
                        Annonce
                        </h2>
                        <div className="p-2">
                            <div className="grid gap-6 mb-6 md:grid-cols-2 items-between pt-2">
                                <div>
                                    
                                    <label
                                        htmlFor="last_name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                    >
                                        Titre de l'annonce
                                    </label>
                                    <input
                                        type="text"
                                        id="last_name"
                                        // value={application.advertisement.title || ''}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        disabled
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="last_name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                    >
                                        Nom du candidat
                                    </label>
                                    <input
                                        type="text"
                                        id="last_name"
                                        value={application.last_name || ''}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        disabled
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="first_name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                    >
                                        Prénom du candidat
                                    </label>
                                    <input
                                        type="text"
                                        id="first_name"
                                        value={application.first_name || ''}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        disabled
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        id="email"
                                        value={application.email || ''}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        disabled
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                    >
                                        Téléphone
                                    </label>
                                    <input
                                        type="text"
                                        id="phone"
                                        value={application.phone || ''}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        disabled
                                    />
                                </div>
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
