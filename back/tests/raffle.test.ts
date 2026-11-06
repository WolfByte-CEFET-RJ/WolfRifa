import assert from 'node:assert/strict';
import { test } from 'node:test';
import express from 'express';
import jwt from 'jsonwebtoken';
import raffleRoutes from '../src/routes/raffleRoutes.js';
import { RaffleService } from '../src/services/raffleService.js';
import { type CreateRaffleInput, raffleSchema } from '../src/yup/raffleYup.js';

const input = {
    name: 'Rifa WolfByte', visibility: 'public', key_pix: 'wolf@example.com',
    start_date: '2026-11-06', end_date: '2026-12-01', award: 'Teclado',
    local: 'CEFET/RJ', participants_qtd: 100,
};

test('valida campos obrigatórios, cotas, datas e redes sociais', async () => {
    await raffleSchema.validate(input);
    for (const field of Object.keys(input)) {
        const body: Record<string, unknown> = { ...input };
        delete body[field];
        await assert.rejects(raffleSchema.validate(body));
    }
    for (const change of [
        { participants_qtd: 0 }, { participants_qtd: 1.5 }, { participants_qtd: '100' },
        { end_date: '2026-02-30' }, { end_date: '2026-01-01' }, { visibility: 'unknown' },
        { social_networks: [{ platform: 'instagram', url: 'javascript:alert(1)' }] },
    ]) await assert.rejects(raffleSchema.validate({ ...input, ...change }));
});

test('rota exige JWT, valida corpo e retorna o contrato documentado', async t => {
    const previousSecret = process.env.JWT_SECRET;
    process.env.JWT_SECRET = 'raffle-test-secret';
    t.after(() => {
        if (previousSecret === undefined) delete process.env.JWT_SECRET;
        else process.env.JWT_SECRET = previousSecret;
    });
    const app = express();
    app.use(express.json());
    app.use(raffleRoutes);
    const server = app.listen(0, '127.0.0.1');
    await new Promise<void>(resolve => server.once('listening', resolve));
    t.after(() => new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve())));
    const address = server.address();
    assert.ok(address && typeof address !== 'string');
    const token = jwt.sign({ sub: '00000000-0000-4000-8000-000000000001' }, process.env.JWT_SECRET);
    const post = (body: unknown, authorization?: string) => fetch(`http://127.0.0.1:${address.port}/campaign/rifa`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', ...(authorization ? { authorization } : {}) },
        body: JSON.stringify(body),
    });
    assert.equal((await post(input)).status, 403);
    assert.equal((await post(input, 'Bearer invalid')).status, 403);
    assert.equal((await post({}, `Bearer ${token}`)).status, 400);
    const response = { Campanha: { id: 1, public_id: 'campaign-uuid', name: input.name, status: 'ativa',
        rifa: { award: input.award, local: input.local, participants_qtd: 100 } } };
    t.mock.method(RaffleService, 'create', async (body: CreateRaffleInput, organizer: string) => {
        assert.equal(organizer, '00000000-0000-4000-8000-000000000001');
        assert.equal(body.participants_qtd, 100);
        return response;
    });
    const result = await post(input, `Bearer ${token}`);
    assert.equal(result.status, 200);
    assert.deepEqual(await result.json(), response);
    t.mock.method(RaffleService, 'create', async () => null);
    assert.equal((await post(input, `Bearer ${token}`)).status, 403);
});
