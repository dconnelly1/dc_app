import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsarticlePageRoutingModule } from './newsarticle-routing.module';

import { NewsarticlePage } from './newsarticle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsarticlePageRoutingModule
  ],
  declarations: [NewsarticlePage]
})
export class NewsarticlePageModule {}
