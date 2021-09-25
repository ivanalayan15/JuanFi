var errorCodeMap = [];
errorCodeMap['coins.wait.expired'] = 'Coin slot expired';
errorCodeMap['coin.not.inserted'] = 'Coin not inserted';
errorCodeMap['coinslot.cancelled'] = 'Coinslot was cancelled';
errorCodeMap['coinslot.busy'] = 'Coin slot is busy';
errorCodeMap['coin.slot.banned'] = 'You have been banned from using coin slot, due to multiple request for insert coin, please try again later!';
errorCodeMap['coin.slot.notavailable'] = 'Coin slot is not available as of the moment, Please try again later';
errorCodeMap['no.internet.detected'] = 'No internet connection as of the moment, Please try again later';
var totalCoinReceived = 0;
var insertcoinbg = new Audio('assets/insertcoinbg.mp3');
insertcoinbg.loop = true;
var coinCount = new Audio('assets/coin-received.mp3');
var voucher = getStorageValue('activeVoucher');
var insertingCoin = false;


$(document).ready(function(){
  $( "#saveVoucherButton" ).prop('disabled', true);	
  $( "#cncl" ).prop('disabled', false);
  $('#coinToast').toast({delay: 1000, animation: true});
  $('#coinSlotError').toast({delay: 5000, animation: true});
  
  $('#insertCoinModal').on('hidden.bs.modal', function () {
		clearInterval(timer);
		timer = null;
		insertingCoin = false;
		insertcoinbg.pause();
		insertcoinbg.currentTime = 0.0;
	});

	if(loginError != "" && ((voucher != null && voucher != ""))){
		
		removeStorageValue("activeVoucher");
		voucher = "";
		$.toast({
			title: 'Error',
			content: "Invalid voucher, please make sure voucher is valid",
			type: 'error',
			delay: 5000
		});
	}
  
  if(isMultiVendo){
	  for(var i=0;i<multiVendoAddresses.length;i++){
		  $("#vendoSelected").append($('<option>', {
			value: multiVendoAddresses[i].vendoIp,
			text: multiVendoAddresses[i].vendoName
		  }));
	  }
	  var selectedVendo = getStorageValue('selectedVendo');
	  if(selectedVendo != null){
		  vendorIpAddress = selectedVendo;
	  }
	  $("#vendoSelected").val(vendorIpAddress);
	  $("#vendoSelected").change(function(){
		vendorIpAddress = $("#vendoSelected").val();
		setStorageValue('selectedVendo', vendorIpAddress);
	  });
	  
	  $("#vendoSelected").trigger("change");

  }else{
	  $("#vendoSelectDiv").attr("style", "display: none");
  }
  
  if(!dataRateOption){
	 $("#dataInfoDiv").attr("style", "display: none");
	 $("#dataInfoDiv2").attr("style", "display: none");
  }
});
if(voucher == null){
	voucher = "";
}
if(voucher != ""){
	$('#voucherInput').val(voucher);
}

function promoBtnAction(){
	$('#promoRatesModal').modal('show');
	return false;
}

//this is to enable multi vendo setup, set to true when multi vendo is supported
var isMultiVendo = true;

//list here all node mcu address for multi vendo setup
var multiVendoAddresses = [
	{
		vendoName: "Vendo 1", //change accordingly to your vendo name
		vendoIp: "10.0.10.253" //change accordingly to your vendo name
	},
	{
		vendoName: "Vendo 2", //change accordingly to your vendo name
		vendoIp: "10.0.10.254" //change accordingly to your vendo name
	}
];

//0 means its login by username only, 1 = means if login by username + password
var loginOption = 0; //replace 1 if you want login voucher by username + password

var dataRateOption = false; //replace true if you enable data rates
//put here the default selected address
var vendorIpAddress = "10.0.10.253";
var timer = null;

function insertBtnAction(){
	$("#progressDiv").attr('style','width: 100%')
	$( "#saveVoucherButton" ).prop('disabled', true);
	$( "#cncl" ).prop('disabled', false);
	$("#loaderDiv").attr("class","spinner");
	totalCoinReceived = 0;
	$('#totalCoin').html("0");
	$('#totalTime').html(secondsToDhms(parseInt(0)));
	callTopupAPI(0);
	return false;
}

