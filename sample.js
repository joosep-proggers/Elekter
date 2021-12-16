var heaterId = 20
var ventilationId = 21
var boilerId = 22
const fs = require('fs')

//------------------------------------------------------
var siteId = wizard = false, siteName = 'https://' + 'c612' + '.by.enlife.io'
const Api = require("./lib/enlife.js").Api
//------------------------------------------------------
console.log("\n------------LOGIN------------")
console.log("- " + siteName + " -")
new Api(siteName)
    [wizard?'wizard':'login']("apiuser", "apiUserApiUser")
    .then (api => {
// response to /hello command has got, continue to send a sample PATCH  commands and status GET query
        console.log("----------LOGIN OK ----------\n")
        /*
        --
        Sample PATCH command sets device measured temperature to 22.3C, setpoint temperature to 22C and limits minimum value to 10% and maximum value to 90%.
            - status.temperature indicates the runtime value, it is non-volatile i.e. will be lost after controller restart. As there's no real temperature sensor connected, it is emulated with PATCH command
            - other parameters in root level (e.g. setpoint and setup) map are volatile i.e. they survive controller restart.
            - setup.max limits max energy volume given to a device.
        One can change also name and other parameters, e.g. "name": "someDeviceName"
        */
        Promise
            .all([
                api.patch("/devices?id="+heaterId, {
                    "status": {"temperature": 22.3},
                    "setpoint": 22,
                    "setup": {"min":10, "max": 90}
                }),
            ])
            .then(function() {
//------------------------------------------------------------------------------------------------------------------------
                /*
                Sample GET command queries the runtime status of device. It is sent after the response to PATCH command has been received.
                Instead of periodic querying it is possible to remain listening the runtime events with long poll method, which can be investigated in web console.
                query all devices: "/devices"
                query certain device by id: "/devices?id=something"
                query certain device by name part: "/devices?id=*t*" //all devices containing letter 't'
                query devices where setup.max limit has been set: "/devices?setup.max" or "/devices?setup.max>40"
                query devices where setup.max limit has not been set: "/devices?!setup.max"
                */
                Promise
                    .all([
                        api.get("/devices?id="+heaterId)
                            .then( function(res) {
                                res.forEach( function(item) { console.log(" -> device info:", item) })
                            }),
                        api.get("/rooms?tag=nordPool")
                            .then( function(res) {
                                res.forEach( function(item) { const andmed = JSON.stringify(item.status)
                                    fs.writeFile('data.json', andmed, function (err) {
                                        if (err) throw err;
                                        console.log('Replaced!');
                                    });
                                })
                            }),
                    ])
                    .then(function() {
                        console.log("\n------------ DONE -----------")
                    }) }) })
