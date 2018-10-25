//loginForm.js

module.exports = 
	function login(req , res , next){
  	res.render('login', 
  		{title:"Login", login: true});
};