import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private readonly USER_DATA: User[] = [
    {'userID' : 1, 'name' : 'Kevin'},
    {'userID' : 2, 'name' : 'Jeff'},
    {'userID' : 3, 'name' : 'Bryan'},
    {'userID' : 4, 'name' : 'Gabbey'},
  ]

  constructor() { }

  public getAll(): User[] {
    return this.USER_DATA.slice() ?? [];
  }

  public get(userID: number): User | undefined {
    return this.getAll()?.find(u => u.userID === userID)
  }

  public find(searchString?: string) {
    // If the search string is not provided, return an empty array
    if (searchString === null || searchString === undefined) {
      return []
    }

    // 1. Anchor first character
    // 2. Order by alphabet
    return this.getAll()
      .filter(u => u.name.toLocaleLowerCase().startsWith(searchString.toLocaleLowerCase()))
      .sort((a,b) => a > b ? 1 : a < b ? -1 : 0)
  }
}

export interface User {
  userID: number,
  name: string
}
