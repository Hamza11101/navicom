const db = require("../models");
const User = db.user;
const Reglement = db.reglement;
const Op = db.Sequelize.Op;
//   Retrieve all Users/ find by Name from the database:
exports.getUserByName = (req, res) => {
    const Name = req.body.Name;
    var condition = Name ? { Name: { [Op.like]: `%${Name}%` } } : null;
    User.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Users."
            });
        });
};
//   Get all Users include reglements
exports.getAllByUser = () => {
    return User.findAll({
        include: ["reglements"],
    }).then((users) => {
        return users;
    });
};

//save all 
exports.saveAll = (req, res) => {
    const Name = req.body.Name;
    var condition = Name ? { Name: { [Op.like]: `%${Name}%` } } : null;
    if (condition == null) {
        // Create User
        const user = {
            Name: req.body.Name,
        };

        // Save user in the database
        User.create(user)
            .then(data => {
                //Create reglement
                const reglement = {
                    type: req.body.type,
                    date: req.body.date,
                    montant: req.body.montant,
                    userId: data.id
                }
                res.send(data);
                //save reglement in the db
                Reglement.create(reglement)
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred"
                });
            });
    }
}
