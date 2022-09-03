//this is to enable multi vendo setup, set to true when multi vendo is supported
var isMultiVendo = true;

//list here all node mcu address for multi vendo setup
var multiVendoAddresses = [
	{
		vendoName: "Vendo 1 - ESP32 Wireless", //change accordingly to your vendo name
		vendoIp: "10.10.10.252" //change accordingly to your vendo name
	},
	{
		vendoName: "Vendo 2 - ESP8622 Wireless", //change accordingly to your vendo name
		vendoIp: "10.10.1.251" //change accordingly to your vendo name
	},
	{
		vendoName: "Vendo 3 - ESP8622 LAN", //change accordingly to your vendo name
		vendoIp: "10.5.50.253" //change accordingly to your vendo name
	},
	{
		vendoName: "Vendo 4 - ESP32 LAN", //change accordingly to your vendo name
		vendoIp: "10.5.50.254" //change accordingly to your vendo name
	}
];

//0 means its login by username only, 1 = means if login by username + password
var loginOption = 0; //replace 1 if you want login voucher by username + password

var dataRateOption = false; //replace true if you enable data rates
//put here the default selected address
var vendorIpAddress = "10.10.10.254";

//hide pause time / logout true = you want to show pause / logout button
var showPauseTime = true;

//enable member login, true = if you want to enable member login
var showMemberLogin = true;

//enable extend time button for customers
var showExtendTimeButton = true;

//disable voucher input
var disableVoucherInput = false;