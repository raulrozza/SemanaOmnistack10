import React, { useState, useEffect } from 'react';

const DevForm = ({ onSubmit }) => {
    const [github_username, setGithubUsername] = useState('');
    const [techs, setTechs] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
  
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
        },
        (error) => {
          console.error(error);
        },{
          timeout: 30000,
        }
      )
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude
        });

        setGithubUsername('');
        setTechs('');
    }

    return (
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input name="github_username" id="github_username" value={github_username} onChange={event => setGithubUsername(event.target.value)} required />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input name="techs" id="techs" value={techs} onChange={event => setTechs(event.target.value)} required/>
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input name="latitude" id="latitude" value={latitude} onChange={event => setLatitude(event.target.value)} required />
            </div>
            
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input name="longitude" id="longitude" value={longitude} onChange={event => setLongitude(event.target.value)} required />
            </div>
          </div>

          <button type="submit">Salvar</button>
        </form>
    )
};

export default DevForm;