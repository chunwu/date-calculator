import { DateService } from './date.service';

describe('DateService', () => {
  let service: DateService;

  beforeEach(() => {
    service = new DateService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add days', () => {
    expect(service.addDays(new Date(2019, 5, 1), 1)).toEqual(new Date(2019, 5, 2));
    expect(service.addDays(new Date(2013, 9, 4), 3)).toEqual(new Date(2013, 9, 7));
  });
});
