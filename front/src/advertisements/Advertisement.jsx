import React, { useState, useEffect } from 'react';
import './Advertisement.css'

export default function Advertisement() {

  const urlAdvertisementIndex = `${process.env.REACT_APP_API_ADVERTISEMENT_INDEX}`;

  const [advertisement, setAdvertsement] = useState([]);

  console.log((`advertisement`, advertisement));


  // -----------------------------------------------
  //  Advertisement | GET
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

  const renderAdvertisements = () => {
        
    return advertisement?.map((element, index) => {
        return (
          <>
            <div className="containerAdvertisement" key={element.id}>
              <div className='advertisementDescription'>
                <h1>{element.title}</h1>
                <p>{element.content}</p>
              </div>
              <div>
                <button className="learMore">Lear more</button>
              </div>
            </div>
          </>
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
