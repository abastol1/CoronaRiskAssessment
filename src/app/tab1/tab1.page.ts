import { Component, Input } from '@angular/core';
import { RiskresultPage } from '../explore-container/riskresult/riskresult.page';
import { LoadingController, Platform, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

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
    // this.presentLoading;
  }

  ionViewWillEnter() {
    // tslint:disable-next-line:prefer-for-of

    let msg = document.getElementsByClassName('message') as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < msg.length; i++) {
      msg[i].style.display = 'inline-block';
    }

    this.countYour = 0;
    this.countMine = 0;
    this.elementYour = document.getElementsByClassName('yours') as HTMLCollectionOf<HTMLElement>;
    this.elementMine = document.getElementsByClassName('mine') as HTMLCollectionOf<HTMLElement>;
    this.symptomsArray = new Set<string>();
    this.additionalSympArray = new Set<string>();
    this.historyDisease = new Set<string>();
    // alert("ENTER");
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
    // tslint:disable-next-line:no-string-literal
    event['target']['parentNode'].style.display = 'none';
    let el = this.elementMine[this.countMine].childNodes[0] as HTMLElement;
    el.innerHTML = languageName;
    this.ShowElementMine();
    this.ShowElementYour();
    this.ShowElementMine();
  }

  GetLoader() {
    let yoursDiv = document.createElement('div');
    yoursDiv.setAttribute('class', 'yours messages');

    let msgDiv = document.createElement('div');
    msgDiv.setAttribute('class', 'message')

    let element = document.createElement('div');
    element.setAttribute('class', 'typing-indicator');

    msgDiv.appendChild(element);
    yoursDiv.appendChild(msgDiv);

    element.appendChild(document.createElement('span'));
    element.appendChild(document.createElement('span'));
    element.appendChild(document.createElement('span'));

    return yoursDiv;
  }

  AgeInput() {
    if (this.userage === 0 || this.userage === undefined) {
      return;
    }
    this.elementMine[this.countMine - 1].style.display = 'none';
    let el = this.elementMine[this.countMine].childNodes[0] as HTMLElement;
    el.innerHTML = 'Age: ' + this.userage;
    this.userage = null;
    this.ShowElementMine();
    this.ShowElementYour();
  }

  GenderClicked(event, gender) {
    event['target']['parentNode'].style.display = 'none';
    let el = this.elementMine[this.countMine].childNodes[0] as HTMLElement;
    el.innerHTML = gender;
    this.ShowElementMine();
    this.ShowElementYour();
  }

  TempClicked(event, temperature) {
    event['target']['parentNode'].style.display = 'none';
    let el = this.elementMine[this.countMine].childNodes[0] as HTMLElement;
    el.innerHTML = temperature;
    this.ShowElementMine();
    this.ShowElementYour();
  }

  SymptomClicked(event, sym) {
    if (this.symptomsArray.has(sym)) {
      this.symptomsArray.delete(sym);
      event['toElement']['color'] = 'light';
    } else {
      this.symptomsArray.add(sym);
      event['toElement']['color'] = 'danger';
    }

    if (this.symptomsArray.size === 0) {
      document.getElementById('confirmSymptom').innerHTML = 'None of these';
    } else {
      document.getElementById('confirmSymptom').innerHTML = 'Confirm';
      let att = document.createAttribute('color');
      att.value = 'success';
      document.getElementById('confirmSymptom').setAttributeNode(att);
    }

  }

  SymptomConfirmed(event) {
    event['target']['parentNode'].style.display = 'none';

    let status = document.getElementById('confirmSymptom').innerHTML;
    console.log('Symptoms: ', this.symptomsArray);
    if (status == 'Confirm') {
      status = '';
      let array = Array.from(this.symptomsArray);
      status = array.join(', ');
    }
    let el = this.elementMine[this.countMine].childNodes[0] as HTMLElement;
    el.innerHTML = status;
    this.ShowElementMine();
    this.ShowElementYour();

  }

  AdditionalSymp(event, sym) {
    if (this.additionalSympArray.has(sym)) {
      this.additionalSympArray.delete(sym);
      event['toElement']['color'] = 'light';
    } else {
      this.additionalSympArray.add(sym);
      event['toElement']['color'] = 'danger';
    }

    if (this.additionalSympArray.size === 0) {
      document.getElementById('ConfirmAddSymp').innerHTML = 'None of these';
    } else {
      document.getElementById('ConfirmAddSymp').innerHTML = 'Confirm';
      let att = document.createAttribute('color');
      att.value = 'success';
      document.getElementById('ConfirmAddSymp').setAttributeNode(att);
    }

  }

  ConfirmAdditionalSymp(event) {
    event['target']['parentNode'].style.display = 'none';

    let status = document.getElementById('ConfirmAddSymp').innerHTML;
    console.log('Symptoms: ', this.additionalSympArray);
    if (status == 'Confirm') {
      status = '';
      let array = Array.from(this.additionalSympArray);
      status = array.join(', ');
    }
    let el = this.elementMine[this.countMine].childNodes[0] as HTMLElement;
    el.innerHTML = status;
    this.ShowElementMine();
    this.ShowElementYour();

  }



  History(event, commute) {
    event['target']['parentNode'].style.display = 'none';
    let el = this.elementMine[this.countMine].childNodes[0] as HTMLElement;
    el.innerHTML = commute;
    this.ShowElementMine();
    this.ShowElementYour();
  }

  DiseaseClicked(event, disease) {
    if (this.historyDisease.has(disease)) {
      this.historyDisease.delete(disease);
      event['toElement']['color'] = 'light';

    } else {
      this.historyDisease.add(disease);
      event['toElement']['color'] = 'danger';

    }

    if (this.historyDisease.size === 0) {
      document.getElementById('confirmHistory').innerHTML = 'None of these';
    } else {
      document.getElementById('confirmHistory').innerHTML = 'Confirm';
      let att = document.createAttribute('color');
      att.value = 'success';
      document.getElementById('confirmHistory').setAttributeNode(att);
    }
  }

  ConfirmHistoryDisease(event) {
    event['target']['parentNode'].style.display = 'none';
    let status = document.getElementById('ConfirmAddSymp').innerHTML;
    console.log('Symptoms: ', this.historyDisease);
    if (status == 'Confirm') {
      status = '';
      let array = Array.from(this.historyDisease);
      status = array.join(', ');
    }
    let el = this.elementMine[this.countMine].childNodes[0] as HTMLElement;
    el.innerHTML = status;
    this.ShowElementMine();
    this.ShowElementYour();

  }

  Progress(event, prog) {
    event['target']['parentNode'].style.display = 'none';
    let el = this.elementMine[this.countMine].childNodes[0] as HTMLElement;
    el.innerHTML = prog;
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
