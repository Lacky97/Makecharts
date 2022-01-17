import { Bar, Pie, Doughnut, Radar, Line } from "react-chartjs-2";

const ChartComponent = ({ type, data, id, legend, color }) => {
  function roundedRect(ctx, options) {
    ctx.strokeStyle = options.color;
    ctx.fillStyle = options.color;
    ctx.lineJoin = "round";
    ctx.lineWidth = options.radius;

    ctx.strokeRect(
      options.x + options.radius * 0.5,
      options.y + options.radius * 0.5,
      options.width - options.radius,
      options.height - options.radius
    );
  }

  const alwaysShowTooltip = {
    id: "alwaysShowTooltip",
    afterDraw(chart, args, options) {
      const { ctx } = chart;
      ctx.save();

      chart.data.datasets.forEach((dataset, i) => {
        chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
          const { x, y } = datapoint.tooltipPosition();

          const text = chart.data.labels[index];
          const textWidth = ctx.measureText(text).width;

          roundedRect(ctx, {
            x: x - (textWidth + 10) / 2,
            y: y - 25,
            width: textWidth + 10,
            height: 20,
            radius: 10,
            color: "rgba(0, 0, 0, 0.5)",
          });

          ctx.font = "14px Arial";
          ctx.fillStyle = "white";
          ctx.fillText(text, x - textWidth / 2, y - 13);
          ctx.restore();
        });
      });
    },
  };

  const config = {
    options: {
      plugins: {
        tooltip: false,
        legend: {
          display: legend ? true : false,
          borderRadius: 20,
          align: "center",
          position: "left",
        },
      },
    },
    plugins: [alwaysShowTooltip],
  };
  

  const dataRadar = {
    labels: data.labels,
    datasets: [
      {
        label: "",
        data: data.datasets[0].data,
        backgroundColor: color,
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const dataLine = {
    labels: data.labels,
    datasets: [
      {
        label: "",
        data: data.datasets[0].data,
        borderColor: color,
        backgroundColor: color,
      },
    ],
  };
  console.log("DATA:", data.datasets[0].data);

  switch (type) {
    case "Pie":
      return (
        <Pie
          data={data}
          plugins={config.plugins}
          options={config.options}
          id={id}
        />
      );
    case "Bar":
      return (
        <Bar
          id={id}
          data={data}
          options={config.options}
          plugins={config.plugins}
        />
      );
    case "Doughnut":
      return (
        <Doughnut
          id={id}
          data={data}
          options={config.options}
          plugins={config.plugins}
        />
      );
    case "Radar":
      return <Radar id={id} data={dataRadar} options={config.options} />;
    case "Line":
      return <Line id={id} data={dataLine} options={config.options} />;
    default:
      return "404";
  }
};

export default ChartComponent;
