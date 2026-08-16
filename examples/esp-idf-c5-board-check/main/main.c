#include <inttypes.h>
#include <stdio.h>

#include "esp_chip_info.h"
#include "esp_flash.h"
#include "esp_system.h"

void app_main(void) {
    esp_chip_info_t chip = {0};
    uint32_t flash_size = 0;

    esp_chip_info(&chip);
    esp_flash_get_size(NULL, &flash_size);

    printf("HellzGate ESP32-C5 board check\n");
    printf("CPU cores: %d\n", chip.cores);
    printf("Silicon revision: %d\n", chip.revision);
    printf("Flash: %" PRIu32 " bytes\n", flash_size);
    printf("Free heap: %" PRIu32 " bytes\n", esp_get_free_heap_size());
}
