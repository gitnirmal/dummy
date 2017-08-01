var app = angular.module('market-app', []);

app.controller('market-ctrl', ['$scope', '$http', '$filter', function($scope, $http, $filter) {

    $scope.completeDataset = {};
    $scope.data = {};
    $scope.getAllData = function() {
        $http.get('data.json').then(function(response) {
            $scope.completeDataset = response.data;
            $scope.data = response.data;
        }, function(error) {
            console.log(error);
        });
    };
    $scope.getAllData();

    $scope.toDate = function(dt){
      var newDate = new Date(dt);
      return $filter('date')(newDate, 'mediumDate');
    };

    $scope.filterData = function(flag){
      switch (flag) {
        case '1M':
          $scope.updateDataset('month', 1);
        break;
        case '3M':
          $scope.updateDataset('month', 3);
        break;
        case '6M':
          $scope.updateDataset('month', 6);
        break;
        case '1Y':
          $scope.updateDataset('year', 1);
        break;
        case '2Y':
          $scope.updateDataset('year', 2);
        break;
        case '3Y':
          $scope.updateDataset('year', 3);
        break;
        case '4Y':
          $scope.updateDataset('year', 4);
        break;
        case '5Y':
          $scope.updateDataset('year', 5);
        break;
      }
    };

    $scope.updateDataset = function(type, val){
      $scope.data = $scope.completeDataset;
      var currentDate = new Date();
      var previousDate = new Date(currentDate);
      if(type==='month'){
          previousDate.setMonth(currentDate.getMonth()-val);
      }else if(type==='year'){
          previousDate.setYear(currentDate.getFullYear()-val);
      }
      var arr = $filter('filter')($scope.data, function(value) {
          var dataDate = new Date(value.Date);
          var first = currentDate-dataDate;
          var second = dataDate-previousDate;
          if (first>=0 && second>=0) {
              return value;
          }
      });
      $scope.data = arr;
      chart.dataProvider = $scope.data;
      chart.validateData();
    }

    var chart = AmCharts.makeChart("chartdiv", {
              "type": "serial",
              "dataLoader": {
                  "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/218423/data1.json"
              },
              "valueAxes": [{
                  "gridColor": "#FFFFFF",
                  "gridAlpha": 0.2,
                  "dashLength": 0
              }],
              "gridAboveGraphs": true,
              "startDuration": 1,
              "graphs": [{
                  "balloonText": "[[category]]: <b>[[value]]</b>",
                  "bullet": "round",
                  "bulletBorderColor": "#FFFFFF",
                  "bulletBorderThickness": 2,
                  "bulletSize": 2,
                  "lineThickness": 2,
                  "type": "line",
                  "valueField": "Open",
                  "title": "Open Price"
              }, {
                  "balloonText": "[[category]]: <b>[[value]]</b>",
                  "bullet": "round",
                  "bulletBorderColor": "#FFFFFF",
                  "bulletBorderThickness": 2,
                  "bulletSize": 2,
                  "lineThickness": 2,
                  "type": "line",
                  "valueField": "Close",
                  "title": "Close Price"
              }, {
                  "balloonText": "[[category]]: <b>[[value]]</b>",
                  "bullet": "round",
                  "bulletBorderColor": "#FFFFFF",
                  "bulletBorderThickness": 2,
                  "bulletSize": 2,
                  "lineThickness": 2,
                  "type": "line",
                  "valueField": "High",
                  "title": "High Price"
              }, {
                  "balloonText": "[[category]]: <b>[[value]]</b>",
                  "bullet": "round",
                  "bulletBorderColor": "#FFFFFF",
                  "bulletBorderThickness": 2,
                  "bulletSize": 2,
                  "lineThickness": 2,
                  "type": "line",
                  "valueField": "Low",
                  "title": "Low Price"
              }],
              "chartCursor": {
                  "categoryBalloonEnabled": false,
                  "cursorAlpha": 0,
                  "zoomable": false
              },
              "categoryField": "Date",
              "categoryAxis": {
                  "gridPosition": "start",
                  "gridAlpha": 0,
                  "tickPosition": "start",
                  "tickLength": 20,
                  "labelRotation": 90
              },
              "legend": {
                  "useGraphSettings": false
              }
          });

}]);
