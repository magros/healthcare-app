import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {ConfigService} from '../config/config.service'
import {AuthService} from '../auth/auth.service'
import * as imagepicker from "nativescript-imagepicker"
import {getString} from "application-settings"

const ImageCropper = require("nativescript-imagecropper").ImageCropper;
const fs = require("tns-core-modules/file-system");
import * as imageSource from "tns-core-modules/image-source";
import * as permissions from "nativescript-permissions";

const bghttp = require("nativescript-background-http")
declare var android: any;

@Injectable({providedIn: 'root'})
export class UserProfileService {

    public context = imagepicker.create({
        mode: "single" // use "multiple" for multiple selection
    })

    constructor(
        private httpClient: HttpClient,
        private configService: ConfigService,
        private authService: AuthService
    ) {
    }

    async chosePhoto() {

        console.log('choosing photo')

        await this.context.authorize()

        let selection = await this.context.present()

        let imageCropper = new ImageCropper();
        await permissions.requestPermission([android.Manifest.permission.WRITE_EXTERNAL_STORAGE])
        let selectedImg = selection[0].android

        const args = await imageCropper.show(imageSource.fromFile(selectedImg), {width: 300, height: 300})

        if (args.image !== null) {
            const folder = fs.knownFolders.documents().path;
            const fileName = "selectedImage2" + Date.now() + ".jpeg"
            const path = fs.path.join(folder, fileName)
            console.log('saving')
            args.image.saveToFile(path)
            console.log(path)

            return path
        }

        return null
    }

    getCurrentPatient() {
        let patientId = this.authService.getCurrentPatientId()

        return this.httpClient.get(
            `${this.configService.getBaseUrl()}/api/patients/${patientId}`,
            this.configService.getBaseHeaders()
        )
    }


    updateProfile(name, password) {
        let patientId = this.authService.getCurrentPatientId()

        return this.httpClient.put(
            `${this.configService.getBaseUrl()}/api/patients/${patientId}/update-profile`,
            {name, password},
            this.configService.getAuthHeaders()
        )
    }

    uploadPhoto(file) {
        const session = bghttp.session("file-upload")
        let patientId = this.authService.getCurrentPatientId()

        const url = `${this.configService.getBaseUrl()}/api/patients/${patientId}/photo`
        const name = file.substr(file.lastIndexOf("/") + 1)

        return new Promise((resolve, reject) => {

            console.log('patientId: ' + patientId)

            // const file =  selection[0].android
            console.log(name)

            const request = {
                url: url,
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${getString('apiToken')}`,
                    "Content-Type": "application/octet-stream",
                    'File-Name': name
                },
                description: "Uploading " + name,
                name: 'avatar',
            }
            const task = session.multipartUpload([{
                "name": 'avatar',
                "filename": file
            }], request)

            // task.on("progress", function (e) {
            //     console.log("uploaded " + e.currentBytes + " / " + e.totalBytes)
            // })

            // task.on("complete", function (e) {
            //     resolve(e)
            // })

            task.on("responded", function (e: any) {
                resolve(e.data)
            })

            task.on("error", function (e) {
                reject(e)
            })

        })

    }
}
