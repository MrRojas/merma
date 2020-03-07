import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuyStep1Page } from './buy-step1.page';

describe('BuyStep1Page', () => {
  let component: BuyStep1Page;
  let fixture: ComponentFixture<BuyStep1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyStep1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuyStep1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
