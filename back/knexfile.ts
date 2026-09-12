import type { Knex } from "knex";
import "dotenv/config";

function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Variável de ambiente obrigatória ausente: ${name}`);
    }
    return value;
    }

    const config: Record<string, Knex.Config> = {
    development: {
        client: "pg",
        connection: {
        host: String(process.env.DB_HOST ),
        port: Number(process.env.DB_PORT),
        user: requireEnv("DB_USER"),
        password: requireEnv("DB_PASSWORD"),
        database: requireEnv("DB_NAME"),
        },
        migrations: {
        directory: "./src/database/migrations",
        extension: "ts",
        },
        seeds: {
        directory: "./src/database/seeds",
        extension: "ts",
        },
        pool: { min: 2, max: 10 },
    },

    production: {
        client: "pg",
        connection: requireEnv("DATABASE_URL"),
        migrations: {
        directory: "./src/database/migrations",
        extension: "ts",
        },
        pool: { min: 2, max: 10 },
    },
};

export default config;