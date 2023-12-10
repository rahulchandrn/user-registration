import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilityService } from '../../services/utility.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'lib-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public signupForm = this.fb.group({
    sections: this.fb.array([])
  });
  public invalidInputFields: any = {};
  public isFormValid: boolean = false;

  constructor(private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly utilityService: UtilityService,
    private readonly messageService: MessageService) { }

  ngOnInit(): void {
    this.getFieldsElement();
  }

  /**
   * Method to get the field configuration from an api(Currently fetching from local json)
   */
  public getFieldsElement() {
    this.utilityService.getSignUpFieldsConfig().subscribe((res: any[]) => {
      if (res && res.length > 0) {
        res.forEach((eachFormGroup: any, index: any) => {
          const control = <FormArray>this.signupForm.get("sections");
          control.push(this.initFields());
          this.getFieldsFromGroup(eachFormGroup, index);
        })
      }
    })
  }

  /**
   * Method to initialise the fields
   * @returns fields
   */
  public initFields() {
    return this.fb.group({
      fields: this.fb.array([])
    });
  }

  /**
   * Method to initialize the form groups and fields
   * @param eachFormGroup each formGroup
   * @param index index value
   */
  public getFieldsFromGroup(eachFormGroup: { fields: any[]; }, index: number) {
    eachFormGroup.fields.forEach(eachFormField => {
      const control = this.signupForm.get(['sections', index, 'fields']) as FormArray;
      if (control) {
        control.push(this.patchFieldValue(eachFormField));
      }
      this.invalidInputFields[eachFormField.fieldName] = {
        hasError: false,
        errorMsg: '',
        inputTouched: false,
        isMandatory: eachFormField.isMandatory
      }
    })
  }

  /**
   * Method to assign the field form required property values
   * @param formField 
   * @returns 
   */
  public patchFieldValue(formField: any) {
    return this.fb.group({
      label: formField.labelKey,
      type: formField.fieldType,
      fieldName: formField.fieldName,
      required: formField.isMandatory,
      fieldPattern: formField.validationRegex,
      fieldControl: '',
      placeholder: formField.placeholder,
      errorMsg: formField.errorMsg
    })
  }

  public getFields(index: any) {
    return (this.signupForm.get(['sections', index, 'fields']) as FormArray)?.value;
  }

  /**
   * Method to validate the input fields
   * @param e event
   * @param inputName field name
   * @param regexExp regex
   * @param errorMsg error message to display
   * @param label field label
   */
  public validateInputFields(e: any, inputName: string, regexExp: string, errorMsg: string, label: string) {
    const fields = this.getFields(0);
    const passwordField = fields.filter((it: any) => (it.fieldName === 'password' || it.fieldName === 'confirmPassword'));
    const regex = new RegExp(regexExp);
    const isMandatory = this.invalidInputFields[inputName].isMandatory;
    if (inputName === 'confirmPassword' && passwordField[1].fieldControl !== '' && passwordField[0].fieldControl !== passwordField[1].fieldControl) {
      this.updateInValidInputs(inputName, true, 'Password should be a matching one', true);
    } else {
      if (e.target.value.length < 1 && isMandatory) {
        this.updateInValidInputs(inputName, true, label + ' is required', true);
      }
      if (e.target.value.length === 0 && !isMandatory) {
        this.updateInValidInputs(inputName, false, '', true);
      }
      if (e.target.value.length > 0) {
        if (regex.test(e.target.value) == false) {
          this.updateInValidInputs(inputName, true, errorMsg, true);
        } else {
          this.updateInValidInputs(inputName, false, errorMsg, true);
        }
      }
    }
    this.checkIsFormValid();
  }

  /**
   * Method to set the invalid form fields
   * @param inputName form field name
   * @param hasError has error on the field
   * @param errorMsg error message to display
   * @param inputTouched for input dirty
   */
  public updateInValidInputs(inputName: string, hasError: boolean, errorMsg: string, inputTouched: boolean) {
    this.invalidInputFields[inputName].hasError = hasError;
    this.invalidInputFields[inputName].errorMsg = errorMsg;
    this.invalidInputFields[inputName].inputTouched = inputTouched;
  }

  /**
   * Method to check the form is valid or not
   */
  public checkIsFormValid() {
    let invalidInputCount = 0;
    for (const key in this.invalidInputFields) {
      if (this.invalidInputFields[key].inputTouched && this.invalidInputFields[key].hasError) {
        invalidInputCount++;
      }
    }
    this.getFields(0).forEach((element: any) => {
      if (element.required && element.fieldControl === '') {
        invalidInputCount++
      }
    });
    this.isFormValid = (invalidInputCount > 0) ? false : true;
  }

  /**
   * Method to submit the form values
   */
  public submitForm() {
    let createRequest: any = {};
    this.getFields(0).forEach((element: any) => {
      createRequest[element.fieldName] = element.fieldControl
    });
    this.utilityService.createUser(createRequest).subscribe((res) => {
      if (res) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User created successfully' });
        this.router.navigate(['/login']);
      }
    },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      })
  }

}
