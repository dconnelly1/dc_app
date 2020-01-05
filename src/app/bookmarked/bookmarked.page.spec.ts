import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookmarkedPage } from './bookmarked.page';

describe('BookmarkedPage', () => {
  let component: BookmarkedPage;
  let fixture: ComponentFixture<BookmarkedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookmarkedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookmarkedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
