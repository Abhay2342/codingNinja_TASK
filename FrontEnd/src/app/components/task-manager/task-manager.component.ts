import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service'; // Import the TaskService
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { CommonModule } from '@angular/common'; // Import CommonModule for ngFor

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class TaskManagerComponent implements OnInit {
  task = {
    title: '',
    description: '',
    dueDate: '',
    priority: '',
    status: 'pending' // Default status
  };
  tasks: any[] = []; // Initialize tasks array

  constructor(private router: Router, private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const userEmail = userData.email;

    if (userEmail) {
      this.taskService.getTasks(userEmail).subscribe({
        next: (tasks) => {
          this.tasks = tasks;
        },
        error: (err) => {
          console.error('Error fetching tasks', err);
        }
      });
    } else {
      console.error('User email not found');
      this.router.navigate(['/login']);
    }
  }

  onSubmit(taskForm: NgForm) {
    if (taskForm.valid) {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
        const userEmail = user.email;

        this.taskService.createTask(this.task, userEmail).subscribe({
          next: (response) => {
            console.log('Task created successfully', response);
            this.tasks.push(response); // Add the new task to the list
            taskForm.reset(); // Reset the form after submission
          },
          error: (err) => {
            console.error('Error creating task', err);
          }
        });
      } else {
        console.error('User is not authenticated');
        this.router.navigate(['/login']);
      }
    }
  }

  updateTaskStatus(id: string, status: string) {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      const userEmail = user.email;

      this.taskService.updateTask(id, { status }, userEmail).subscribe({
        next: (response) => {
          console.log('Task updated successfully', response);
          const task = this.tasks.find((t) => t._id === id);
          if (task) {
            task.status = status;
          }
        },
        error: (err) => {
          console.error('Error updating task', err);
        }
      });
    }
  }

  deleteTask(id: string) {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      const userEmail = user.email;

      this.taskService.deleteTask(id, userEmail).subscribe({
        next: () => {
          console.log('Task deleted successfully');
          this.tasks = this.tasks.filter((task) => task._id !== id);
        },
        error: (err) => {
          console.error('Error deleting task', err);
        }
      });
    }
  }

  logout() {
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }
}
