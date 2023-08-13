# **JuanFi**
- ## Official Website: [juanfi.juansystems.com](https://juanfi.juansystems.com/)



JuanFi is an innovative open-source system designed for seamless coinslot integration with MikroTik Hotspot. It provides a comprehensive solution for managing and monetizing internet access through the integration of a coinslot mechanism. With JuanFi, hotspot owners can effortlessly incorporate a coinslot system into their network infrastructure, enabling them to offer paid internet access in an efficient and user-friendly manner.

## **Donation**

We greatly appreciate donations as they help support the development and maintenance of JuanFi. If you wish to contribute and show your support, you can make a donation using the following methods:
``
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

1.) NodeMCU(ESP8266) for wireless/lan or NodeMCU(ESP32) for wireless/lan

2.) Coinslot

3.) Mikrotik Router

4.) Access Point

5.) Node MCU baseboard( Optional for wireless)

6.) Power Supply (12v for nodeMCU, another 12v for Mikrotik)

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


> # **Flashing the hardware**

# ESP8622 Flashing Instructions


<details>
<summary>Expand for Instructions</summary>

Here are the instructions to flash the ESP8622 using the custom pyflasher. Follow these steps to successfully flash the ESP8622 module with the required firmware.

## Step 1: Download the Flashing Files

Download the necessary ESP8622 flashing files for your setup:

- [**ESP8622 Wireless Base folder**](/release/WirelessBase/ES8622) - For wireless setup.
- [**ESP8622 Lan Base folder**](/release/LanBased/ESP8622/) - For LAN-based setup.

## Step 2: Open the NodeMCU-PyFlasher

1. Connect your ESP8622 to your PC.
2. Open the `NodeMCU-PyFlasher.exe` application.

## Step 3: Flashing JuanFi-FlashFile1.bin

1. In the PyFlasher interface:
   - Select the file `JuanFi-FlashFile1.bin`.
   - Make sure the offset is set to `0x000000`.
   - Click the `Flash Nodemcu` button and wait for the flashing process to complete.

