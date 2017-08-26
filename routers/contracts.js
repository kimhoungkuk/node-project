var express = require('express');
var router = express.Router();
var ContractsModel = require('../models/ContractsModel');

router.get('/',function(req,res){
    ContractsModel.find(function(err,contracts){
        res.render('contracts/list',
            {contracts : contracts}
            //DB에서 받은 products를 products 변수명으로 내보냄
        );
    });
});

router.get('/write',function(req,res){
    res.render("contracts/form", {contracts : ""});
});

router.post('/write',function(req,res){
    var contracts = new ContractsModel({
        title      : req.body.title,
        wirte_name : req.body.wirte_name,
        content    : req.body.content
    });
    contracts.save(function(err){
        res.redirect("/contracts");
    });
});

router.get('/detail/:id',function(req,res){
    ContractsModel.findOne({ id : req.params.id},
        function(err,contracts){
            res.render('contracts/contractsDetail'
                ,{contracts : contracts}
            );
        })
});

module.exports = router;