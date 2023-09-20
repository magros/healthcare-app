import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '~/app/user-profile/user-profile.service';
import { AuthService } from '~/app/auth/auth.service';

@Component({
    selector: 'user-profile',
    templateUrl: 'user-profile.component.html',
    styleUrls: ['user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
    avatar = '';
    name = '';
    password = '';
    private userData: any;
    isBusy: boolean = false;

    constructor(
        private userProfileService: UserProfileService,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.authService.userState.subscribe((user: any) => {
            if (user) {
                this.userData = user;
            }
        });
        this.authService.loadUserData();
        this.retrievePhoto();
    }

    retrievePhoto() {
        this.userProfileService.getCurrentPatient().subscribe((res: any) => {
            this.avatar = res.data.user.avatar_url;
            this.name = res.data.user.name;
            this.authService.updateUser(
                Object.assign(this.userData, { avatar_url: this.avatar })
            );
            this.isBusy = false;
        });
    }

    updateProfile() {
        console.log(this.name);
        this.isBusy = true;
        this.userProfileService
            .updateProfile(this.name, this.password)
            .subscribe((res: any) => {
                console.log(res);
                this.authService.updateUser(
                    Object.assign(this.userData, { name: res.data.user.name })
                );
                this.isBusy = false;
            });
    }

    async choseFile() {
        this.isBusy = true;
        let file = await this.userProfileService.chosePhoto();
        await this.userProfileService.uploadPhoto(file);
        this.retrievePhoto();
    }
}
