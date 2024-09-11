// src/components/Countries.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // استدعاء API لجلب قائمة الدول
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
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
      <h1>Countries</h1>
      <ul>
        {countries.map(country => (
          <li key={country.cca3}>
            {country.name.common} - {country.region}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Countries;
