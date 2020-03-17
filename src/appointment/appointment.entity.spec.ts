import { Appointment } from './appointment.entity';

describe('Appointment.Entity', () => {
  it('should be defined', () => {
    expect(new Appointment()).toBeDefined();
  });
});
