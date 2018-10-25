//logout.js

module.exports = 
	(req, res, next) => {
		
		res.clearCookie('admin');
		res.clearCookie('customerID');

		res.redirect('/login');
	};