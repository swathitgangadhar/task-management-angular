import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BoardComponent } from './board/board.component';


@NgModule({
  declarations: [AppComponent, BoardComponent],
  imports: [BrowserModule, DragDropModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
