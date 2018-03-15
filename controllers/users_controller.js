const db = require('../config/db');
const jwt= require('jsonwebtoken');
const crypto = require('crypto').randomBytes(256).toString('hex');
const bcrypt = require('bcrypt-nodejs');


module.exports = (router) => {


     /* ========
  LOGIN ROUTE
  ======== */

    router.post('/login', (req, res) => {

        if (!req.body.username) {
            res.json({
                status: "false",
                count: 0,
                data: "No username was provided"
            });
        } else {
            if (!req.body.password) {
                res.json({
                    status: "false",
                    count: 0,
                    data: "No password was provided"
                });
            } else {
                var query="SELECT * FROM users where username='"+req.body.username+"'";
                db.query(query,(error, result)=>{
                    if(error){
                        res.json({
                            status: "false",
                            count: 0,
                            data: error
                        });
                    }else{
                        if(result.length==0)     
                        {
                            res.json({
                                status: "false",
                                count: 0,
                                data: "Username not found"
                            });
                        }else{
                            const validPassword= result[0].password.localeCompare(req.body.password);
                            if(validPassword!=0){
                                res.json({
                                    status: "false",
                                    count: 0,
                                    data: "Invalid password"
                                });
                            }else{
                                const token= jwt.sign({userId:result.id} , crypto, { expiresIn:'24h' }); //token
                                res.json({
                                    status: "true",
                                    count: result.count,
                                    data: {
                                        message:"Success",
                                        token: token,
                                        user:{
                                            username: result[0].username,
                                            group: result[0].groups_id
                                        }
                                    }
                                });

                            }
                        }

                    }
                });
            }
        }
    });


    /* ==============
     Register Route
  ============== */

    router.post('/register', (req, res) => {
        if(!req.body.username){
            res.json({
                status: "false",
                count: 0,
                data: "No username was provided"
            });
        }else{
            if(!req.body.password){
                res.json({
                    status: "false",
                    count: 0,
                    data: "No password was provided"
                });
            }else{
                if(!req.body.groups_id){
                    res.json({
                        status: "false",
                        count: 0,
                        data: "No groups_id was provided"
                    });
                }else{
                    var password;
                    bcrypt.hash(req.body.password, null, null, (err, hash) => {
                        if (err) return next(err); 
                        this.password = hash;   //hash password
                      });


                     var query="INSERT INTO users (username, password, groups_id) VALUES('"+req.body.username+"', '"+this.password+"', "+req.body.groups_id+")";
                     db.query(query,(error, result)=>{
                         if(error){
                            if(error.errno===1062){      //errore duplicati
                                res.json({
                                    status: "false",
                                    count: 0,
                                    data: "Username already exist"
                                });
                            }else{
                                res.json({
                                    status: "false",
                                    count: 0,
                                    data: "Could not save user: "+error
                                });
                            }
                         }else{
                            res.json({
                                status: "true",
                                count: 0,
                                data: "Acount registered"
                            });
                         }
                     });
                }
            }
        }
    });
    
    /* ==============
     Delete Route
  ============== */

  router.delete('/delete/:id', (req, res) => {
    if(!req.params.id){
        res.json({
            status: "false",
            count: 0,
            data: "No id was provided"
        });
    }else{                   
        var query='DELETE FROM users WHERE id='+req.params.id;
        db.query(query,(error, result)=>{
            if(error){
                res.json({
                    status: "false",
                    count: 0,
                    data: error
                });
            }else{
                res.json({
                    status: "true",
                    count: 0,
                    data: "User removed"
                });
            }
        });
    }
});




    return router;
}