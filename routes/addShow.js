//addShow.js

module.exports = 
	function addShow(req , res , next){
  	res.render('addShow', 
  		{title:"Add a Show", admin: req.cookies.admin});
};