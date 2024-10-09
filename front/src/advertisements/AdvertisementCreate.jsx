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
            <section>
                <div>
                    <h1>Création d'une annonce</h1>
                </div>

                <div>
                    <p><span>Information</span> : Les éléments munient d'un * doivent être remplis obligatoirement pour valider votre demande</p>
                </div>
                <div className='containerForm'>
                    <form method="post" action="">
                        <div className='containerForm'>
                            <label htmlFor="title">Titre de l'annonce :</label>
                            <input type="text" name="titleAdvertisement" id="titleAdvertisement" value={title} onChange={(e) =>setTitle(e.target.value)} placeholder="Title" size="30" maxLength="20"/>
                        </div>
                        <div className='containerForm'>
                            <label htmlFor="content">Contenu :</label>
                            <input type="text" name="contentAdvertisement" id="contentAdvertisement" value={content} onChange={(e) =>setContent(e.target.value)} placeholder="Content" size="30" maxLength="20"/>
                        </div>
                        <div className='containerForm'>
                            <label htmlFor="title">Localisation :</label>
                            <input type="text" name="samaryAdvertisement" id="samaryAdvertisement" value={city} onChange={(e) =>setCity(e.target.value)} placeholder="City" size="30" maxLength="20"/>
                        </div>
                        <div className='containerForm'>
                            <label htmlFor="title">Salaire :</label>
                            <input type="number" name="cityAdvertisement" id="cityAdvertisement" value={salary} onChange={(e) =>setSalary(e.target.value)} placeholder="Salaire" size="30" maxLength="20"/>
                        </div>
                        <button type="submit" className="btnCreate" onClick={createAdvertisement}>Create</button>
                        </form>
                </div>
                <div></div>
            </section>
        </>
    )
}