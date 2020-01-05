import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewsarticlePage } from './newsarticle.page';

describe('NewsarticlePage', () => {
  let component: NewsarticlePage;
  let fixture: ComponentFixture<NewsarticlePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsarticlePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewsarticlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
