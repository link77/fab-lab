const db= require('../config/db');


module.exports=(router)=>{

    router.get('/login', (req,res,next)=>{
        db.query('SELECT * FROM users where id=1',(error, result)=>{
            if(error){
                res.send(JSON.stringify({"status":500, "error":error, "response":null}));
            }else{
                if(result[0].password=="admin")     //test password
                {
                    res.send(JSON.stringify({"status":200, "error":null, "response":result}));
                }
                
            }
        });
    });

    //dd
    
    return router;
}