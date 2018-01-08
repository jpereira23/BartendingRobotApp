(function(){
  angular.module('bRobot').controller('HomeController', ['$scope', '$state', 'DeviceFactory', HomeController]);

  function HomeController($scope, $state, DeviceFactory){
    $scope.devices = []; // the devices listed in the page

    $scope.scan = function(){
      DeviceFactory.reset();
      console.log("Its working");
      ble.startScan([], function(device){
          console.log("the scanning started to scan.");
          if(device.name){
            console.log("found device");
            DeviceFactory.addDevice({'id': device.id, 'name': device.name });
          }
        },
        function(err){
          console.log("The scanning did not work");
          alert('Scanning failed. Please try again.');
        }
      );

      setTimeout(ble.stopScan, 1500, function(){
        $scope.$apply(function(){
          console.log("stopped scanning");
          console.log("number of devices is " + $scope.devices.length);
          $scope.devices = DeviceFactory.getDevices();
        });
      },
      function(){
        console.log("Its stopping");
      }
    );
  }

  $scope.connect = function(device_id){
    ble.connect(device_id, function(res){
      console.log("Trying to connect");
      $state.go('device', { 'id': device_id }); 
      },
      function(err){
        alert('Something went wrong while trying to connect. Please try again');
      }
    );
  }
}

})();
