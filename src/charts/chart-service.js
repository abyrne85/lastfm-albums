export class ChartService {
  chartData = [];

  calculateBarChartData(album) {
    const albumData = {
      playcount: album.userplaycount,
      album: album.name,
      artist: album.artist,
    };

    const yearIndex = this.chartData.findIndex((x) => x.year === album.date);
    if (yearIndex > -1) {
      this.chartData[yearIndex].releases.push(albumData);
    } else {
      this.chartData.push({
        year: album.date,
        releases: [albumData],
      });
    }
    return this.chartData;
  }
}
