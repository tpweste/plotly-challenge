function getPlots(id) {
    d3.json("samples.json").then (samples_data=>{
        console.log(samples_data)
        var result = samples_data.samples.filter(object => object.id.toString() === id)[0];
        console.log(result)
        var otu_ids=result.otu_ids;
        console.log(otu_ids)
        var sample_values =  result.sample_values.slice(0,10).reverse();
        console.log(sample_values)
       
        
        // add top 10 OTUs constraint/specification //
        var otu_top = (result.otu_ids.slice(0, 10)).reverse();
        
        //grab the otu data  //
        var otu_id = otu_top.map(d => "OTU" + d);
        console.log(`otu_ids: ${otu_id}`)

        
        var otu_labels =  result.otu_labels.slice(0,10);
        console.log(`otu_labels: ${otu_labels}`)
        var trace1 = {
            type: "bar",
            orientation: "h",
            x: sample_values,
            y: otu_id,
        };
        
        var data1 = [trace1];

        var layout1={
            title: "Top 10 Bacteria Cultures Found", 
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                r:75, 
                t:55,
                l:75,
                b:25
            }
        };
        Plotly.newPlot("bar", data1, layout1);

       
        var trace2 = {
            type: "bubble",
            x: otu_ids,
            y: sample_values,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids
            },
            text: otu_labels

        };
        
        var layout2 = {
            title: "Bacteria Cultures Per Sample",
            xaxis:{title: "OTU ID"},
            height: 550,
            width: 1200,
        };

       
        var data2 = [trace2];
    Plotly.newPlot("bubble", data2,layout2); 
    
    });
}  

function getDemoInfo(id) {
    d3.json("samples.json").then((data)=> {
        var metadata = data.metadata;
        console.log(metadata)
        var result = metadata.filter(meta => meta.id.toString() === id)[0];
        var demoInfo = d3.select("#sample-metadata");
        demoInfo.html(" ");
        Object.entries(result).forEach((key) => {   
            demoInfo.append("h6").text(key[0]+ ": " + key[1]);    
        });
    });
}

function optionChanged(id) {
    getPlots(id);
    getDemoInfo(id);
}

function init() {
    var dropdownMenu = d3.selectAll("#selDataset");

    d3.json("samples.json").then((data)=> {
        console.log(data)
        data.names.forEach(function(name) {
            dropdownMenu.append("option").text(name).property("value");
        });

        getDemoInfo(data.names[0]);
        getPlots(data.names[0]);
    });
}
init();