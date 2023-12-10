import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private readonly http: HttpClient) { }

  /**
   * Method to get the field configurations
   * @returns field config
   */
  public getSignUpFieldsConfig() {
    const url = 'assets/mockdata/signUpFieldConfig.json';
    return this.http.get(url).pipe(map((res: any) => res))
  }

  /**
   * Method to call http request to create user
   * @param userDetails request payload
   * @returns api response
   */
  public createUser(userDetails: any) {
    const url = 'api/createuser';
    return this.http.post(url, userDetails).pipe(map((res: any) => res))
  }

}
