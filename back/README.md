# Backend WolfRifa

## Criar rifa

`POST /campaign/rifa`

Enviar `Authorization: Bearer <token>`, com o UUID público do organizador no `sub` do JWT, e `Content-Type: application/json`.

```json
{
  "name": "Rifa WolfByte Teclado Mecânico",
  "description": "Arrecadação para o projeto",
  "visibility": "public",
  "key_pix": "organizador@example.com",
  "start_date": "2026-11-06",
  "end_date": "2026-12-01",
  "award": "Teclado Keychron K2",
  "local": "CEFET/RJ Maracanã",
  "participants_qtd": 100,
  "social_networks": [
    { "platform": "instagram", "url": "https://www.instagram.com/wolfbyte" }
  ]
}
```

`description` e `social_networks` são opcionais. `visibility` aceita `public` e `private`. As datas usam `YYYY-MM-DD`, com término igual ou posterior ao início. A quantidade de cotas deve ser um inteiro positivo. Plataformas aceitas: `instagram`, `facebook`, `tiktok`, `youtube`, `x` e `other`.

Resposta HTTP 200:

```json
{
  "Campanha": {
    "id": 2,
    "public_id": "4a7b9c1d-2e3f-4a5b-8c7d-8e9f0a1b2c3d",
    "name": "Rifa WolfByte Teclado Mecânico",
    "status": "ativa",
    "rifa": {
      "award": "Teclado Keychron K2",
      "local": "CEFET/RJ Maracanã",
      "participants_qtd": 100
    }
  }
}
```

Erros: 400 para corpo inválido; 403 para token ausente/inválido ou organizador inexistente; 500 para erro interno.

A resposta segue o exemplo da rota 13 do documento de API, incluindo `id` numérico e os detalhes dentro de `rifa`. O documento não especifica os valores literais de visibilidade nem o formato dos itens de redes sociais; os formatos adotados estão no exemplo acima. A categoria é definida como `general`, pois o banco exige esse campo e o contrato não o recebe. O status inicial segue o exemplo documentado: `ativa`.

As redes sociais são associadas à campanha, sem alterar as redes do perfil do organizador. A gravação da campanha, rifa e redes usa uma única transação.

Antes de utilizar a rota, configure o banco e `JWT_SECRET` e execute:

```bash
npm run migrate:latest
```

A migration adiciona a quantidade de cotas e a tabela de redes da campanha. Rifas antigas mantêm `participants_qtd` nulo, pois não é possível inferir suas quantidades; novas rifas exigem o campo na API.

## Validação

```bash
npm test
npx tsc --noEmit
```

Os testes HTTP substituem o serviço de persistência e não exigem banco de dados. Não verificam a execução das migrations nem a transação no PostgreSQL.
