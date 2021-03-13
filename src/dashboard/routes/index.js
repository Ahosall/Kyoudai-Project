const router = require('express').Router();

const client = require('../../app');

/* |=======================================|
 * |               ROUTE · "/"             |
 * |=======================================|
 */

router.get('/', (req, res) => {
	let utils = {
		user: req.user,
		users: client.users.cache.size,
		guilds: client.guilds.cache.size,
		channels: client.channels.cache.size
	}

	res.render('pages/home', { page: "HomePage", data: utils})
});

module.exports = router;
