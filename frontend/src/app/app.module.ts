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
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { DataService } from './services/data.service';
import {HttpClientModule} from '@angular/common/http';
import { QRCodeModule } from 'angularx-qrcode';
import { SafePipe } from './safe.pipe';
import { ConcertsComponent } from './components/concerts/concerts.component';
import { ExchangeComponent } from './components/exchange/exchange.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QrFriendComponent } from './components/qr-friend/qr-friend.component';
import { ToastrModule } from 'ngx-toastr';
import { VerificationComponent } from './components/verification/verification.component';

const config: SocketIoConfig = {url: 'http://localhost:3000', options: {}};

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DetailComponent,
    PurchaseComponent,
    SafePipe,
    ConcertsComponent,
    ExchangeComponent,
    QrFriendComponent,
    VerificationComponent
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
    ToastrModule.forRoot(),
    SocketIoModule.forRoot(config)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
