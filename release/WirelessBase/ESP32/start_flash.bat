@echo off
cls
echo Welcome to
echo.
echo JuanFi Wireless ESP32 Flasher
echo.
echo Please select available port below:
reg query HKLM\HARDWARE\DEVICEMAP\SERIALCOMM
SET /P comport=Port(ex: COM1) : 
echo %comport% is selected
esptool.exe --chip esp32 --port %comport% --baud 115200 --before default_reset --after hard_reset write_flash -z --flash_mode dio --flash_freq 80m --flash_size detect 0xe000 boot_app0.bin 0x1000 JuanFi-lan.ino.bootloader.bin 0x10000 JuanFi-FlashFile1.bin 0x8000 JuanFi-lan.ino.partitions.bin 0x290000 JuanFi-FlashFile2.bin
echo Flash done, please restart the esp32
pause