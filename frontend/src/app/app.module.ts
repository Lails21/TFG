import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule, MatCard, MatCardTitle, MatCardModule, MatInputModule} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { DetailComponent } from './components/detail/detail.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import {HttpClientModule} from '@angular/common/http';
import { QRCodeModule } from 'angularx-qrcode';
import { SafePipe } from './safe.pipe';
import { ConcertsComponent } from './components/concerts/concerts.component';
import { ExchangeComponent } from './components/exchange/exchange.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QrFriendComponent } from './components/qr-friend/qr-friend.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DetailComponent,
    PurchaseComponent,
    SafePipe,
    ConcertsComponent,
    ExchangeComponent,
    QrFriendComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatCardModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
    QRCodeModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
