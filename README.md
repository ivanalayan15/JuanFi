# **JuanFi**
- ## Official Website: [juanfi.juansystems.com](https://juanfi.juansystems.com/)



JuanFi is an innovative open-source system designed for seamless coinslot integration with MikroTik Hotspot. It provides a comprehensive solution for managing and monetizing internet access through the integration of a coinslot mechanism. With JuanFi, hotspot owners can effortlessly incorporate a coinslot system into their network infrastructure, enabling them to offer paid internet access in an efficient and user-friendly manner.

## **Donation**

We greatly appreciate donations as they help support the development and maintenance of JuanFi. If you wish to contribute and show your support, you can make a donation using the following methods:

- Gcash account: Ivan Julius Alayan - 09175425572
- PayPal account: [paypal.me/ivanalayan](https://www.paypal.com/paypalme/ivanalayan)

# **Community Group**

Join our vibrant community group to connect with other users and contributors. Share your experiences, exchange ideas, hotspot portals, and stay up to date with the latest developments and enhancements of JuanFi.

- Facebook Group: [JuanFi Community](https://www.facebook.com/groups/1172413279934139)

# **Features**

 ### Hardware Option

- Wireless based
- Lan based

### Coinslot System

- Mikrotik integration
- Pause expiration
- Codeless generation
- Anti Coinslot abuse system
- LCD Display
- Code generation in vendo using LCD without device needed
- Multi vendo system

### Admin System

- Initial setup of the system
- Mikrotik connection setup, SSID setup, coinslot settings
- Promo Rates configuration ( Rates, expiration)
- Dashboard, Sales report
- Custom pin configuration
- coinslot abuse system config

## Requirements

1.) NodeMCU(ESP8266) for wireless/lan or NodemCU(ESP32) for wireless/lan

2.) Coinslot

3.) Mikrotik Router

4.) Access Point

5.) Node MCU baseboard( Optional for wireless)

6.) Power Supply (12v for nodemcu, another 12v for Mikrotik)

7.) W5500 for Lan based

8.) LM2596 or any DC to DC buck that can convert to 5v for (Lan based only since no available baseboard for ESP32)


---
# **Architecture** 


![alt text](docs/JuanFi-Architecture.PNG?raw=true)

---

## ESP32 LAN Based Connection Diagram

![alt text](/docs/esp32-lan-diagram.jpg)

## ESP32 Wireless Based Connection Diagram

![alt text](/docs/esp32-wireless-diagram.jpg)

## ESP8622 Wireless Based Connection Diagram

![alt text](/docs/esp8622-wireles-diagram.jpg)

## ESP8622 LAN Based Connection Diagram

![alt text](/docs/esp8622-lan-diagram.jpg)



# **Installation**

## **ESP32** 

<details>
<summary>ESP32 Flashing Instructions</summary>

---

**esptool.exe** is being use for flashing the esp32 hardware, to flash simply download all the contents

<br>

## **1. Download the esp32 Flashing folder**

- ## [**ESP32 Wirelesss Base folder**](/release/WirelessBase/ESP32/)

- ## [**ESP32 Lan Base folder**](/release/LanBased/ESP32/)

<br>

---


## **2. Double click start_flash.bat**
*Connect the esp32 to the pc*


