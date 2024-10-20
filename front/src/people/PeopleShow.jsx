import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function PeopleShow() {
    // const { id } = useParams();
    const value = useLocation().state;

    // const urlPeopleUpdate = `${process.env.REACT_APP_API_PEOPLE_UPDATE}`;
    const urlPeopleShow = `${process.env.REACT_APP_API_PEOPLE_SHOW}`;

    const [people, setPeople] = useState({});
    const [editing, setEditing] = useState(false);




    // =================================================================================================
    // ----------- Function : People | GET ---------------   
    useEffect(() => {
    const getPeopeShow = async () => {
        try {
        const authToken = localStorage.getItem('token');

        let options = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
            },
        };
        console.log(`Get People Show | Options :`, options);

        console.log(`URL utilisée: ${urlPeopleShow}/${value}`);

        const response = await fetch(`${urlPeopleShow}/${value}`, options);
        const data = await response.json();

        console.log('Get People Show | Response: ', response);

        if (response.ok) {
            console.log(data);
            setPeople(data.data);

        } else {
            throw new Error('Erreur de fetch ');
        }

        } catch (error) {
        console.error('Erreur de fetch People show:', error);

        }
    };
    console.log(`Miaou`);
    getPeopeShow();
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
        body: JSON.stringify(people),
        };

        try {
        const response = await fetch(`${urlPeopleShow}/${value})`, options);

        console.log(`People Update | Options:`, options);
        

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
                        Modification du profil de l'utilisateur
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
                                        htmlFor="last_name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                    >
                                        Nom*
                                    </label>
                                    <input
                                        type="text"
                                        id="last_name"
                                        name="last_name"
                                        value={people.last_name || ''}
                                        onChange={e => setPeople({ ...people, last_name: e.target.value })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="first_name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                    >
                                        Prénom*
                                    </label>
                                    <input
                                        type="text"
                                        id="first_name"
                                        name="first_name"
                                        value={people.first_name || ''}
                                        onChange={e => setPeople({ ...people, first_name: e.target.value })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                    >
                                        Email*
                                    </label>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        value={people.email || ''}
                                        onChange={e => setPeople({ ...people, email: e.target.value })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                    >
                                        Téléphone*
                                    </label>
                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        value={people.phone || ''}
                                        onChange={e => setPeople({ ...people, phone: e.target.value })}
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
                                        value={people.city || ''}
                                        onChange={e => setPeople({ ...people, city: e.target.value })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        required
                                    />
                                </div>

                            </div>
                            <div>
                                    <label
                                        htmlFor="role"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                    >
                                        Statut
                                    </label>
                                    <input
                                        type="text"
                                        id="role"
                                        value={people.role_id || ''}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        disabled
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
                        Fiche de l'utilisateur
                        </h2>
                        <div className="p-2">
                            <div className="grid gap-6 mb-6 md:grid-cols-2 items-between pt-2">
                                <div>
                                    <label
                                        htmlFor="last_name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                    >
                                        Nom
                                    </label>
                                    <input
                                        type="text"
                                        id="last_name"
                                        value={people.last_name || ''}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        disabled
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="first_name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                    >
                                        Prénom
                                    </label>
                                    <input
                                        type="text"
                                        id="first_name"
                                        value={people.first_name || ''}
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
                                        value={people.email || ''}
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
                                        value={people.phone || ''}
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
                                        value={people.city || ''}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        disabled
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="role"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                    >
                                        Statut
                                    </label>
                                    <input
                                        type="text"
                                        id="role"
                                        value={people.role_id || ''}
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
