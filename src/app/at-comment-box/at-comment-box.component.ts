import { Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { AtUsernameComponent } from '../at-username/at-username.component';

@Component({
  selector: 'app-at-comment-box',
  standalone: true,
  imports: [AtUsernameComponent],
  templateUrl: './at-comment-box.component.html',
  styleUrl: './at-comment-box.component.scss'
})
export class AtCommentBoxComponent {
  public content: string = ''
  type($event: any) {
    this.content += $event.key
    this.moveCursorToEnd($event.target)
  }
  isFocus: boolean = false
  onBlur() {
    this.isFocus = false
  }
  onFocus($event: any) {
    this.isFocus = true
    this.moveCursorToEnd($event.target)
  }
  @ViewChild('comment', { read: ViewContainerRef }) comment: ViewContainerRef | undefined
  componentRefs: ComponentRef<any>[] = []

  remove($event: Event) {
    console.log($event, $event.target)
    const factory = this.comment!.createComponent(AtUsernameComponent)
    const instance = factory?.instance as AtUsernameComponent
    // instance.someproperty = 'somevalue'

    this.componentRefs.push(factory)
  }

  search($event: any) {
    console.log($event, $event.target)
    const factory = this.comment!.createComponent(AtUsernameComponent)
    const instance = factory?.instance as AtUsernameComponent
    // instance.someproperty = 'somevalue'

    this.componentRefs.push(factory)
  }

  moveCursorToEnd(element: any) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false);
    selection?.removeAllRanges();
    selection?.addRange(range);
  }

}
