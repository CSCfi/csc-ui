import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MigrationGuideComponent } from './migration-guide.component';

describe('MigrationGuideComponent', () => {
  let component: MigrationGuideComponent;
  let fixture: ComponentFixture<MigrationGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MigrationGuideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MigrationGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
