// src/components/Cities.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cities = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // استدعاء API لجلب قائمة المدن
    axios.get('http://api.geonames.org/citiesJSON?formatted=true&lang=eng&username=YOUR_USERNAME&style=full')
      .then(response => {
        setCities(response.data.geonames);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Cities</h1>
      <ul>
        {cities.map(city => (
          <li key={city.geonameId}>
            {city.name} - {city.countryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cities;
