import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListBuyPage } from './list-buy.page';

describe('ListBuyPage', () => {
  let component: ListBuyPage;
  let fixture: ComponentFixture<ListBuyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBuyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListBuyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
