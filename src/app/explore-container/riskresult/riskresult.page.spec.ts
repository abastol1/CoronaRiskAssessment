import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RiskresultPage } from './riskresult.page';

describe('RiskresultPage', () => {
  let component: RiskresultPage;
  let fixture: ComponentFixture<RiskresultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskresultPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RiskresultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
