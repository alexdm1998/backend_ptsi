var path = require('path');
var papa = require('papaparse');


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


function getDataflowFilteredV2csv(req,res){
  var request = require('request');
  var DataflowId = req.params.DfID;
  var DataflowAgency = req.params.DfAgency;
  var DataflowFilter = req.params.DfFilter;
  var options = {
    'method': 'GET',
    'url': `https://sdmx.data.unicef.org/ws/public/sdmxapi/rest/data/${DataflowAgency},${DataflowId},1.0/${DataflowFilter}?format=csv`,
  };
  request(options, function(error, response){
    if (error) throw new Error(error);
    let Csv = response.body;
    let JsonObj = papa.parse(Csv,{header: true, delimiter: ",", skipEmptyLines:true})
    res.status(200).send(JsonObj);
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






module.exports = {
    getDataStructureV2: getDataStructureV2,
    getDataflowV2: getDataflowV2,
    getDataflowFilteredV2csv: getDataflowFilteredV2csv,
    getCustomDataflow: getCustomDataflow
};