$('#promoRatesModal').on('shown.bs.modal', function (e) {
  $.ajax({
	  type: "GET",
	  url: "http://"+vendorIpAddress+"/getRates?date="+(new Date().getTime()),
	  crossOrigin: true,
	  contentType: 'text/plain',
	  success: function(data){
		var rows = data.split("|");
		var rates = "";
		
		for(r in rows){
			var columns = rows[r].split("#");
			rates = rates + "<tr>";
			rates = rates + "<td>";
			rates = rates + columns[0];
			rates = rates + "</td>";
			rates = rates + "<td>";
			rates = rates + secondsToDhms(parseInt(columns[3])*60);
			rates = rates + "</td>";
			rates = rates + "</tr>";
		}
		
		$("#ratesBody").html(rates);
	  }
	});
})

function callTopupAPI(retryCount){
	
	var type = $( "#saveVoucherButton" ).attr('data-save-type');
	if(type != "extend"){
		var storedVoucher = getStorageValue('activeVoucher');
		if(storedVoucher != null){
			voucher = "";
			$("#voucherInput").val('');
			removeStorageValue("activeVoucher");
		}
		
	}
	
	$.ajax({
	  type: "POST",
	  url: "http://"+vendorIpAddress+"/topUp",
	  data: "voucher="+voucher+"&mac="+mac,
	  success: function(data){
		$("#loaderDiv").attr("class","spinner hidden");
		if(data.status == "true"){
			voucher = data.voucher;
			$('#insertCoinModal').modal('show');
			insertingCoin = true;
			$('#codeGenerated').html(voucher);
			$('#codeGeneratedBlock').attr('style', 'display: none');
			if(timer == null){
				timer = setInterval(checkCoin, 1000);
			}
			if(isMultiVendo){
				$("#insertCoinModalTitle").html("Please insert the coin on "+$("#vendoSelected option:selected").text());
			}
			insertcoinbg.play();
		}else{
			notifyCoinSlotError(data.errorCode);
			clearInterval(timer);
			timer = null;
		}
	  },error: function (jqXHR, exception) {
		  setTimeout(function() {
			if(retryCount < 2){
				callTopupAPI(retryCount+1);
			}else{
				$("#loaderDiv").attr("class","spinner hidden");
				notifyCoinSlotError("coin.slot.notavailable");
			}
		  }, 1000 );
	  }
	});
}

function saveVoucherBtnAction(){
	$("#loaderDiv").attr("class","spinner");
	setStorageValue('activeVoucher', voucher);
	$('#voucherInput').val(voucher);
	clearInterval(timer);
	timer = null;
	insertcoinbg.pause();
	insertcoinbg.currentTime = 0.0;
	$.ajax({
	  type: "POST",
	  url: "http://"+vendorIpAddress+"/useVoucher",
	  data: "voucher="+voucher,
	  success: function(data){
		totalCoinReceived = 0;
		$("#loaderDiv").attr("class","spinner hidden");
		if(data.status == "true"){
			
			setStorageValue(voucher+"tempValidity", data.validity);
			
			$.toast({
			  title: 'Success',
			  content: 'Thank you for the purchase!, will do auto login shortly',
			  type: 'success',
			  delay: 3000
			});
			
			var type = $( "#saveVoucherButton" ).attr('data-save-type');

			if(type == "extend"){
				setStorageValue('reLogin', '1');
				document.logout.submit();
			}else{
				setTimeout(function (){
					doLogin();
				}, 3000);
			}
			
		}else{
			notifyCoinSlotError(data.errorCode);
		}
	  },error: function (jqXHR, exception) {
		 $("#loaderDiv").attr("class","spinner hidden");
		 if(totalCoinReceived > 0){
		    $.toast({
			  title: 'Warning',
			  content: 'Connect/Login failed, however coin has been process, please manually connect using this voucher: '+voucher,
			  type: 'info',
			  delay: 8000
			});
		 }
	  }
	});
	
}

