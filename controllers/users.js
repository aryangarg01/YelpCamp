const User = require('../models/user')

module.exports.renderRegister = (req, res) => {
    res.render('users/register')
}

module.exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const user = new User({ username, email })
        const registeredUser = await User.register(user, password)
        req.login(registeredUser, err => {
            req.flash('success', 'Welcome to YelpCamp')
            res.redirect('/campgrounds')
        })
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('register')
    }
}
module.exports.renderLogin = (req, res) => {
    res.render('users/login')
}
module.exports.login = (req, res) => {
    req.flash('success', 'Welcome Back')
    const redirectUrl = req.session.returnTo || '/campgrounds'
    delete req.session.returnTo;
    res.redirect(redirectUrl)
}
module.exports.logout = (req, res) => {
    req.logout(function () {
        req.flash('success', 'Goodbye')
        res.redirect('/campgrounds')
    })
}