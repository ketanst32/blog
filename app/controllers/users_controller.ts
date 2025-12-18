//import type { HttpContext } from '@adonisjs/core/http'
//import User from "#models/user"
export default class UsersController {
    index() {
    return [
      {
        id: 1,
        username: 'virk',
      },
      {
        id: 2,
        username: 'romain',
      },
    ]
  }
  index2() {
    return [
      {
        id: 1,
        username: 'Ketan',
      },
      {
        id: 2,
        username: 'Pandey',
      },
    ]
  }
}