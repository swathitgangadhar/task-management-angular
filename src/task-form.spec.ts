import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskFormComponent } from './task-form.component';
import { FormsModule } from '@angular/forms';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskFormComponent],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;

    component.task = {
      id: '1',
      title: 'Initial Task',
      labels: []
    };

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should add a label when checkbox is checked', () => {
    component.toggleLabel('urgent', true);
    expect(component.task.labels).toContain('urgent');
  });

  it('should remove a label when checkbox is unchecked', () => {
    component.task.labels = ['urgent', 'bug'];
    component.toggleLabel('bug', false);
    expect(component.task.labels).not.toContain('bug');
  });

  it('should not add duplicate labels', () => {
    component.task.labels = ['feature'];
    component.toggleLabel('feature', true);
    const filtered = component.task.labels.filter(l => l === 'feature');
    expect(filtered.length).toBe(1);
  });
});
