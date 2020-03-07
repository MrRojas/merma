import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuyStep2Page } from './buy-step2.page';

describe('BuyStep2Page', () => {
  let component: BuyStep2Page;
  let fixture: ComponentFixture<BuyStep2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyStep2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuyStep2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
