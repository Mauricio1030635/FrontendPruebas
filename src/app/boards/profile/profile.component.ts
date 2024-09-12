import { Component, inject, OnInit } from '@angular/core';
import { ProfileService } from '../../../Services/profile.service';
import { User } from '../../../Models/user';
import { TaskService } from '../../../Services/task.service';
import { TaskDto } from '../../../Models/ModelTask';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  private authService = inject(ProfileService)
  private taskService = inject(TaskService)
  totalTasks: number = 0;
  completedTasks: number = 0;


  user!: User;
  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.loadTasksByUserId(this.user['id']);
  }


  loadTasksByUserId(userId: string): void {
    this.taskService.getTasksByUserId(userId).subscribe(
      (tasks: TaskDto[]) => {
        this.totalTasks = tasks.length;
        this.completedTasks = tasks.filter(task => task.completado).length;
      },
      (error) => {
        console.error('Error al obtener las tareas:', error);
      }
    );
  }

}
