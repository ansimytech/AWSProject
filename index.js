var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'REGION'});

// Create EC2 service object
var ec2 = new AWS.EC2({apiVersion: '2016-11-15',region: 'eu-west-2'});

var params = {};


var awsCallback = function(data) {

  ec2.describeRegions(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    }
  
  
    var regionArray = data.Regions;
  
    regionArray.forEach(element => {
        ec2 = new AWS.EC2({apiVersion: '2016-11-15',region: element.RegionName});
  
        ec2.describeAvailabilityZones(params, function(err, data) {
            if (err) {
              console.log("Error", err);
            } else {
                  data.AvailabilityZones.forEach(nestedElement => {
                      console.log("{ \"region_zones\"", ":\"" + nestedElement.RegionName, nestedElement.ZoneName  + "\"}");
                  }); 
  
            }
  
        });
  
    });
  
  });

  };
  
  var describeAWSRegions = function(callback) {
    callback('All Regions and Available Zones Displayed');
  };

  describeAWSRegions(awsCallback);
