import React, { useState, useEffect } from 'react';
import './Advertisement.css'

export default function Advertisement() {

  const urlAdvertisementIndex = `${process.env.REACT_APP_API_ADVERTISEMENT_INDEX}`;

  const [advertisement, setAdvertsement] = useState([]);
  
  const [showMore, setShowMore] = useState(false);

  // Fonction pour gérer le clic sur le bouton
  const handleLearnMore = () => {
    setShowMore(!showMore); // Bascule entre afficher et masquer
  };
  console.log((`advertisement`, advertisement));


  // =================================================================================================
  // ----------- Function : Advertisement List | GET ---------------
  const getAdvertisementIndex = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${authToken}`,
        }
      };

      console.log(`Advertisement List | Options :`, options);

      const response = await fetch(urlAdvertisementIndex, options)
      const data = await response.json()

      if (Array.isArray(data)) {
        setAdvertsement(data)
      } else {
        // console.error(`Advertisement Index | data : `, data);
      }

    } catch (error) {
      console.error(`Fetch error back-end advertisement Index: `, error);
    }
  }

  // =================================================================================================
  // ----------- Function : Advertisement List | DELETE ---------------
  const deleteAdvertisement = async (id) => {
    console.log(`Advertisement Delete (id) : `, id);
    let options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${authToken}`,
      },
      // body: JSON.stringify({
      //   id: id,
      // })
    };

    try {
      const response = await fetch(`${urlAdvertisementIndex}/${id}`, options);

        console.log(`AdvertisementDelete (options) : `, options);

      if (!response.ok) {
          // throw new Error(`HTTP error! Status: ${response.status}`);
          alert(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      //console.log(`Advertisement Delete (data) : `, data);

      if (data) {
          //alert(data.message);
          window.location.href = `/`;
      }
    } catch (error) {
        console.error("Erreur lors de la récupération de l\'annonce : ", error);
    }
  }



  // =================================================================================================
  // ----------- Function : Advertisement Render ---------------
  const renderAdvertisements = () => {
        
    return advertisement?.map((element, index) => {
        return (
            <div className="bg-white p-6 rounded-lg shadow-lg text-center" key={element.id}>
              
              {/* -- Element -- */}
                <h1 className="text-5x1 font-bold mb-2">{element.title}</h1>
                <p>{element.city}</p>
                {/* <p>{element.salary}</p> */}
                <p>{element.content}</p>
                
              {/* -- Button -- */}
              <div className="flex justify-between gap-6 mt-4 md:flex-row flex-col">
                
                {/* --> Learn More */}
                <button className="bg-white transition-colors delay-50 duration-300 
                hover:bg-teal-700
                text-teal-500
                hover:text-white
                font-bold
                text-center
                rounded text-2x1
                px-4 py-2
                hover:animate-none"
                onClick={handleLearnMore}>
                 {showMore ? 'Show Less' : 'Learn More'}
                </button>
                {/* Si showMore est vrai, on affiche les informations supplémentaires */}
              {showMore && (
                <div className="extra-info">
                  <p>Additional Information</p>
                </div>
              )}
                  
                  {/* --> Delete */}
                  <button type="submit" className="bg-grey transition-colors delay-50 duration-300 
                hover:text-white
                font-bold
                text-center
                rounded text-2x1
                px-4 py-2
                bg-grey-700
                border
                border-grey
                text-gray-800
                hover:bg-red-600
                hover:border-red-600" onClick={() => deleteAdvertisement(element.id)}>Delete</button>
              </div>
            </div>
        )})
  }

  useEffect(() => {
    getAdvertisementIndex();
  }, [])


  return(
    <section className="pt-0 py-28 bg-gray-100">
      <div className="container mx-auto px-6" >
        <h4 className="text-2xl font-bold text-center text-black mb-12 pt-2">
          Les annonces
        </h4>    
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {renderAdvertisements()}
        </div>
      </div>
    </section>
  )
}
