import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import {IonicModule, IonicRouteStrategy, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP } from '@ionic-native/http/ngx';
import {SynchronizeService} from "./providers/synchronize.service";
import { SQLite } from '@ionic-native/sqlite/ngx';
import {HttpBackend, HttpClientModule, HttpXhrBackend} from "@angular/common/http";
import {GlobalService} from "./providers/global.service";
import { AutoCompleteModule } from 'ionic4-auto-complete';
import {FormsModule} from "@angular/forms";
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { IonicStorageModule } from '@ionic/storage';
import {MermaService} from "./providers/merma.service";
import {NativeHttpBackend, NativeHttpFallback, NativeHttpModule} from "ionic-native-http-connection-backend";
import { IonicSelectableModule } from 'ionic-selectable';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [
  ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    HttpClientModule,
    AutoCompleteModule, FormsModule,
    IonicStorageModule.forRoot({
      name: 'mermas.db',
      driverOrder: ['sqlite', 'indexeddb', 'websql']
    }),
    NativeHttpModule,
    IonicSelectableModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    Camera,
    SynchronizeService,
      MermaService,
      GlobalService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      SQLite,
    {provide: HttpBackend, useClass: NativeHttpFallback, deps: [Platform, NativeHttpBackend, HttpXhrBackend]},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
