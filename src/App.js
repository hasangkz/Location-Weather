import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [wf, setWf] = useState();

  const key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    (async function getLocation() {
      const success = (position) => {
        console.log(position.coords);
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        getWF(lat, lon);
      };
      const error = () => {
        console.log('Data cannot be accessed!');
      };
      navigator.geolocation.getCurrentPosition(success, error);
    })();

    async function getWF(lat, lon) {
      try {
        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
        );
        setWf(data);
      } catch {
        alert('Please allow location access!');
      }
    }
  }, []);

  return (
    <div className='App'>
      {wf && (
        <div className='wf'>
          <h1>COUNTRY: {JSON.stringify(wf.sys.country)}</h1>
          <br />
          <h1>PROVINCE: {JSON.stringify(wf.name)}</h1>
          <br />
          <h1>EXPLANATION: {JSON.stringify(wf.weather[0].description)}</h1>
          <br />
          {wf.main.temp && (
            <h1>TEMPARATURE: {(wf.main.temp - 273.5).toFixed(1)} C°</h1>
          )}
          <br />
          <h1>WIND SPEED: {JSON.stringify(wf.wind.speed)} m/s</h1>
        </div>
      )}
    </div>
  );
}

export default App;
