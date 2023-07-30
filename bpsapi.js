const Axios = require("axios");
var helper = require('./helper.js');
var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];

const apiUrl = config.bps_api.url;
const apiVersion = config.bps_api.apiVersion;
const tokenExpirationTime = config.bps_api.tokenExpirationTime;
const dbId = config.bps_api.dbId;
const appId = config.bps_app.appId;
const pathId = config.bps_app.pathId;
const reportId = config.bps_app.reportId;

var tokenStorage = {
	"token": "",
	"expireTime": ""
}

async function getToken() {
	var params = helper.getAuthParams();

	if (tokenStorage.token != "" && tokenStorage.expireTime > Date.now())
		return { "token": tokenStorage.token };

	else {
		return Axios.post(
			apiUrl + '/login',
			params
		).then(function (response) {
			tokenStorage.token = response.data.token;
			tokenStorage.expireTime = Date.now() + tokenExpirationTime;

			return response.data;
		})
	}
}

const getReportData = (token) => {
	return Axios.get(
		apiUrl + '/data/' + apiVersion + '/db/' + dbId + '/applications/' + appId + '/reports/' + reportId,
		{
			headers: { 'Authorization': 'Bearer ' + token }
		}
	).then(function (response) {
		return response.data;
	})
}

const createNewElement = (token, formData) => {
	var elementData = helper.buildNewElementObject(formData);

	return Axios.post(
		apiUrl + '/data/' + apiVersion + '/db/' + dbId + '/elements?path=' + pathId + '&mode=standard', elementData,
		{
			headers: { 'Authorization': 'Bearer ' + token }
		}
	).then(function (response) {
		return response;
	})
}

module.exports = {
	getToken, getReportData, createNewElement
}