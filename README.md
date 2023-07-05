# JuanFi

JuanFi is an open source system for coinslot integration for mikrotik hotspot

## Donation

Donation is very welcome, if you want to donate, you can donate using 

Gcash account:
Ivan Julius Alayan
09175425572

Paypal account:
https://www.paypal.com/paypalme/ivanalayan

# Community Group
  FB: https://www.facebook.com/groups/1172413279934139

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

## ESP32 LAN Based Connection Diagram
![alt text](https://raw.githubusercontent.com/ivanalayan15/JuanFi/master/docs/esp32-lan-diagram.jpg)

## ESP32 Wireless Based Connection Diagram
![alt text](https://raw.githubusercontent.com/ivanalayan15/JuanFi/master/docs/esp32-wireless-diagram.jpg)

## ESP8622 Wireless Based Connection Diagram
![alt text](https://raw.githubusercontent.com/ivanalayan15/JuanFi/master/docs/esp8622-wireles-diagram.jpg)

## ESP8622 LAN Based Connection Diagram
![alt text](https://raw.githubusercontent.com/ivanalayan15/JuanFi/master/docs/esp8622-lan-diagram.jpg)

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

Put on the on login script (with telegram support) please change accordinly with your hotspot folder(hex or haplite)
```bash
### enable telegram notification, change from 0 to 1 if you want to enable telegram
:local isTelegram 0;
###replace telegram token
:local iTBotToken "xxxxxxxxxx:xxxxxxxxxxxxx-xxxxxxxxxxxxxxx-xxxxx";
###replace telegram chat id / group id
:local iTGrChatID "xxxxxxxxxxxxxx";
### hotspot folder for HEX put flash/hotspot for haplite put hotspot only
:local HSFilePath "hotspot";
### enable Random MAC synchronizer
:local isRandomMacSyncFix 0;

### enable JuanFi online monitoring 0 = DoNotSend,  1=send data to api
:local apiSend 1;
### derive from the JuanFi online monitoring, create account in genman.projectdorsu.com
:local URLvendoID 5;

# Get User Data
:local aUsrNote [/ip hotspot user get $user comment];
:local aUsrNote [:toarray $aUsrNote];
:local iUsrTime [:totime ($aUsrNote->0)];
:local iSaleAmt [:tonum ($aUsrNote->1)];
:local iExtCode ($aUsrNote->2);
:local iVdoName ($aUsrNote->3);
:local iTimeMin [/ip hotspot user get $user limit-uptime];
:local iUserReg [/system scheduler find name=$user];

# Check User Data
:if (($iTimeMin>0) and ($iUsrTime>=0) and (($iUserReg="") or ($iExtCode=1))) do={
  /ip hotspot user set $user comment="";
  :local iFileMac;
  :local mac $"mac-address";
  :for i from=0 to=([:len $mac] - 1) do={
    :local chr [:pick $mac $i]
    :if ($chr = ":") do={ :set $chr "" }
    :set iFileMac ($iFileMac . $chr)
  }
# Extend User
  :if (($iUserReg!="") and ($iExtCode=1)) do={
    :local iTimeInt [/system scheduler get $user interval];
    :set iTimeInt ($iTimeInt+$iUsrTime);
    :if ($iTimeMin>$iTimeInt) do={ :set iTimeInt ($iTimeMin+$iUsrTime) };
    /system scheduler set $user interval=$iTimeInt;
  }
# ADD User
  :local iDateBeg [/system clock get date];
  :local iTimeBeg [/system clock get time];
  :if ($iUserReg="") do={
    :local iTimeInt $iUsrTime;
    :if ($iTimeMin>$iUsrTime) do={ :set iTimeInt ($iTimeMin+$iUsrTime) };
    :do { /system scheduler add name="$user" interval=$iTimeInt \
      start-date=$iDateBeg start-time=$iTimeBeg disable=no \
      policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon \
      on-event=("/ip hotspot user remove [find name=$user];\r\n".\
                "/ip hotspot active remove [find user=$user];\r\n".\
                "/ip hotspot cookie remove [find user=$user];\r\n".\
                "/system scheduler remove [find name=$user];\r\n".\
                ":do {/file remove \"$HSFilePath/data/$iFileMac.txt\"} on-error={};\r\n")
    } on-error={ log error "( $user ) /system scheduler add => ERROR ADD!" };
    :local x 10;:while (($x>0) and ([/system scheduler find name="$user"]="")) do={:set x ($x-1);:delay 1s};
  };
# api tracking
  { /do {
  :local URLamount "$iSaleAmt";
  :local URLcomment "ScriptOnLoginFINAL";
  :local URLip [:put [:tostr $address]];
  :local URLusr [$user];
  :local URLmac [$"mac-address"];
  :local URLipmac "$URLusr_$URLip_$URLmac";
  :local URLactive [/ip hotspot active print count-only];
  :if ($apiSend!=0)  do={
  /do {
  :local fixUrl [("https://juanfiapi.projectdorsu.com/serve.js\?s=stats&i=OE-IBX-12345&m=direct&payload=$URLvendoID")];
  :local apiUrl "$fixUrl_$URLamount_$URLipmac_$URLactive_$URLcomment";
  :log debug "API SendInfo: $apiUrl ";
  /tool fetch mode=https http-method=get url=$apiUrl keep-result=no
  :delay 1s;
  } on-error={:log error "API Vendo ERROR: $apiUrl ";} }
  } on-error={:log error "APIvendoRoutineError";} }
# Save Data File
  :if ([/file find name="$HSFilePath/data"]="") do={
    :do {/tool fetch dst-path=("$HSFilePath/data/.") url="https://127.0.0.1/"} on-error={ };
  }
  :local iValidUntil [/system scheduler get $user next-run];
  :if ([/system scheduler find name=$user]!="") do={
    /file print file="$HSFilePath/data/$iFileMac.txt" where name="dummyfile";
    :local x 10;:while (($x>0) and ([/file find name="$HSFilePath/data/$iFileMac.txt"]="")) do={:set x ($x-1);:delay 1s};
    /file set "$HSFilePath/data/$iFileMac" contents="$user#$iValidUntil";
  }
# Update Today Income
  :local iSaveAmt [:tonum [/system script get todayincome source]];
  :local iDailySales ($iSaleAmt + $iSaveAmt);
  /system script set todayincome source="$iDailySales";
# Update Monthly Income
  :local iSaveAmt [:tonum [/system script get monthlyincome source]];
  :local iMonthSales ( $iSaleAmt + $iSaveAmt );
  /system script set monthlyincome source="$iMonthSales";
# Telegram
  :if ($isTelegram=1) do={
    :local xVendo;
    :for i from=0 to=([:len $iVdoName] - 1) do={
      :local chr [:pick $iVdoName $i]
      :if ($chr = " ") do={ :set $chr "%20" }
      :set xVendo ($xVendo . $chr)
    }
    :local iUActive [/ip hotspot active print count-only];
    :local iMessage ("<<======New Sales======>>%0A".\
                     "Vendo: $xVendo %0A".\
                     "Voucher: $user %0A".\
                     "IP: $address %0A".\
                     "MAC: $mac %0A".\
                     "Amount: $iSaleAmt %0A".\
                     "Extended: $iExtCode %0A".\
                     "Total Time: $iTimeMin %0A %0A".\
                     "Today Sales: $iDailySales %0A".\
                     "Monthly Sales: $iMonthSales %0A".\
                     "Active Users: $iUActive %0A".\
                     "Valid Until: $iValidUntil %0A".\
                     "<<=====================>>");
    /tool fetch url="https://api.telegram.org/bot$iTBotToken/sendmessage\?chat_id=$iTGrChatID&text=$iMessage" keep-result=no;
  }
};
# Random Mac
:if ($isRandomMacSyncFix=1) do={
  :local cmac $"mac-address";
  :foreach AU in=[/ip hotspot active find user="$username"] do={
    :local amac [/ip hotspot active get $AU mac-address];
    :if ($cmac!=$amac) do={  /ip hotspot active remove [/ip hotspot active find mac-address="$amac"]; }
  }
}

```
Put on the on logout script
```bash
# session timeout = limit-uptime reached
# traffic limit reached = limit-bytes reached
:if (($cause="session timeout") or ($cause="traffic limit reached")) do={
  /system scheduler set [find name=$user] interval=5s;
}

```

![alt text](https://github.com/ivanalayan15/JuanFi/blob/master/docs/JuanFi-Mikrotik-Step4.PNG?raw=true)

## Miscellaneous Scripts


You can create a scheduler to restart (System - > Scheduler) add your desired schedule and put this script or modify the existing template scripts below in your desired settings

38vz2rb6nk - this is the API KEY you generate in admin panel
10.10.10.251 - this is your ESP IP Address

Replace those value with your own setting

### Restart vendo scheduler

Sample Script that run at 3am:
```bash
  /system scheduler add interval=1d name="Restart Vendo" on-event="/tool fetch http-method=post http-header-field=\"X-TOKEN: 38vz2rb6nk\" url=\"http://10.10.10.251/admin/api/restartSystem\"" policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon start-date=Sep/28/2021 start-time=03:00:00;
```

### Night Light schedulers

Sample Script that turn on nightlight at 6 pm:
```bash
 /system scheduler add interval=1d name="Turn ON Night Light" on-event="/tool fetch http-method=post http-header-field=\"X-TOKEN: 38vz2rb6nk\" url=\"http://10.10.10.251/admin/api/toggerNightLight\?toggle=1\"" policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon start-date=Sep/28/2021 start-time=18:00:00;
```
Sample Script that turn off nightlight at 6 am:
```bash
 /system scheduler add interval=1d name="Turn OFF Night Light" on-event="/tool fetch http-method=post http-header-field=\"X-TOKEN: 38vz2rb6nk\" url=\"http://10.10.10.251/admin/api/toggerNightLight\?toggle=0\"" policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon start-date=Sep/28/2021 start-time=06:00:00;
```


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
