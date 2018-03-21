const db = require('../config/db');
const jwt= require('jsonwebtoken');
const crypto = require('crypto').randomBytes(256).toString('hex');
const bcrypt = require('bcrypt-nodejs');


module.exports = (router) => {

    /*
    *   406: Not Acceptable | La risorsa richiesta è solo in grado di generare contenuti non accettabili secondo la header Accept inviato nella richiesta
    *   301: 
    *   200: OK | Risposta standard per le richieste HTTP andate a buon fine.
    *   500: Internal Server Error | Errore generico
    *   404: Not Found | Non è stato possibile trovare quanto richiesto
    */


     /* ========
  LOGIN ROUTE
  ======== */

    router.post('/login', (req, res) => {

        if (!req.body.username) {
            res.status(406).json({
                status: "false",
                count: 0,
                data: "No username was provided"
            });
        } else {
            if (!req.body.password) {
                res.status(406).json({
                    status: "false",
                    count: 0,
                    data: "No password was provided"
                });
            } else {
                var query="SELECT * FROM users where username='"+req.body.username+"'";
                db.query(query,(error, result)=>{
                    if(error){
                        res.status(500).json({
                            status: "false",
                            count: 0,
                            data: error
                        });
                    }else{
                        if(result.length==0)     
                        {
                            res.status(301).json({
                                status: "false",
                                count: 0,
                                data: "Invalid username or password"        //scrivo così in modo da non dire se è sbagliata la password o l'username per motivi di sicurezza
                            });
                        }else{
                            const validPassword= result[0].password.localeCompare(req.body.password);
                            if(validPassword!=0){
                                res.status(301).json({
                                    status: "false",
                                    count: 0,
                                    data: "Invalid username or password"        //scrivo così in modo da non dire se è sbagliata la password o l'username per motivi di sicurezza
                                });
                            }else{
                                const token= jwt.sign({userId:result.id} , crypto, { expiresIn:'24h' }); //token
                                res.status(200).json({
                                    status: "true",
                                    count: result.length,
                                    data: {
                                        token: token,
                                        user:{
                                            username: result[0].username,
                                            group: result[0].Groups_id
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
            res.status(406).json({
                status: "false",
                count: 0,
                data: "No username was provided"
            });
        }else{
            if(!req.body.password){
                res.status(406).json({
                    status: "false",
                    count: 0,
                    data: "No password was provided"
                });
            }else{
                if(!req.body.groups_id){
                    res.status(406).json({
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
                                res.status(406).json({
                                    status: "false",
                                    count: 0,
                                    data: "Username already exist"
                                });
                            }else{
                                res.status(500).json({
                                    status: "false",
                                    count: 0,
                                    data: "Could not save user: "+error
                                });
                            }
                         }else{
                            res.status(200).json({
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
        res.status(406).json({
            status: "false",
            count: 0,
            data: "No id was provided"
        });
    }else{                   
        var query='DELETE FROM users WHERE id='+req.params.id;
        db.query(query,(error, result)=>{
            if(error){
                res.status(500).json({
                    status: "false",
                    count: 0,
                    data: error
                });
            }else{
                res.status(200).json({
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