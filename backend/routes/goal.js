const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');
const mongoose = require('mongoose');
const passport = require("passport");
const authenticate = require("../authenticate");

const Users = require('../models/user');
const Goals = require('../models/goal');

const goalRouter = express.Router();
goalRouter.use(bodyParser.json());

goalRouter.route('/')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200)})
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Goals.find({user: req.user._id})
    .populate('user')
    .then((goals) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(goals);
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post(cors.corsWithOptions, authenticate.verifyUser,
    (req, res, next) => {
    Goals.create({user: req.user._id, goal: req.body.goal, priority: req.body.priority,
        category: req.body.category, date: req.body.date, due: req.body.due})
   .then((goal) => {
        Goals.findById(goal._id)
        .populate('user')
        .then((goal) => {
            Users.findById(req.user._id)
            .then((user) => {
                console.log(goal)
                console.log(user.goals)
                if(user)
                    user.goals.push(goal)
                console.log('Goal saved');
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(goal);
            })
        })
   }, (err) => next(err))
   .catch((err) => next(err))
})
.put(cors.corsWithOptions, authenticate.verifyUser,
    (req, res, next) => {
   res.statusCode = 403;
   res.end('PUT operation not supported on /goals');
})
.delete(cors.corsWithOptions, authenticate.verifyUser,
    (req, res, next) => {
   Goals.deleteMany({user: req.user._id})
   .then((resp) => {
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json(resp);
   }, (err) => next(err))
   .catch((err) => next(err))
});

goalRouter.route('/:goalId')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200)})
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
   Goals.findOne({user: req.user._id, _id: req.params.goalId})
   .populate('user')
   .then((goal) => {
    if(!goal) {
        var err = new Error("Goal could not be found!");
        err.status = 404;
        next(err);
    }
    else{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.json(goal);
    }
   }, (err) => next(err))
   .catch((err) => next(err))
})
.post(cors.corsWithOptions, authenticate.verifyUser,
    (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /goals/:goalId');
})
.put(cors.corsWithOptions, authenticate.verifyUser,
    (req, res, next) => {
   Goals.findByIdAndUpdate(req.params.goalId, {
       $set: req.body
   }, {new: true})
   .then((resp) => {
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json(resp);
   }, (err) => next(err))
   .catch((err) => next(err))
})
.delete(cors.corsWithOptions, authenticate.verifyUser,
    (req, res, next) => {
   Goals.deleteOne({user: req.user._id, _id: req.params.goalId})
   .then((resp) => {
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json(resp);
   }, (err) => next(err))
   .catch((err) => next(err))
});

module.exports = goalRouter;