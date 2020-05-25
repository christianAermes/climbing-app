import bcrypt from "bcrypt"
import {Connection} from "./Connection"

export const checkIfUsernameExists = async(username) => {
    return new Promise((resolve, reject) => {
        // let query = `SELECT EXISTS (SELECT * FROM users WHERE user_name='${username}')`
        let query = `SELECT * FROM users WHERE user_name='${username}' LIMIT 1`
        Connection.query(query, (err, res)=>{
            if (err) {
                return reject(err)
            }
            return resolve(res.length>0)
        })
    })
}

export const checkIfEmailExists = async(email) => {
    return new Promise((resolve, reject) => {
        // let query = `SELECT EXISTS (SELECT * FROM users WHERE user_name='${username}')`
        let query = `SELECT * FROM users WHERE email='${email}' LIMIT 1`
        Connection.query(query, (err, res)=>{
            if (err) {
                console.log(err)
                return reject(err)
            }
            console.log(res)
            return resolve(res.length>0)
        })
    })
}

export const hashPassword = async (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash)=>{
            if (err) reject(err)
            return resolve(hash)
        })
    })
    
}


const insertNewUser = async(username, password, email) => {
    let hash = await hashPassword(password)
    let userExists = await checkIfUsernameExists(username)
    let emailExists = await checkIfEmailExists(email)
    
    if (userExists) {
        return {success: false, message: "Username already exists."}
    }
    if (emailExists) {
        return {success: false, message: "Email already exists."}
    }

    return new Promise((resolve, reject) => {
        
        Connection.query(`INSERT INTO users (user_name, password, email) 
                            VALUES ('${username}', '${hash}', '${email}')`, 
                            (err, res) => {
                                if (err) reject(err)
                                return resolve({success: true, message:"Successfully registered new user.", res: res})
                            })
    })
}

export default insertNewUser