/* eslint-disable no-unused-vars */
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
export function bars(node, data) {
	$effect(() => {
		let bar = new Chart(node, {
			type: 'bar',
			data: {
				labels: [
					'Jan',
					'Feb',
					'Mar',
					'Apr',
					'May',
					'Jun',
					'Jul',
					'Aug',
					'Sep',
					'Oct',
					'Nov',
					'Dec'
				],
				datasets: [
					{
						data: data,
						backgroundColor: ['blue'],
						borderRadius: [5]
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						display: false
					},
					tooltip: {
						displayColors: false,
						backgroundColor: 'white',
						bodyColor: 'blue',
						titleColor: 'black',
						bodyFont: {
							size: 24
						},

						titleFont: {
							size: 20
						}
					}
				},
				scales: {
					x: {
						grid: {
							color: '', // Hide grid lines
							borderColor: 'black' // Hide the border line
						},
						ticks: {
							color: 'black',
							font: { size: 16, weight: 600 }
						}
					},
					y: {
						beginAtZero: true,
						border: {
							display: false,
							dash: [8, 5]
						},
						grid: {
							color: 'gray'
							// ➖ Dashed Y axis lines
						},
						ticks: {
							display: true, // ✅ Show Y axis labels (optional)
							callback: function (value) {
								return parseInt(value / 1000) + 'k' + ' Dzd';
							},
							color: 'black',
							font: {
								size: 18
							}
						}
					}
				}
			}
		});

		return () => {
			bar = null;
		};
	});
}
export function pie(node, data) {
	$effect(() => {
		let pie = new Chart(node, {
			type: 'doughnut',
			data: {
				labels: data.labels,
				datasets: [
					{
						data: data.data,
						backgroundColor: ['#ecece5', '#3a4f99', '#6299d0', '#b2cee2', '#d1d871', '#13233d']
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: true,
				plugins: {
					legend: {
						display: false
					},
					tooltip: {
						displayColors: false,
						backgroundColor: 'white',
						bodyColor: 'blue',
						titleColor: 'black',
						bodyFont: {
							size: 24
						},

						titleFont: {
							size: 20
						}
					},
					datalabels: {
						anchor: 'end',
						display: true,
						align: 'start',
						clip: true,

						formatter: (value, ctx) => {
							const label = ctx.chart.data.labels[ctx.dataIndex];
							const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
							const percentage = (value / total) * 100;
							if (value == 0) return '';
							if (percentage < 5) {
								return label.substring(0, 3);
							}
							return label;
						},
						font: {
							size: 15
						},
						color: 'black'
					}
				}
			},
			plugins: [ChartDataLabels]
		});
		return () => {
			pie = null;
		};
	});
}

export function clientsPie(node, data) {
	$effect(() => {
		let pie = new Chart(node, {
			type: 'pie',
			data: {
				labels: ['new', 'active', 'inactive'],
				datasets: [
					{
						data: data,
						backgroundColor: ['#470bf4', '#22ca1b', '#f41217']
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: true,
				plugins: {
					legend: {
						display: false
					},
					tooltip: {
						displayColors: false,
						backgroundColor: 'white',
						bodyColor: 'blue',
						titleColor: 'black',
						bodyFont: {
							size: 24
						},

						titleFont: {
							size: 20
						}
					},
					datalabels: {
						anchor: 'end',
						display: true,
						align: 'start',
						clip: true,
						offset: 40,
						formatter: (value, ctx) => {
							if (value == 0) return '';
							const label = ctx.chart.data.labels[ctx.dataIndex];
							const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
							const percentage = (value / total) * 100;

							if (percentage < 5) {
								return label.substring(0, 3);
							}
							return label;
						},
						font: {
							size: 20,
							weight: 700
						},
						color: 'black'
					}
				}
			},
			plugins: [ChartDataLabels]
		});
		return () => {
			pie = null;
		};
	});
}
export function ordersPie(node, data) {
	$effect(() => {
		const labels = data.map((elem) => {
			return elem.label;
		});
		const values = data.map((elem) => {
			return elem.count;
		});
		let pie = new Chart(node, {
			type: 'pie',
			data: {
				labels: labels,
				// ['new', 'shipped', 'processing', 'dilivered', 'pending', 'cancelled'],
				datasets: [
					{
						data: values,
						backgroundColor: ['#470bf4', '#dff224', '#dc23c1', '#22ca1b', '#73798c', '#f41217']
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: true,
				plugins: {
					legend: {
						display: false
					},
					tooltip: {
						displayColors: false,
						backgroundColor: 'white',
						bodyColor: 'blue',
						titleColor: 'black',
						bodyFont: {
							size: 24
						},

						titleFont: {
							size: 20
						}
					},
					datalabels: {
						anchor: 'end',
						display: true,
						align: 'start',
						clip: true,
						offset: 40,
						formatter: (value, ctx) => {
							if (value == 0) return '';
							const label = ctx.chart.data.labels[ctx.dataIndex];
							const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
							const percentage = (value / total) * 100;

							if (percentage < 5) {
								return label.substring(0, 3);
							}
							return label;
						},
						font: {
							size: 20,
							weight: 700
						},
						color: 'black'
					}
				}
			},
			plugins: [ChartDataLabels]
		});
		return () => {
			pie = null;
		};
	});
}
