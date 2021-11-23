import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//components
import { HomeComponent } from './components/home/home.component';
import { CreateComponent } from './components/create/create.component'; 
import { BrowseComponent } from './components/browse/browse.component'; 
import { QuestionsComponent } from './components/questions/questions.component'; 

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create', component: CreateComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'questions', component: QuestionsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
