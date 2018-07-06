const app = angular.module('KoalaApp', []);

app.controller('KoalaController', ['$http', function($http){

    let self = this;

    self.petList = [];

    //POST Koala
    self.addKoala = function(koalaToAdd){
        console.log(`adding Koala`, koalaToAdd);
        
        $http({
            url:'/koala',
            method:'POST',
            data:koalaToAdd
        }).then(function(res){
            console.log(res);
            self.getKoala()
        }).catch(function(err){
            console.log('ERROR!', err);
        })
    }

    self.getKoala = function(){
        $http({
            url: '/koala',
            method: 'GET'
        }).then(function(res){
            console.log(res)
        }).catch(function(err){
            console.log('Error in get', err)
        })
    }










}]);

