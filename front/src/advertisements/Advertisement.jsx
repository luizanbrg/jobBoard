import React, { useState, useEffect } from 'react';
import './Advertisement.css'

export default function Advertisement() {

  const urlAdvertisementIndex = `${process.env.REACT_APP_API_ADVERTISEMENT_INDEX}`;

  const [advertisement, setAdvertsement] = useState([]);

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
      body: JSON.stringify({
        id: id,
      })
    };

    try {
      const response = await fetch(urlAdvertisementIndex, options);

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
            <div className="containerAdvertisement" key={element.id}>
              <div className='advertisementDescription'>
                <h1>{element.title}</h1>
                <p>{element.content}</p>
              </div>
              <div>
                <button className="learMore">Lear more</button>
                <button type="submit" className="btnDelete" onClick={() => deleteAdvertisement(element.id)}>Delete</button>
              </div>
            </div>
        )})
  }

  useEffect(() => {
    getAdvertisementIndex();
  }, [])


  return(
    <section>
        {renderAdvertisements()}
    </section>
  )
}
