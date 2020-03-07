import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuyStep3Page } from './buy-step3.page';

describe('BuyStep3Page', () => {
  let component: BuyStep3Page;
  let fixture: ComponentFixture<BuyStep3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyStep3Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuyStep3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
