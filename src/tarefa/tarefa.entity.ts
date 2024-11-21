import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Cartao } from '../cartao/cartao.entity';

export enum StatusTarefa {
  A_FAZER = 'A Fazer',
  EM_PROGESSO = 'Em Progresso',
  CONCLUIDO = 'Concluído',
}

export enum PrioridadeTarefa {
  BAIXA = 'Baixa',
  MEDIA = 'Média',
  ALTA = 'Alta',
}

@Entity()
export class Tarefa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column({ nullable: true })
  descricao: string;

  @CreateDateColumn()
  dataCriacao: Date;

  @Column({
    type: 'enum',
    enum: StatusTarefa,
    default: StatusTarefa.A_FAZER,
  })
  status: StatusTarefa;

  @Column({
    type: 'enum',
    enum: PrioridadeTarefa,
    default: PrioridadeTarefa.MEDIA,
  })
  prioridade: PrioridadeTarefa;

  @Column({ nullable: true })
  dataLimite: Date;

  @OneToMany(() => Cartao, cartao => cartao.tarefa)
  cartoes: Cartao[];
}


@Entity()
export class HistoricoAlteracao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tarefaId: number;

  @Column()
  campoAlterado: string;

  @Column({ nullable: true })
  valorAntigo: string;

  @Column()
  valorNovo: string;

  @CreateDateColumn()
  dataAlteracao: Date;
}