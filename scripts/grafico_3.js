d3.dsv(";", "../data/vehiculos_mal_estacionados.csv", d3.autoType).then((data) => {
  data = data.filter((d) => d.domicilio_barrio == "PALERMO");
  let counts = d3.rollup(
    data,
    v => v.length, // Contar la cantidad de vehiculos mal estacionados
    d => d.canal // Agrupar por canal
  );
  let chart = Plot.plot({
    
    x: {
      label:"",
      
    },

    y: {
      label: "Cantidad",
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
            fill: d => d.canal === "App Denuncia Vial" ? 'rgb(52,106,166)' : d.canal === "App BA 147" ? 'rgb(92,164,204)' : d.canal === "GCS Web" ? "rgb(109,139,175)" : d.canal === "Boti" ? "rgb(172,212,228)" : d.canal === "Mail 147" ? 'rgb(92,164,204)': 'rgb(27,92,163)',
            sort: { x: 'y', reverse: true },
          },
        ),
      ),
      Plot.text(counts, {
        x: d => d[0],
        y: d => d[1] + 50, // Adjust the y-position of the text
        text: d => d[1], // Use the quantity as the text label
        fill: d => d[0] === "App Denuncia Vial" ? 'rgb(52,106,166)' : d[0] === "App BA 147" ? 'rgb(92,164,204)' : d[0] === "GCS Web" ? "rgb(109,139,175)" : d[0] === "Boti" ? "rgb(172,212,228)" : d[0] === "Mail 147" ? 'rgb(92,164,204)': 'rgb(27,92,163)',
        align: "center",
        baseline: "bottom",
        fontSize: 15,
        fontWeight: "bold",
      }),
    ],
    width: 800,
    height: 600,

    nice: true,
    color: true,
  });

  d3.select("#grafico_3").append(() => chart);
});