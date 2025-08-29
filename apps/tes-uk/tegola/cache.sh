#!/bin/bash

# uk bbox
BOUNDS="-6.172,51.924,-1.277,56.026"

tegola cache seed --bounds $BOUNDS --min-zoom 0 --max-zoom 12 --config=./tegola/config.toml


