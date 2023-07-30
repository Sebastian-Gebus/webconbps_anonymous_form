var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];
const clientId = config.bps_api.clientId;
const secret = config.bps_api.secret;

const workflowId = config.bps_app.workflowId;
const formTypeId = config.bps_app.formTypeId;
const companyId = config.bps_app.companyId;
const formFields = config.bps_app.formFields;

var getAuthParams = function () {
    var params ={
        "clientId": clientId,
        "clientSecret": secret
    }
    return params;
}

var buildNewElementObject = function (formData) {
    try {
        var object = {
            "workflow": {
                "id": workflowId
            },
            "formType": {
                "id": formTypeId
            },
            "company": {
                "id": companyId
            },

            "formFields": [
                {
                    "value": formData.attributeValue,
                    "id": formFields.FIELD_attributeId
                }
            ],
            "comments": {
                "newComment": ''
            }
        }
    } catch (error) {
        console.error(error);
    }
    return object;
}

module.exports = {
    getAuthParams, buildNewElementObject
}