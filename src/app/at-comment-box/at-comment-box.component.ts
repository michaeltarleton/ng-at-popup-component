import { Component, ComponentRef, ViewChild, ViewContainerRef, viewChild } from '@angular/core';
import { AtUsernameComponent } from '../at-username/at-username.component';
import { AtDropdownComponent } from '../at-dropdown/at-dropdown.component';

@Component({
  selector: 'app-at-comment-box',
  standalone: true,
  imports: [AtUsernameComponent,AtDropdownComponent],
  templateUrl: './at-comment-box.component.html',
  styleUrl: './at-comment-box.component.scss'
})
export class AtCommentBoxComponent {
  @ViewChild('comment', { read: ViewContainerRef }) comment: ViewContainerRef | undefined
  componentRefs: ComponentRef<any>[] = []

  @ViewChild(AtDropdownComponent, {
    static: false
  }) dropdownComponent: AtDropdownComponent | undefined

  public searchString: string = ''
  type($event: any) {
    this.searchString += $event.key
    this.moveCursorToEnd($event.target)
    this.dropdownComponent
  }
  isFocus: boolean = false
  onBlur() {
    this.isFocus = false
  }
  onFocus($event: any) {
    this.isFocus = true
    this.moveCursorToEnd($event.target)
  }

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
