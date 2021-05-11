// select the user input field
var idSelect = d3.select("#selDataset");

// select the demographic info div's ul list group
var demographicsTable = d3.select("#sample-metadata");

// select the bar chart div
var barChart = d3.select("#bar");

// select the bubble chart div
var bubbleChart = d3.select("bubble");


//Update when Dropdown Changes: optionChanged function
function optionChanged(sampleNumber) {
    d3.json("samples.json").then((data) => {
        var name = data.names;
        var sample = name.filter(d => d.id == sampleNumber);
        var dropdown_object = d3.select("#selDataset");
        sample.forEach(function(id) {
            var id_option=dropdown_object.append("sample");
            id_option.attr("value",id);
            id_option.text(id);
        })

    });
};
optionChanged();
//Add options for drowpdown id = selDataset

//init function
function init() {
    resetData();
//Charts
d3.json("data/samples.json").then((data => {

   
    //  use a forEach to loop over each name in the array data.names to populate dropdowns with IDs
    data.names.forEach((name => {
        var option = idSelect.append("option");
        option.text(name);
    })); 

    // get the first ID from the list for initial charts as a default
    var initId = idSelect.property("value")

    // plot charts with initial ID
    plotCharts(initId);

})); 
}
    //Creating Bar Chart to display first 10 OTUs found in an individual
        barTrace = {
            x: sample_values.slice(0,10),
            y: otu_ids.slice(0,10).map(otu => `OTU ${otu}`).reverse(),
            type: "bar",
            text: otu_labels.slice(0,10),
            orientation: "h"
        };
        
        //Creating Layout
        var layout = {title: "Data by ID",
                    xaxis: "Sample Values",
                    yaxis: "OTU ID"};

    Plotly.newPlot("bar", [barTrace, layout]);
    //Creating Bubble Chart
        bubbleTrace = {
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
        marker: {
            size: sample_values,
            color: otu_ids},
            text: otu_labels
        };

        //Creating Layout
        var bubbleLayout = {title: "Bubble Chart Bacteria Data",
                            showlegend: false,
    };

    Plotly.newPlot("bubble", [bubbleTrace, layout]);
    

//create a function to reset divs to prepare for new data
function resetData() {

    demographicsTable.html("");
    bar.html("");
    bubble.html("");
    gauge.html("");

};

//Display Individual Demographic Data & Display Key-Value Pairs from Metadata id = sample-metadata
function buildMetaData(sampleNumber) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        //Filtering metadata
        var sample =metadata.filter(metadata => metadata.id == sampleNumber);
        //Getting rid of the array so it only displays dictionary
        sample = sample[0];
        //Selecting part of html where the data will display
        var metadata_object = d3.select("#sample-metadata");
        metadata_object.html("")
        //Create a loop to append data
        Object.entries(sample).forEach(([key, value]) => {
            metadata_object.append("h6").text(`${key}: ${value}`);
        });

    });
};

// filter the samples for the ID chosen
var individualSample = data.samples.filter(sample => sample.id == id)[0];

// create empty arrays to store sample data
var otuIds = [];
var otuLabels = [];
var sampleValues = [];

// Iterate through each key and value in the sample to retrieve data for plotting
Object.entries(individualSample).forEach(([key, value]) => {

    switch (key) {
        case "otu_ids":
            otuIds.push(value);
            break;
        case "sample_values":
            sampleValues.push(value);
            break;
        case "otu_labels":
            otuLabels.push(value);
            break;
            // case
        default:
            break;
    }; 

}); 



// when there is a change in the dropdown select menu, this function is called with the ID as a parameter
function optionChanged(id) {

    // reset the data
    resetData();

    // plot the charts for this id
    plotCharts(id);

    // build metaData table
    buildMetaData(id);
};

optionChanged();
init();

