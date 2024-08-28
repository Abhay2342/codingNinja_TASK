import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { CommonModule } from '@angular/common'; // Import CommonModule for ngFor
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule] // Add CommonModule here
})
export class TaskManagerComponent {
  task = {
    title: '',
    description: '',
    dueDate: '',
    priority: '',
    status: ''
  };
  tasks: any[] = []; // Initialize tasks array
  constructor(private router: Router) {}

  onSubmit(taskForm: any) {
    if (taskForm.valid) {
      // Handle form submission
    }
  }

  updateTaskStatus(id: string, status: string) {
    const userEmail = 'example@example.com'; // Replace with actual user email
    // Update task status logic
  }

  deleteTask(id: string) {
    const userEmail = 'example@example.com'; // Replace with actual user email
    // Delete task logic
  }
  logout() {
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
}
}
