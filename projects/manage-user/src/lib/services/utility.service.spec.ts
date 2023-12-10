import { TestBed } from '@angular/core/testing';

import { UtilityService } from './utility.service';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';

describe('UtilityService', () => {
  let service: UtilityService;

  class MockServiceStub {
    get(): any {
      return from('get');
    }
    post(): any {
      return from('get');
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useClass: MockServiceStub }
      ]
    });
    service = TestBed.inject(UtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getSignUpFieldsConfig method is defined and call the method to get the field config', () => {
    expect(service.getSignUpFieldsConfig).toBeDefined();
    spyOn(service, 'getSignUpFieldsConfig').and.callThrough();
    service.getSignUpFieldsConfig();
    expect(service.getSignUpFieldsConfig).toHaveBeenCalled();
  });

  it('should test createUser method is defined and call the method to create the user', () => {
    const payload = {
      firstname: 'Sample',
      lastname: 'Sample',
      email: 'sample@gm.co',
      password: 'hello@1'
    }
    expect(service.createUser).toBeDefined();
    spyOn(service, 'createUser').and.callThrough();
    service.createUser(payload);
    expect(service.createUser).toHaveBeenCalled();
  });
});
