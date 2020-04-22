# these are the only years with differences in urban area boundaries
YEARS := 1990 2000 2012

# keep US-wide geojson files
.PRECIOUS: geojson-us/%.json

# download US-wide geojson from the census bureau
geojson-us/%.json:
	curl -L --create-dirs --output $@ \
	https://github.com/uscensusbureau/citysdk/raw/master/v2/GeoJSON/$*.json

# create a javascript file with only NC urban areas
geojson-nc/%/urban-area.js: geojson-us/500k/%/urban-area.json
	mkdir -p geojson-nc/$*
	(printf "const vintage$* = " && jq -f urban-area.jq $<) > $@

# create javascript files for all year vintages
nc-urban-areas: $(patsubst %,geojson-nc/%/urban-area.js,$(YEARS))

# run a local HTTP server
serve: nc-urban-areas
	python3 -m http.server -b 127.0.0.1

# delete downloaded and generated files
clean:
	rm -rf geojson*
