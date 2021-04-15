

//Bubble Chart

//Display Individual Demographic Data

//Display Key-Value Pairs from Metadata id = sample-metadata

//Update when Dropdown Changes: optionChanged function

//Add options for drowpdown id = selDataset

//init function

function buildMetaData(sampleNumber) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        console.log(metadata);
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
        })

    })
}
//Charts
function buildCharts(sampleNumber) {
    d3.json("samples.json").then((data) => {
        sample = data.samples;
        var sample = sample.filter(d => d.id == sampleNumber);
        sample = sample[0];
        var otu_ids = sample.otu_ids;
        var otu_labels = sample.otu_labels;
        var sample_values = sample.sample_values;
    //Creating Bar Chart
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
    });
};
buildCharts(940);
buildMetaData(940);
// * Use `sample_values` as the values for the bar chart.

// * Use `otu_ids` as the labels for the bar chart.

// * Use `otu_labels` as the hovertext for the chart.