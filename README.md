# HellzGate C5

![MCU](https://img.shields.io/badge/MCU-ESP32--C5-ff2233)
![Firmware](https://img.shields.io/badge/Firmware-C%20%2F%20C%2B%2B-00599C)
![App](https://img.shields.io/badge/App-Flutter%20%2F%20Dart-02569B)
![Radio](https://img.shields.io/badge/Radio-Wi--Fi%20%2B%20BLE-7A3FF2)
![Status](https://img.shields.io/badge/status-in%20active%20development-orange)
![License](https://img.shields.io/badge/license-Proprietary-lightgrey)

**An independent, multi-node ESP32-C5 passive wireless survey array.**
One master, up to nine scanner nodes. Wi-Fi + BLE, GPS-tagged, local logging — no cloud.

🌐 **[hellzgate.com](https://hellzgate.com)**  ·  💬 **[Discord](https://discord.com/users/370298706991251457)**

---

## What it is

HellzGate C5 is a custom-built wireless survey / wardriving platform. A single master coordinates up to nine ESP32-C5 scanner nodes that listen across Wi-Fi (2.4 / 5 GHz) and Bluetooth LE, aggregate to the master, geo-tag, and log — all on your own local network. Passive and listen-only, start to finish. No subscriptions, no servers, no account.

The C5's dual-band (2.4 + 5 GHz) radio paired with a true multi-node array makes it something a single-radio wardriver can't be: more channels watched at once, and coverage that scales with the number of nodes.

## Hardware

> 📷 First production boards arrive soon — photos coming.

- Custom multi-node PCB carrying **1 master + up to 9 ESP32-C5 scanner nodes**
- Dual-band Wi-Fi (2.4 / 5 GHz) + Bluetooth LE on every node
- Onboard GPS, microSD, OLED status readout, single **USB-C** power
- Dedicated wired **I²C backplane** so every radio stays free for capture
- Designed in KiCad

## Firmware

Original firmware, written from scratch for this hardware — **not** derived from any prior or third-party project. Built in phases:

- **Phase 1** — multi-node core over **ESP-NOW**: node enrollment, aggregation, a gap-free record store, and a local HTTP API
- **Phase 2** — wired **I²C backplane** transport
- **Phase 3** — JSON API, onboard GPS, surveillance detections, WiGLE / WDGW upload, and one-tap presets

The firmware is **proprietary and closed-source** — this repository does not contain it.

## Companion app

A dedicated **Flutter** (iOS + Android) companion app is in development. It talks to the device over local Wi-Fi to view live scans, manage nodes, and export data. Coming soon.

## Tech stack

| Layer | Tech |
|---|---|
| Hardware | Custom PCB · ESP32-C5 · KiCad |
| Firmware | C / C++ (ESP-IDF / Arduino) · ESP-NOW · I²C |
| App | Flutter (Dart) — iOS + Android |
| Web | HTML / CSS / JavaScript |
| Tooling | Python (device emulator) · JSON / HTTP local API |

## Status

🚧 **In active development.** Hardware is fabricated; firmware and app are building in phases. Follow the website and Discord for drops, build updates, and availability.

## Links

🌐 Website — **[hellzgate.com](https://hellzgate.com)**
💬 Community — **[Discord](https://discord.com/users/370298706991251457)**

---

**Designed & developed by Hellz (Sean Clossey).**

© 2026 Sean Clossey (HellzGate). All rights reserved. The HellzGate C5 firmware, hardware design, and companion app are proprietary. This repository is the public home for the project — product info, updates, and links only.
