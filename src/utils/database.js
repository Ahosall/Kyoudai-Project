const mongoose = require('mongoose');
module.exports = {
	start(val) {
		if (val) {
			if (val == 'DEV') {
				return mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
			} else {
				return mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
			}
		} else {
			return mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
		}
	}
}