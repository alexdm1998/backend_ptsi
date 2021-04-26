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


function getDataflowFiltered(req,res){
  var request = require('request');
  var DataflowId = req.params.DfID;
  var DataflowAgency = req.params.DfAgency;
  var DataflowFilter = req.params.DfFilter;
  var options = {
    'method': 'GET',
    'url': `https://sdmx.data.unicef.org/ws/public/sdmxapi/rest/data/${DataflowAgency},${DataflowId},1.0/${DataflowFilter}?format=sdmx-json`,
  };
  request(options, function(error, response){
    if (error) throw new Error(error);
    var JsonObj = JSON.parse(response.body);
    var JsonString  = JSON.stringify(JsonObj)
    res.status(200).send(JsonString);
  });

}


function getDataStructureV2(req, res){
  var request = require('request');
  var options = {
    'method': 'GET',
    'url': 'https://sdmx.data.unicef.org/ws/public/sdmxapi/rest/dataflow/all/all/latest/?format=sdmx-json&detail=full&references=none',
    'header': 'Content-Type: application/json',
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
    
    //var myJsonString = JSON.stringify(ArrayDfID);
    res.status(200).json(ArrayDfID);

    res.end();
  });
}

function getDataflowV2(req,res){
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
    var JsonObj = JSON.parse(response.body)
    res.status(200).json(JsonObj);
    res.end();
  });
}


function getDataflowFilteredV2(req,res){
  var request = require('request');
  var DataflowId = req.params.DfID;
  var DataflowAgency = req.params.DfAgency;
  var DataflowFilter = req.params.DfFilter;
  var options = {
    'method': 'GET',
    'url': `https://sdmx.data.unicef.org/ws/public/sdmxapi/rest/data/${DataflowAgency},${DataflowId},1.0/${DataflowFilter}?format=sdmx-json`,
  };
  request(options, function(error, response){
    if (error) throw new Error(error);
    var JsonObj = JSON.parse(response.body);
    res.status(200).json(JsonObj);
    res.end();
  });

}

function getCustomDataflow(req,res){
  var request = require('request');
  var DataflowAgency = req.params.DfAgency;
  var DataflowId = req.params.DfID;
  var options = {
    'method' : "GET",
    'url' : `https://sdmx.data.unicef.org/ws/public/sdmxapi/rest/data/${DataflowAgency},${DataflowId},1.0/all?format=sdmx-json`,
  }
  request(options, function(error, response){
    if(error) throw new Error(error);
    var JsonObj = JSON.parse(response.body);
    JsonObj = JsonObj.data;
    var Datasets = JsonObj.dataSets[0].series;
    var Dimensions = JsonObj.structure.dimensions.series;
    var DimensionTime = JsonObj.structure.dimensions.observation;
    var Dataflow = {
      "Datasets" : Datasets,
      "Dimensions" : Dimensions,
      "DimensionTime" : DimensionTime
    }
    res.status(200).json(Dataflow);
    res.end();
  });
}







function getDataflowPage(req,res){
  res.sendFile(path.resolve('views/dataflows.html'));
}


module.exports = {
    getDataStructure: getDataStructure,
    getDataStructureV2: getDataStructureV2,
    getDataflow: getDataflow,
    getDataflowV2: getDataflowV2,
    getDataflowFiltered: getDataflowFiltered,
    getDataflowFilteredV2: getDataflowFilteredV2,
    getDataflowPage: getDataflowPage,
    getCustomDataflow: getCustomDataflow
};