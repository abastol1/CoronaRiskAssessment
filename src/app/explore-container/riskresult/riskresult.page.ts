import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-riskresult',
  templateUrl: './riskresult.page.html',
  styleUrls: ['./riskresult.page.scss'],
})
export class RiskresultPage implements OnInit {

  constructor(
    public modalController: ModalController,
    private navParams: NavParams
  ) { }

  public prevention = {
    Low: ['Stay home and take care of yourself in home isolation',
      'Wash hands often', 'Cover your cough', 'SICK? Call ahead'],
    Medium: ['CONSULT A PHYSICIAN and start home isolation immediately',
      'Laboratory tests and imaging may be needed as per your physician\'s advice',
      'Monitor your symptoms and get medical attention if your situation worsens'],
    High: ['Seek immediate medical attention and get yourself tested',
      'Please visit a physician as there may be a requirement for further care',
      'COVID 19 testing may be needed at your physician’s advise',
      'Monitor your symptoms and isolate yourself'
    ]
  }

  public imagelink;

  public risk;
  public riskResult;

  ngOnInit() {
    console.log('Modal Received, Company Name: ', this.navParams.data.riskAnalysis);
    // companyName is passed from tab2
    this.risk = this.prevention[this.navParams.data.riskAnalysis];
    this.riskResult = this.navParams.data.riskAnalysis;

    if (this.navParams.data.riskAnalysis === 'Low') {
      this.imagelink = '../../../assets/low.png';
    }
    else if (this.navParams.data.riskAnalysis === 'Medium') {
      this.imagelink = '../../../assets/medium.png';
    }
    else {
      this.imagelink = '../../../assets/high.png';
    }
    console.log("Image Link: ", this.imagelink);

  }


  closeModal() {
    this.modalController.dismiss()
  }
}
