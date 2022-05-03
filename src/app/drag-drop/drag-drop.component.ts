import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Options } from 'sortablejs';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})
export class DragDropComponent implements OnInit {

  users:any = [];
  childArr = ['element-1','element-2','element-3','element-4']
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  dropTargetIds = [];
  dragCls:any = '';
  groups:Array<any> = [
    {
      name: 'Section A',
      items: [{name: 'Item A', items: [{name: 'Item A'}, {name: 'Item B'}, {name: 'Item C'}, {name: 'Item D'}]}, {name: 'Item B', items: [{name: 'Item A'}, {name: 'Item B'}, {name: 'Item C'}, {name: 'Item D'}]}, {name: 'Item C', items: [{name: 'Item A'}, {name: 'Item B'}, {name: 'Item C'}, {name: 'Item D'}]}, {name: 'Item D', items: [{name: 'Item A'}, {name: 'Item B'}, {name: 'Item C'}, {name: 'Item D'}]}]
    },
    {
      name: 'Section B',
      items: [{name: 'Item 1', items: [{name: 'Item 1'}, {name: 'Item 2'}, {name: 'Item 3'}, {name: 'Item 4'}]}, {name: 'Item 2', items: [{name: 'Item 1', }, {name: 'Item 2'}, {name: 'Item 3'}, {name: 'Item 4'}]}, {name: 'Item 3', items: [{name: 'Item 1', }, {name: 'Item 2'}, {name: 'Item 3'}, {name: 'Item 4'}]}, {name: 'Item 4', items: [{name: 'Item 1', }, {name: 'Item 2'}, {name: 'Item 3'}, {name: 'Item 4'}]}]
    },
    {
      name: 'Section C',
      items: [{name: 'Item !', items: [{name: 'Item !'}, {name: 'Item @'}, {name: 'Item #'}, {name: 'Item $'}]}, {name: 'Item @', items: [{name: 'Item !'}, {name: 'Item @'}, {name: 'Item #'}, {name: 'Item $'}]}, {name: 'Item #', items: [{name: 'Item !'}, {name: 'Item @'}, {name: 'Item #'}, {name: 'Item $'}]}, {name: 'Item $', items: [{name: 'Item !'}, {name: 'Item @'}, {name: 'Item #'}, {name: 'Item $'}]}]
    }
  ];

  constructor(private apiservice:ApiService) { 
  }

  ngOnInit() {
    this.getUsersData();
  }

  scrollableSectionOptions: Options = {
    group: 'section',
    scroll: true,
    sort: true,
    // handle: 'my-handle',
    // dragoverBubble: false,
    // fallbackOnBody: false,
    // draggable: "."+this.dragCls,
    scrollSensitivity: 100,
    animation: 300,
    onUpdate: (event: any) => {
      // console.log(event);
    },
    onStart: function (/**Event*/evt) {
      // console.log(evt.oldIndex);  // element index within parent
    },
    onChoose: function (/**Event*/evt) {
      // this.dragClass = evt.target.getAttribute('NAME');  // element index within parent
    },
  };  

  scrollableRowOptions: Options = {
    group: 'row',
    scroll: true,
    sort: true,
    scrollSensitivity: 100,
    animation: 300,
    onUpdate: (event: any) => {
      // console.log(event);
    },
    onStart: function (/**Event*/evt) {
      // console.log(evt.oldIndex);  // element index within parent
    },
    onChoose: function (/**Event*/evt) {
      // this.dragClass = evt.target.getAttribute('NAME');  // element index within parent
    },
  };  

  scrollableColumnOptions: Options = {
    group: 'column',
    scroll: true,
    sort: true,
    scrollSensitivity: 100,
    animation: 300,
    onUpdate: (event: any) => {
      // console.log(event);
    },
    onStart: function (/**Event*/evt) {
      // console.log(evt.oldIndex);  // element index within parent
    },
    onChoose: function (/**Event*/evt) {
      // this.dragClass = evt.target.getAttribute('NAME');  // element index within parent
    },
  };  

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.users, event.previousIndex, event.currentIndex);
  }

  dropTodo(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  getUsersData() {
    this.apiservice.getUsers()
    .subscribe(resp=>{
      this.users = resp.data;
      this.users.forEach((element:any) => {
        var arr = this.childArr.map(item=>{return element.course+'-'+item});
        element.child = arr;
      });
    })
  }

  addNewSection() {
    var obj:any = new Object();
    obj.name = 'Group '+this.groups.length;
    obj.items = this.groups[0].items;
    this.groups.push(obj);
  }

  removeTopSection() {
    this.groups.shift();
  }

  removeBottomSection() {
    this.groups.pop();
  }
}
