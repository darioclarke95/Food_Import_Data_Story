d3.csv('data/world_bank.csv', function(data) {
  return {
    country: data["Country"],
    year: new Date(+data["Year"], 0, 1),
    gdp: +data["GDP per capita (current US$) [NY.GDP.PCAP.CD]"]
  };
}, function(error, data) {
  if (error) {
    console.log("ERROR: ");
    console.log(error);
    return;
  }
  drawGDP(data)
});


d3.csv('data/world_bank.csv', function(data) {
  return {
    country: data["Country"],
    year: new Date(+data["Year"], 0, 1),
    food: +data["Food imports (% GDP)"]
  };
}, function(error, data) {
  if (error) {
    console.log("ERROR: ");
    console.log(error);
    return;
  }
  drawFood(data)
});

d3.csv('data/world_bank.csv', function(data) {
  return {
    country: data["Country"],
    year: new Date(+data["Year"], 0, 1),
    pergdp: +data["Food imports (% GDP)"],
    percap: +data["Food imports per capita (current US$)"]
  };
}, function(error, data) {
  if (error) {
    console.log("ERROR: ");
    console.log(error);
    return;
  }
  drawComp(data)
});

d3.csv('data/un-clean.csv', function(data) {
  return {
    country: data["Country"],
    year: new Date(+data["Year"], 0, 1),
    hec: +data["Land Under Agricultural Crops (thousand hectares)"],
    per: +data["Land Under Agricultural Crops (% of total land area)"]
  };
}, function(error, data) {
  if (error) {
    console.log("ERROR: ");
    console.log(error);
    return;
  }
  drawLand(data)
});

function drawGDP(data) {
  var countryOfInterest = 'Barbados';
  var processedData = [];

  data.forEach(function(d) {
    if(countryOfInterest == d.country) {
      processedData.push(d);
    }
  });

  data = processedData;
  var margin = { top: 100, right: 100, bottom: 100, left: 100 };
  var width = 800;
  var height = 300;

  var svg = d3.select('.Viz1').select('.view')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ")");

  var x = d3.scaleTime()
  .domain(d3.extent(data, function(d) { return d.year; }))
  .range([0, width]);

  var y = d3.scaleLinear()
  .domain(d3.extent(data, function(d) { return d.gdp; }))
  .range([height, 0]);

  var line = d3.line()
  .x(function(d) { return x(d.year); })
  .y(function(d) { return y(d.gdp); });

  svg.append("path")
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "steelblue")
  .attr("stroke-width", 2)
  .attr("d", line);

  svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .append("text")
  .attr("fill", "#000")
  .attr("y", 40)
  .attr("x", width/2)
  .attr("text-anchor", "middle")
  .text("Year");

  svg.append("g")
  .call(d3.axisLeft(y))
  .append("text")
  .attr("fill", "#000")
  .attr("y", -50)
  .attr("x", -height/2)
  .attr("transform", "rotate(-90)")
  .attr("text-anchor", "middle")
  .text("GDP per capita (current US$)");

  svg.append("g")
  .append("text")
  .attr("fill", "#000")
  .attr("y", 0)
  .attr("x", width/2)
  .attr("text-anchor", "middle")
  .attr("class", "vix-title")
  .text("Barbados' GDP per capita (current US$)");
}

function drawFood(data) {
  var countryOfInterest = 'Barbados';
  var processedData = [];

  data.forEach(function(d) {
    if(countryOfInterest == d.country) {
      processedData.push(d);
    }
  });

  data = processedData;
  var margin = { top: 100, right: 100, bottom: 100, left: 100 };
  var width = 800;
  var height = 300;

  var svg = d3.select('.Viz2').select('.view')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ")");

  var x = d3.scaleTime()
  .domain(d3.extent(data, function(d) { return d.year; }))
  .range([0, width]);

  var y = d3.scaleLinear()
  .domain([0,d3.extent(data, function(d) { return d.food; })[1]])
  .range([height, 0]);

  var line = d3.line()
  .x(function(d) { return x(d.year); })
  .y(function(d) { return y(d.food); });

  svg.append("path")
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "steelblue")
  .attr("stroke-width", 2)
  .attr("d", line);

  svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .append("text")
  .attr("fill", "#000")
  .attr("y", 40)
  .attr("x", width/2)
  .attr("text-anchor", "middle")
  .text("Year");

  svg.append("g")
  .call(d3.axisLeft(y))
  .append("text")
  .attr("fill", "#000")
  .attr("y", -50)
  .attr("x", -height/2)
  .attr("transform", "rotate(-90)")
  .attr("text-anchor", "middle")
  .text("Food Imports (% GDP)");

  svg.append("g")
  .append("text")
  .attr("fill", "#000")
  .attr("y", 0)
  .attr("x", width/2)
  .attr("text-anchor", "middle")
  .attr("class", "vix-title")
  .text("Barbados' Food Imports as % GDP");
}

