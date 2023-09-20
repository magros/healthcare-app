import { Component, OnInit, Input } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'ns-medic-details-nav',
  templateUrl: './medic-details-nav.component.html',
  styleUrls: ['./medic-details-nav.component.css']
})
export class MedicDetailsNavComponent implements OnInit {

  @Input() doctorId: string
  doctorIdentity = {}
  constructor(private router: RouterExtensions, private sharedService: SharedService) { }



  ngOnInit() {
      this.sharedService.getDoctorHeader(this.doctorId)
        .subscribe(
            res => {
                this.doctorIdentity = res
            }
        )
  }

  goBack() {
      this.router.backToPreviousPage();
  }

}
