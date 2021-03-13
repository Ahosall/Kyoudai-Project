const router = require('express').Router();

/* |=======================================|
 * |          ROUTE · "/dashboard"         |
 * |=======================================|
 */

router.get('/', (req, res) => {
	let utils;
	res.render('pages/dashboard', { page: "Dashboard", data: utils})
});

module.exports = router;