function drawComp(data) {
  var countriesOfInterest = ["Barbados", "Bahamas, The", "New Zealand", "St. Vincent", "St. Lucia", "Trinidad and Tobago", "Japan", "United States", "Jamaica"];
  processedData = data.filter(function(d){return countriesOfInterest.indexOf(d.country) != -1 && d.year.getFullYear() == 2015;});
  data = processedData;
  var margin = { top: 70, right: 100, bottom: 70, left: 100 };
  var width = 800;
  var height = 200;

  var svg1  = d3.select('.Viz3').select('.view')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform',  'translate(' + margin.left + ',' + margin.top + ")");

  var x = d3.scaleBand()
  .domain(data.map(function(d) { return d.country; }))
  .range([0, width])
  .padding(0.1);

  var y1 = d3.scaleLinear()
  .domain([0, d3.max(data, function(d) { return d.pergdp; })])
  .range([height, 0]);

  svg1.selectAll(".bar")
  .data(data)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", function(d) { return x(d.country); })
  .attr("y", function(d) { return y1(d.pergdp); })
  .attr("width", x.bandwidth())
  .attr("height", function(d) { return height - y1(d.pergdp); })
  .attr("fill", function(d) {if(d.country=="Barbados") return "steelblue"; else return "powderblue";});

  var svg2  = d3.select('.Viz3').select('.view')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform',  'translate(' + margin.left + ',' + margin.top + ")");


  var y2 = d3.scaleLinear()
  .domain([0, d3.max(data, function(d) { return d.percap; })])
  .range([height, 0]);

  svg2.selectAll(".bar")
  .data(data)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", function(d) { return x(d.country); })
  .attr("y", function(d) { return y2(d.percap); })
  .attr("width", x.bandwidth())
  .attr("height", function(d) { return height - y2(d.percap); })
  .attr("fill", function(d) {if(d.country=="Barbados") return "steelblue"; else return "powderblue";});

  svg1.append("g")
  .call(d3.axisLeft(y1))
  .append("text")
  .attr("fill", "#000")
  .attr("y", -50)
  .attr("x", -height/2)
  .attr("transform", "rotate(-90)")
  .attr("text-anchor", "middle")
  .text("Food Imports (% GDP)");

  svg2.append("g")
  .call(d3.axisLeft(y2))
  .append("text")
  .attr("fill", "#000")
  .attr("y", -50)
  .attr("x", -height/2)
  .attr("transform", "rotate(-90)")
  .attr("text-anchor", "middle")
  .text("Food imports per capita (current US$)");

  svg1.append("g")
  .append("text")
  .attr("fill", "#000")
  .attr("y", 0)
  .attr("x", width/2)
  .attr("text-anchor", "middle")
  .attr("class", "vix-title")
  .text("Food imports as % GDP");

  svg2.append("g")
  .append("text")
  .attr("fill", "#000")
  .attr("y", 0)
  .attr("x", width/2)
  .attr("text-anchor", "middle")
  .attr("class", "vix-title")
  .text("Food imports per capita (current US$)");

  svg1.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))

  svg2.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
}

function drawLand(data) {
  var margin = { top: 100, right: 100, bottom: 100, left: 100 };
  var width = 800;
  var height = 200;

  var x = d3.scaleBand()
  .domain(data.map(function(d) { return d.country; }))
  .range([0, width])
  .padding(0.1);


  var svg2  = d3.select('.Viz4').select('.view')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform',  'translate(' + margin.left + ',' + margin.top + ")");


  var y2 = d3.scaleLinear()
  .domain([0, d3.max(data, function(d) { return d.per; })])
  .range([height, 0]);

  svg2.selectAll(".bar")
  .data(data)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", function(d) { return x(d.country); })
  .attr("y", function(d) { return y2(d.per); })
  .attr("width", x.bandwidth())
  .attr("height", function(d) { return height - y2(d.per); })
  .attr("fill", function(d) {if(d.country=="Barbados") return "steelblue"; else return "powderblue";});

  svg2.append("g")
  .call(d3.axisLeft(y2))
  .append("text")
  .attr("fill", "#000")
  .attr("y", -50)
  .attr("x", -height/2)
  .attr("transform", "rotate(-90)")
  .attr("text-anchor", "middle")
  .text("Land Under Agricultural Crops (% of total land area)");


  svg2.append("g")
  .append("text")
  .attr("fill", "#000")
  .attr("y", -20)
  .attr("x", width/2)
  .attr("text-anchor", "middle")
  .attr("class", "vix-title")
  .text("Land Under Agricultural Crops (% of total land area)");

  svg2.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))

}
