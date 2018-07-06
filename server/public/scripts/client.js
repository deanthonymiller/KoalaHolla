const app = angular.module('KoalaApp', []);

app.controller('KoalaController', ['$http', function($http){

    let self = this;

    self.koalaList = [];

    //POST Koala
    self.addKoala = function(koalaToAdd){
        console.log(`adding Koala`, koalaToAdd);
        
        $http({
            url:'/koala',
            method:'POST',
            data:koalaToAdd
        }).then(function(res){
            console.log(res);
            self.getKoala();
        }).catch(function(err){
            console.log('ERROR!', err);
        });

    }

    self.getKoala = function(){
        $http({
            url: '/koala',
            method: 'GET'
        }).then(function(res){
            console.log(res);
            self.koalaList = res.data;
        }).catch(function(err){
            console.log('Error in get', err)
        });
    }
    self.getKoala();
    
    self.deleteKoala = function(id){
        $http({
            url: `/koala/${id}`,
            method:'DELETE'
        }).then(function(res){
            console.log('Click Delete', res)
            self.getKoala();
        }).catch(function(error){
            console.log('In Delete', error);
        })


    } 

    self.markReady = function(koala){
        console.log('in MarkReady', koala);
        $http({
            url:`/koala/${koala._id}`,
            method : 'PUT',
            data : {ready_to_transfer: false}
        }).then(function(res){
            console.log('In PUT', res);
        }).catch( function(err){
            console.log('in put err',err);
        })
    };
    self.getKoala();






}]);

