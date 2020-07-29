var express=require("express");
var app=express();
const port=4000;
var mongoose=require("mongoose");
var bodyParser=require("body-parser");

mongoose.connect("mongodb://localhost/restaurantorder_app");

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


var orderSchema=new mongoose.Schema({
	name:String,
	item:String,
	quantity:String,
	price:String,
	w:String,
	b:String
});

var Order=mongoose.model("Order",orderSchema);

app.get("/home",function(req,res){
	res.render("home");
})

app.get("/addorder",function(req,res){
	res.render("addorder");
})

// Order.create({
// 	name:"Aditya",
// 	item:"Pav bhaji",
// 	quantity:"2",
//     price:"100"
// },function(error,blog){
// 	if(error)
// 	{
// 		console.log("Something Went Wrong");
// 		Console.Log(error);
// 	}
// 	else{
// 		console.log(blog);
// 	}
// })
app.get("/",function(req,res){
	res.redirect("/home");
})

app.get("/showorders",function(req,res){
 Order.find({},function(err,orders){
 	if(err)
	{
		console.log("Something Went Wrong");
		console.log(err);
	}
	else{
		res.render("showorders",{ orders:orders }); 
	}
 });
});


app.get("/about",function(req,res){
	res.render("about");
});


app.post("/showorders",function(req,res){
	Order.create(req.body.order,function(err,neworder){
		if(err){
			res.redirect("/addorder");
		}
		else{

			res.redirect("/home");
		}
	});
});

app.get("/profit",function(req,res){
	Order.find({},function(err,orders){
 	if(err)
	{
		console.log("Something Went Wrong");
		console.log(err);
	}
	else{
         
          res.render("profit", { orders:orders });
	}
 });
 
});






app.listen(port,function(){
	console.log(`Example app listening at http://localhost:${port}`)
}); 









