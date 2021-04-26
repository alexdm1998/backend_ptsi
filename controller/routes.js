var path = require('path');

const app = require('../app.js');


const controllerINE = require('./controllerINE');
app.get('/INEjson/', controllerINE.getJson);


const controllerUNICEF = require('./controllerUNICEF');
app.get('/UNICEF/Datastructure', controllerUNICEF.getDataStructure); //Não usem este
app.get('/UNICEF/Dataflow/:DfID/:DfAgency/request', controllerUNICEF.getDataflow);//Não usem este
app.get('/UNICEF/Dataflow/:DfID/:DfAgency/filter/:DfFilter', controllerUNICEF.getDataflowFiltered);//Não usem este



app.get('/UNICEF/v2/Datastructure/', controllerUNICEF.getDataStructureV2); //Retorna datastructure
app.get('/UNICEF/v2/Dataflow/:DfID/:DfAgency/request', controllerUNICEF.getDataflowV2); //Retorna dataflow sem filtro
app.get('/UNICEF/v2/Dataflow/:DfID/:DfAgency/filter/:DfFilter', controllerUNICEF.getDataflowFilteredV2); //Retorna dataflow com filtro
app.get('/UNICEF/Dataflow/:DfID/:DfAgency', controllerUNICEF.getDataflowPage); //Retorna um pag Html

app.get('/UNICEF/Df/:DfID/:DfAgency',controllerUNICEF.getCustomDataflow);


app.get('/', function (req, res) {
    res.sendFile(path.resolve('views/index.html'));
});

