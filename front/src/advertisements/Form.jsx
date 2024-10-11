import React, { useState, useEffect } from 'react';

let user_id;

export default function AdvertisementCreate() {
    const urlAdvertisementCreate = `${process.env.REACT_APP_API_ADVERTISEMENT_CREATE}`;


    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    let apply = {lastName, firstName, email, phone};

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

         console.log(`Advertisement Create | options :`, options);

         try {
            const response = await fetch(urlAdvertisementCreate, options);

            console.log(`Advertisement Create | response :`,response);

            if(!response.ok) {
                throw new Error(`HTTP error ! Status: ${response.status}`);
            }

            const data = await response.json();

            console.log(`Advertisement Create | data :`, data);

            if (data) {
                // navigate("/");
                window.location.href = `/`;
            }

         } catch (error) {
            console.error("Fetch error back-end advertisement Create: ", error);
        }
    }

    // useEffect(() => {
    //     createAdvertisement();
    // })


    return (
        <>
            <section className="pt-0  bg-slate-100 rounded">
                <h2 className="text-1xl font-bold text-center uppercase tracking-wider text-black mb-2 pt-2">
                    Candidature
                </h2>                

                <div>
                    <p className="text-1xl  text-center italic text-black mb-4"><span className="font-bold border-b">Information</span> : Les éléments munient d'un * doivent être remplis obligatoirement pour valider votre demande</p>
                </div>
                
                <form method="post" action="">
                    <div class="grid gap-6 mb-6 md:grid-cols-2 items-between pt-2">
                        <div>
                            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Nom*</label>
                            <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                        </div>
                        <div>
                            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Prénom*</label>
                            <input type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
                        </div>
                        <div>
                            <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Téléphone*</label>
                            <input type="tel" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                        </div>
                        <div class="mb-6">
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Email*</label>
                            <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
                        </div> 
                        <button type="submit"
                        className="bg-white transition-colors delay-50 duration-300 
                        hover:text-white
                        font-bold
                        text-center
                        rounded text-2x1
                        px-4 py-2
                        mt-4
                        bg-grey-700
                        border
                        border-grey
                        text-gray-800
                        hover:bg-cyan-600
                        hover:border-cyan-600">
                            Soumettre
                        </button>
                    </div>
                </form>
    
            </section>
        </>
    )
}