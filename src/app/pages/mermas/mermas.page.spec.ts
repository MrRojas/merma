import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MermasPage } from './mermas.page';

describe('MermasPage', () => {
  let component: MermasPage;
  let fixture: ComponentFixture<MermasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MermasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MermasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
