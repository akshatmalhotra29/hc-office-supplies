const cds = require('@sap/cds');

module.exports = cds.service.impl(function () {
    this.on('get_supplier_info', async() =>{
        try {
            const db = await cds.connect.to('db');
            //console.log(db.PromiseValue);
            const dbClass = require("sap-hdbext-promisfied");
            let dbConn = new dbClass(await dbClass.createConnection(db.options.credentials));
            const hdbext = require("@sap/hdbext");

            const sp = await dbConn.loadProcedurePromisified(hdbext, null, 'get_supplier_info');
            const output = await dbConn.callProcedurePromisified(sp, []);
            console.log(output.results);

            return output.results;
        }
        catch (error) {
            console.log(error);
            req.error(500,error.message);
            return ;
        }
    } )

    // async function _getSInfo(req,res){
    //     try {
    //         const db = await cds.connect.to('db');
    //         //console.log(db.PromiseValue);
    //         const dbClass = require("sap-hdbext-promisfied");
    //         let dbConn = new dbClass(await dbClass.createConnection(db.options.credentials));
    //         const hdbext = require("@sap/hdbext");

    //         const sp = await dbConn.loadProcedurePromisified(hdbext, null, 'get_supplier_info');
    //         const output = await dbConn.callProcedurePromisified(sp, []);
    //         console.log(output.results);

    //         return output.results;
    //     }
    //     catch (error) {
    //         console.log(error);
    //         req.error(500,error.message);
    //         return ;
    //     }

    // }
})