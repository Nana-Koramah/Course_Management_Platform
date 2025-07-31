const SequelizeMock = require('sequelize-mock');
const DBConnectionMock = new SequelizeMock();
const ClassModel = DBConnectionMock.define('Class', {
  name: 'Class A',
  cohortId: 2
});

describe('Class Model', () => {
  it('should create a class with name and cohortId', async () => {
    const klass = await ClassModel.create({
      name: 'Class B',
      cohortId: 3
    });

    expect(klass.name).toBe('Class B');
    expect(klass.cohortId).toBe(3);
  });
});
