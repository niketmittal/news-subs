const express=require("express");
const bodyParser=require("body-parser");
const request = require("request");
const https=require("https");
const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/", function(req,res)
{
    res.sendFile(__dirname+"/mankind.html");

});

    app.post("/",function(req,res)

    {
        var name=req.body.name;
        var email=req.body.email;
        var newspaper=req.body.Newspaper;
        var time=req.body.time;
        var address=req.body.address;
        var phone=req.body.phoneNumber;
        var zip =  req.body.zip;
        var data={
            members: [
                {
                    email_address: email,
                    status:"subscribed",
                    merge_fields:
                    {
                        FNAME: name,
                        NEWSPAPER: newspaper,
                        ADDRESS: address,
                        PHONE: phone,
                        TIME: time,
                        ZIP_CODE: zip
                    }

                }
            ]
        };
        const jsonData=JSON.stringify(data);
        const  url="https://us21.api.mailchimp.com/3.0/lists/6ab0f8e62b";
        const options={
            method:"POST",
            auth: "itz_shubhamjain:31fb5e505dad513ac5520c6a096e555f-us21"
        }
        const request=https.request(url,options,function(response)
        {
            response.on("data",function(data)
            {
            console.log(JSON.parse(data));
            }
            )
        }
        )
        request.write(jsonData);
        request.end();
        console.log(email + name + phone + newspaper + time + address);
        res.sendFile(__dirname+"/sucsses.html");


    }
    );

app.listen(3040,function()
{ console.log("port is listning") }
);
// Api key=539045e23f776e6897288c9e4590931f-us21
// audians id=2f78bd8244 2f78bd8244
/*<!-- Begin Mailchimp Signup Form -->
<link href="//cdn-images.mailchimp.com/embedcode/classic-071822.css" rel="stylesheet" type="text/css">
<style type="text/css">
	#mc_embed_signup{background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif;  width:600px;}
	/* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.
	   We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
      