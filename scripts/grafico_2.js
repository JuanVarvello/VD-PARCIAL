// config. números español
const locale = {
  decimal: ',',
  thousands: '.',
  grouping: [3],
}

d3.formatDefaultLocale(locale)



d3.dsv(';', 'data/vehiculos_mal_estacionados.csv', d3.autoType).then(data => {
  // Guardamos el svg generado en la variable chart
  let dataFiltrada = data.filter(d => 
    d.domicilio_barrio == 'PALERMO' &&
    d.domiclio_calle.includes('AV.') && 
      (
      d.domiclio_calle.includes('CERVIÑO') ||
      d.domiclio_calle.includes('SANTA FE') ||
      d.domiclio_calle.includes('CAMPOS, LUIS') ||
      d.domiclio_calle.includes('DEL LIBERTADOR') ||
      d.domiclio_calle.includes('OLLEROS') ||
      d.domiclio_calle.includes('CABILDO') ||
      d.domiclio_calle.includes('DORREGO') ||
      d.domiclio_calle.includes('CORDOBA') ||
      d.domiclio_calle.includes('DIAZ') ||
      d.domiclio_calle.includes('CHENAUT') ||
      d.domiclio_calle.includes('HONDURAS')
      )
    )

  let chart = Plot.plot({

    x: {
      label: '',
      ticks: 0,
      line: false
    },

    y: {
      label: '',
    },

    marks: [
      Plot.barX(
        dataFiltrada,
        Plot.groupY(
          { x: 'count' },
          {
            y: 'domiclio_calle',
            fill: d => d.domiclio_calle === "CERVIÑO AV." || d.domiclio_calle === "SANTA FE AV."  ? 'rgb(27,92,163)' : 'rgb(202,218,229)',
            sort: { y: 'x', reverse: true },
          },
        ),
      ),

      Plot.text(dataFiltrada,
        Plot.groupY(
          { x: 'count', text: 'count' },
          {
            y: 'domiclio_calle',
            
            sort: { y: 'x', reverse: true },
            dx: 15,
            fontSize: 15,
            fontWeight: "bold",
          },
        ),
      ),
    ],

    line: true,
    nice: true,
    color: true,
    marginLeft: 180,
    width: 800,
    height: 500,
  })
  // Agregamos chart al div#chart de index.html
  d3.select('#grafico_2').append(() => chart)
})
