import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListProveedoresPage } from './list-proveedores.page';

describe('ListProveedoresPage', () => {
  let component: ListProveedoresPage;
  let fixture: ComponentFixture<ListProveedoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProveedoresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListProveedoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
