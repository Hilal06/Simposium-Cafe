import { AngularFireModule } from '@angular/fire';
import { UserService } from './service/user.service';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule,  CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './frontend/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { LogInComponent } from './frontend/log-in/log-in.component';
import { RegisterComponent } from './frontend/register/register.component';
import { MenuComponent } from './frontend/menu/menu.component';
import { NavbarComponent } from './frontend/navbar/navbar.component';
import { AboutComponent } from './frontend/about/about.component';
import { ContactComponent } from './frontend/contact/contact.component';
import { ContactFormComponent } from './frontend/contact-form/contact-form.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AdminKasirComponent } from './frontend/admin-kasir/admin-kasir.component';
import { AdminComponent } from './frontend/admin/admin.component';
import { CryptoService } from "../app/service/crypto.service";
import { AdminMenuComponent } from './frontend/admin-menu/admin-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LogInComponent,
    RegisterComponent,
    MenuComponent,
    NavbarComponent,
    AboutComponent,
    ContactComponent,
    ContactFormComponent,
    AdminKasirComponent,
    AdminComponent,
<<<<<<< HEAD
    AdminMenuComponent,
=======
    AdminKokiComponent,
>>>>>>> c8c9e7c0800e8bee04b74df466888dcac7672dcf


  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [
    UserService,
    CryptoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
