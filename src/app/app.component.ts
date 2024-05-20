import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AtCommentBoxComponent } from './at-comment-box/at-comment-box.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AtCommentBoxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Welcome the @ comment component';
}
