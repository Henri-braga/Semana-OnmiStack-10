import React, { useState, useEffect } from 'react';
import api from '../../services/api.js'

import './Sidebar.css'


export default function List({ techs, github_username, latitude, longitude }) {
  const [github_username, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');

  async function handleAddDev(e) {
    e.preventDefault();



    const response = await api.post('/devs', {
      github_username,
      techs,
      latitude,
      longitude
    });

    setGithubUsername('');
    setTechs('');

    setDevs([...devs, response.data]);
  };

  return (
    <aside>
    <strong>Cadastrar</strong>
    <form onSubmit={handleAddDev}>

      <div className="input-block">
        <label htmlFor="github_usename">Usuário do Github</label>
        <input 
          type="text" 
          name="github_usename" 
          id="github_usename" 
          required
          value={github_username}
          onChange={e => setGithubUsername(e.target.value)}
          />
      </div>

      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input 
          type="text" 
          name="techs" 
          id="techs" 
          value={techs}
          onChange={e => setTechs(e.target.value)}
          />
      </div>

      <div className="input-group">
      techs
        <div className="input-block">
          <label htmlFor="latidude">Latitude</label>
          <input 
            type="number" 
            name="latidude" 
            id="latidude" 
            value={latitude} 
            onChange={e => setLatitude(e.target.value)}
          />
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input 
            type="number" 
            name="longitude" 
            id="longitude" 
            value={longitude} 
            onChange={e => setLongitude(e.target.value)}
            />
        </div>

      </div>
      <button type="submit">Salvar</button>
    </form>
  </aside>
  )
}