function checkCoin(){
	$.ajax({
	  type: "POST",
	  url: "http://"+vendorIpAddress+"/checkCoin",
	  data: "voucher="+voucher,
	  success: function(data){
		
		if(data.status == "true"){
			totalCoinReceived = parseInt(data.totalCoin);
			$('#totalCoin').html(data.totalCoin);	
			$('#totalTime').html(secondsToDhms(parseInt(data.timeAdded)));
			$('#codeGeneratedBlock').attr('style', 'display: block');
			$('#totalData').html(data.data);
			
			setStorageValue('activeVoucher', voucher);
			setStorageValue(voucher+"tempValidity", data.validity);
			
			$('#voucherInput').val(voucher);
			notifyCoinSuccess(data.newCoin);
		}else{
			if(data.errorCode == "coin.not.inserted"){
				setStorageValue(voucher+"tempValidity", data.validity);
				
				var remainTime = parseInt(parseInt(data.remainTime)/1000);
				var waitTime = parseFloat(data.waitTime);
				var percent = parseInt(((remainTime*1000) / waitTime) * 100);
				totalCoinReceived = parseInt(data.totalCoin);
				if(totalCoinReceived > 0 ){
					$( "#saveVoucherButton" ).prop('disabled', false);
					$( "#cncl" ).prop('disabled', true);
				}
				if(remainTime == 0){
					$('#insertCoinModal').modal('hide');
					insertcoinbg.pause();
					insertcoinbg.currentTime = 0.0;
					if(totalCoinReceived > 0){
						$.toast({
						  title: 'Success',
						  content: 'Coin slot expired!, but was able to succesfully process the coin '+totalCoinReceived +", will do auto login shortly",
						  type: 'info',
						  delay: 5000
						});
						setTimeout(function (){
							doLogin();
						}, 3000);
					}else{
						notifyCoinSlotError('coins.wait.expired');
					}
				}else{
					totalCoinReceived = parseInt(data.totalCoin);
					if(totalCoinReceived > 0 ){
						$( "#saveVoucherButton" ).prop('disabled', false);
						$( "#cncl" ).prop('disabled', true);
						$('#codeGeneratedBlock').attr('style', 'display: block');
					}
					$('#totalCoin').html(data.totalCoin);
					$('#totalData').html(data.data);
					$('#totalTime').html(secondsToDhms(parseInt(data.timeAdded)));
					//$( "#remainingTime" ).html(remainTime);
					$("#progressDiv").attr('style','width: '+percent+'%')
				}
				
			}else if(data.errorCode == "coinslot.busy"){
				//when manually cleared the button
				insertcoinbg.pause();
				insertcoinbg.currentTime = 0.0;
				notifyCoinSlotError("coinslot.cancelled");
				clearInterval(timer);
				$('#insertCoinModal').modal('hide');
			}else{
				notifyCoinSlotError(data.errorCode);
				clearInterval(timer);
			}
		}
	  },error: function (jqXHR, exception) {
			console.log('error!!!');
	  }
	});
}

function notifyCoinSlotError(errorCode){
	$.toast({
	  title: 'Error',
	  content: errorCodeMap[errorCode],
	  type: 'error',
	  delay: 5000
	});
}

function notifyCoinSuccess(coin){
	$.toast({
	  title: 'Coin inserted',
	  content: coin+' peso(s) was inserted',
	  type: 'success',
	  delay: 2000
	});
	coinCount.play();
}

function secondsToDhms(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600*24));
	var h = Math.floor(seconds % (3600*24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);

	var dDisplay = d > 0 ? d + (d == 1 ? " Day " : " Days ") : "0 Day ";
	var hDisplay = h > 0 ? h + (h == 1 ? " Hour " : " Hours ") : "0 Hour ";
	var mDisplay = m > 0 ? m + (m == 1 ? " Min " : " Mins ") : "0 Min ";
	var sDisplay = s > 0 ? s + (s == 1 ? " Sec" : " Secs") : "0 Sec ";
	return dDisplay + hDisplay + mDisplay + sDisplay;
}

function setStorageValue(key, value){
	if(localStorage != null){
		localStorage.setItem(key, value);
	}else{
		setCookie(key,value,364);
	}
}

function removeStorageValue(key){
	if(localStorage != null){
		localStorage.removeItem(key);
	}else{
		eraseCookie(key);
	}
}

function getStorageValue(key){
	if(localStorage!= null){
		return localStorage.getItem(key);
	}else{
		return getCookie(key);
	}
}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}
