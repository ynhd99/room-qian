/* eslint-disable */
let Chart;

try {
  // Chart 通过外部js引入的
  Chart = window.Hermes && window.Hermes.Chart;
} catch(e) {

}

export default Chart;
