import React, { useState } from 'react';

const CriarTarefa = ({ onTarefaCriada }) => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('A Fazer');
  const [prioridade, setPrioridade] = useState('Média');
  const [dataLimite, setDataLimite] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const novaTarefa = {
      titulo,
      descricao,
      status,
      prioridade,
      dataLimite: dataLimite ? new Date(dataLimite).toISOString() : null,
    };

    try {
      const response = await fetch('/tarefas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaTarefa),
      });

      if (response.ok) {
        const tarefaCriada = await response.json();
        onTarefaCriada(tarefaCriada); // Passa a tarefa criada para o componente pai
        alert('Tarefa criada com sucesso!');
      } else {
        alert('Erro ao criar tarefa');
      }
    } catch (error) {
      alert('Erro de conexão');
      console.error('Erro:', error);
    }
  };

  return (
    <div>
      <h3>Criar Tarefa</h3>
      <form onSubmit={handleSubmit}>
        <label>Título:</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <label>Descrição:</label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="A Fazer">A Fazer</option>
          <option value="Em Progresso">Em Progresso</option>
          <option value="Concluído">Concluído</option>
        </select>
        <label>Prioridade:</label>
        <select
          value={prioridade}
          onChange={(e) => setPrioridade(e.target.value)}
        >
          <option value="Baixa">Baixa</option>
          <option value="Média">Média</option>
          <option value="Alta">Alta</option>
        </select>
        <label>Data Limite:</label>
        <input
          type="datetime-local"
          value={dataLimite}
          onChange={(e) => setDataLimite(e.target.value)}
        />
        <button type="submit">Criar</button>
      </form>
    </div>
  );
};

export default CriarTarefa;
