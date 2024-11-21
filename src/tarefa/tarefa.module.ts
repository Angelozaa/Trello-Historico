import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarefa, HistoricoAlteracao } from './tarefa.entity';
import { TarefaService } from './tarefa.service';
import { TarefaController } from './tarefa.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tarefa, HistoricoAlteracao])],
  controllers: [TarefaController],
  providers: [TarefaService],
})
export class TarefaModule {}