![Flash File 1](https://github.com/ivanalayan15/JuanFi/blob/master/docs/JuanFi-FlashFile1.PNG?raw=true)

## Step 4: Flashing JuanFi-FlashFile2.bin

1. In the PyFlasher interface:
   - Select the file `JuanFi-FlashFile2.bin`.
   - Set the offset to `0x200000`.
   - Click the `Flash Nodemcu` button and wait for the flashing process to complete.

![Flash File 2](https://github.com/ivanalayan15/JuanFi/blob/master/docs/JuanFi-FlashFile2.PNG?raw=true)

## Step 5: Completing the Flashing Process

After flashing both files, your ESP8622 is now ready. Restart the NodeMCU to begin the setup.

Congratulations! You've successfully flashed your ESP8622 hardware and are ready to proceed with the Juanfi Setup.

</details>

<br>


# ESP32 Flashing Instructions

<details>
<summary>Expand for Instructions</summary>

Follow these instructions to flash the ESP32 hardware using `esptool.exe`. This process will load the necessary firmware onto the ESP32 module.

## Step 1: Download Flashing Files

Download the required flashing files based on your setup:

- [**ESP32 Wireless Base folder**](/release/WirelessBase/ESP32/) - For wireless setup.
- [**ESP32 Lan Base folder**](/release/LanBased/ESP32/) - For LAN-based setup.

## Step 2: Run the Flashing Script

1. Double-click `start_flash.bat`.
2. Connect your ESP32 to your PC using a USB cable.

![Connect ESP32](https://github.com/ivanalayan15/JuanFi/blob/master/docs/JuanFi-Lan-FlashFile1.PNG?raw=true)

3. A command prompt will appear, prompting you to select an available COM port for your ESP32.

![Select COM Port](https://github.com/ivanalayan15/JuanFi/blob/master/docs/JuanFi-Lan-FlashFile2.PNG?raw=true)

## Step 3: Select COM Port

1. Choose the appropriate COM port for your ESP32 (e.g., COM9).
2. Press "Enter."

![Select COM Port](https://github.com/ivanalayan15/JuanFi/blob/master/docs/JuanFi-Lan-FlashFile3.PNG?raw=true)

3. A connecting message will appear, indicating the tool is attempting to connect to the ESP32.

![Connecting](https://github.com/ivanalayan15/JuanFi/blob/master/docs/JuanFi-Lan-FlashFile4.PNG?raw=true)

## Step 4: Initiate Flashing

1. Press and hold the flash button on the ESP32 for 3-5 seconds.
2. The flashing process will start.

![Initiate Flashing](https://github.com/ivanalayan15/JuanFi/blob/master/docs/JuanFi-Lan-FlashFile5.PNG?raw=true)

## Step 5: Wait for Completion

Wait for the flashing process to complete.

## Step 6: Finish

After the flashing process is finished, you can disconnect the ESP32 from your PC. The device is now ready for the Juanfi Setup.

Congratulations! You've successfully flashed your ESP32 hardware and are ready to proceed with the Juanfi Setup.


</details>

<br>


> # Setting up the Vendo

<br>

## 1. Connect to JuanFi Setup

### For Esp32/Esp8622 Wireless Based

1. Look for the **"Juanfi Setup"** SSID on your device.
2. connect to the SSID
3. Access the admin panel in your browser at [http://172.217.28.1/login](http://172.217.28.1/login).

![Wireless Setup](/docs/JuanFi-Step01.PNG)

### For Esp32/Esp8622 LanBase

1. Plug your vendo into your PC/Laptop's ethernet port.
2. Set your PC/Laptop's IP address as static to **172.217.28.10**:
   - IP address: 172.217.28.10
   - Subnet Mask: 255.255.255.0
   - Gateway: 172.217.28.10
   - DNS: 172.217.28.10
3. Access the admin panel in your browser at [http://172.217.28.1/login](http://172.217.28.1/login).

## 2. Login to Admin Panel

Use the following default credentials:

- Username: admin
- Password: admin

![Admin Panel Login](/docs/JuanFi-Step02.PNG)

## 8. Configure System

Configure the necessary fields according to your preferences, or upload a custom configuration file. The system will restart to apply the changes. The default Mikrotik API username and password are **pisonet** and **abc123**.

> **Note:** Change the password of the **operator** account to prevent unauthorized access to the vendo.

![Configure System](/docs/JuanFi-Step03.PNG)

### Configure Promo Rates

![Configure Promo Rates](/docs/JuanFi-Step04.PNG)

> # Mikrotik Setup

<br>

## 1. Setup Mikrotik Hotspot

Set up the Mikrotik hotspot server according to your configuration. You can find tutorials online for setting up a hotspot server in Mikrotik.

## 2. Make NodeMCU IP Address Static

Set the IP address of your vendo (NodeMCU) to static to prevent it from changing addresses.

![Static IP Address](/docs/Juanfi-Mikrotik-Step1.PNG)

## 3. Add IP Bindings Exception on Hotspot

Ensure the vendo's MAC address and IP address are added to IP bindings exceptions to prevent unauthorized usage.

![IP Bindings Exception](/docs/Juanfi-Mikrotik-Step2.PNG)

## 4. Modify vendoIpAddress in config.js

Modify the `vendoIpAddress` in the [config.js](/mikrotik-template/assets/js/config.js) file to match your setup.

![Modify vendoIpAddress](/docs/Juanfi-Mikrotik-Step5.PNG)

## 5. Upload HTML Portal to Mikrotik

Upload the [HTML portal](/mikrotik-template/) to your Mikrotik files. You can find different portal designs in our [Facebook Group Community](https://www.facebook.com/groups/1172413279934139).

## 6. Create User for NodeMCU API Access

Create a user for NodeMCU API access. The default user for NodeMCU is **pisonet** with password **abc123**. You can change it as needed.

![NodeMCU API User](/docs/Juanfi-Mikrotik-Step3.PNG)


## **7. Execute the following script in mikrotik telnet terminal**
replace **10.0.10.253** with your own nodemcu IP address

```bash
/ip hotspot walled-garden ip add action=accept disabled=no dst-address=10.0.10.253
/ip firewall filter add action=accept chain=input place-before=0 comment=NodeMCU src-address=10.0.10.253
```

<br>

---

## **8.) Please add this script in the hotspot user profile on login event** (credits to kristoff for adding sales)

Execute on mikrotik terminal

```bash
/system scheduler add interval=1d name="Reset Daily Income" on-event="/system script set source=\"0\" todayincome " policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon start-date=Sep/28/2021 start-time=00:00:00;
/system scheduler add interval=30d name="Reset Monthly Income" on-event="/system script set source=\"0\" monthlyincome " policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon start-date=Sep/28/2021 start-time=00:00:00;
/system script add dont-require-permissions=no name=todayincome owner=admin policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon source="0";
/system script add dont-require-permissions=no name= monthlyincome owner=admin policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon source="0";
```

Put on the on login script (with telegram support) please change accordingly with your hotspot folder(hex or haplite)

```bash
### enable telegram notification, change from 0 to 1 if you want to enable telegram
:local isTelegram 0;
###replace telegram token
:local iTBotToken "xxxxxxxxxx:xxxxxxxxxxxxx-xxxxxxxxxxxxxxx-xxxxx";
###replace telegram chat id / group id
:local iTGrChatID "xxxxxxxxxxxxxx";
### hotspot folder for HEX put flash/hotspot for haplite put hotspot only
:local HSFilePath "flash/hotspot";
if ([file find name="hotspot"]!="") do={ set HSFilePath "hotspot" }
### enable Random MAC synchronizer
:local isRandomMacSyncFix 0;

### enable JuanFi online monitoring 0 = DoNotSend,  1=send data to api
:local apiSend 0;
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
:if ($cause="session timeout") do={
  /system scheduler set [find name=$user] interval=5s;
}
```

![alt text](/docs/JuanFi-Mikrotik-Step4.PNG?raw=true)

> # **Miscellaneous Scripts**

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
