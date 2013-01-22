$(function() {

    function tileClicked()
    {
    	console.log("tileClicked");
        $(this).css("background-color", "red");
    }

    $('.tile').click(tileClicked);


    // Draw the 4x3 grid.

    var NUM_COLUMNS = 4,
    	NUM_ROWS = 3,
    	NUM_FACES = 4,
    	NUM_TILES_PER_FACE = (NUM_COLUMNS * NUM_ROWS),
    	NUM_TILES = (NUM_TILES_PER_FACE * NUM_FACES);


    function createTile(tileNum)
    {
		var $tile = $("<div>", {
			id: ("tile" + tileNum),
			class: "tile"
		});

		var $card = $("<div>", {
			class: "card flipped"
		})

		var $front = $("<img>", {
			class: "front",
			src: "images/zeppelin.png"
		});

		var $back = $("<img>", {
			class: "back",
			src: "images/back.png"
		});

		$card.append($front).append($back);
		$tile.html($card);

		$tile.click(cardClicked);

    	var faceNum = parseInt(tileNum / NUM_TILES_PER_FACE);
		$("#face" + faceNum).append($tile);
    }

    for (var t=0; t < NUM_TILES; t++)
    {	
    	createTile(t);
    }

    function cardClicked(evt)
    {
    	// Flip if not flipped.

    	var $card = $(this).children(".card");

    	if ($card.hasClass("flipped"))
    	{
    		$card.removeClass("flipped");
    	}
    	else
    	{
    		$card.addClass("flipped");
    	}


    }
 
});