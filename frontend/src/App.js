import React, { useEffect, useState } from 'react';
import api from './services/api'

import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

// Componente: Bloco isolado de html, css, js no qual não intefere no restante da aplicação
// Propriedade: Informações que um componente PAI passa para o componente FILHO
// Informações mantidas pelo componente (Lembrar: imutabilidade)


export default function App() {
  const [ devs, setDevs ] = useState([]);
  const [ name , setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ techs, setTechs ] = useState('');
  const [ address, setAddress ] = useState('');

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/southers');

      setDevs(response.data)
    }
    loadDevs();
  }, []);

  async function handleAddDev(e) {
    e.preventDefault();

    const response = await api.post('/southers', {
      name,
      email,
      techs,
      address
    });

    setName('');
    setTechs('');
    setEmail('');
    setAddress('');

    setDevs([...devs, response.data]);
  };

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar Dev</strong>
        <form onSubmit={handleAddDev}>

          <div className="input-block">
            <label htmlFor="name">Nome completo</label>
            <input 
              type="text" 
              name="name" 
              id="name" 
              required
              value={name}
              onChange={e => setName(e.target.value)}
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

          <div className="input-block">
            <label htmlFor="techs">email</label>
            <input 
              type="text" 
              name="techs" 
              id="techs" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Endereço</label>
            <input 
              type="text" 
              name="techs" 
              id="techs" 
              value={address}
              onChange={e => setAddress(e.target.value)}
              />
          </div>


          <button type="submit">Salvar</button>
        </form>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <li key={dev._id} className="dev-item">
              <header>
                <img src='https://api.adorable.io/avatars/150/abott@adorable.png' alt={dev.name}/>
                <div className="user-info">
                  <strong>{dev.name}</strong>
                  <span>{dev.techs.join(', ')}</span>
                </div>
              </header>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Possimus dolor eveniet nemo quia perferendis sapiente 
                quo ad accusantium aspernatur, cum eaque maiores earum 
                asperiores! At ab quos minus eos molestias?
              </p>
              <a target="blank" href="www.google.com">Perfil do usuário</a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
