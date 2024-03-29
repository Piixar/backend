const Sauce = require('../models/Sauce');

exports.likeUser = (req, res, next) => {
    if (req.body.like === 1) {
        Sauce.updateOne({ _id: req.params.id },
            { 
                $inc: { likes: 1 },                           // $inc permet d'incrémenter 
                $push: { usersLiked: req.body.userId }        // $push permet d'ajouter l'id de l'utilisateur dans le tableau usersLiked
            }
        )
        .then(() => res.status(202).json({ message: 'Like ajouté !' }))
        .catch(error => res.status(400).json({ error }))
    } else if (req.body.like === -1) {
        Sauce.updateOne({ _id: req.params.id },
            { 
                $inc: { dislikes: 1},
                $push: { usersDisliked: req.body.userId } 
            }
        )
        .then(() => res.status(202).json({ message: 'Dislike ajouté !' }))
        .catch(error => res.status(400).json({ error }))
    } else {
        Sauce.findOne({ _id: req.params.id })
            .then(sauces => {
                if (sauces.usersLiked.includes(req.body.userId)) {
                    Sauce.updateOne({ _id: req.params.id },
                        {
                            $inc: { likes: -1 } ,
                            $pull: { usersLiked: req.body.userId }    // $pull permet de supprimer l'id de l'utilisateur dans le tableau usersliked
                        }
                    )
                    .then(() => { res.status(202).json({ message: 'Like supprimé !' }) })
                    .catch(error => res.status(400).json({ error }))
                } else if (sauces.usersDisliked.includes(req.body.userId)) {
                    Sauce.updateOne({ _id: req.params.id },
                        { 
                            $inc: { dislikes: -1 }, 
                            $pull: { usersDisliked: req.body.userId }
                        }
                    )
                    .then(() => { res.status(202).json({ message: 'Dislike supprimé !' }) })
                    .catch(error => res.status(400).json({ error }))
                }
            })
            .catch(error => res.status(400).json({ error }))
    }
} 