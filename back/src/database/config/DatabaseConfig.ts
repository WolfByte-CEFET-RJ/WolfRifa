import type { Knex } from 'knex';

class DatabaseConfig {
    private static env(nome: string): string {
        const valor = process.env[nome];

        if (!valor) {
            throw new Error(`A variável de ambiente ${nome} não está definida`);
        }

        return valor;
    }

    private static numero(nome: string, padrao: number): number {
        const bruto = process.env[nome];

        if (bruto === undefined || bruto === '') {
            return padrao;
        }

        const valor = Number(bruto);

        if (!Number.isInteger(valor) || valor <= 0) {
            throw new Error(`A variável de ambiente ${nome} deve ser um número inteiro positivo`);
        }

        return valor;
    }

    /**
     * Retorna a configuração do Knex para PostgreSQL.
     * @returns {Knex.Config} Configuração pronta para ser passada ao `knex()`.
     */
    public static getConfig(): Knex.Config {
        const connection: Knex.Config['connection'] = process.env.DATABASE_URL
            ? process.env.DATABASE_URL
            : {
                    host: DatabaseConfig.env('DB_HOST'),
                    port: DatabaseConfig.numero('DB_PORT', 5432),
                    user: DatabaseConfig.env('DB_USER'),
                    password: DatabaseConfig.env('DB_PASSWORD'),
                    database: DatabaseConfig.env('DB_NAME'),
                };

        return {
            client: 'pg',
            connection,
            pool: {
                min: DatabaseConfig.numero('DB_POOL_MIN', 2),
                max: DatabaseConfig.numero('DB_POOL_MAX', 10),
            },
        };
    }
}

export default DatabaseConfig;