import DatabaseConnection from "../database/connection/DatabaseConnection.js";

export async function retornaID(tabela: string, publicID: string): Promise<number | string | null> {
    try {
        const result = await DatabaseConnection.getInstance()(tabela)
            .select('id')
            .where({ public_id: publicID })
            .first();

        return result ? result.id : null;
    } catch (error) {
        console.error(`Erro ao buscar ID na tabela '${tabela}' para public_id '${publicID}':`, error);
        throw error;
    }

