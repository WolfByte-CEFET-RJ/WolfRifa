export type TipoCampanha = 'crowdfundings' | 'raffles';

export interface Campanha {
    id?: number | undefined;
    public_id?: string | undefined;
    title: string;
    description?: string | null | undefined;
    pix_key: string;
    ispublic?: boolean | undefined;
    status?: string | undefined;
    category: string;
    start_date: string | Date;
    end_date: string | Date;
    type: TipoCampanha;
    organizer_id: number;
    created_at?: string | Date | undefined;
}

export interface CreateCampanhaDTO {
    title: string;
    description?: string | null | undefined;
    pix_key: string;
    category: string;
    start_date?: string | undefined;
    end_date: string;
    ispublic?: boolean | undefined;
    organizer_id: number;
}

export interface SocialNetworkInput {
    platform: 'instagram' | 'facebook' | 'tiktok' | 'youtube' | 'x' | 'other';
    url: string;
}

/**
 * DTO para criação de uma Vaquinha conforme a documentação da API.
 */
export interface CreateVaquinhaDTO {
    name: string;
    description?: string | null | undefined;
    visibility: string;
    pix_key: string;
    start_date: string;
    end_date: string;
    amount_collected: number;
    category: string;
    social_networks?: SocialNetworkInput[] | undefined;
    organizer_id: number;
}

/**
 * Estrutura de resposta retornada conforme o exemplo da documentação (Item 8).
 */
export interface VaquinhaResponse {
    campanha: {
        id: number;
        public_id: string;
        name: string;
        visibility: string;
        pix_key: string;
        status: string;
        vaquinha: {
            amount_collected: number;
        };
    };
}

/**
 * Estrutura de resposta pública de detalhes da vaquinha (GET /campaign/vaquinhas/:public_id).
 * Sem exposição de campos sensíveis internos (id, organizer_id, senhas ou dados privados).
 */
export interface VaquinhaDetalhesResponse {
    public_id: string;
    name: string;
    title: string;
    description: string | null;
    pix_key: string;
    visibility: 'publica' | 'privada';
    status: string;
    category: string;
    start_date: string | Date;
    end_date: string | Date;
    created_at?: string | Date | undefined;
    amount_collected: number;
    vaquinha: {
        amount_collected: number;
    };
    organizer: {
        name: string | null;
    };
    social_networks: SocialNetworkInput[];
}

/**
 * Representa a entidade completa de Vaquinha com dados herdados de Campanha.
 */
export interface Vaquinha extends Campanha {
    type: 'crowdfundings';
    raised_amount?: number | undefined;
}

