import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'course',
    loadChildren: () =>
      import('./pages/course/course.module').then((m) => m.CoursePageModule),
  },
  {
    path: 'course/:id',
    loadChildren: () =>
      import('./pages/course/course.module').then((m) => m.CoursePageModule),
  },
  {
    path: 'course-details/:id',
    loadChildren: () =>
      import('./pages/course-details/course-details.module').then(
        (m) => m.CourseDetailsPageModule,
      ),
  },
  {
    path: 'course-details',
    loadChildren: () =>
      import('./pages/course-details/course-details.module').then(
        (m) => m.CourseDetailsPageModule,
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'home/:slag',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'open-id-connect',
    loadChildren: () =>
      import('./pages/open-id-connect/open-id-connect.module').then(
        (m) => m.OpenIdConnectPageModule,
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardPageModule,
      ),
  },
  {
    path: 'my-courses',
    loadChildren: () =>
      import('./pages/my-courses/my-courses.module').then(
        (m) => m.MyCoursesPageModule,
      ),
  },
  {
    path: 'exam',
    loadChildren: () =>
      import('./pages/exam/exam.module').then((m) => m.ExamPageModule),
  },
  {
    path: 'schedule-test',
    loadChildren: () =>
      import('./pages/schedule-test/schedule-test.module').then(
        (m) => m.ScheduleTestPageModule,
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfilePageModule),
  },
  {
    path: 'start-exam/:id',
    loadChildren: () =>
      import('./pages/start-exam/start-exam.module').then(
        (m) => m.StartExamPageModule,
      ),
  },
  {
    path: 'knowledge-check/:id',
    loadChildren: () =>
      import('./pages/knowledge-check/knowledge-check.module').then(
        (m) => m.KnowledgeCheckPageModule,
      ),
  },  {
    path: 'unauthorized',
    loadChildren: () => import('./pages/unauthorized/unauthorized.module').then( m => m.UnauthorizedPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
