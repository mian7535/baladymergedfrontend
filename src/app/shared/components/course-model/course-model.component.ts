import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHelperComponent } from '../translate-helper/translate-helper.component';

@Component({
  selector: 'app-course-model',
  templateUrl: './course-model.component.html',
  styleUrls: ['./course-model.component.scss'],
})
export class CourseModelComponent extends TranslateHelperComponent implements OnInit {
  @Output() closeModel = new EventEmitter<any>();
  @Input() type: any = 'other-pdf';
  @Input() pdfVideoSource: any;

  showModel = false;

  constructor(translateService: TranslateService) {
    super(translateService);
  }

  ngOnInit() {}

  toggleModel() {
    this.closeModel.emit(false);
  }
}
