import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { map } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class SharedService {

  constructor(private http: HttpClient, private configService: ConfigService) {}

  private _drawerState = new BehaviorSubject<void>(null);

  get drawerState() {
    return this._drawerState.asObservable();
  }

  toggleDrawer() {
    this._drawerState.next(null);
  }

  getDoctorHeader(doctorId: string) {
    return this.http.get(`${this.configService.getBaseUrl()}/api/doctors/${doctorId}`)
        .pipe(
            map((res: any) => {
                let data = res.data
                return {
                    name: data.name,
                    speciality: data.specialities[0].description,
                    professionalLicense: data.professional_license
                }
            }))
  }
}
