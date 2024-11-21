import { Tarefa } from './tarefa.entity';
export declare class TaskUpdate {
    id: number;
    tarefa: Tarefa;
    fieldChanged: string;
    oldValue: string;
    newValue: string;
    timestamp: Date;
}
