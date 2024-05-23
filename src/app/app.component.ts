import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MentionInputComponent } from './mention-input/mention-input.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MentionInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Welcome the @ comment component';
}
