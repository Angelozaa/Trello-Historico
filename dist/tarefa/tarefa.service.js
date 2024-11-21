"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TarefaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tarefa_entity_1 = require("./tarefa.entity");
let TarefaService = class TarefaService {
    constructor(tarefaRepository, historicoRepository) {
        this.tarefaRepository = tarefaRepository;
        this.historicoRepository = historicoRepository;
    }
    async create(criarTarefaDto) {
        const tarefa = this.tarefaRepository.create({
            ...criarTarefaDto,
            dataCriacao: new Date(),
        });
        return this.tarefaRepository.save(tarefa);
    }
    findAll() {
        return this.tarefaRepository.find({ relations: ['cartoes'] });
    }
    findOne(id) {
        return this.tarefaRepository.findOne({
            where: { id },
            relations: ['cartoes'],
        });
    }
    async update(id, atualizarTarefaDto) {
        const tarefaAtual = await this.findOne(id);
        if (!tarefaAtual) {
            throw new Error(`Tarefa com ID ${id} não encontrada`);
        }
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
        if (camposAlterados.length > 0) {
            await this.historicoRepository.save(camposAlterados);
        }
        await this.tarefaRepository.update(id, atualizarTarefaDto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.tarefaRepository.delete(id);
    }
};
exports.TarefaService = TarefaService;
exports.TarefaService = TarefaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tarefa_entity_1.Tarefa)),
    __param(1, (0, typeorm_1.InjectRepository)(tarefa_entity_1.HistoricoAlteracao)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TarefaService);
//# sourceMappingURL=tarefa.service.js.map