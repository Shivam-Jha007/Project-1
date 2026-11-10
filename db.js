const {Client}=require('pg');
require(dotenv).config();

const con=new Client({
    user:'postgres',
    host:'localhost',
    database:'db',
    password:process.env.DB_pswd,
    port:5432   
})
connectToDatabase()
async function connectToDatabase(){
    try{
        await con.connect().then(()=>{
            console.log("Connected to database");

        });     
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
}



module.exports=con;

// await con.end();                          //terminates the connection to the database not the pool connection