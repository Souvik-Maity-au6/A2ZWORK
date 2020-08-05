const todoModel = require("../../models/data/Todo");
const userModel = require("../../models/user/User");

module.exports = {
	async createTodo(req, res) {
		try {
			const newTodo = new todoModel({ ...req.body });
			await newTodo.save();
			return res
				.status(200)
				.send({ msg: "Todo created successfully", todo: newTodo });
		} catch (err) {
			console.log(err);
			return res.status(500).send({ msg: err.message });
		}
	},
};
