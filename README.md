# JuanFi

JuanFi is an open source system for coinslot integration for mikrotik hotspot

## Donation

Donation is very welcome, if you want to donate, you can donate using 

Gcash account:
Ivan Julius Alayan
09175425572

Paypal account:
https://www.paypal.com/paypalme/ivanalayan


## Features

 ### Hardware Option
 * Wireless based
 * Lan based
 
 ### Coinslot System
 * Mikrotik integration
 * Pause expiration
 * Codeless generation
 * Anti Coinslot abuse system
 * LCD Display
 * Code generation in vendo using LCD without device needed
 * Multi vendo system
 
 ### Admin System
 * Initial setup of the system
 * Mikrotik connection setup, SSID setup, coinslot settings
 * Promo Rates configuration ( Rates, expiration)
 * Dashboard, Sales report
 * Custom pin configuration
 * coinslot abuse system config

## Requirements
1.) NodeMCU(ESP8266) for wireless/lan or NodemCU(ESP32) for wireless/lan

2.) Coinslot

3.) Mikrotik Router

4.) Access Point

5.) Node MCU baseboard( Optional for wireless)

6.) Power Supply (12v for nodemcu, another 12v for Mikrotik)

7.) W5500 for Lan based

8.) LM2596 or any DC to DC buck that can convert to 5v for (Lan based only since no available baseboard for ESP32)

## Architecture
![alt text](https://github.com/ivanalayan15/JuanFi/blob/master/docs/JuanFi-Architecture.PNG?raw=true)

## LAN Based Connection Diagram
![alt text](https://github.com/ivanalayan15/JuanFi/blob/master/docs/JuanFi%20Connection%20LanBase%20Diagram.PNG?raw=true)

## Wireless Based Connection Diagram
![alt text](https://github.com/ivanalayan15/JuanFi/blob/master/docs/JuanFi%20Connection%20Diagram.PNG?raw=true)

## Installation



### NodeMCU Setup

There are 2 ways how to upload the software in NodeMCU

#### a.) Install the binary release file, follow this guide on how to flash the bin file https://github.com/ivanalayan15/JuanFi/tree/master/release

#### b.) Build and compile the code

(SKIP THIS STEP IF YOU CHOOSE THE BIN FILES) GOTO Step #4 directly

1.) Download and install Arduino IDE
https://www.arduino.cc/en/software


2.) Install nodemcu board and libraries
https://randomnerdtutorials.com/how-to-install-esp8266-board-arduino-ide/


install dependency libraries at arduino libraries folder 
* Download this https://github.com/videojedi/ESP8266-Telnet-Client and put it on ardunio library folder
* From arduino, Go to Tools->Manage Libararies->Seach for LiquidCrystal_I2C and installl

3.) Compile and upload code

   a.) Open JuanFi.ino

   b.) Compile and upload
      ![alt text](https://github.com/ivanalayan15/JuanFi/blob/master/docs/JuanFi%20-%20NodeMcu-UploadCode.PNG?raw=true)

   c.) Upload sketchup data using SIFSS, follow this instruction https://randomnerdtutorials.com/install-esp8266-filesystem-uploader-arduino-ide/
      ![alt text](https://github.com/ivanalayan15/JuanFi/blob/master/docs/JuanFi%20-%20NodeMcu-SketchUpload.png?raw=true)

4.) JuanFi initial setup

a.) Connect to JuanFi Setup SSID

1.) For Nodemcu/esp8622 wireless JuanFI setup will appear
![alt text](https://github.com/ivanalayan15/JuanFi/blob/master/docs/JuanFi-Step01.PNG?raw=true)

2.) For ESP32 Lanbase, you need to plugin first in your PC/Laptop ethernet and set your IP address as static 172.217.28.2

After you set to static you can access the admin in your browser as 172.217.28.1


b.) Login to admin panel,
Default user and password : admin / admin

![alt text](https://github.com/ivanalayan15/JuanFi/blob/master/docs/JuanFi-Step02.PNG?raw=true)

c.) Configure System, change the necessary fields to your configuration, system will restart to take effect,
default mikrotik user and password is pisonet / abc123
![alt text](https://github.com/ivanalayan15/JuanFi/blob/master/docs/JuanFi-Step03.PNG?raw=true)

d.) Configure Promo rates
![alt text](https://github.com/ivanalayan15/JuanFi/blob/master/docs/JuanFi-Step04.PNG?raw=true)

### Mikrotik Setup

1.) Setup mikrotik hotspot according to your configuration

2.) Make the NodeMCU IP address static
![alt text](https://github.com/ivanalayan15/JuanFi/blob/master/docs/JuanFI-Mikrotik-Step1.PNG?raw=true)

3.) Add IP Bindings exception on hotspot
![alt text](https://github.com/ivanalayan15/JuanFi/blob/master/docs/JuanFi-Mikrotik-Step2.PNG?raw=true)

4.) Modify vendoIpAddress (NodeMcu IPaddress) in the core.js file, you can do a multivendo setup just follow the comment in javascript for instruction
![alt text](https://github.com/ivanalayan15/JuanFi/blob/master/docs/JuanFi-Mikrotik-Step5.PNG?raw=true)

5.) Upload html template to mikrotik in Files option of mikrotik

