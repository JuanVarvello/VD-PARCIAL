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

    marks: [
      Plot.barY(
        data,
        Plot.groupX(
          { y: 'count' },
          {
            x: 'canal',
            fill: 'canal',
            sort: { x: 'y', reverse: true },
          },
        ),
      ),
      Plot.text(counts, {
        x: d => d[0],
        y: d => d[1] + 50, // Adjust the y-position of the text
        text: d => d[1], // Use the quantity as the text label
        fill: d => d[0],
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