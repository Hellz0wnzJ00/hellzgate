#include <Arduino.h>

void setup() {
  Serial.begin(115200);
  delay(500);

  Serial.println("HellzGate ESP32-C5 board check");
  Serial.printf("Chip: %s\n", ESP.getChipModel());
  Serial.printf("Revision: %u\n", ESP.getChipRevision());
  Serial.printf("CPU cores: %u\n", ESP.getChipCores());
  Serial.printf("Flash: %u bytes\n", ESP.getFlashChipSize());
  Serial.printf("Free heap: %u bytes\n", ESP.getFreeHeap());
}

void loop() {
  delay(1000);
}
