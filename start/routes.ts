/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/


//import UsersController from '#controllers/users_controller' // for eager loading 
const UsersController = () => import('#controllers/users_controller') // for lazy loading
//import app from '@adonisjs/core/services/app'
const AuthController = () => import('#controllers/auth_controller')
const BlogsController=()=>import('#controllers/blogs_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
//import AuthController from '#controllers/auth_controller'

//const authController = new AuthController()

router.post('/register', [AuthController,'register'])
router.post('/login', [AuthController,'login'])
router.get('/me', [AuthController,'me']).use(middleware.jwt())
router.get('/getAll',[BlogsController,'getAll']).use(middleware.jwt())
router.post('/blog',[BlogsController,'create']).use(middleware.jwt())

router.get('/', async () => {
  // console.log(app.getState())
  // console.log(process.env.NODE_ENV)   // 'development' or 'test' or 'production'
  // console.log(app.getEnvironment()) 
  return   'Hello world from the home page.'
  
})
router.get('/ip', async ({ request }) => {
  console.log(request.ip())
})
router.get('/about', () => {
  return 'This is the about page.'
}).middleware(middleware.auth())
router
  .get('/posts/:id', ({ params }) => {
    return "Allowed User id"
  })
  .where('id', {
    match: /^[0-9]+$/,
  })
  router.get('users', [UsersController, 'index2']) 
  