6.) Create user for nodemcu access, default user for nodemcu is pisonet / abc123 you can change it by your own
![alt text](https://github.com/ivanalayan15/JuanFi/blob/master/docs/JuanFi-Mikrotik-Step3.PNG?raw=true)

7.) Execute the following script in mikrotik telnet terminal
replace 10.0.10.253 with your own nodemcu IP address

```bash
/ip hotspot walled-garden ip add action=accept disabled=no dst-address=10.0.10.253
/ip firewall filter add action=accept chain=input place-before=0 comment=NodeMCUIP src-address=10.0.10.253
```
8.) Please add this script in the hotspot user profile on login event(credits to kristoff for adding sales)

Execute on mirkotik terminal
```bash
/system scheduler add interval=1d name="Reset Daily Income" on-event="/system script set source=\"0\" todayincome " policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon start-date=Sep/28/2021 start-time=00:00:00;
/system scheduler add interval=30d name="Reset Monthly Income" on-event="/system script set source=\"0\" monthlyincome " policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon start-date=Sep/28/2021 start-time=00:00:00;
/system script add dont-require-permissions=no name=todayincome owner=admin policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon source="0";
/system script add dont-require-permissions=no name= monthlyincome owner=admin policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon source="0";
```

Put on the on login script 
```bash
### enable telegram notification, change from 0 to 1 if you want to enable telegram
:local enableTelegram 0;
###replace telegram token
:local telegramToken "2021159313:AAHEBoOLogYjLCpSwVeKPVmKKO4TIxa02vQ";
###replace telegram chat id / group id
:local chatId "----";
### enable Random MAC synchronizer
:local enableRandomMacSyncFix 1;
:local com [/ip hotspot user get [find name=$user] comment];
/ip hotspot user set comment="" $user;

:if ($com!="") do={
	:local sc [/sys scheduler find name=$user]; :if ($sc="") do={ :local a [/ip hotspot user get [find name=$user] limit-uptime]; :local validity [:pick $com 0 [:find $com ","]]; :local c ($validity); :local date [ /system clock get date]; /sys sch add name="$user" disable=no start-date=$date interval=$c on-event="/ip hotspot user remove [find name=$user]; /ip hotspot active remove [find user=$user]; /ip hotspot cookie remove [find user=$user]; /system sche remove [find name=$user]" policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon; :delay 2s; } else={ :local sint [/sys scheduler get $user interval]; :local validity [:pick $com  0 [:find $com ","]]; :if ( $validity!="" ) do={ /sys scheduler set $user interval ($sint+$validity); } };

	:local infoArray [:toarray [:pick $com ([:find $com ","]+1) [:len $com]]]
	
	:if ($enableTelegram=1) do={
		:local mac $"mac-address";
		:local totaltime [/ip hotspot user get [find name="$user"] limit-uptime];
		:local amt [:pick $infoArray 0];
		:local ext [:pick $infoArray 1];
		:local vendo [:pick $infoArray 2];
		:local uactive [/ip hotspot active print count-only];

		:local getIncome [:put ([/system script get [find name=todayincome] source])];
		/system script set source="$getIncome" todayincome;

		:local getSales ($amt + $getIncome);
		/system script set source="$getSales" todayincome;

		:local getMonthlyIncome [:put ([/system script get [find name=monthlyincome] source])];
		/system script set source="$getMonthlyIncome" monthlyincome;

		:local getMonthlySales ($amt + $getMonthlyIncome);
		/system script set source="$getMonthlySales" monthlyincome;

		/tool fetch url="https://api.telegram.org/bot$telegramToken/sendmessage?chat_id=$chatId&text=<<======New Sales======>> %0A Vendo: $vendo %0A Voucher: $user %0A IP: $address %0A MAC: $mac %0A Amount: $amt %0A Extended: $ext %0A Total Time: $totaltime %0A %0AToday Sales: $getSales %0AMonthly Sales : $getMonthlySales %0AActive Users: $uactive%0A <<=====================>>" keep-result=no;
	}
};

:if ($enableRandomMacSyncFix=1) do={
	:local cmac $"mac-address"
	:foreach AU in=[/ip hotspot active find user="$username"] do={
	  :local amac [/ip hotspot active get $AU mac-address];
	  :if ($cmac!=$amac) do={  /ip hotspot active remove [/ip hotspot active find mac-address="$amac"]; }
	}
}
```
![alt text](https://github.com/ivanalayan15/JuanFi/blob/master/docs/JuanFi-Mikrotik-Step4.PNG?raw=true)


## Usage

### Mikrotik Hotspot Portal

![alt text](https://github.com/ivanalayan15/JuanFi/blob/master/docs/Mikrotik-hotspot.PNG?raw=true)

### Admin Panel Dashboard
![alt text](https://github.com/ivanalayan15/JuanFi/blob/master/docs/JuanFi-Step05.PNG?raw=true)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
