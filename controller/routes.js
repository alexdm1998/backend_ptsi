var path = require('path');

const app = require('../app.js');

const controllerUNICEF = require('./controllerUNICEF');




app.get('/UNICEF/v2/Datastructure/', controllerUNICEF.getDataStructureV2); //Retorna datastructure
app.get('/UNICEF/v2/Dataflow/:DfID/:DfAgency/request', controllerUNICEF.getDataflowV2); //Retorna dataflow sem filtro
app.get('/UNICEF/v2/Dataflow/:DfID/:DfAgency/filtercsv/:DfFilter', controllerUNICEF.getDataflowFilteredV2csv); //Retorna dataflow filtrado

app.get('/UNICEF/Df/:DfID/:DfAgency',controllerUNICEF.getCustomDataflow);
