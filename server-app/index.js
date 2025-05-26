const mongoClient= require('mongodb').MongoClient;
var express=require('express');
const cors= require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

var app=express();
//CORS is required for handling request method like - GET,POST,PUT,DELETE....;
app.use(cors());
//Required for converting data into JSON 
app.use(express.urlencoded({extended:true}));
app.use(express.json());

var ConnectionString=process.env.MONGO_URL;

//Api routes
app.get('/get-admin',(req,res)=>{
    mongoClient.connect(ConnectionString).then(connectionObject=>{
        var database=connectionObject.db("videodb");
        database.collection('tbladmin').find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
});

app.get('/get-videos',(req,res)=>{
    mongoClient.connect(ConnectionString).then(connectionObject=>{
        var database=connectionObject.db("videodb");
        database.collection('tblvideos').find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
});

app.get('/get-Categories',(req,res)=>{
    mongoClient.connect(ConnectionString).then(connectionObject=>{
        var database=connectionObject.db("videodb");
        database.collection('tblcategories').find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
});

app.get('/get-users',(req,res)=>{
    mongoClient.connect(ConnectionString).then(connectionObject=>{
        var database=connectionObject.db("videodb");
        database.collection('tblusers').find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
});

app.get('/get-video/:id',(req,res)=>{
    mongoClient.connect(ConnectionString).then(connectionObject=>{
        var database=connectionObject.db("videodb");
        database.collection('tblvideos').find({VideoId:parseInt(req.params.id)}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
});

app.get('/get-user/:userid',(req,res)=>{
    mongoClient.connect(ConnectionString).then(connectionObject=>{
        var database=connectionObject.db("videodb");
        database.collection('tblusers').findOne({UserId:req.params.userid}).then(documents=>{
            res.send(documents);
            res.end();
        });
    });
});

app.get('/filter-videos/:categoryid',(req,res)=>{
    mongoClient.connect(ConnectionString).then(connectionObject=>{
        var database=connectionObject.db("videodb");
        database.collection('tblvideos').findOne({CategoryId:parseInt(req.params.categoryid)}).then(documents=>{
            res.send(documents);
            res.end();
        });
    });
});

app.post('/add-video',(req,res)=>{
    mongoClient.connect(ConnectionString).then(connectionObject=>{
        var database=connectionObject.db("videodb");
        var video={
            VideoId:parseInt(req.body.VideoId),
            Title:req.body.Title,
            Url:req.body.Url,
            Description:req.body.Description,
            Likes:parseInt(req.body.Likes),
            Dislikes:parseInt(req.body.Dislikes),
            Views:parseInt(req.body.Views),
            CategoryId:parseInt(req.body.CategoryId),
            Comments:[req.body.Comments]
        }
        database.collection('tblvideos').insertOne(video).then(()=>{
            console.log('Video Inserted.');
            res.end();
        });
    });
});

app.post('/register-user',(req,res)=>{
    mongoClient.connect(ConnectionString).then(connectionObject=>{
        var database=connectionObject.db("videodb");
        var user={
            UserId:req.body.UserId,
            UserName:req.body.UserName,
            Password:req.body.Password,
            Email:req.body.Email,
            Mobile:req.body.Mobile
        }
        database.collection('tblusers').insertOne(user).then(()=>{
            console.log('User Register.');
            res.end();
        });
    });
});

app.post('/add-category',(req,res)=>{
    mongoClient.connect(ConnectionString).then(connectionObject=>{
        var database=connectionObject.db("videodb");
        var Category={
            CategoryId:parseInt(req.body.CategoryId),
            CategoryName:req.body.CategoryName
        }
        database.collection('tblcategories').insertOne(Category).then(()=>{
            console.log('Category Inserted.');
            res.end();
        });
    });
});

app.put("/edit-video/:id", (req, res)=>{

    mongoClient.connect(ConnectionString).then(connectionObject=>{
        var database = connectionObject.db("videodb");

        var video = {
            VideoId:parseInt(req.body.VideoId),
            Title:req.body.Title,
            Url:req.body.Url,
            Description:req.body.Description,
            Likes:parseInt(req.body.Likes),
            Dislikes:parseInt(req.body.Dislikes),
            Views:parseInt(req.body.Views),
            CategoryId:parseInt(req.body.CategoryId),
            Comments:[req.body.Comments]
        }

        database.collection("tblvideos").updateOne({VideoId:parseInt(req.params.id)},{$set:video}).then(()=>{
            console.log("Video Updated Successfully..");
            res.end();
        })
    })
})

app.delete("/delete-video/:id",(req,res)=>{
    mongoClient.connect(ConnectionString).then(connectionObject=>{
        var database=connectionObject.db("videodb");
        database.collection("tblvideos").deleteOne({VideoId:parseInt(req.params.id)}).then(()=>{
            console.log('Video Deleted SuccessFully..');
            res.end();
        })
    })
})

var port=process.env.PORT ||5050;

app.listen(port,()=>{
    console.log(`server start with http://127.0.0.1:5050`);
});
