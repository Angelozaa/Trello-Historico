import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistoricoAlteracao, Tarefa } from './tarefa.entity';
import { CriarTarefaDto } from './DTO/criar-tarefa.dto';
import { AtualizarTarefaDto } from './DTO/atualizar-tarefa.dto';

@Injectable()
export class TarefaService {
  constructor(
    @InjectRepository(Tarefa)
    private tarefaRepository: Repository<Tarefa>,
    @InjectRepository(HistoricoAlteracao) // Repositório para a tabela de histórico
    private historicoRepository: Repository<HistoricoAlteracao>,
  ) {}

  async create(criarTarefaDto: CriarTarefaDto): Promise<Tarefa> {
    const tarefa = this.tarefaRepository.create({
      ...criarTarefaDto,
      dataCriacao: new Date(), // Gera a data de criação automaticamente
    });
    return this.tarefaRepository.save(tarefa);
  }

  findAll(): Promise<Tarefa[]> {
    return this.tarefaRepository.find({ relations: ['cartoes'] });
  }

  findOne(id: number): Promise<Tarefa> {
    return this.tarefaRepository.findOne({
      where: { id },
      relations: ['cartoes'],
    });
  }

  async update(id: number, atualizarTarefaDto: AtualizarTarefaDto): Promise<Tarefa> {
    //Busca a tarefa original
    const tarefaAtual = await this.findOne(id);
    if (!tarefaAtual) {
      throw new Error(`Tarefa com ID ${id} não encontrada`);
    }

    //Identifica alterações
    const camposAlterados = [];
    for (const [campo, valorNovo] of Object.entries(atualizarTarefaDto)) {
      const valorAntigo = tarefaAtual[campo];
      if (valorNovo !== undefined && valorNovo !== valorAntigo) {
        camposAlterados.push({
          tarefaId: id,
          campoAlterado: campo,
          valorAntigo: valorAntigo ? valorAntigo.toString() : null,
          valorNovo: valorNovo.toString(),
          dataAlteracao: new Date(),
        });
      }
    }

    //Registra no histórico
    if (camposAlterados.length > 0) {
      await this.historicoRepository.save(camposAlterados);
    }

    //Atualiza a tarefa
    await this.tarefaRepository.update(id, atualizarTarefaDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.tarefaRepository.delete(id);
  }
}
