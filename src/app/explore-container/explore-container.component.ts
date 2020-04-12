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

  countYour = 0;
  countMine = 0;
  elementYour = document.getElementsByClassName('yours') as HTMLCollectionOf<HTMLElement>;
  elementMine = document.getElementsByClassName('mine') as HTMLCollectionOf<HTMLElement>;
  symptomsArray: Set<string> = new Set<string>();
  additionalSympArray: Set<string> = new Set<string>();
  historyDisease: Set<string> = new Set<string>();
  userage: number;
  ngOnInit() {
    this.presentLoading();

  }

  ionViewWillEnter() {
    // tslint:disable-next-line:prefer-for-of
    console.log("ENTER");
    alert("ENTER");
    for (let i = 0; i < this.elementYour.length; i++) {
      this.elementYour[i].style.display = 'none';
    }
    this.ShowElementYour();
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.elementMine.length; i++) {
      this.elementMine[i].style.display = 'none';
    }
    document.getElementById('result').style.display = 'none';

  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 200
    });
    return await loading.present();
  }

  ShowElementMine() {
    this.elementMine[this.countMine].style.display = 'flex';
    this.countMine++;
  }
  ShowElementYour() {
    this.elementYour[this.countYour].style.display = 'flex';
    this.countYour++;
  }

  languageClicked(event, languageName) {
    this.presentLoading();
    // tslint:disable-next-line:no-string-literal
    event['target']['parentNode'].style.display = 'none';
    let el = this.elementMine[this.countMine].childNodes[0] as HTMLElement;
    el.innerHTML = languageName;
    // this.elementMine[this.countMine].childNodes[0].innerHTML = languageName;
    this.ShowElementMine();
    this.ShowElementYour();
    this.ShowElementMine();
  }

  AgeInput() {
    if (this.userage === 0 || this.userage === undefined) {
      return;
    }
    this.elementMine[this.countMine - 1].style.display = 'none';
    let el = this.elementMine[this.countMine].childNodes[0] as HTMLElement;
    el.innerHTML = 'Age: ' + this.userage;
    // this.elementMine[this.countMine].childNodes[0].innerHTML = 'Age: ' + this.userage;
    this.ShowElementMine();
    this.ShowElementYour();
  }

  GenderClicked(event, gender) {
    event['target']['parentNode'].style.display = 'none';
    let el = this.elementMine[this.countMine].childNodes[0] as HTMLElement;
    el.innerHTML = gender
    // this.elementMine[this.countMine].childNodes[0].innerHTML = gender;
    this.ShowElementMine();
    this.ShowElementYour();
  }

  TempClicked(event, temperature) {
    event['target']['parentNode'].style.display = 'none';
    let el = this.elementMine[this.countMine].childNodes[0] as HTMLElement;
    el.innerHTML = temperature;
    // this.elementMine[this.countMine].childNodes[0].innerHTML = temperature;
    this.ShowElementMine();
    this.ShowElementYour();
  }

  SymptomClicked(event, sym) {
    if (this.symptomsArray.has(sym)) {
      this.symptomsArray.delete(sym);
      event['toElement']['color'] = 'light';
    }
    else {
      this.symptomsArray.add(sym);
      event['toElement']['color'] = 'danger';
    }

    if (this.symptomsArray.size === 0) {
      document.getElementById('confirmSymptom').innerHTML = 'None of these';
    }
    else {
      document.getElementById('confirmSymptom').innerHTML = 'Confirm';
      let att = document.createAttribute("color");
      att.value = 'success';
      document.getElementById('confirmSymptom').setAttributeNode(att);
    }

  }

  SymptomConfirmed(event) {
    event['target']['parentNode'].style.display = 'none';

    let status = document.getElementById('confirmSymptom').innerHTML;
    console.log("Symptoms: ", this.symptomsArray);
    if (status == 'Confirm') {
      status = '';
      let array = Array.from(this.symptomsArray);
      status = array.join(', ');
      // for (let item of this.symptomsArray) {
      //   status = item + ',' + status;
      // }
    }
    let el = this.elementMine[this.countMine].childNodes[0] as HTMLElement;
    el.innerHTML = status;
    // this.elementMine[this.countMine].childNodes[0].innerHTML = status;
    this.ShowElementMine();
    this.ShowElementYour();

  }

  AdditionalSymp(event, sym) {
    if (this.additionalSympArray.has(sym)) {
      this.additionalSympArray.delete(sym);
      event['toElement']['color'] = 'light';
    }
    else {
      this.additionalSympArray.add(sym);
      event['toElement']['color'] = 'danger';
    }

    if (this.additionalSympArray.size === 0) {
      document.getElementById('ConfirmAddSymp').innerHTML = 'None of these';
    }
    else {
      document.getElementById('ConfirmAddSymp').innerHTML = 'Confirm';
      let att = document.createAttribute("color");
      att.value = 'success';
      document.getElementById('ConfirmAddSymp').setAttributeNode(att);
    }

  }

  ConfirmAdditionalSymp(event) {
    event['target']['parentNode'].style.display = 'none';

    let status = document.getElementById('ConfirmAddSymp').innerHTML;
    console.log("Symptoms: ", this.additionalSympArray);
    if (status == 'Confirm') {
      status = '';
      let array = Array.from(this.additionalSympArray);
      status = array.join(', ');
      // for (let item of this.additionalSympArray) {
      //   status = item + ',' + status;
      // }
    }
    let el = this.elementMine[this.countMine].childNodes[0] as HTMLElement;
    el.innerHTML = status;
    // this.elementMine[this.countMine].childNodes[0].innerHTML = status;
    this.ShowElementMine();
    this.ShowElementYour();

  }

  History(event, commute) {
    event['target']['parentNode'].style.display = 'none';
    let el = this.elementMine[this.countMine].childNodes[0] as HTMLElement;
    el.innerHTML = commute;
    // this.elementMine[this.countMine].childNodes[0].innerHTML = commute;
    this.ShowElementMine();
    this.ShowElementYour();
  }

  DiseaseClicked(event, disease) {
    if (this.historyDisease.has(disease)) {
      this.historyDisease.delete(disease);
      event['toElement']['color'] = 'light';

    }
    else {
      this.historyDisease.add(disease);
      event['toElement']['color'] = 'danger';

    }

    if (this.historyDisease.size === 0) {
      document.getElementById('confirmHistory').innerHTML = 'None of these';
    }
    else {
      document.getElementById('confirmHistory').innerHTML = 'Confirm';
      let att = document.createAttribute("color");
      att.value = 'success';
      document.getElementById('confirmHistory').setAttributeNode(att);
    }
  }

  ConfirmHistoryDisease(event) {
    event['target']['parentNode'].style.display = 'none';
    let status = document.getElementById('ConfirmAddSymp').innerHTML;
    console.log("Symptoms: ", this.historyDisease);
    if (status == 'Confirm') {
      status = '';
      let array = Array.from(this.historyDisease);
      status = array.join(', ');
    }
    let el = this.elementMine[this.countMine].childNodes[0] as HTMLElement;
    el.innerHTML = status;
    // this.elementMine[this.countMine].childNodes[0].innerHTML = status;
    this.ShowElementMine();
    this.ShowElementYour();

  }

  Progress(event, prog) {
    event['target']['parentNode'].style.display = 'none';
    let el = this.elementMine[this.countMine].childNodes[0] as HTMLElement;
    el.innerHTML = prog;
    // this.elementMine[this.countMine].childNodes[0].innerHTML = prog;
    this.ShowElementMine();

    document.getElementById('result').style.display = 'block';
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
