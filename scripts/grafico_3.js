d3.dsv(";", "data/vehiculos_mal_estacionados.csv", d3.autoType).then((data) => {
  data = data.filter((d) => d.domicilio_barrio == "PALERMO");
  let counts = d3.rollup(
    data,
    v => v.length, // Contar la cantidad de vehiculos mal estacionados
    d => d.canal // Agrupar por canal
  );
  let chart = Plot.plot({

    style:{
      fontSize: 15,
    },
    
    x: {
      label: "",

      /*modify size of ticks to 30*/
      tickFormat: d => d,

    },

    y: {
      label: "",
      ticks: 0,
      line: false,
    },

    color: {
      // Quantize continuo (cant. denuncias) -> discreto (cant. colores)
      scheme: 'blues',
    },

    marks: [
      Plot.barY(
        data,
        Plot.groupX(
          { y: 'count' },
          {
            x: 'canal',
            fill: d => d.canal === "App Denuncia Vial" ? 'rgb(52,106,166)' : 'rgb(202,218,229)',
            sort: { x: 'y', reverse: true },
          },
        ),
      ),
      Plot.text(counts, {
        x: d => d[0],
        y: d => d[1] + 30, // Adjust the y-position of the text
        text: d => d[1], // Use the quantity as the text label
        
        baseline: "bottom",
        fontSize: 18,
        fontWeight: "bold",
      }),
    ],
    width: 800,
    height: 500,

    nice: true,
    color: true,
  });

  d3.select("#grafico_3").append(() => chart);
});
