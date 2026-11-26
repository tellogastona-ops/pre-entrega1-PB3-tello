import supertest from 'supertest';
import { expect } from 'chai';
import mongoose from 'mongoose';
import User from '../models/user.model.js';
import Pet from '../models/pet.model.js';

const requester = supertest('http://localhost:8080');

describe('Test funcional del router adoption.router.js', function () {
  this.timeout(10000);

  let createdAdoptionId;
  let testUserId;
  let testPetId;

  before(async () => {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/coderhouse';
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoUri);
    }

    const user = await User.create({
      first_name: 'Test',
      last_name: 'Adopter',
      email: `test.adopter.${Date.now()}@mail.com`,
      password: 'hashedpassword123',
    });
    testUserId = user._id.toString();

    const pet = await Pet.create({
      name: 'FirulaisTest',
      specie: 'perro',
      birthDate: '2023-01-01',
    });
    testPetId = pet._id.toString();
  });

  after(async () => {
    if (createdAdoptionId) {
      await requester.delete(`/api/adoptions/${createdAdoptionId}`);
    }
    if (testUserId) {
      await User.findByIdAndDelete(testUserId);
    }
    if (testPetId) {
      await Pet.findByIdAndDelete(testPetId);
    }
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  });

  it('Debe retornar todas las adopciones mediante GET /api/adoptions', async () => {
    const { status, body } = await requester.get('/api/adoptions');
    expect(status).to.equal(200);
    expect(body).to.be.an('object');
    expect(body.payload).to.be.an('array');
  });

  it('Debe crear una adopción válida mediante POST /api/adoptions/:uid/:pid', async () => {
    const { status, body } = await requester.post(`/api/adoptions/${testUserId}/${testPetId}`);
    expect(status).to.be.oneOf([200, 201]);
    expect(body).to.be.an('object');
    expect(body.payload).to.be.an('object');
    expect(body.payload).to.have.property('_id');
    createdAdoptionId = body.payload._id;
  });

  it('Debe retornar una adopción por ID mediante GET /api/adoptions/:aid', async () => {
    expect(createdAdoptionId).to.exist;
    const { status, body } = await requester.get(`/api/adoptions/${createdAdoptionId}`);
    expect(status).to.equal(200);
    expect(body).to.be.an('object');
    expect(body.payload).to.be.an('object');
    expect(body.payload._id).to.equal(createdAdoptionId);
  });

  it('Debe fallar al intentar crear una adopción con IDs inválidos o inexistentes', async () => {
    const { status } = await requester.post('/api/adoptions/uid_falso/pid_falso');
    expect(status).to.be.oneOf([400, 404, 500]);
  });

  it('Debe fallar al consultar una adopción con ID inexistente', async () => {
    const fakeId = new mongoose.Types.ObjectId().toString();
    const { status } = await requester.get(`/api/adoptions/${fakeId}`);
    expect(status).to.be.oneOf([404, 500]);
  });
});