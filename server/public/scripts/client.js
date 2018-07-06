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
    
    self.deleteKoala = function(koala){
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Koala",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal(`Poof! ${koala.name} is dead!`, {
                icon: "success",
              });
              $http({
                url: `/koala/${koala._id}`,
                method:'DELETE'
            }).then(function(res){
                console.log('Click Delete', res)
                self.getKoala();
            }).catch(function(error){
                console.log('In Delete', error);
            })
            } else {
              swal("Your Koala is Safe!");
            }
          });
        


    } 

    self.markReady = function(koala){
        koala.ready_to_transfer = !koala.ready_to_transfer;
        console.log('in MarkReady', koala);
        $http({
            url:`/koala/${koala._id}`,
            method : 'PUT',
            data : {ready_to_transfer: true}
        }).then(function(res){
            console.log('In PUT', res);
        }).catch( function(err){
            console.log('in put err',err);
        })
    };
    self.getKoala();






}]);

