
const express=require('express');
const app=express();
const con=require('./db.js');


const port =3000;
app.use(express.json());

app.get('/',(req,res)=>{                                               //home page response is orchestrated and controles like agar is url pr gye toh get krne se kya response hoga .
    res.send("Hello World");
});


app.get('/students',(req,res)=>{                                     //list the students
    con.query('SELECT * FROM students',(err,res2)=>{
        if(!err){
            console.log(res2.rows);
            res.send(res2.rows);
        }else{
            console.log(err.message);
        }
    })
})


app.post('/create',(req,res)=>{                                                     //create a student
    const {id,name,course,email}=req.body;
    con.query(`INSERT INTO students(stu_id,stu_name,stu_course,stu_email) values('${id}','${name}','${course}','${email}')`,(err,res2)=>{
        if(!err){
            con.query(`SELECT * FROM students where stu_email='${email}'`,(err,res3)=>{
                if(!err){
                    console.log(res3.rows);
                    res.send(res3.rows);
                }else{
                    console.log(err.message);
                }
            })
        }else{
            console.log(err.message);
        }
    });

})
app.get('/students/:id',(req,res)=>{                            //find students by id
    const stid=req.params.id;
    con.query(`SELECT * FROM students WHERE stu_id=${stid}`,(err,res1)=>{
        if (!err){
            console.log(res.rows);
            res.send(res1.rows);
        }else{
            console.log("Student not found!!");
            res.send("couldnt find the person");
        }
    })
})

app.put('/students/:id',(req,res)=>{                                                  //update a student's details
    const stid=req.params.id;
    const {email,name,course}=req.body;
    con.query('UPDATE students SET stu_name = $1, stu_email = $2, stu_course = $3 WHERE stu_id = $4',[name,email,course,stid],(err,res5)=>{
        if (!err){
            res.send("data updated ");
        }else{
            res.send(err.message);
        }
    });

});

app.post(`/students`,(req,res)=>{                                        //filtering the answers based on name search.
    const {name}=req.body;
    con.query(`SELECT * FROM students WHERE stu_name=$1`,[name],(err,resp)=>{
        if(!err){
            res.send(resp.rows);
        }else{
            console.log(err.message);
        }
    })
})



app.delete('/students/:id',(req,res)=>{                   //delet a student
    const stid=req.params.id;
    con.query(`DELETE FROM students WHERE stu_id=$1`,[stid],(err,res8)=>{
        if (!err){
            console.log("deleted ");
            res.send("Student deleted");
        }else{
            console.log(err.message);
        }
    })
    })


app.listen(port,()=>{                                               //server sun rha hai basically server of node .js bound to port 3000

    console.log("Server is running on port "+port);
})




// testConnection();
// async function testConnection() {
//     const res = await con.query('SELECT current_database(), current_schema();');
//     console.log(res);
// }





//  con.query('INSERT INTO students(stu_name,stu_course,stu_email) values(\'Shivam\',\'Computer Science\',\'luv@gmail.com\')',(err,res)=>{        //query to insert data into database
//      if(!err){
//         console.log("Data inserted successfully");  
//     }else{
//        console.log(err.message);
//    }
// })

