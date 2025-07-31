const SequelizeMock = require('sequelize-mock');
const DBConnectionMock = new SequelizeMock();
const CourseOfferingModel = DBConnectionMock.define('CourseOffering', {
  term: 'Term 1',
  startDate: '2025-07-01',
  endDate: '2025-09-01',
  facilitatorId: 1,
  modeId: 2,
  moduleId: 3,
  classId: 4
});

describe('CourseOffering Model', () => {
  it('should create a course offering with valid fields', async () => {
    const courseOffering = await CourseOfferingModel.create({
      term: 'Term 2',
      startDate: '2025-09-01',
      endDate: '2025-11-30',
      facilitatorId: 2,
      modeId: 1,
      moduleId: 4,
      classId: 3
    });

    expect(courseOffering.term).toBe('Term 2');
    expect(courseOffering.startDate).toBe('2025-09-01');
    expect(courseOffering.endDate).toBe('2025-11-30');
    expect(courseOffering.facilitatorId).toBe(2);
  });
});
