const SequelizeMock = require('sequelize-mock');
const DBConnectionMock = new SequelizeMock();
const FacilitatorModel = DBConnectionMock.define('Facilitator', {
  userId: 5,
  name: 'Kwame Mensah'
});

describe('Facilitator Model', () => {
  it('should create a facilitator with correct fields', async () => {
    const facilitator = await FacilitatorModel.create({
      userId: 7,
      name: 'Ama Boateng'
    });

    expect(facilitator.userId).toBe(7);
    expect(facilitator.name).toBe('Ama Boateng');
  });
});
