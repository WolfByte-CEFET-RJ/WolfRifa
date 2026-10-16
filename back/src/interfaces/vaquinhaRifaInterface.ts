export type VaquinhaRifaVisibility = 'publica' | 'privada' | 'pública';

export type SocialNetworkPlatform =
    | 'instagram'
    | 'facebook'
    | 'tiktok'
    | 'youtube'
    | 'x'
    | 'other';

export interface SocialNetworkDTO {
    platform: SocialNetworkPlatform;
    url: string;
}

export interface UpdateVaquinhaRifaDTO {
    name?: string | undefined;
    description?: string | null | undefined;
    visibility?: VaquinhaRifaVisibility | undefined;
    pix_key?: string | undefined;
    start_date?: string | Date | undefined;
    end_date?: string | Date | undefined;
    amount_collected?: number | undefined;
    category?: string | undefined;
    social_networks?: SocialNetworkDTO[] | undefined;
    award?: string | undefined;
    local?: string | undefined;
}

export interface PublicIdParams {
    public_id: string;
}

export interface VaquinhaRifaServiceResponse {
    id: number;
    public_id?: string;
    name: string;
    status: string;
    description?: string | null;
    visibility?: VaquinhaRifaVisibility;
    pix_key?: string;
    amount_collected?: number;
    award?: string;
    local?: string;
}
