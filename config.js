var config = {
    development: {
        server: {
            host: '127.0.0.1',
            port: '3000'
        },
        bps_api: {
            url: '',
            apiVersion: 'v3.0',
            clientId: '',
            secret: '',
            tokenExpirationTime: 21600000,
            dbId: 1,
            companyId: 1
        },
        bps_app: {
            appId: '',
            reportId: '',
            pathId: '',
            workflowId: '',
            formTypeId: '',
            formFields: {
                FIELD_attributeId: ''
            }
        }
    },

    production: {
        server: {
            host: '',
            port: ''
        },
        bps: {
            url: '',
            apiVersion: '',
            clientId: '',
            secret: '',
            tokenExpirationTime: 21600000,
            dbId: 1,
            companyId: 1
        },
        bps_rejestr: {
            appId: '',
            reportId: '',
            pathId: '',
            workflowId: '',
            formTypeId: '',
            formFields: {
                FIELD_attributeId: ''
            }
        }
    }  
};
module.exports = config;