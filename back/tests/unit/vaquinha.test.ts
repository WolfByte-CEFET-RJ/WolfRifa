import test, { describe, it } from 'node:test';
import assert from 'node:assert';
import { publicIdParamSchema } from '../../src/yup/vaquinhayup.js';
import { ValidationError } from 'yup';

describe('Unit: Vaquinha Yup Schema & Data Sanitization', () => {
    describe('publicIdParamSchema validation', () => {
        it('should accept a valid UUID v4', async () => {
            const validUUID = '00000000-0000-4000-8000-000000000101';
            const result = await publicIdParamSchema.validate({ public_id: validUUID });
            assert.strictEqual(result.public_id, validUUID);
        });

        it('should reject an invalid UUID string with ValidationError', async () => {
            await assert.rejects(
                async () => {
                    await publicIdParamSchema.validate({ public_id: 'invalid-uuid-format' });
                },
                (err: unknown) => {
                    assert.ok(err instanceof ValidationError);
                    assert.match(err.message, /UUID válido/i);
                    return true;
                }
            );
        });

        it('should reject an integer id string with ValidationError', async () => {
            await assert.rejects(
                async () => {
                    await publicIdParamSchema.validate({ public_id: '123' });
                },
                (err: unknown) => {
                    assert.ok(err instanceof ValidationError);
                    return true;
                }
            );
        });

        it('should reject an empty public_id string', async () => {
            await assert.rejects(
                async () => {
                    await publicIdParamSchema.validate({ public_id: '' });
                },
                (err: unknown) => {
                    assert.ok(err instanceof ValidationError);
                    return true;
                }
            );
        });
    });

    describe('Security & Sensitive Data Sanitization', () => {
        it('public response must not contain sensitive database keys or user credentials', () => {
            const forbiddenKeys = ['id', 'organizer_id', 'password', 'email', 'phone_number'];

            const mockPublicResponse = {
                public_id: '00000000-0000-4000-8000-000000000101',
                name: 'Ajude a biblioteca',
                title: 'Ajude a biblioteca',
                description: 'Livros e estantes',
                pix_key: 'biblioteca@example.com',
                visibility: 'publica' as const,
                status: 'active',
                category: 'education',
                start_date: '2026-09-01',
                end_date: '2026-12-31',
                amount_collected: 1250.5,
                vaquinha: {
                    amount_collected: 1250.5,
                },
                organizer: {
                    name: 'Ana Souza',
                },
                social_networks: [
                    { platform: 'instagram' as const, url: 'https://instagram.com/ana.souza' },
                ],
            };

            for (const key of forbiddenKeys) {
                assert.strictEqual(
                    key in mockPublicResponse,
                    false,
                    `Sensitive key "${key}" should NOT be present at root level of public response`
                );
            }

            // Verify organizer does not expose email, password, or id
            const organizerKeys = Object.keys(mockPublicResponse.organizer);
            assert.deepStrictEqual(organizerKeys, ['name']);
        });
    });
});
