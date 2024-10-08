import React, { useState, useEffect } from 'react';
import './Advertisement.css'

export default function Advertisement() {

  const urlAdvertisementIndex = `${process.env.REACT_APP_API_ADVERTISEMENT_INDEX}`;

  const [advertisement, setAdvertsement] = useState([]);

console.log(`url :`, urlAdvertisementIndex);

console.log((`advertisement`, advertisement));



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
          <div key={element.id}>
            <h1>{element.title}</h1>
            <p>{element.content}</p>
          </div>
          </>
        )})
  }

  useEffect(() => {
    getAdvertisementIndex();
  }, [])


  return(

    <section>
      <div className="containerAdvertisement">
      {/* <p>{advertisement}</p> */}
        <h4 className='advertisementTitle'>Title</h4>
        <p className="advertisementDescription">Short description</p>

        <div>{renderAdvertisements()}</div>
        <button className="learMore">Lear more</button>
      </div>

    </section>
  )
}
