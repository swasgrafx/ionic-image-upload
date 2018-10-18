import { Component } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { DetailPage } from '../detail/detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  regData = { avatar:'', username: '', email: '', first_name: '', last_name: '' };
  imgPreview = './assets/imgs/1929534_13461621140_8108_n.jpg';

  constructor(public navCtrl: NavController,
    private imagePicker: ImagePicker,
    private base64: Base64,
    public api: ApiProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController)
    {

    }

    loading: any;
    showLoader(){
      this.loading = this.loadingCtrl.create({
          content: 'Submitting...'
      });

      this.loading.present();
    }
    register() {
      this.showLoader();
      this.api.register(this.regData).subscribe((result) => {
        this.loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Registration Successful',
          subTitle: 'Great! Your registration is success',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.navCtrl.push(DetailPage, {id:result.user_id});
              }
            }
          ]
        });
        alert.present();

      }, (err) => {
        console.log(err);
        this.loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Registration Failed',
          subTitle: 'Oh no! Your registration is failed',
          buttons: ['OK']
        });
        alert.present();
      });
    }


    getPhoto() {
      let options = {
        maximumImagesCount: 1
      };
      this.imagePicker.getPictures(options).then((results) => {
        for (var i = 0; i < results.length; i++) {
            this.imgPreview = results[i];
            this.base64.encodeFile(results[i]).then((base64File: string) => {
              this.regData.avatar = base64File;
            }, (err) => {
              console.log(err);
            });
        }
      }, (err) => { });
    }

}
