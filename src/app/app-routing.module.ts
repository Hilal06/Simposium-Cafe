import { AuthService } from './frontend/services/auth.service';
import { KasirComponent } from './frontend/kasir/kasir.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './frontend/log-in/log-in.component';
import { RegisterComponent } from './frontend/register/register.component';
import { MenuComponent } from './frontend/menu/menu.component';
import { HomeComponent } from "./frontend/home/home.component";
import { AboutComponent } from './frontend/about/about.component';
import { ContactComponent } from './frontend/contact/contact.component';
import { ContactFormComponent } from './frontend/contact-form/contact-form.component';
import { AdminKasirComponent } from "./frontend/admin-kasir/admin-kasir.component";
import { AdminComponent } from "./frontend/admin/admin.component";
import { AdminKokiComponent } from "./frontend/admin-koki/admin-koki.component";
import { AuthGuard } from './frontend/guars/auth.guard';
import { KokiComponent } from './frontend/koki/koki.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LogInComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'menu', component: MenuComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'kasir', component: KasirComponent},
  {path: 'contact-form', component: ContactFormComponent},
  {path: 'admin-kasir', component: AdminKasirComponent},
  {path: 'admin-koki', component: AdminKokiComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  {path: 'koki', component: KokiComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
