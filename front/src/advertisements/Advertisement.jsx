import React, { useState, useEffect } from 'react';
import './Advertisement.css'

export default function Advertisement() {

  // const [advertisement, setAdvertsement] = useState("");

  // const getAdvertisementIndex = async () => {
  //   try {
  //     const options = {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         // Authorization: `Bearer ${authToken}`,
  //       }
  //     };

  //     const response = await fetch(,options)
  //     const data = await response.json()

  //     if (response.ok) {

  //     } else {
  //       console.error(`Advertisement Index | data : `, data);
  //     }

  // } catch (error) {
  //   console.error(`Fetch error back-end advertisement Index: `, error);
  // }

  return(

    <section>
      <div className="containerAdvertisement">
        <h4 className='advertisementTitle'>Title</h4>
        <p className="advertisementDescription">Short description</p>
        <button className="learMore">Lear more</button>
      </div>

    </section>
    )
  };