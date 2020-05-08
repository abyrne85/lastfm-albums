export class ChartService {
  constructor() {}

  chartData = [];
  calculateBarChartData(album) {
    this.chartData.push({
      year: album.date,
      [album.name]: album.userplaycount,
    });
    const mergedData = [];
    this.chartData.forEach((data) => {
      if (!mergedData.year) {
        mergedData.year = data.year;
        mergedData;
      }
    });

    console.log(this.chartData);
  }
}
