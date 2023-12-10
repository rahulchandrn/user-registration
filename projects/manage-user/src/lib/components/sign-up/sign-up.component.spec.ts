import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { FormBuilder, FormsModule } from '@angular/forms';
import { UtilityService } from '../../services/utility.service';
import { of } from 'rxjs';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  const fieldConfig = [
    {
      "groupName": "Sign Up form fields",
      "fields": [
        {
          "fieldName": "firstName",
          "labelKey": "First Name",
          "fieldType": "text",
          "validationRegex": "^[a-zA-Z]+(?: [a-zA-Z]+)*$",
          "isMandatory": true,
          "placeholder": "Please enter your first name",
          "errorMsg": "Name should contains alphabets and space only"
        },
        {
          "fieldName": "email",
          "labelKey": "Email",
          "fieldType": "text",
          "validationRegex": "^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$",
          "isMandatory": true,
          "placeholder": "Please enter your email address",
          "errorMsg": "Invalid email address"
        }
      ]
    }
  ]
  class MockUtilityService {
    getSignUpFieldsConfig() {
      return of(fieldConfig);
    }
    createUser() {
      return of('SUCCESS')
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      providers: [
        FormBuilder,
        { provide: UtilityService, useClass: MockUtilityService },
        MessageService
      ],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        CardModule,
        InputTextModule,
        ButtonModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test checkIsFormValid method is defined and call the method to validate the form', () => {
    expect(component.checkIsFormValid).toBeDefined();
    spyOn(component, 'checkIsFormValid').and.callThrough();
    component.checkIsFormValid();
    expect(component.checkIsFormValid).toHaveBeenCalled();
  });

  it('should test validateInputFields method is defined and call the method to validate the form', () => {
    const event = {
      target: {
        value: 'sample'
      }
    }
    expect(component.validateInputFields).toBeDefined();
    spyOn(component, 'validateInputFields').and.callThrough();
    component.validateInputFields(event, 'firstName', '^[a-zA-Z]+(?: [a-zA-Z]+)*$', 'Name should contains alphabets and space only', 'First Name');
    expect(component.validateInputFields).toHaveBeenCalled();
  });
});
