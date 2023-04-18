// config. números español
const locale = {
  decimal: ',',
  thousands: '.',
  grouping: [3],
}
d3.formatDefaultLocale(locale)

d3.dsv(';', 'data/vehiculos_mal_estacionados.csv', d3.autoType).then(data => {
  console.log(data)
  // Guardamos el svg generado en la variable chart
  let chart = Plot.plot({
    x: {
      label: 'Cantidad',
    },
    y: {
      label: '',
    },
    marks: [
      Plot.barX(
        data,
        Plot.groupY(
          { x: 'count' },
          {
            filter: d => {
              return (
                d.domicilio_barrio == 'PALERMO' &&
                d.domiclio_calle.includes('AV.')
              )
            },
            y: 'domiclio_calle',
            fill: d => d.domiclio_calle === "CERVIÑO AV." || d.domiclio_calle === "SANTA FE AV." || d.domiclio_calle === "CAMPOS, LUIS M. AV." || d.domiclio_calle === "DEL LIBERTADOR AV." ? 'rgb(27,92,163)' : 'rgb(202,218,229)',
            sort: { y: 'x', reverse: true },
          },
        ),
      ),
    ],
    grid: true,
    line: true,
    nice: true,
    color:true,
    marginLeft: 180,
    width: 800,
    height: 500,
  })
  // Agregamos chart al div#chart de index.html
  d3.select('#grafico_2').append(() => chart)
})
