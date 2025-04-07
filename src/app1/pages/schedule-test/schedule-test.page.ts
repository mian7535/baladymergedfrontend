import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateHelperComponent } from 'src/app/shared/components/translate-helper/translate-helper.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-schedule-test',
  templateUrl: './schedule-test.page.html',
  styleUrls: ['./schedule-test.page.scss'],
})
export class ScheduleTestPage extends TranslateHelperComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  users: any[] = [];
  dataSource1: any;
  displayedColumns = [
    'testTitle',
    'course',
    'student',
    'assignDate',
    'completeDate',
  ];
  // displayedFooterColumns = ['id'];

  constructor(translateService: TranslateService) {
    super(translateService);
    this.users = [
      {
        id: 1,
        testTitle: 'Test Title',
        course: 'Course Title',
        student: 'Student Name',
        assignDate: '11/02/2001',
        completeDate: '12/02/2001',
      },
      {
        id: 2,
        testTitle: 'Test Title',
        course: 'Course Title',
        student: 'Student Name',
        assignDate: '11/02/2001',
        completeDate: '12/02/2001',
      },
      {
        id: 3,
        testTitle: 'Test Title',
        course: 'Course Title',
        student: 'Student Name',
        assignDate: '11/02/2001',
        completeDate: '12/02/2001',
      },
      {
        id: 4,
        testTitle: 'Test Title',
        course: 'Course Title',
        student: 'Student Name',
        assignDate: '11/02/2001',
        completeDate: '12/02/2001',
      },
      {
        id: 5,
        testTitle: 'Test Title',
        course: 'Course Title',
        student: 'Student Name',
        assignDate: '11/02/2001',
        completeDate: '12/02/2001',
      },
      {
        id: 6,
        testTitle: 'Test Title',
        course: 'Course Title',
        student: 'Student Name',
        assignDate: '11/02/2001',
        completeDate: '12/02/2001',
      },
    ];

    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource1 = this.users;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  addData() {
    // this.users.push(createNewUser(this.users.length + 1));
    this.refresh();
  }

  deleteData() {
    // delete data
    const index: number = Math.round(Math.random() * (this.users.length - 1));
    console.log('delete index : ' + index);
    this.users.splice(index, 1);
    this.refresh();
  }

  private refresh() {
    console.log('refresh');
    this.dataSource.data = this.users;
  }
}
