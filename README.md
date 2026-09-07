# HellzGate

> **Physical FullGate PCB photos coming in the next few days.** The validation boards are awaiting arrival; photos will follow once they are in hand.

![MCU](https://img.shields.io/badge/MCU-ESP32--C5-ff2233)
![Firmware](https://img.shields.io/badge/Firmware-C%20%2F%20ESP--IDF-00599C)
![App](https://img.shields.io/badge/App-Flutter%20%2F%20Dart-02569B)
![Radio](https://img.shields.io/badge/Radio-Wi--Fi%20%2B%20BLE-7A3FF2)
![Status](https://img.shields.io/badge/FullGate-awaiting%20validation%20boards-orange)
![License](https://img.shields.io/badge/license-Proprietary-lightgrey)

**An independent, multi-node wireless research platform built around ESP32-C5 hardware.**

HellzGate is the platform. **C5 FullGate** is the first planned public product, with **C5 MiniGate** planned as a later direction.

🌐 **[hellzgate.com](https://hellzgate.com)** · 💬 **[Discord](https://discord.gg/dhMhEgHwXe)**

---

## From working prototypes to FullGate

HellzGate was developed through two working engineering platforms. V1 and V2 were used to prove the multi-node concept and uncover practical lessons in power, communication, integration, firmware, and mechanical design. They are retired field-test prototypes and are not products for sale.

![HellzGate V1 and V2 field-tested prototypes](prototype-v1-v2-field-tested.png)

The lessons from those boards informed C5 FullGate, the first planned public HellzGate product.

## C5 FullGate

- Ten removable XIAO ESP32-C5 modules: one master and nine scanner nodes
- Primary I²C production backbone for nine physical scanner slots
- Secondary ESP-NOW wireless communication path
- One master plus 20 scanners demonstrated in an antenna-equipped, ten-minute ESP-NOW bench test; broader load and field validation remain
- Current Phase 1 firmware baseline focused on passive 2.4/5 GHz Wi-Fi and BLE observation
- Onboard GNSS support and local microSD logging
- USB-C PD input and externally charged 4S lithium-ion battery input through XT60; production-board power verification remains
- Power consumption, battery runtime, and complete production-board behavior still to be measured
- Optional OLED display and cooling support
- Standalone firmware testing next; the production app interface and app integration remain separate work

The planned sale item is the **HellzGate C5 FullGate Core Board**, not a complete ready-to-use system. XIAO modules, antennas, display, fan, power supply, battery, and enclosure are separate. Modules are removable but are not designed for powered hot swapping.

## ESP-NOW scalability checkpoint

The latest adapter-corrected, antenna-equipped test kept **all 20 scanners UP throughout an approximately ten-minute timed window**, with one additional master coordinating them.

- **23,580 additional observation records** across **13,782 frames**.
- **No new reported lost frames, overflow, dropouts, or restarts** during the timed window.
- **One new duplicate indication**.
- **Zero bad-CRC, bad-field, or table-full errors**.
- Different antenna types and unequal observation loads were used.

These are timed-window results, not cumulative startup counters or unique-device counts. The result demonstrates this bench setup—not maximum RF capacity, a universal node limit, or complete field validation.

**FullGate remains one master plus nine physical scanner slots.** Tests above nine scanners are ESP-NOW scalability research, not extra slots on a FullGate board.

## Firmware

The embedded firmware is written in **C using Espressif ESP-IDF**, with a **FreeRTOS task-based architecture**.

Phase 1 has run on real ESP32-C5 hardware with a master and multiple scanner nodes exchanging live observation records through ESP-NOW. Hardware testing has been used to identify, correct, and retest timing and queue-management behavior.

Native I²C has transferred live observation records in real-hardware bench tests. FullGate’s final nine-slot production-board integration remains to be verified. Standalone firmware work covers GNSS time and position, microSD session files, WiGLE 1.6 CSV, session control, basic local web status, JSON, OLED handling, and fan support. Full Base-system testing remains pending.

ESP-NOW and OTA are different features: ESP-NOW carries wireless data between nodes, while OTA refers specifically to updating firmware over the air.

The HellzGate firmware is proprietary and is not published in this repository.

## Companion app

The companion-app foundation uses **Flutter and Dart** for Android and iOS. App work is paused while the standalone firmware baseline is stabilized. The production API and app integration are still ahead.

FullGate is being designed to operate as a standalone platform; the app is an additional management and workflow layer rather than a requirement for basic device operation.

## Public technology stack

| Layer | Technology |
|---|---|
| Target hardware | ESP32-C5 · XIAO ESP32-C5 |
| Firmware | C · Espressif ESP-IDF · FreeRTOS |
| Communication | I²C · ESP-NOW |
| Data | Integrity-checked records · WiGLE-compatible CSV |
| App foundation | Flutter · Dart · Android · iOS |
| Website | HTML · CSS · JavaScript |
| Prototype and diagnostics | Arduino · ESP-IDF · esptool-compatible workflows |

## Public code examples

The [`examples/`](examples/) directory contains small, standalone Arduino, ESP-IDF/C, and Dart references that demonstrate the project toolchains without exposing production firmware, private protocols, or companion-app internals. Arduino was used during early prototype work; the current production firmware direction uses C with ESP-IDF.

## Current status — September 7, 2026

| Area | Status |
|---|---|
| V1 field prototype | Retired after development testing |
| V2 field prototype | Retired after development testing |
| FullGate schematic | Complete |
| FullGate layout, routing, and manufacturing preparation | Complete; design checks passed and production placement confirmed |
| Five validation boards | Ordered; awaiting arrival and testing |
| Phase 1 firmware | Completed and tested on real ESP32-C5 hardware |
| I²C communication | Real-hardware bench test completed; nine-slot FullGate integration pending |
| ESP-NOW scaling | One master + 20 scanners demonstrated in a ten-minute bench window; not maximum-load validation |
| Standalone Base firmware | Complete-system testing and verification pending |
| Companion app | Paused until the standalone baseline is stable |
| MiniGate | Future product direction |

## Start-to-finish roadmap

- [x] Build and field-test the V1 and V2 engineering prototypes; retire both as development hardware.
- [x] Complete FullGate design, routing, design checks, and manufacturing preparation.
- [x] Confirm production placement and order five validation boards.
- [x] Test the Wi-Fi/BLE firmware foundation, record integrity, counting, and deduplication on real hardware.
- [x] Bench-test native I²C with live observation records.
- [x] Demonstrate one master plus 20 reporting ESP-NOW scanners in the documented bench window.
- [ ] Verify the complete standalone firmware: GNSS, microSD sessions, WiGLE 1.6 CSV, web status, JSON, OLED, and fan.
- [ ] Inspect the FullGate boards and validate power paths before installing modules.
- [ ] Test one XIAO at a time, then all ten modules and subsystems on external power.
- [ ] Validate battery operation after external-power tests pass; measure consumption and runtime.
- [ ] Complete sustained-load and field tests, including saved-file quality and successful uploads.
- [ ] Build and test the enclosure for fit, access, cooling, and field use.
- [ ] Finalize the production app interface and resume app development against the verified baseline.
- [ ] Complete documentation, repeatable board checks, beta testing, and applicable compliance work before release.

Successful bench tests do not replace production-board or field validation. Release timing will follow verified readiness.

## Future exploration

- **Multigating:** independently powered FullGates managing their own scanners and forwarding aggregated data wirelessly to a central collector. Exploratory, not implemented.
- **MiniGate:** a smaller platform after FullGate is established; specifications and timing are not finalized.

## Responsible use

HellzGate is intended for education, research, and authorized security testing. Use it only with systems, devices, and environments you own or have explicit permission to test. Illegal or unauthorized activity is prohibited.

## Repository boundary

This repository is the public home of the project website and public development history. It does not publish proprietary firmware, schematics, PCB source, Gerbers, manufacturing files, component-level design details, credentials, private logs, or confidential project records.

---

**Designed and developed by Hellz (Sean Clossey).**

© 2026 Sean Clossey / HellzGate. All rights reserved.
