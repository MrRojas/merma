import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditProveedorPage } from './edit-proveedor.page';

describe('EditProveedorPage', () => {
  let component: EditProveedorPage;
  let fixture: ComponentFixture<EditProveedorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProveedorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditProveedorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