![alt text](https://github.com/ivanalayan15/JuanFi/blob/master/docs/JuanFi-Lan-FlashFile1.PNG?raw=true)

*Once done, a command propmt screen will appear to let you select available com port for your esp32 device*

![alt text](https://github.com/ivanalayan15/JuanFi/blob/master/docs/JuanFi-Lan-FlashFile2.PNG?raw=true)

<br>

---

## **3. Select Port**

E.G. COM9 and press enter

![alt text](https://github.com/ivanalayan15/JuanFi/blob/master/docs/JuanFi-Lan-FlashFile3.PNG?raw=true)

*you will notice that a connecting message will prompt and it will be ALWAYS connecting if you not do any press button on the flash button*

![alt text](https://github.com/ivanalayan15/JuanFi/blob/master/docs/JuanFi-Lan-FlashFile4.PNG?raw=true)

*Press and hold this button arround 3 - 5 secs until the flash starts*

<br>

---

## **4. Wait for the flash process to finish** 

![alt text](https://github.com/ivanalayan15/JuanFi/blob/master/docs/JuanFi-Lan-FlashFile5.PNG?raw=true)

<br>

---

## **5. Done!**
*and thats it. you can now use your esp32 and begin the Juanfi Setup*
</details>

<br>


## **ESP8622** 

<details>
<summary>ESP8622 Flashing Instructions</summary>

 
<br>

*I had forked a the pyflasher repository [marcelstoer/nodemcu-pyflasher](https://github.com/marcelstoer/nodemcu-pyflasher) and make a custom changes for the custom flasher required for SPIFFS flashing, if your interested here is the repository [ivanalayan15/nodemcu-pyflasher](https://github.com/ivanalayan15/nodemcu-pyflasher)*

<br>

## **1. Download the esp8266 Flashing folder**

- ## [**ESP8622 Wirelesss Base folder**](/release/WirelessBase/ES8622)

- ## [**ESP8622 Lan Base folder**](/release/LanBased/ESP8622/)
  
<br>

---


## **2. Open the NodeMCU-PyFlasher.exe**

*Connect the esp8266 to the pc*

<br>

---

## **3. Flashing the JuanFi-FlashFile1.bin**


- select the file **JuanFi-FlashFile1.bin**
- make sure the offset is **0x000000**
- click **Flash Nodemcu** and wait to complete

![alt text](https://github.com/ivanalayan15/JuanFi/blob/master/docs/JuanFi-FlashFile1.PNG?raw=true)

<br>

---

## **4. Flashing the JuanFi-FlashFile2.bin**


- select the file **JuanFi-FlashFile2.bin**
- make sure the offset is **0x200000**
- click **Flash Nodemcu** and wait to complete


![alt text](https://github.com/ivanalayan15/JuanFi/blob/master/docs/JuanFi-FlashFile2.PNG?raw=true)

<br>

---

## **5. Done!**

### Restart the NodeMCU and begin the setup


</details>

<br>

## **JuanFi Setup**

## **6. Connect to JuanFi Setup**

- ### **For Esp32/Esp8622 Wireless Based** ***"JuanFI Setup"*** will appear

![alt text](/docs/JuanFi-Step01.PNG)

- ### **For Esp32/Esp8622 LanBase** you need to plugin first in your PC/Laptop ethernet

    - Set your device IP address as static **172.217.28.2**

		```
		IP address: 172.217.28.2
		Subnet Mask: 255.255.255.0
		Gateway: 172.217.28.1
		Dns: 172.217.28.1
		```

	- After you set to static you can access the admin in your browser as **[172.217.28.1/login](http://172.217.28.1/login)**

<br>

---

## **7. Login to admin panel**
Default user and password : **admin** / **admin**

![alt text](/docs/JuanFi-Step02.PNG)

## **8. Configure System**
Change the necessary fields to your configuration, system will restart to take effect,
default mikrotik user and password is pisonet / abc123
![alt text](/docs/JuanFi-Step03.PNG?raw=true)

### **Configure Promo rates**
![alt text](/docs/JuanFi-Step04.PNG?raw=true)

<br>

# **Mikrotik Setup**

## **1. Setup mikrotik hotspot according to your configuration**

<br>

## **2.Make the NodeMCU IP address static**
![alt text](/docs/JuanFI-Mikrotik-Step1.PNG?raw=true)

<br>

---

## **3. Add IP Bindings exception on hotspot**
![alt text](/docs/JuanFi-Mikrotik-Step2.PNG?raw=true)

<br>

---

## **4. Modify vendoIpAddress (NodeMcu IPaddress) in the [core.js](/mikrotik-template/assets/js/core.js) file**
 you can do a multivendo setup just follow the comment in javascript for instruction
![alt text](/docs/JuanFi-Mikrotik-Step5.PNG?raw=true)

<br>

---

## **5. Upload [html template](/mikrotik-template/) to mikrotik in Files option of mikrotik**

<br>

---

## **6. Create user for nodemcu access**
 default user for nodemcu is **pisonet** / **abc123** you can change it by your own
![alt text](/docs/JuanFi-Mikrotik-Step3.PNG?raw=true)

<br>

---

## **7. Execute the following script in mikrotik telnet terminal**
replace **10.0.10.253** with your own nodemcu IP address

```bash
/ip hotspot walled-garden ip add action=accept disabled=no dst-address=10.0.10.253
/ip firewall filter add action=accept chain=input place-before=0 comment=NodeMCUIP src-address=10.0.10.253
```

<br>

---

## **8.) Please add this script in the hotspot user profile on login event** (credits to kristoff for adding sales)

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
:local enableTelegram 0;
###replace telegram token
:local telegramToken "2021159313:AAHEBoOLogYjLCpSwVeKPVmKKO4TIxa02vQ";
###replace telegram chat id / group id
:local chatId "----";

### enable JuanFi online monitoring 0 = DoNotSend,  1=send data to api
:local apiSend 0;
### derive from the JuanFi online monitoring, create account in genman.projectdorsu.com
:local URLvendoID 5;

### enable Random MAC synchronizer
:local enableRandomMacSyncFix 1;
### hotspot folder for HEX put flash/hotspot for haplite put hotspot only
:local hotspotFolder "flash/hotspot";


:local com [/ip hotspot user get [find name=$user] comment];
/ip hotspot user set comment="" $user;

:if ($com!="") do={

	:local mac $"mac-address";
	:local macNoCol;
	:for i from=0 to=([:len $mac] - 1) do={
	  :local char [:pick $mac $i]
	  :if ($char = ":") do={
		:set $char ""
	  }
	  :set macNoCol ($macNoCol . $char)
	}

	:local validity [:pick $com 0 [:find $com ","]];

	:if ( $validity!="0m" ) do={
		:local sc [/sys scheduler find name=$user]; :if ($sc="") do={ :local a [/ip hotspot user get [find name=$user] limit-uptime]; :local c ($validity); :local date [ /system clock get date]; /sys sch add name="$user" disable=no start-date=$date interval=$c on-event="/ip hotspot user remove [find name=$user]; /ip hotspot active remove [find user=$user]; /ip hotspot cookie remove [find user=$user]; /system sche remove [find name=$user]; /file remove \"$hotspotFolder/data/$macNoCol.txt\";" policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon; :delay 2s; } else={ :local sint [/sys scheduler get $user interval]; :if ( $validity!="" ) do={ /sys scheduler set $user interval ($sint+$validity); } };
	}

	:local infoArray [:toarray [:pick $com ([:find $com ","]+1) [:len $com]]];

	:local totaltime [/ip hotspot user get [find name="$user"] limit-uptime];
	:local amt [:pick $infoArray 0];
	:local ext [:pick $infoArray 1];
	:local vendo [:pick $infoArray 2];
	:local uactive [/ip hotspot active print count-only];

	    #api tracking

	    #BOF
	    { /do {
	    :local URLamount "$amt";
	    :local URLcomment "ScriptOnLoginFINAL";
	    :local URLip [:put [:tostr $address]];
	    :local URLusr [$user];
	    :local URLmac [$"mac-address"];
	    :local URLipmac "$URLusr_$URLip_$URLmac";
	    :local URLactive [/ip hotspot active print count-only];

	    #fixed declaration
	    :if ($apiSend!=0)  do={
	    /do {
	    :local fixUrl [("https://juanfiapi.projectdorsu.com/serve.js\?s=stats&i=OE-IBX-12345&m=direct&payload=$URLvendoID")];
	    :local apiUrl "$fixUrl_$URLamount_$URLipmac_$URLactive_$URLcomment";
	    :log debug "API SendInfo: $apiUrl ";
	    /tool fetch mode=https http-method=get url=$apiUrl keep-result=no
	    :delay 1s;
	    } on-error={:log error "API Vendo ERROR: $apiUrl ";} }
	    } on-error={:log error "APIvendoRoutineError";} }
	    #EOF

	    #end of api tracking


	:local getIncome [:put ([/system script get [find name=todayincome] source])];
	/system script set source="$getIncome" todayincome;

	:local getSales ($amt + $getIncome);
	/system script set source="$getSales" todayincome;

	:local getMonthlyIncome [:put ([/system script get [find name=monthlyincome] source])];
	/system script set source="$getMonthlyIncome" monthlyincome;

	:local getMonthlySales ($amt + $getMonthlyIncome);
	/system script set source="$getMonthlySales" monthlyincome;

	:local validUntil [/sys scheduler get $user next-run];

	/file print file="$hotspotFolder/data/$macNoCol" where name="dummyfile";
	:delay 1s;
	/file set "$hotspotFolder/data/$macNoCol" contents="$user#$validUntil";

	:if ($enableTelegram=1) do={
		:local vendoNew;
		:for i from=0 to=([:len $vendo] - 1) do={
		  :local char [:pick $vendo $i]
		  :if ($char = " ") do={
			:set $char "%20"
		  }
		  :set vendoNew ($vendoNew . $char)
		}
		/tool fetch url="https://api.telegram.org/bot$telegramToken/sendmessage?chat_id=$chatId&text=<<======New Sales======>> %0A Vendo: $vendoNew %0A Voucher: $user %0A IP: $address %0A MAC: $mac %0A Amount: $amt %0A Extended: $ext %0A Total Time: $totaltime %0A %0AToday Sales: $getSales %0AMonthly Sales : $getMonthlySales %0AActive Users: $uactive%0A <<=====================>>" keep-result=no;
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

Put on the on logout script please change accordinly with your hotspot folder(hex or haplite)

```bash
### hotspot folder for HEX put flash/hotspot for haplite put hotspot only
:local hotspotFolder "flash/hotspot";

:local mac $"mac-address";
:local macNoCol;
:for i from=0 to=([:len $mac] - 1) do={
  :local char [:pick $mac $i]
  :if ($char = ":") do={
	:set $char ""
  }
  :set macNoCol ($macNoCol . $char)
}

:if ([/ip hotspot user get [/ip hotspot user find where name="$user"] limit-uptime] <= [/ip hotspot user get [/ip hotspot user find where name="$user"] uptime]) do={
    /ip hotspot user remove $user;
	/file remove "$hotspotFolder/data/$macNoCol.txt";
	/system sche remove [find name=$user];
}
```

![alt text](/docs/JuanFi-Mikrotik-Step4.PNG?raw=true)

## **Miscellaneous Scripts**

You can create a scheduler to restart (System - > Scheduler) add your desired schedule and put this script or modify the existing template scripts below in your desired settings

- **38vz2rb6nk** - this is the API KEY you generate in admin panel
- **10.10.10.251** - this is your ESP IP Address

Replace those value with your own setting

### **Restart vendo scheduler**

Sample Script that run at 3am:

```bash
  /system scheduler add interval=1d name="Restart Vendo" on-event="/tool fetch http-method=post http-header-field=\"X-TOKEN: 38vz2rb6nk\" url=\"http://10.10.10.251/admin/api/restartSystem\"" policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon start-date=Sep/28/2021 start-time=03:00:00;
```

### **Night Light schedulers**

Sample Script that turn on nightlight at 6 pm:

```bash
 /system scheduler add interval=1d name="Turn ON Night Light" on-event="/tool fetch http-method=post http-header-field=\"X-TOKEN: 38vz2rb6nk\" url=\"http://10.10.10.251/admin/api/toggerNightLight\?toggle=1\"" policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon start-date=Sep/28/2021 start-time=18:00:00;
```

### **Sample Script that turn off nightlight at 6 am:**

```bash
 /system scheduler add interval=1d name="Turn OFF Night Light" on-event="/tool fetch http-method=post http-header-field=\"X-TOKEN: 38vz2rb6nk\" url=\"http://10.10.10.251/admin/api/toggerNightLight\?toggle=0\"" policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon start-date=Sep/28/2021 start-time=06:00:00;
```


# **Mikrotik Hotspot Portal**

![alt text](/docs/Mikrotik-hotspot.PNG?raw=true)

# **Admin Panel Dashboard**

![alt text](/docs/JuanFi-Step05.PNG?raw=true)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
