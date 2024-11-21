import React, { useState, useEffect } from 'react';
import './TarefaHistorico.css'; // Importando o arquivo CSS

const TarefaHistorico = ({ tarefaId }) => {
  const [historicos, setHistoricos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistorico = async () => {
      try {
        // Ajusta o endpoint para o correto
        const response = await fetch(`/tarefas/${tarefaId}/historico`);
        const data = await response.json();
        setHistoricos(data);
      } catch (error) {
        console.error('Erro ao carregar histórico:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistorico();
  }, [tarefaId]);

  if (loading) {
    return <p>Carregando histórico...</p>;
  }

  return (
    <div className="historico-container">
      <h3>Histórico de Modificações</h3>
      <div className="historico-grid">
        <div className="historico-header">Campo Alterado</div>
        <div className="historico-header">Valor Antigo</div>
        <div className="historico-header">Valor Novo</div>
        <div className="historico-header">Data da Alteração</div>

        {historicos.length === 0 ? (
          <div className="historico-no-records">Nenhuma modificação registrada</div>
        ) : (
          historicos.map((historico) => (
            <React.Fragment key={historico.id}>
              <div className="historico-item">{historico.campo_alterado}</div>
              <div className="historico-item">
                {historico.valor_antigo || 'Não disponível'}
              </div>
              <div className="historico-item">{historico.valor_novo}</div>
              <div className="historico-item">
                {new Date(historico.data_alteracao).toLocaleString()}
              </div>
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
};

export default TarefaHistorico;
