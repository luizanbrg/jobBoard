import React, { useState, useEffect } from 'react';
import Form from '../advertisements/Form';
import './Advertisement.css';

export default function Advertisement() {
  const urlAdvertisementIndex = `${process.env.REACT_APP_API_ADVERTISEMENT_INDEX}`;
  const urlAdvertisementDetail = `${process.env.REACT_APP_API_ADVERTISEMENT_DETAIL}`;

  const authToken = localStorage.getItem('token');
  const typeUser = localStorage.getItem('role_id');

  const [advertisement, setAdvertsement] = useState([]);
  const [showMore, setShowMore] = useState(null);
  const [showApply, setShowApply] = useState(null);
  const [advertisementDetail, setAdvertsementDetail] = useState([]);
  const [admin, setAdmin] = useState(false);

  

  // =================================================================================================
  // ----------- Function : Apply | BUTTON ---------------
  const handleApply = id => {
    setShowApply(showApply === id ? null : id); // Bascule entre afficher et masquer
  };
  console.log((`Button Apply :`, handleApply));

  // =================================================================================================
  // ----------- Function : Learn More | BUTTON ---------------
  const handleLearnMore = id => {
    getAdvertisementDetail(id);

    
    setShowMore(showMore === id ? null : id); // Bascule entre afficher et masquer
  };
  console.log((`advertisement`, advertisement));

  // =================================================================================================
  // ----------- Function : Advertisement List | GET ---------------
  const getAdvertisementIndex = async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${authToken}`,
        },
      };

      console.log(`Advertisement List | Options :`, options);

      const response = await fetch(urlAdvertisementIndex, options);
      const data = await response.json();

      if (Array.isArray(data)) {
        setAdvertsement(data);
      } else {
        // console.error(`Advertisement Index | data : `, data);
      }
    } catch (error) {
      console.error(`Fetch error back-end advertisement Index: `, error);
    }
  };


    // =================================================================================================
  // ----------- Function : Advertisement Détails | GET ---------------
  const getAdvertisementDetail = async (id) => {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${authToken}`,
        },
      };
      console.log(id);
      console.log(`Advertisement Détails | Options :`, options);

      const response = await fetch(`${urlAdvertisementDetail}/${id}`, options);
      const data = await response.json();

      if (data) {
        setAdvertsementDetail(data);

        
        console.log(`Advertisement Détails | Data :`, data);

        
      } else {
        // console.error(`Advertisement details | data : `, data);
      }
    } catch (error) {
      console.error(`Fetch error back-end advertisement details: `, error);
    }
  };
    // =================================================================================================
  // ----------- Function : Advertisement Id | GET ---------------
  // const getAdvertisementId = async () => {
  //   try {
  //     const options = {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         // Authorization: `Bearer ${authToken}`,
  //       },
  //     };

  //     console.log(`Advertisement List | Options :`, options);

  //     const response = await fetch(urlAdvertisementIndex, options);
  //     const data = await response.json();

  //     if (Array.isArray(data)) {
  //       setAdvertsement(data);
  //     } else {
  //       // console.error(`Advertisement Index | data : `, data);
  //     }
  //   } catch (error) {
  //     console.error(`Fetch error back-end advertisement Index: `, error);
  //   }
  // };

  // =================================================================================================
  // ----------- Function : Advertisement | DELETE ---------------
  const deleteAdvertisement = async id => {
    const authToken = localStorage.getItem('token');
    console.log(`Advertisement Delete (id) : `, id);
    let options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
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
        setAdvertsement(prevAdvertisements => prevAdvertisements.filter(ad => ad.id !== id));
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'annonce : ", error);
    }
  };

  // =================================================================================================
  // ----------- Function : Advertisement Render ---------------
  const renderAdvertisements = () => {
    return advertisement?.map((element, index) => {
      return (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center" key={element.id}>
          {/* ---------- Element Base | Start ---------- */}
          <h1 className="text-2xl font-bold mb-2">{element.title}</h1>
          <div className="flex col items-center justify-center">
            <div className="flex items-center justify-center bg-slate-200 rounded-full inline-block px-2 my-2">
              <i className="fa-solid fa-location-dot"></i>
              <p className="pl-2">{element.city}</p>
            </div>
            <div className="flex items-center justify-center bg-slate-200 rounded-full inline-block px-2 mx-4 my-2">
              <i className="fa-regular fa-file-lines"></i>
              {/* <p className="pl-2">{element.contractType.name}</p> */}
            </div>

            <p className="bg-slate-200 rounded-full inline-block px-2 my-2">{element.wages} €</p>
          </div>

          <p>
            {element.content.indexOf('.') !== -1 ? (
              <>{element.content.substring(0, element.content.indexOf('.') + 1)}...</>
            ) : (
              <>
                {element.content.length > 200
                  ? element.content.substr(0, 200) + '...'
                  : element.content}
              </>
            )}
          </p>
          {/* ---------- Button | Start ---------- */}

          <div className="flex flex-col">
            {/* ---------- Button Row ---------- */}
            <div className="flex justify-between gap-6 mt-4 md:flex-row flex-col border-t border-b pt-1 pb-1">
              {/* --> Learn More */}
              <button
                className="bg-teal-500 text-white transition-colors delay-50 duration-300
                    hover:bg-grey-700 hover:text-white font-bold text-center rounded text-1xl px-4 py-2"
                onClick={() => handleLearnMore(element.id)}
              >
                {showMore === element.id ? 'Voir moins' : "Détails de l'offre"}
              </button>

              {/* --> Apply */}
              <button
                // className="bg-grey-700 text-gray-800 transition-colors delay-50 duration-300
                //   hover:bg-teal-600 hover:text-white font-bold text-center rounded text-1xl px-4 py-2"
                className={`transition-colors delay-50 duration-300 font-bold text-center rounded text-1xl px-4 py-2 cursor-pointer ${
                  showApply === element.id
                    ? 'bg-orange-600 text-white' // Couleur de fond et texte pour "Annuler"
                    : "bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" // Couleur de fond et texte pour "Postuler"
                }`}
                onClick={() => handleApply(element.id)}
              >
                {showApply === element.id ? 'Annuler' : 'Postuler'}
              </button>

              {admin ? (
                <>
                  {/* --> Delete */}
                  <button
                    // className="bg-grey-700 text-gray-800 transition-colors delay-50 duration-300
                    //     hover:bg-red-600 hover:text-white font-bold text-center rounded text-1xl px-4 py-2"
                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-3 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-rose-600 dark:font-bold dark:hover:bg-rose-700 dark:focus:ring-blue-800"
                    onClick={() => deleteAdvertisement(element.id)}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </>
              ):(
                <>
                </>
              )} 


            </div>

            {/* ---------- Extra Info ---------- */}
            <div className="mt-4">
              {showMore === element.id && (
                <div className="extra-info">

                  <div className="flex col items-center justify-center">
                    <div className="flex items-center justify-center bg-slate-400 rounded-full inline-block px-6 my-2">
                      <p className='tracking-wider'> Temps de travail : </p>
                      <p className="pl-2">{advertisementDetail.working_time} h</p>
                    </div>
                    <div className="flex items-center justify-center bg-slate-400 rounded-full inline-block px-6 mx-4 my-2">
                      <p className="tracking-wider">Expériences : </p>
                      <p className="pl-2">{advertisementDetail.experiences} ans</p>
                    </div>
                  </div>
                  <p>{advertisementDetail.content}</p>
                </div>
              )}
              {showApply === element.id && (
                <div className="extra-info my-4">
                  <Form advertisement_id={element.id} />
                </div>
              )}
            </div>
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    if (authToken) {
      const candidateId = localStorage.getItem('id');
    }
    if (typeUser === "3"){
        setAdmin(true);
    }
    getAdvertisementIndex();
  }, []);

  return (
    <section className="pt-0 py-28 bg-gray-100">
      <div className="container mx-auto px-6">
        {/* <h4 className="text-2xl font-bold text-center text-black mb-12 pt-2">
          Les annonces
        </h4>     */}
        <div className="grid grid-cols-1 gap-6 pt-20">{renderAdvertisements()}</div>
      </div>
    </section>
  );
}
