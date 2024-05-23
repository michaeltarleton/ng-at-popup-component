import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User, UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-mention-input',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './mention-input.component.html',
  styleUrl: './mention-input.component.scss'
})
export class MentionInputComponent {

  filteredUsers: User[] = [];
  showDropdown = false;
  inputValue = '';
  selectedIndex: number = 0

  constructor(private userService: UserServiceService){}

  filterUsers(event: any): void {
    const div = event.target as HTMLDivElement;
    const lastChar = div.innerHTML ? div.innerHTML[div.innerHTML.length - 1] : '';

    if (lastChar === '@') {
      this.showDropdown = true;
      this.filteredUsers = this.userService.getAll()
    } else if (this.showDropdown) {
      const atIndex = div.innerHTML ? div.innerHTML.lastIndexOf('@') : -1;
      const searchString = div.innerHTML ? div.innerHTML.substring(atIndex + 1) : '';

      // Filter the users
      this.filteredUsers = this.userService.find(searchString)

      // Reset the selected index
      this.selectedIndex = 0
    }
  }

  changeSelectedUser(event: any) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.selectedIndex = this.selectedIndex >= this.filteredUsers.length ? this.filteredUsers.length - 1 : this.selectedIndex + 1
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.selectedIndex = this.selectedIndex > 0 ? this.selectedIndex - 1 : 0;
    }
  }

  onEnter(event: any): void {
    if (event.key === 'Enter') {
      this.showDropdown = false;
      event.preventDefault()
      this.selectUser(this.filteredUsers[this.selectedIndex], event.target)
    }
  }

  selectUser(user: User, messageBox: HTMLDivElement): void {
    const atIndex = messageBox.innerHTML.lastIndexOf('@');
    messageBox.innerHTML = messageBox.innerHTML?.substring(0, atIndex) + '@' + user.name + '&nbsp;'
    this.moveCursorToEnd(messageBox)
    this.showDropdown = false;
  }

  private moveCursorToEnd(el: HTMLElement): void {
    el.focus();
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(false);
    sel?.removeAllRanges();
    sel?.addRange(range);
    el.focus()
  }
}
