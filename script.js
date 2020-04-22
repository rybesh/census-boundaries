const raleigh = {
  name: 'Raleigh, NC',
  center: [-78.633333, 35.766667],
}

const isRaleigh = feature => raleigh.name === (
  feature.properties.NAME || feature.properties.NAME10
)

const squareKilometersPerSquareMile = 2.59

const totalSquareMiles = features => features.reduce(
  (squareMiles, feature) => {
    let squareKilometers = 0
    if (feature.properties.AREA) {
      // Not sure what the AREA unit is but this seems to work?
      squareKilometers = feature.properties.AREA * 5000
    } else if (feature.properties.ALAND10) {
      // ALAND10 unit is square meters
      squareKilometers = feature.properties.ALAND10 / 1000000
    }
    return squareMiles + (squareKilometers / squareKilometersPerSquareMile)
  },
  0
)

const projection = d3.geoEquirectangular()
  .scale(35000)
  .center(raleigh.center)
  .translate([200, 200])

const geoGenerator = d3.geoPath().projection(projection)

function update(year, features) {
  const u = d3.select(`.vintage-${ year } .map`)
    .selectAll('path')
    .data(features)

  u.enter()
    .append('path')
    .attr('d', geoGenerator)

  d3.select(`.vintage-${ year } .year`).text(year)
  d3.select(`.vintage-${ year } .area`).text(
    `${ Math.round(totalSquareMiles(features)) } square miles`
  )
}

update(1990, vintage1990.features.filter(isRaleigh))
update(2000, vintage2000.features.filter(isRaleigh))
update(2012, vintage2012.features.filter(isRaleigh))
