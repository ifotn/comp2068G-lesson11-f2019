import { Component, OnInit } from '@angular/core';

import { TaskService } from "../services/task.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers: [TaskService]
})

export class TaskComponent implements OnInit {
  tasks: any;

  // use dependency injection to provide the needed service to this component
  constructor(private taskService: TaskService) {
  }

  // when angular initializes this component, automatically call the api to get all tasks
  ngOnInit() {
    this.taskService.getTasks().subscribe(res => {
      console.log(res)
      this.tasks = res
    }, err => {
      console.log(err)
    })
  }
}
