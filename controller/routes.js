var path = require('path');

const app = require('../app.js');


const controllerINE = require('./controllerINE');
app.get('/INEjson/', controllerINE.getJson);


const controllerUNICEF = require('./controllerUNICEF');
app.get('/UNICEF/Datastructure', controllerUNICEF.getDataStructure);
app.get('/UNICEF/Dataflow/:DfID/:DfAgency/request', controllerUNICEF.getDataflow);
app.get('/UNICEF/Dataflow/:DfID/:DfAgency/filter/:DfFilter', controllerUNICEF.getDataflowFiltered);
app.get('/UNICEF/Dataflow/:DfID/:DfAgency', controllerUNICEF.getDataflowPage); //Html page


app.get('/', function (req, res) {
    res.sendFile(path.resolve('views/index.html'));
});

