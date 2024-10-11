import React, { useState, useEffect } from 'react';

export default function AdvertisementCreate() {
    const urlAdvertisementCreate = `${process.env.REACT_APP_API_ADVERTISEMENT_CREATE}`;


    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [salary, setSalary] = useState("");
    const [city, setCity] = useState("");

    let offer = {title, content, salary, city};

    const createAdvertisement = async (e) => {
        e.preventDefault();

        // const authToken = secureLocalStorage.getItem("@TokenUser");

        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(offer),
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
            <section className="pt-0 py-28 bg-teal-900">
                <h2 className="text-5xl font-bold text-center text-white mb-12 pt-2">
                    Création d'annonce
                </h2>                

                <div>
                    <p className="text-1xl  text-center italic text-white mb-4"><span className="font-bold border-b">Information</span> : Les éléments munient d'un * doivent être remplis obligatoirement pour valider votre demande</p>
                </div>
                <div className='containerForm'>
                    <form method="post" action="">
                        <div className='containerForm'>
                            <label htmlFor="title" className="text-1xl  text-center text-white mb-2">Titre de l'annonce :</label>
                            <input type="text" name="titleAdvertisement" id="titleAdvertisement" value={title} onChange={(e) =>setTitle(e.target.value)} placeholder="Title" className="border-2 p-2 rounded-sm"/>
                        </div>
                        <div className='containerForm mt-4'>
                            <label htmlFor="content" className="text-1xl  text-center text-white mb-2">Contenu :</label>
                            <input type="text" name="contentAdvertisement" id="contentAdvertisement" value={content} onChange={(e) =>setContent(e.target.value)} placeholder="Content" />
                        </div>
                        <div className='containerForm mt-4'>
                            <label htmlFor="title" className="text-1xl  text-center text-white mb-2">Localisation :</label>
                            <input type="text" name="samaryAdvertisement" id="samaryAdvertisement" value={city} onChange={(e) =>setCity(e.target.value)} placeholder="City"/>
                        </div>
                        <div className='containerForm mt-4'>
                            <label htmlFor="title" className="text-1xl  text-center text-white mb-2">Salaire :</label>
                            <input type="number" name="cityAdvertisement" id="cityAdvertisement" value={salary} onChange={(e) =>setSalary(e.target.value)} placeholder="Salaire" />
                        </div>
                        <button type="submit" onClick={createAdvertisement} 
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
                        hover:bg-emerald-600
                        hover:border-emerald-600">
                            Create
                        </button>
                    </form>
                </div>
                <div></div>
            </section>
        </>
    )
}