import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import jwt from 'jsonwebtoken'
import env from '#start/env'
export default class Authservice{

    async register(data:{
        fullName:string
        email:string
        password:string
    }){
        const user=await User.create({
            fullName:data.fullName,
            email:data.email,
            password:await hash.make(data.password),
        })
        return{
            id:user.id,
            fullName:user.fullName,
            email:user.email,
        }
    }
    async login(email:string,password:string){
        const user=await User.findBy('email',email)
        if(!user){
            throw new Error("Invalid credential")
        }
       const passwordValid = await hash.verify(user.password, password)
       if(!passwordValid){
        throw new Error("Invalid Credentials")
       }
       const token=jwt.sign(
        {userId:user.id,email:user.email},
        env.get('JWT_SECRET')!,
        {expiresIn:'15m'}
       )
       return {
      token,
      expiresIn: 900,
      tokenType: 'Bearer',
    }
    }

}