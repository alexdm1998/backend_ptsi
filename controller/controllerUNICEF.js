var path = require('path');


function getDataStructure(req, res){
    var request = require('request');
    var options = {
      'method': 'GET',
      'url': 'https://sdmx.data.unicef.org/ws/public/sdmxapi/rest/dataflow/all/all/latest/?format=sdmx-json&detail=full&references=none',
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      var ArrayDfID = [];
      var ParsedJson = JSON.parse(response.body);
      var ArrayDataflows = ParsedJson.data.dataflows;
    
      for(i = 0; i < ArrayDataflows.length; i++){
      var DfID = ArrayDataflows[i].id;   
      var DFName = ArrayDataflows[i].name;
      var DFAgency = ArrayDataflows[i].agencyID;
      var DfObject = [DfID,DFName,DFAgency];
      ArrayDfID.push(DfObject);
      }
      
      var myJsonString = JSON.stringify(ArrayDfID);
      
      res.status(200).json(myJsonString);

      res.end();
    });
}


function getDataflow(req,res){
  var DataflowId = req.params.DfID;
  var DataflowAgency = req.params.DfAgency;
  var request = require('request');
  var options = {
    'method': 'GET',
    'url': `https://sdmx.data.unicef.org/ws/public/sdmxapi/rest/data/${DataflowAgency},${DataflowId},1.0/all?format=sdmx-json`,
    'header': 'Content-Type: application/json',
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    res.status(200).json(response.body);
    res.end();
  });
}

function getDataflowPage(req,res){
  res.sendFile(path.resolve('views/dataflows.html'));
}


module.exports = {
    getDataStructure: getDataStructure,
    getDataflow: getDataflow,
    getDataflowPage: getDataflowPage
};