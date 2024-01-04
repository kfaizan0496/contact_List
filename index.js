const express=require('express');

const dotEnv=require('dotenv');
dotEnv.config();
const PORT=process.env;

 PORT=PORT || 8000;

const path=require('path');
const  db=require('./config/mongoose');
const Contact=require('./models/contactList');
const app=express();
app.use(express.urlencoded()) 
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static('assets'));
var ContactList=[
    {
        name:"Faizan",
        phone:'9058595430',
    },
    {
        name:"Aamir",
        phone:'8376868713',
    }
]


app.get('/',async function(req,res){
    // res.send('<h1>Cool it is Running</h1>')

    const contacts=await Contact.find({});
    if(!contacts){
        console.log("Error to find the contacts from the db");
        return;
    }

    return res.render('home',{
        title:"My Contact Lists",
        contact_list:contacts,
    })
})

// String params working
// app.get('/delete-contact/:phone',function(req,res){
//     console.log(req.params);
//     let phone=req.params.phone;
//     console.log(phone);
//     return res.redirect('/');


// })


// Query Params Working
app.get('/delete-contact',async function(req,res){
    // console.log(req.query);
    // let phone=req.query.phone;
    // console.log(phone);
    let id=req.query.id;
   const contact= await Contact.findByIdAndDelete(id)
        if(!contact){
            console.log("Error in Deleting Contact from db");
            return;
        }
         

        return res.redirect('back');


    // contactIndex=ContactList.findIndex (contact => contact.phone==phone);
    // if(contactIndex != -1){
    //     ContactList.splice(contactIndex,1);
    // }
    // return res.redirect('back');

 

})

app.get('/profile',function(re,res){
    res.render('practice',{
        title:'Play with Ejs'
    })
})
app.post('/create-contacts',async function(req,res){
    // ContactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone,

        // or
        // ContactList.push(req.body);

       const newContact=await Contact.create({
            name:req.body.name,
           phone:req.body.phone,
        });

     
            if(!newContact){console.log("Error Occuring in creating contatc")
             return;}
             
            console.log("******* ::",newContact);
            return res.redirect('back');
      
})

app.listen(port,function(err){
    if(err){
        console.log("Error occur",err);
     
    }
    console.log("yup!! My Express is running",port)
}
)