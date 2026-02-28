#!/bin/bash

set -euo pipefail

if [ -z ${GOLLYX_TOROIDAL_PELICAN_HOME+x} ]; then
	echo 'You must set the $GOLLYX_TOROIDAL_PELICAN_HOME environment variable to proceed.'
    echo 'Try sourcing environment.{STAGE}'
	exit 1
else 
	echo "\$GOLLYX_TOROIDAL_PELICAN_HOME is set to '$GOLLYX_TOROIDAL_PELICAN_HOME'"
fi

(
cd ${GOLLYX_TOROIDAL_PELICAN_HOME}/pelican
rm -fr output
echo "Generating pelican content..."
pelican content
(
cd output
python -m http.server $GOLLYX_UI_PORT
)
)
