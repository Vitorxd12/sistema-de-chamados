// --- Enums / Union Types (De acordo com seus Models Java) ---
export type Status = 'ABERTO' | 'EM_ANDAMENTO' | 'RESOLVIDO' | 'FECHADO';
export type PerfilUsuario = 'SUPPORT' | 'USER';
export type Prioridade = 'BAIXA' | 'MEDIA' | 'ALTA' | 'URGENTE';
export type Categoria = 'HARDWARE' | 'SOFTWARE' | 'REDE' | 'TELEFONIA' | 'ACESSO' | 'OUTROS';

// --- Chamados ---

export interface ChamadoCreate {
    titulo: string;
    descricao: string;
    prioridade: Prioridade;
    idUsuario: number;
    categoria: Categoria;
}

export interface ChamadoResumo {
    id: number;
    titulo: string;
    status: Status;
    prioridade: Prioridade;
    dataCriacao: string;
    nomeCliente: string;
}

export interface ChamadoDetalhado {
    id: number;
    titulo: string;
    status: Status;
    prioridade: Prioridade;
    dataCriacao: string;
    nomeCliente: string;
    descricao: string;
    nomeTecnico?: string;
    parecerTecnico?: string;
    dataFechamento?: string;
}

// --- Ações de Chamado (Payloads) ---

export interface ConcluirChamado {
    idChamado: number;
    idTecnico: number;
    parecerTecnico: string;
}

export interface AssumirChamado {
    idChamado: number;
    idTecnico: number;
}

// --- Comentários ---

export interface CriarComentario {
    chamadoId: number;
    usuarioId: number;
    texto: string;
}

export interface ComentarioResponse {
    id: number;
    chamadoId: number;
    usuarioId: number;
    nomeUsuario: string;
    texto: string;
    dataEnvio: string;
}

// --- Histórico ---

export interface HistoricoStatusDTO {
    id: number;
    statusAtual: Status;
    statusAnterior: Status;
    dataHora: string;
}

// --- Dashboard ---

export interface DashboardData {
    totalChamados: number;
    chamadosAbertos: number;
    chamadosEmAndamento: number;
    chamadosResolvidos: number;
    chamadosFechados: number;
    tempoMedioResolucao: string;
}

// --- Usuários ---

export interface ChamadoCreate {
    titulo: string;
    descricao: string;
    prioridade: Prioridade;
    idUsuario: number;
    categoria: Categoria;
}

export interface UsuarioResponse {
    id: number;
    nome: string;
    email: string;
    perfil: PerfilUsuario;
    ativo: boolean;
}
export interface UsuarioCreate {
    nome: string;
    email: string;
    senha: string;
    perfil: PerfilUsuario;
}