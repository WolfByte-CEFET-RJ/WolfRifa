import 'dotenv/config';
import test, { describe, it, before, after } from 'node:test';
import assert from 'node:assert';
import express from 'express';
import type { Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import campaignRoutes from '../../src/routes/campaignRoutes.js';
import DatabaseConnection from '../../src/database/connection/DatabaseConnection.js';

describe('Integration: GET /campaign/vaquinhas/:public_id', () => {
    let server: Server;
    let baseUrl: string;

    const validSeedVaquinhaId = '00000000-0000-4000-8000-000000000101';
    const raffleSeedId = '00000000-0000-4000-8000-000000000102';
    const nonExistentUuid = '99999999-9999-4999-8999-999999999999';

    before(async () => {
        const app = express();
        app.use(express.json());
        app.use(campaignRoutes);

        await new Promise<void>((resolve) => {
            server = app.listen(0, () => {
                const port = (server.address() as AddressInfo).port;
                baseUrl = `http://localhost:${port}`;
                resolve();
            });
        });
    });

    after(async () => {
        await new Promise<void>((resolve, reject) => {
            server.close((err) => (err ? reject(err) : resolve()));
        });
        const db = DatabaseConnection.getInstance();
        await db.destroy();
    });

    it('should return 200 and public vaquinha details without authentication', async () => {
        const response = await fetch(`${baseUrl}/campaign/vaquinhas/${validSeedVaquinhaId}`);
        assert.strictEqual(response.status, 200);

        const data = await response.json();
        assert.ok(data.vaquinha);

        const { vaquinha } = data;
        assert.strictEqual(vaquinha.public_id, validSeedVaquinhaId);
        assert.strictEqual(vaquinha.name, 'Ajude a construir a biblioteca comunitária');
        assert.strictEqual(vaquinha.pix_key, 'biblioteca@example.com');
        assert.strictEqual(vaquinha.status, 'active');
        assert.strictEqual(vaquinha.category, 'education');
        assert.strictEqual(vaquinha.amount_collected, 1250.5);
        assert.strictEqual(vaquinha.vaquinha.amount_collected, 1250.5);

        // Organizer display name
        assert.strictEqual(vaquinha.organizer?.name, 'Ana Souza');

        // Social networks
        assert.ok(Array.isArray(vaquinha.social_networks));
        assert.ok(vaquinha.social_networks.length > 0);
        assert.strictEqual(vaquinha.social_networks[0].platform, 'instagram');

        // Crucial security checks: sensitive fields MUST NOT be exposed
        assert.strictEqual('id' in vaquinha, false, 'Internal database ID should not be exposed');
        assert.strictEqual('organizer_id' in vaquinha, false, 'organizer_id should not be exposed');
        assert.strictEqual('password' in vaquinha, false, 'Password should not be exposed');
        assert.strictEqual('email' in (vaquinha.organizer ?? {}), false, 'Organizer email should not be exposed');
        assert.strictEqual('phone_number' in (vaquinha.organizer ?? {}), false, 'Organizer phone should not be exposed');
    });

    it('should support singular alias GET /campaign/vaquinha/:public_id', async () => {
        const response = await fetch(`${baseUrl}/campaign/vaquinha/${validSeedVaquinhaId}`);
        assert.strictEqual(response.status, 200);

        const data = await response.json();
        assert.ok(data.vaquinha);
        assert.strictEqual(data.vaquinha.public_id, validSeedVaquinhaId);
    });

    it('should return 400 when public_id is not a valid UUID format', async () => {
        const response = await fetch(`${baseUrl}/campaign/vaquinhas/invalid-public-id-123`);
        assert.strictEqual(response.status, 400);

        const data = await response.json();
        assert.strictEqual(data.message, 'Formato do public_id inválido');
        assert.ok(Array.isArray(data.errors));
        assert.match(data.errors[0], /UUID válido/i);
    });

    it('should return 404 when public_id is a valid UUID but does not exist in the database', async () => {
        const response = await fetch(`${baseUrl}/campaign/vaquinhas/${nonExistentUuid}`);
        assert.strictEqual(response.status, 404);

        const data = await response.json();
        assert.strictEqual(data.message, 'Vaquinha não encontrada');
    });

    it('should return 404 when public_id belongs to a raffle and not a vaquinha', async () => {
        const response = await fetch(`${baseUrl}/campaign/vaquinhas/${raffleSeedId}`);
        assert.strictEqual(response.status, 404);

        const data = await response.json();
        assert.strictEqual(data.message, 'Vaquinha não encontrada');
    });
});
