import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ActionFooterComponent } from './components/action-footer/action-footer.component';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from './components/footer/footer.component';
import { SharedService } from './service/shared.service';
import { SafePipe } from './pipes/safe.pipes';
import { GiveFeedbackComponent } from './components/give-feedback/give-feedback.component';
import { ExamCompletedComponent } from './components/exam-completed/exam-completed.component';
import { ExamFailComponent } from './components/exam-fail/exam-fail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { FinishExamComponent } from './components/finish-exam/finish-exam.component';
import {
  TranslateLoader,
  TranslateModule,
  TranslatePipe,
} from '@ngx-translate/core';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CourseModelComponent } from './components/course-model/course-model.component';
import { NotRegisteredComponent } from './components/not-registered/not-registered.component';
import { DescriptionProblemComponent } from './components/description-problem/description-problem.component';
import { FinalExamFailedComponent } from './components/final-exam-failed/final-exam-failed.component';
import { NotQualifiedComponent } from './components/not-qualified/not-qualified.component';
import { ApiPrefixInterceptor } from './interceptors/api-prefix.interceptor';
import { ExamPassedComponent } from './components/exam-passed/exam-passed.component';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function httpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    NgbModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  declarations: [
    HeaderComponent,
    ActionFooterComponent,
    FooterComponent,
    SafePipe,
    GiveFeedbackComponent,
    ExamCompletedComponent,
    ExamFailComponent,
    FinishExamComponent,
    CourseModelComponent,
    NotQualifiedComponent,
    NotRegisteredComponent,
    FinalExamFailedComponent,
    DescriptionProblemComponent,
    ExamPassedComponent,
  ],
  exports: [
    TranslatePipe,
    HeaderComponent,
    ActionFooterComponent,
    FooterComponent,
    SafePipe,
    GiveFeedbackComponent,
    ExamCompletedComponent,
    ExamFailComponent,
    FinishExamComponent,
    CourseModelComponent,
    NotQualifiedComponent,
    NotRegisteredComponent,
    FinalExamFailedComponent,
    DescriptionProblemComponent,
    ExamPassedComponent,
  ],
  providers: [
    SharedService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true,
    },
  ],
})
export class SharedModule {}
