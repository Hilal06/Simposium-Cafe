import { KasirComponent} from './frontend/kasir/kasir.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
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
import { AdminKokiComponent } from "./frontend/admin-koki/admin-koki.component";
import { AdminMenuComponent } from './frontend/admin-menu/admin-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from "./frontend/guars/auth.guard";
import { DetailMenuBottomSheetComponent } from './dialog/detail-menu-bottom-sheet/detail-menu-bottom-sheet.component';
import { KokiComponent } from './frontend/koki/koki.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LogInComponent,
    RegisterComponent,
    MenuComponent,
    NavbarComponent,
    AboutComponent,
    AdminKokiComponent,
    ContactComponent,
    ContactFormComponent,
    AdminKasirComponent,
    AdminComponent,
    AdminMenuComponent,
    AdminKokiComponent,
    KasirComponent,
    DetailMenuBottomSheetComponent,
    KokiComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
  entryComponents:[
    DetailMenuBottomSheetComponent,
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [
    UserService,
    CryptoService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
