dojo.require("dojox.charting.themes.Julie");
dojo.require("dojox.charting.action2d.MoveSlice");
dojo.require("dojox.charting.Chart2D");
dojo.require("dojox.charting.action2d.Highlight");
dojo.require("dojox.charting.action2d.Tooltip");


function initChart() {
	dojo.byId("rightDiv").innerHTML = "Avg Household Income: click on a neighborhood.";
}

function displayIncomeStats(evt) {
    var chartDiv = dojo.create("div");
    dijit.byId("rightDiv").setContent(chartDiv);
	
	var nAttributes = evt.graphic.attributes;
	
	var inc20 = nAttributes.INC_0_20;
	var inc35 = nAttributes.INC_20_35;
	var inc50 = nAttributes.INC_35_50;
	var inc75 = nAttributes.INC_50_75;
	var inc125 = nAttributes.INC_75_125;
	var incTOP = nAttributes.INC_125_UP;
	var inc_TTL = nAttributes.HINCBASECY;
	
	// Calculate income percentages
	var inc20Pct = Math.round((inc20 / inc_TTL) * 100);
	var inc35Pct = Math.round((inc35 / inc_TTL) * 100);
	var inc50Pct = Math.round((inc50 / inc_TTL) * 100);
	var inc75Pct = Math.round((inc75 / inc_TTL) * 100);
	var inc125Pct = Math.round((inc125 / inc_TTL) * 100);
	var incTOPPct = Math.round((incTOP / inc_TTL) * 100);

	
	//Define the chart properties
	var chartInc = new dojox.charting.Chart2D(chartDiv, {
		title: nAttributes.NAME,
		titlePos: "top",
		titleFont: "normal normal bold 12pt Arial",
		titleFontColor: "#421b14"
	});
	
	chartInc.addPlot("default", {
		type: "Columns"
	});
	
	chartInc.addAxis("y", { vertical: true, min: 0, max: 50, title: "Average Household Income", titleGap: 3, titleFont: "normal normal normal 7pt Arial", });

	//Add the data series to the chart
	chartInc.addSeries("Series A", [
		{ y: inc20Pct, text: "Under 20K", color: "#F3FFD8", stroke: "black", tooltip: "Under $20K: " + inc20 + "  (" + inc20Pct + "%)" },
		{ y: inc35Pct, text: "20-35K", color: "#D3F2D8", stroke: "black", tooltip: "$20-$35K: " + inc35 + "  (" + inc35Pct + "%)" },
		{ y: inc50Pct, text: "35-50K", color: "#A8E4B0", stroke: "black", tooltip: "$35-$50K: " + inc50 + "  (" + inc50Pct + "%)" },
		{ y: inc75Pct, text: "50-75K", color: "#7CD789", stroke: "black", tooltip: "$50-$75K: " + inc75 + "  (" + inc75Pct + "%)" },
		{ y: inc125Pct, text: "75-125K", color: "#289535", stroke: "black", tooltip: "$75-$125K: " + inc125 + "  (" + inc125Pct + "%)" },
		{ y: incTOPPct, text: "Over 125K", color: "#1A5623", stroke: "black", tooltip: "Over $125K: " + incTOP + "  (" + incTOPPct + "%)" }
	]);

	//Add special effects and tooltip       
	var animHighlightSlice = new dojox.charting.action2d.Highlight(chartInc, "default");
	var animSliceTooltip = new dojox.charting.action2d.Tooltip(chartInc, "default");
	
	chartInc.render();	
	
}