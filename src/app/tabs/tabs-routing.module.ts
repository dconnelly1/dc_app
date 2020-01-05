import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'news',
        loadChildren: () => import('../news/news.module').then( m => m.NewsPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then( m => m.SettingsPageModule)
      },
      {
        path: 'bookmarked',
        loadChildren: () => import('../bookmarked/bookmarked.module').then( m => m.BookmarkedPageModule)
      },
      {
        path: 'newsarticle',
        loadChildren: () => import('../newsarticle/newsarticle.module').then( m => m.NewsarticlePageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
