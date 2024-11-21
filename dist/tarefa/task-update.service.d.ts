import { Repository } from 'typeorm';
import { TaskUpdate } from './task-update.entity';
export declare class TaskUpdateService {
    private taskUpdateRepository;
    constructor(taskUpdateRepository: Repository<TaskUpdate>);
    create(taskUpdateData: Partial<TaskUpdate>): Promise<TaskUpdate>;
}
