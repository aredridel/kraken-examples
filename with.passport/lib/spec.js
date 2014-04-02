'use strict';

var express = require('express'),
    passport = require('passport'),
    auth = require('../lib/auth'),
    userLib = require('./user')(),
    db = require('../lib/database'),
    crypto = require('../lib/crypto');

module.exports = function spec(app) {
    app.on('middleware:after:session', function configPassport(eventargs) {
        //Tell passport to use our newly created local strategy for authentication
        passport.use(auth.localStrategy());
        //Give passport a way to serialize and deserialize a user. In this case, by the user's id.
        passport.serializeUser(userLib.serialize);
        passport.deserializeUser(userLib.deserialize);
        app.use(passport.initialize());
        app.use(passport.session());
    });
    return {
        onconfig: function(config, next) {
            //var i18n = config.get('i18n');
            var i18n = config.get('i18n'),
                dbConfig = config.get('databaseConfig'),
                specialization = config.get('specialization'),
                cryptConfig = config.get('bcrypt');
            // Setup dev-tools for i18n compiling
            if (i18n && config.get('middleware:devtools')) {
                config.set('middleware:devtools:i18n', i18n);
            }

            // Setup engine-munger for i18n and / or specialization
            var engine = {
                'views': config.get('express:views'),
                'view engine': config.get('express:view engine'),
                'specialization': specialization,
                'i18n': i18n
            };

            //this is only in dev mode
            if (config.get('view engines:dust')) {
                config.get('view engines:dust:renderer:arguments').push(engine);
            }

            config.get('view engines:js:renderer:arguments').push(engine, app);
            db.config(dbConfig);
            crypto.setCryptLevel(cryptConfig.difficulty);

            userLib.addUsers();
            next(null, config);
        }
    };

};