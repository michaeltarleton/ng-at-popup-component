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
  public isFocus: boolean = false

  private regex: RegExp = new RegExp(/[a-zA-Z0-9()\[\] -]/,'i')

  type($event: any) {
    const { key, keyCode, shiftKey } = $event
    const atKeyCode: number = 50
    const backspaceKeyCode: number = 8

    console.log('type', $event.key, $event.which, $event.keyCode, $event)

    // We should start looking up the list of names in the service
    if(shiftKey && keyCode === atKeyCode) {
      this.dropdownComponent?.focusInput()
      this.searchString = ''
    }

    // If the key is backspace, remove the last character
    // Else if the key is a single character (exclude the "ins", "home", etc. buttons)
    // Then add to the search string
    if(keyCode === backspaceKeyCode) {
      this.searchString = this.searchString.slice(0, this.searchString.length-1)
    } else if(key.length === 1 && this.regex.test(key)) {
        this.searchString += $event.key
    }

    // Move the cursor to the end of the text box
    this.moveCursorToEnd($event.target)
    this.dropdownComponent
  }

  onBlur() {
    this.isFocus = false
  }

  onFocus($event: any) {
    this.isFocus = true
    this.moveCursorToEnd($event.target)
  }

  remove($event: Event) {
    console.log('remove', $event, $event.target)
    const factory = this.comment!.createComponent(AtUsernameComponent)
    const instance = factory?.instance as AtUsernameComponent

    this.componentRefs.push(factory)
  }

  search($event: any) {
    console.log('search', $event, $event.target)
    const factory = this.comment!.createComponent(AtUsernameComponent)
    const instance = factory?.instance as AtUsernameComponent
    instance.searchString = this.searchString
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
