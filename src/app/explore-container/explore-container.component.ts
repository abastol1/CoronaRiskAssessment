import { Component, OnInit, Input } from '@angular/core';
import { LoadingController, Platform, ModalController } from '@ionic/angular';
import { ThrowStmt } from '@angular/compiler';
import { RiskresultPage } from './riskresult/riskresult.page';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string;

  constructor(
    public loadingController: LoadingController,
    public platform: Platform,
    public modalController: ModalController
  ) { }

  userage: string;
  ngOnInit() {
    this.presentLoading();
    // document.getElementById('langAns').style.display = 'none';
    // document.getElementById('ageQues').style.display = 'none';
    // document.getElementById('ageInput').style.display = 'none';
    // document.getElementById('ageAns').style.display = 'none';
    // document.getElementById('genderQues').style.display = 'none';
    // document.getElementById('genderAns').style.display = 'none';
    // document.getElementById('temperatureQues').style.display = 'none';
    // document.getElementById('symptoms').style.display = 'none';
    // document.getElementById('symptomAns').style.display = 'none';
    // document.getElementById('temperatureAnswer').style.display = 'none';
    // document.getElementById('modalButton').style.display = 'none'
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 500
    });
    return await loading.present();
  }

  languageClicked(languageName) {
    this.presentLoading();
    this.presentLoading().then();
    document.getElementById('langAns').style.display = 'block';
    document.getElementById('ageQues').style.display = 'block';
    document.getElementById('ageInput').style.display = 'block';

  }

  AgeInput() {
    document.getElementById('ageInput').style.display = 'none';
    document.getElementById('ageAnsText').innerHTML = this.userage;
    document.getElementById('ageAns').style.display = 'block';

    document.getElementById('genderQues').style.display = 'block';

  }

  GenderClicked(gender) {
    document.getElementById('gender').innerHTML = gender;
    document.getElementById('genderAns').style.display = 'block';
    document.getElementById('temperatureQues').style.display = 'block';
  }

  TempClicked(temperature) {
    // alert(temperature);
    document.getElementById('temperature').innerHTML = temperature;
    document.getElementById('temperatureAnswer').style.display = 'block';
    // document.getElementById('symptomsText').innerHTML = 'Cough, Shortness of breath';
    document.getElementById('symptoms').style.display = 'block';
    // document.getElementById('symptomAns').style.display = 'block';
  }

  ShowModal() {
    const modal = this.modalController.create({
      component: RiskresultPage,
      componentProps: {
        riskAnalysis: 'Low'
      }
    });
    modal.then(x => x.present());
  }

}
