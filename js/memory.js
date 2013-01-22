$(function() {

    function tileClicked()
    {
        $(this).css("background-color", "red");
    }

    $('.tile').click(tileClicked);


    // Draw the 4x3 grid.

    var NUM_COLUMNS = 4,
    	NUM_ROWS = 3,
    	NUM_FACES = 4,
    	tileNum = 0;



    for (var f=0; f < NUM_FACES; f++)
    {	
    	var $face = $("#face" + f);
    	console.log("face" + f);

	    for (var r=0; r < NUM_ROWS; r++)
	    {	
    		var rowName = "row" + r;
    		console.log("row" + r);

	    	for (var c=0; c < NUM_COLUMNS; c++)
	    	{
	    		var columnName = "column" + c;
	    		console.log("column" + c);

	    		var $tile = $("<div>", {
	    			class: ["tile", rowName, columnName].join(' ')
	    		});

	    		console.log($tile);
	    		$tile.html(tileNum);

	    		$face.append($tile);
	    		tileNum++;
	    	}
	    }
	}

 
});