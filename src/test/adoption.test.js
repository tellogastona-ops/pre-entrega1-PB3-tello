import supertest from 'supertest';
import { expect } from 'chai';

const requester = supertest('http://localhost:8080'); // Ajusta tu puerto si es necesario

describe('Test funcional del router adoption.router.js', () => {
    
    let adoptionId;

    it('Debe retornar todas las adopciones mediante GET /api/adoptions', async () => {
        const { status, body } = await requester.get('/api/adoptions');
        expect(status).to.equal(200);
        expect(body).to.be.an('object');
        expect(body.payload).to.be.an('array');
    });

    it('Debe fallar o retornar error al intentar crear una adopción con datos inválidos o inexistentes (POST /api/adoptions)', async () => {
        const { status } = await requester.post('/api/adoptions/uid_falso/pid_falso');
        // Dependiendo de tu lógica, el status esperado para error puede ser 400 o 404
        expect(status).to.be.oneOf([400, 404, 500]);
    });

});