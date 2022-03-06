const Writer = require('../models/Writer')
module.exports = (req, res, next)=>{
    const [username, salt, key]=req.headers.authorization.split(":")
    Writer.findOne({username: username}).then(result=>{
        if(result){
            const match = result.password === `${salt}:${key}` 
            if(match){
                next()
            }
            else{
                res.status(401).json({message:"not authorized"})
            }
        }
        else{
            res.status(401).json({message:"not authorized"})
        }
    }
    ).catch(err=>res.status(500).json({message: err}))
}