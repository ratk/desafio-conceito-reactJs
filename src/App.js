import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState(['Repo 1','Repo 2']);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo Repo ${Date.now()}`,
      url: "http://github.com/desafioNodeJs",
      techs: [
        "Node.js",
        "Advpl"
      ]
    });

    const repo = response.data;

    setRepositories([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {
    console.log(id);

    const response = await api.delete(`repositories/${id}`);

    if(response.status === 204) {
      const repositoriesIndex = repositories.findIndex(repo => repo.id === id);

      if(repositoriesIndex >= 0) {
        repositories.splice(repositoriesIndex, 1);

        setRepositories([...repositories]);
      }
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map((repo, index) => (
            <li key={index}>{repo.title}<button onClick={() => handleRemoveRepository(repo.id)}>Remover</button></li>
          ) )}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
