import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../Services/profile.service';
import { TaskService } from '../../../Services/task.service';
import { TaskDto, UpdateTaskDto } from '../../../Models/ModelTask';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  user: any;
  nameUser: string = ""
  UpdateTaskDto!: UpdateTaskDto

  constructor(private authService: ProfileService, private taskService: TaskService) { }

  tasks: TaskDto[] = [];
  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.nameUser = `Welcome ${this.user['name'] || 'Usuario'}`

    this.loadTasksByUserId(this.user['id']);
  }

  loadTasksByUserId(userId: string): void {
    this.taskService.getTasksByUserId(userId).subscribe(
      (tasks: TaskDto[]) => {
        this.tasks = tasks;
      },
      (error) => {
        console.error('Error al obtener las tareas:', error);
      }
    );
  }


  onToggleComplete(task: TaskDto): void {

    this.UpdateTaskDto = { ...task, completado: !task.completado, UserId: this.user['id'] };

    this.taskService.updateTask(this.UpdateTaskDto).subscribe(
      () => {
        this.loadTasksByUserId(this.user['id']);
        Swal.fire('Update Task', 'Update Task!', 'success');
      },
      (error) => console.error('Error updating task', error)
    );
  }


  onDeleteTask(taskId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.deleteTask(taskId).subscribe(
          () => {
            this.loadTasksByUserId(this.user['id']);
            Swal.fire(
              'Deleted!',
              'Your task has been deleted.',
              'success'
            );
          },
          (error) => {
            Swal.fire(
              'Error!',
              'There was an issue deleting the task.',
              'error'
            );
          }
        );
      }
    });
  }


}
