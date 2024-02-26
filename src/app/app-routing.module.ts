import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuardian } from './components/login/guardian';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full',
  },
  {
    path: 'movies',
    loadChildren: () => import('./pages/movies/movies.module').then( m => m.MoviesPageModule),
  },
  {
    path: 'movies/:id',
    loadChildren: () => import('./pages/movie-details/movie-details.module').then( m => m.MovieDetailsPageModule),
    canActivate: [LoginGuardian]
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [LoginGuardian]
  },
  {
    path: 'adv-search',
    loadChildren: () => import('./pages/adv-search/adv-search.module').then( m => m.AdvSearchPageModule),
    canActivate: [LoginGuardian]
  },
  {
    path: 'login',
    component: LoginComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
