const colorBox = ['#34495e','#6a00ff','#e74c3c','#3498db','#2ecc71','#f1c40f',
				  '#03A9F4','#192a56','#e67e22','#825a2c','#006064','#BDC581',
				  '#40407a','#ff5252','#33d9b2','#d1ccc0','#ffb142','#38ada9'];

const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data => {
	
	const xValue = d => d.shipments;
	const yValue = d => d.agent;
	const margin = { top: 20, right: 40, bottom: 20, left: 125 };
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;

	const xScale = d3.scaleLinear()
						.domain([0, d3.max(data, xValue)])
						.range([0, innerWidth]);

	const yScale = d3.scaleBand()
						.domain(data.map(yValue))
						.range([0, innerHeight])
						.padding(.1);

	const yAxis = d3.axisLeft(yScale);
	const xAxis = d3.axisBottom(xScale);

	const g = svg.append('g')
					.attr('transform', `translate(${margin.left}, ${margin.top})`);

	g.append('g').call(yAxis);
	g.append('g').call(xAxis)
		.attr('transform', `translate(0, ${innerHeight})`);

	g.selectAll('rect').data(data)
		.enter().append('rect')
			.attr('fill', d => {
				if(d.shipments >= 100){
					return 'seagreen'
				} else {
					return '#34495e'
				}
			})
			.attr('y', d => yScale(yValue(d)))
			.attr('width', d => xScale(xValue(d)))
			.attr('height', yScale.bandwidth());
};

d3.csv('data.csv').then(data => {
	data.forEach(d => d.shipments = +d.shipments);
	render(data);
});

const info = d3.select('.info');
const countInfo = d3.select('.shipment-count').text();

let dataInfo = '';
let dataCount = 0;
let percentageInfo = '';

d3.csv('data.csv').then(data => data.forEach(d => {
	dataInfo = dataInfo + d.agent + ': ' + d.shipments + ' \n';
	dataCount = dataCount + (+d.shipments);
	info.text(dataInfo);
	d3.select('.shipment-count').text(countInfo + dataCount)
		.style('color', 'steelblue')
		.style('font-size', '1.2em');
}));

// Pie Chart

const pieMargin = { top: 20, right: 20, bottom: 20, left: 20},
	pieWidth = 500 - pieMargin.right - pieMargin.left,
	pieHeight = 500 - pieMargin.top - pieMargin.bottom,
	radius = pieWidth / 2;

const arc = d3.arc()
				.outerRadius(radius - 10)
				.innerRadius(100);

const labelArc = d3.arc()
					.outerRadius(radius - 50)
					.innerRadius(radius - 50);

const pie = d3.pie()
			// .sort(null)
			.value(d => d.shipments);

const pieChart = d3.select('.overview')
						.append('svg')
							.attr('width', pieWidth)
							.attr('height', pieHeight)
						.append('g')
							.attr('transform', `translate(${ pieWidth / 2 }, ${ pieHeight / 2 })`);

const color = d3.scaleOrdinal().range(colorBox);

d3.csv('data.csv').then(data => data.forEach(d => {
	d.shipments = +d.shipments;

	const g2 = pieChart.selectAll(".arc")
							.data(pie(data))
							.enter().append('g')
							.attr('class', 'arc');

	g2.append('path')
			.attr('d', arc)
			.style('fill', d => color(d.data.agent));
}));

let i = 0;

d3.csv('data.csv').then(data => data.forEach(d => {
	const totalShipments = +d.shipments;
	const percent = Number((((totalShipments / dataCount) * 100).toFixed(2)).toString());

	d3.select('.agents-list').append('button')
		.text(`${d.agent} : ${percent}%`)
		.style('width', '250px')
		.style('background-color', colorBox[i])
		.style('color', '#eee')
		.style('font-size', '15px')
		.style('border', 'none')
		.style('outline', 'none')
		.style('text-align', 'left')
		.style('padding', '20px 10px');
		i++;
}));