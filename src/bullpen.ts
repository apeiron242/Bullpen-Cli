#!/usr/bin/env node

import { Command } from "commander";

const program = new Command();

program.version("1.0.0").command("get", "Scrape Bullpen").parse(process.argv);
