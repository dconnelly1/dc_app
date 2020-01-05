import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsarticlePage } from './newsarticle.page';

const routes: Routes = [
  {
    path: '',
    component: NewsarticlePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsarticlePageRoutingModule {}
