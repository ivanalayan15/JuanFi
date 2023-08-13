# JuanFi

JuanFi v4.3 Bin File Release


## How to Flash Instruction
 
### Download Custom Flasher
I had forked a the pyflasher repository https://github.com/marcelstoer/nodemcu-pyflasher and make a custom changes for the custom flasher required for SPIFFS flashing, if your interested here is the repository https://github.com/ivanalayan15/nodemcu-pyflasher 

Download here

Custom flasher download link : https://github.com/ivanalayan15/JuanFi/blob/master/release/WirelessBase/NodeMCU-PyFlasher.exe?raw=true

### Flash the JuanFi-FlashFile1.bin

Download JuanFi-FlashFile1.bin at https://github.com/ivanalayan15/JuanFi/blob/master/release/WirelessBase/JuanFi-FlashFile1.bin?raw=true 

![alt text](https://github.com/ivanalayan15/JuanFi/blob/master/docs/JuanFi-FlashFile1.PNG?raw=true)

* select the file JuanFi-FlashFile1.bin
* make sure the offset is 0x000000 
* click Flash Nodemcu and wait to complete

### Flash the JuanFi-FlashFile2.bin

Download JuanFi-FlashFile2.bin at https://github.com/ivanalayan15/JuanFi/blob/master/release/WirelessBase/JuanFi-FlashFile2.bin?raw=true 

![alt text](https://github.com/ivanalayan15/JuanFi/blob/master/docs/JuanFi-FlashFile2.PNG?raw=true)

* select the file JuanFi-FlashFile2.bin
* make sure the offset is 0x200000 
* click Flash Nodemcu and wait to complete

### Restart the NodeMCU and begin the setup
