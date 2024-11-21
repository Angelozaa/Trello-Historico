import React, { useState, useEffect } from 'react';

const AtualizarTarefa = ({ tarefaId, onTarefaAtualizada }) => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('A Fazer');
  const [prioridade, setPrioridade] = useState('Média');
  const [dataLimite, setDataLimite] = useState('');

  useEffect(() => {
    const fetchTarefa = async () => {
      try {
        const response = await fetch(`/tarefas/${tarefaId}`);
        const data = await response.json();
        setTitulo(data.titulo);
        setDescricao(data.descricao || '');
        setStatus(data.status);
        setPrioridade(data.prioridade);
        setDataLimite(data.dataLimite ? new Date(data.dataLimite).toISOString().slice(0, 16) : '');
      } catch (error) {
        console.error('Erro ao carregar tarefa:', error);
      }
    };

    fetchTarefa();
  }, [tarefaId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tarefaAtualizada = {
      titulo,
      descricao,
      status,
      prioridade,
      dataLimite: dataLimite ? new Date(dataLimite).toISOString() : null,
    };

    try {
      const response = await fetch(`/tarefas/${tarefaId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tarefaAtualizada),
      });

      if (response.ok) {
        const tarefa = await response.json();
        onTarefaAtualizada(tarefa); // Passa a tarefa atualizada para o componente pai
        alert('Tarefa atualizada com sucesso!');
      } else {
        alert('Erro ao atualizar tarefa');
      }
    } catch (error) {
      alert('Erro de conexão');
      console.error('Erro:', error);
    }
  };

  return (
    <div>
      <h3>Atualizar Tarefa</h3>
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
        <button type="submit">Atualizar</button>
      </form>
    </div>
  );
};

export default AtualizarTarefa;
