import { Repository } from 'typeorm';
import { HistoricoAlteracao, Tarefa } from './tarefa.entity';
import { CriarTarefaDto } from './DTO/criar-tarefa.dto';
import { AtualizarTarefaDto } from './DTO/atualizar-tarefa.dto';
export declare class TarefaService {
    private tarefaRepository;
    private historicoRepository;
    constructor(tarefaRepository: Repository<Tarefa>, historicoRepository: Repository<HistoricoAlteracao>);
    create(criarTarefaDto: CriarTarefaDto): Promise<Tarefa>;
    findAll(): Promise<Tarefa[]>;
    findOne(id: number): Promise<Tarefa>;
    update(id: number, atualizarTarefaDto: AtualizarTarefaDto): Promise<Tarefa>;
    remove(id: number): Promise<void>;
}
