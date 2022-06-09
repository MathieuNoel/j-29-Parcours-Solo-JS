const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const { User, Role } = require('../models');

const userController = {
    index: (req, res) => {
        res.render('register');
    },

    register: async (req, res) => {
        // register a user here
        const { lastname, firstname, email, password, passwordConfirm } = req.body;
        try {
            // !! votre code à partir d'ici
            if (
                !lastname
                || !firstname
                || !email
                || !password
                || !passwordConfirm
            ) {
                const error = new Error('Invalid input.');
                return res.status(500).json({error: error.message});
            }
            // verif email here avec email-validator
            if (!emailValidator.validate(email)) {
                const error = new Error('Invalid email address.');
                return res.status(500).json({error: error.message});
            }
            // verif password === password confirm
            if (password !== passwordConfirm) {
                const error = new Error('password must match passwordConfirm.');
                return res.status(500).json({error: error.message});
            }
            // Hash password with salt
            const hashedPassword = bcrypt.hashSync(password, 12);
            // Attribuer un rôle ici, vous devrez auparavant en sélectionner un depuis la BDD : le role customer.
            const role = await Role.findOne({where: {name : 'customer'}})
            const newUser = new User({
                firstname,
                lastname,
                email,
                role : role,
                password: hashedPassword
            })
            // sauvegarder user
            console.log(newUser)
            await newUser.save()
            // !! ne pas modifier cette ligne
            res.render('login', {
                message: 'Vous pouvez maintenant vous connecter !',
            });
        } catch (error) {
            console.log(error);
            res.render('register', { error: error.message });
        }
    },

    show: async (req, res) => {
        res.render('dashboard/dashboard');
    },
};

module.exports = userController;
