import { Routes } from "@angular/router"
import { ShellComponent } from "./layouts/shell/shell.component"
import { NotFoundComponent } from "./pages/errors/not-found/not-found.component"
import { HomeComponent } from "./pages/home/home.component"

export const routes: Routes = [
    { 
      path: '',
      component: ShellComponent,
      children: [
        { path: "", component: HomeComponent },
        { path: "404", component: NotFoundComponent, data: { title: "Página não encontrada" } },
        { path: "**", redirectTo: "404" },
      ]
    },
]
