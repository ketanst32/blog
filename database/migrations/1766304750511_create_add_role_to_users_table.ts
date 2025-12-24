import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'add_role_to_users'

  async up() {
    this.schema.alterTable('users', (table) => {
      table.string('role',50).defaultTo('user')
    })
  }

  async down() {
        this.schema.alterTable('users', (table) => {
      table.dropColumn('role') 
    })

  }
}