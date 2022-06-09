const { compareSync } = require('bcrypt');
const bcrypt = require('bcrypt');
const { User, Role } = require('../models');

const sessionController = {
    index: (req, res) => {
        res.render('login');
    },

    // post data here and create session
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            // !! Votre code à partir d'ici
            // MATHIEU . Je commence par verrifier si l'utilisateur renseigne tout les champs

            if (!email || !password) {
                throw new Error('Invalide input');
            }

            // On récupère user avec le role

            const user = await User.findOne({where:{email}})
            // const role = await Role.findOne({where:{id: user.role_id}})
            // Est-ce que l'utilisateur existe en BDD ?

            if(!user) {
                throw new Error('This user does not exist.')
            }
            // Sélectionner user avec email et inclure le role, si on ne le trouve pas :
            //      on envoie un message d'erreur dans un objet:  {error: `l'utilisateur n'existe pas !`} et on render `login` en lui passant l'erreur
            // Sinon on continue.
            const  {id}  = user
            const role = await Role.findByPk(id)

            // Le mot de passe est il correct ?

            const passIsGood = await bcrypt.compare(password, user.password);;

            // On compare le mots de passe du formulaire avec celui de l'utilisateur
            //      Si le mot de passe est incorrect : on envoie un message d'erreur dans un objet:  {error: `Mot de passe incorrect`} et on render `login` en lui passant l'erreur


            if (!passIsGood){
                throw new Error('Wrong password.')
            }

            // On ajoute user a la session


            const userSession = {
                id : user.id,
                fulName : user.name,
                email : user.email,
                role : role,                
            };

            req.session.user = userSession;
            // res.locals.user = req.session.user

            console.log('LALALA',req.session.user)
            // On enlève le mot de passe de la session.

            delete userSession.password;
            // !! Ne pas modifier cette ligne
            res.redirect('/');
        } catch (e) {
            console.error(e.message);
            res.status(500).send('Server Error');
        }
    },

    logout: (req, res) => {
        // !! Votre code ici
        req.session.user = false;
        res.redirect('/');
    },
};

module.exports = sessionController;
