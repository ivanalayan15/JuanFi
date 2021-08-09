var errorCodeMap = [];
errorCodeMap['coins.wait.expired'] = 'Coin slot expired';
errorCodeMap['coin.not.inserted'] = 'Coin not inserted';
errorCodeMap['coinslot.busy'] = 'Coin slot is busy';
errorCodeMap['coin.slot.notavailable'] = 'Coin slot is not available as of the moment, Please try again later';
errorCodeMap['no.internet.detected'] = 'No internet connection as of the moment, Please try again later';
var totalCoinReceived = 0;
var insertcoinbg = new Audio('assets/insertcoinbg.mp3');
insertcoinbg.loop = true;
var coinCount = new Audio('assets/coin-received.mp3');
var voucher = localStorage.getItem('activeVoucher');
	

$(document).ready(function(){
  $( "#saveVoucherButton" ).prop('disabled', true);	
  $( "#cncl" ).prop('disabled', false);
  $('#coinToast').toast({delay: 1000, animation: true});
  $('#coinSlotError').toast({delay: 5000, animation: true});
  
  $('#insertCoinModal').on('hidden.bs.modal', function () {
		clearInterval(timer);
		timer = null;
	});

	if(loginError != "" && ((voucher != null && voucher != ""))){
		localStorage.removeItem("activeVoucher");
		cleanUpLocalStorage(voucher);
		voucher = "";
		$.toast({
			title: 'Error',
			content: "Invalid voucher, please make sure voucher is valid",
			type: 'error',
			delay: 5000
		});
	}
});
if(voucher == null){
	voucher = "";
}
if(voucher != ""){
	$('#voucherInput').val(voucher);
}

$( "#promoRateBtn" ).click(function() {
	$('#promoRatesModal').modal('show');
});

var vendorIpAdress = "10.0.10.253";
var timer = null;

$( "#insertBtn" ).click(function() {
	$("#progressDiv").attr('style','width: 100%')
	$( "#saveVoucherButton" ).prop('disabled', true);
	$( "#cncl" ).prop('disabled', false);
	$("#loaderDiv").attr("class","spinner");
	totalCoinReceived = 0;
	$('#totalCoin').html("0");
	$('#totalTime').html(secondsToDhms(parseInt(0)));
	callTopupAPI(0);
});

$('#promoRatesModal').on('shown.bs.modal', function (e) {
  $.ajax({
	  type: "GET",
	  url: "http://"+vendorIpAdress+"/getRates?date="+(new Date().getTime()),
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
	$.ajax({
	  type: "POST",
	  url: "http://"+vendorIpAdress+"/topUp",
	  data: "voucher="+voucher,
	  success: function(data){
		$("#loaderDiv").attr("class","spinner hidden");
		if(data.status == "true"){
			voucher = data.voucher;
			$('#insertCoinModal').modal('show');
			if(timer == null){
				timer = setInterval(checkCoin, 1000);
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

$( "#saveVoucherButton" ).click(function() {
	totalCoinReceived = 0;
	$("#loaderDiv").attr("class","spinner");
	localStorage.setItem('activeVoucher', voucher);
	$('#voucherInput').val(voucher);
	clearInterval(timer);
	timer = null;
	$.ajax({
	  type: "POST",
	  url: "http://"+vendorIpAdress+"/useVoucher",
	  data: "voucher="+voucher,
	  success: function(data){
		$("#loaderDiv").attr("class","spinner hidden");
		console.log(data);
		if(data.status == "true"){
			
			localStorage.setItem(voucher+"tempValidity", data.validity);
			$.toast({
			  title: 'Success',
			  content: 'Thank you for the purchase!, will do auto login shortly',
			  type: 'success',
			  delay: 3000
			});
			
			var type = $( "#saveVoucherButton" ).attr('data-save-type');

			if(type == "extend"){
				localStorage.setItem('reLogin', '1');
				document.logout.submit();
			}else{
				setTimeout(function (){
					doLogin();
				}, 3000);
			}
			
		}else{
			notifyCoinSlotError(data.errorCode);
		}
	  }
	});
});

function checkCoin(){
	$.ajax({
	  type: "POST",
	  url: "http://"+vendorIpAdress+"/checkCoin",
	  data: "voucher="+voucher,
	  success: function(data){
		
		if(data.status == "true"){
			totalCoinReceived = parseInt(data.totalCoin);
			$('#totalCoin').html(data.totalCoin);	
			$('#totalTime').html(secondsToDhms(parseInt(data.timeAdded)));
			localStorage.setItem('activeVoucher', voucher);
			localStorage.setItem(voucher+"tempValidity", data.validity);
			$('#voucherInput').val(voucher);
			notifyCoinSuccess(data.newCoin);
		}else{
			if(data.errorCode == "coin.not.inserted"){
				localStorage.setItem(voucher+"tempValidity", data.validity);
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
					if(totalCoinReceived > 0){
						$.toast({
						  title: 'Success',
						  content: 'Coin slot expired!, but was able to succesfully process the coin '+totalCoinReceived,
						  type: 'info',
						  delay: 5000
						});	
					}else{
						notifyCoinSlotError('coins.wait.expired');
					}
				}else{
					totalCoinReceived = parseInt(data.totalCoin);
					if(totalCoinReceived > 0 ){
						$( "#saveVoucherButton" ).prop('disabled', false);
						$( "#cncl" ).prop('disabled', true);
					}
					$('#totalCoin').html(data.totalCoin);
					$('#totalTime').html(secondsToDhms(parseInt(data.timeAdded)));
					//$( "#remainingTime" ).html(remainTime);
					$("#progressDiv").attr('style','width: '+percent+'%')
				}
				
			}else{
				notifyCoinSlotError(data.errorCode);
				clearInterval(timer);
			}
		}
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

function cleanUpLocalStorage(v){


}