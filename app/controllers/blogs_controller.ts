import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import Blog from '#models/blog'
import { createPostValidator, updatePostValidator } from '#validators/blog_post'
export default class BlogsController {
  // for getting all blogs  #get All
  public async getAll({ auth, response }: HttpContext) {
    await auth.authenticate()
    const user = auth.user as User
    const pk = user.id
    const blogs = await Blog.query().where('author_id', pk)
    return response.ok({
      status: 'success',
      data: blogs,
    })
  }

  // for creating new blog #post
  public async create({ auth, request, response }: HttpContext) {
    try {
      await auth.authenticate()
      const user = auth.user as User
      const data = request.all()
      const payload = await createPostValidator.validate(data)
      //const { title, content } = request.only(['title', 'content'])
      const blog = await Blog.create({
        title: payload.title,
        content: payload.content,
        authorId: user.id,
      })

      return response.created({
        status: 'success',
        data: blog,
      })
    } catch (error) {
      return response.badRequest({
        status: 'error',
        message: 'Failed to create blog',
        details: error.message,
      })
    }
  }
}
