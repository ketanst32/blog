import Blog from '#models/blog'
import redis from '@adonisjs/redis/services/main'
import BlogDTO from '#DTOs/BlogDTO'
import { UpdateBlogDTO } from '#DTOs/UpdateBlogDTO'

export default class BlogService {
  private cacheKey(userId: number) {
    return `blogs:user:${userId}`
  }

  public async getAll(userId: number) {
    const cacheKey = this.cacheKey(userId)
    const cached = await redis.get(cacheKey)
    if (cached) {
      return { blogs: JSON.parse(cached), source: 'cache' }
    }
    const blogs = await Blog.query().where('author_id', userId)
    await redis.setex(cacheKey, 300, JSON.stringify(blogs))
    return { blogs, source: 'db' }
  }
  public async create(userId: number, dto: BlogDTO) {
    const blog = await Blog.create({
      title: dto.title,
      content: dto.content,
      authorId: userId,
    })
    await redis.del(this.cacheKey(userId))
    return blog
  }
  public async update(userId: number, blogId: number, dto: UpdateBlogDTO) {
    const blog = await Blog.find(blogId)
    if (!blog || blogId !== userId) {
      throw new Error('Not allowed')
    }
    if (dto.title) {
      blog.title = dto.title
    }
    if (dto.content) {
      blog.content = dto.content
    }
    await blog.save()
    // Invalidated Cache
    await redis.del(this.cacheKey(userId))
    return blog
  }
  public async delete(userId: number, blogId: number) {
    const blog = await Blog.find(blogId)
    if (!blog || blog.authorId !== userId) {
      throw new Error("blog can't be deleted")
    }
    await blog.delete()
    await redis.del(this.cacheKey(userId))
    return true
  }
}
