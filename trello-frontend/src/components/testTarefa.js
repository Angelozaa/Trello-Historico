import React, { useState } from 'react';
import CriarTarefa from './criarTarefa';
import AtualizarTarefa from './atualizarTarefa';
import TarefaHistorico from './TarefaHistorico';

const TarefaPage = () => {
  const [tarefaId, setTarefaId] = useState(null);

  const handleTarefaCriada = (tarefa) => {
    setTarefaId(tarefa.id); // Atualiza o id da tarefa criada
  };

  const handleTarefaAtualizada = (tarefa) => {
    setTarefaId(tarefa.id); // Atualiza o id da tarefa atualizada
  };

  return (
    <div>
      <h1>Gerenciamento de Tarefas</h1>
      <CriarTarefa onTarefaCriada={handleTarefaCriada} />
      {tarefaId && <AtualizarTarefa tarefaId={tarefaId} onTarefaAtualizada={handleTarefaAtualizada} />}
      {tarefaId && <TarefaHistorico tarefaId={tarefaId} />}
    </div>
  );
};

export default TarefaPage;
