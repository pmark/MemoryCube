$(function() 
{

    // For each piece there are 2 tiles.
    // When a 2nd tile is selected, compare p

    var Piece = function(tileNumber, src)
    {
        this.tileNumber = tileNumber;
        this.src = src;
    };


    // Draw the grid.

    var NUM_COLUMNS = 2,
    	NUM_ROWS = 2,
    	NUM_FACES = 4,
    	NUM_TILES_PER_FACE = (NUM_COLUMNS * NUM_ROWS),
    	NUM_TILES = (NUM_TILES_PER_FACE * NUM_FACES),
        MAX_PIECES = NUM_TILES/2,
        pieces = [];


    function tileClicked()
    {
        console.log("tileClicked");
        $(this).css("background-color", "red");
    }

    $('.tile').click(tileClicked);

    var pieceNumbers = [];
    var pn = 0;

    while (pn < MAX_PIECES)
    {
        pieceNumbers.push(pn);
        pieceNumbers.push(pn);
        pn += 1;
    }

    // Given a set of numbers from 0 - 17,
    // Assign each number twice to a set of numbers ranging from 0-35.


    function createTile(tileNum)
    {
        // Get a random piece number that hasn't been used twice yet.

        var pieceNumberIndex = parseInt(Math.random() * pieceNumbers.length);
        var pieceNum = pieceNumbers[pieceNumberIndex];

        // Remove this piece from the available pieces.
        pieceNumbers.splice(pieceNumberIndex, 1);

        var pieceImageSrc = "images/pieces/piece" + pieceNum + ".png";
        // console.log(pieceNum);
        

		var $tile = $("<div>", {
			id: ("tile" + tileNum),
			class: "tile"
		});

		var $card = $("<div>", {
			class: "card facedown"
		})

		var $front = $("<img>", {
			class: "front",
			src: pieceImageSrc
		});

		var $back = $("<img>", {
			class: "back",
			src: "images/back.png"
		});

		$card.append($front).append($back);
		$tile.html($card);

		$tile.click(cardClicked);

    	var faceNum = parseInt(tileNum / NUM_TILES_PER_FACE);
        var $face = $("#face" + faceNum);

        //  402 =   20 +    10 + 161 + 10    +    10 + 161 + 10    + 20

        var faceWidth = 402;
        var padding = 20;
        var tileMargin = 11;
        var tileWidth = (faceWidth - (padding * 2) - (tileMargin * 2 * NUM_COLUMNS)) / NUM_COLUMNS;
        var tileHeight = (faceWidth - (padding * 2) - (tileMargin * 2 * NUM_ROWS)) / NUM_ROWS;
        console.log($face.width(), tileWidth, tileHeight);
        $tile.width(tileWidth).height(tileHeight);

		$face.append($tile);
    }

    for (var t=0; t < NUM_TILES; t++)
    {
    	createTile(t);
    }

    console.log('\n\n--------------\n');
    for (var key in pieceNumbers)
    {
        console.log(key, pieceNumbers[key]);
    }


    var GAME_STATE_READY = 0;
    var GAME_STATE_ONE_CARD_FACE_UP = 1;
    var GAME_STATE_TWO_CARDS_FACE_UP = 2;
    var gameState = GAME_STATE_READY;
    var currentPlayer = 0;
    var scores = [0, 0];

    function cardsMatch(card1, card2)
    {
        // console.log($(card1).attr('src'), $(card2).attr('src'));
    	return ($(card1).attr('src') === $(card2).attr('src'));
    }

    function checkForMatch()
    {
		var faceupCards = $(".faceup img.front");

		if (cardsMatch(faceupCards[0], faceupCards[1]))
		{
            setTimeout(function() {
                $(".faceup").fadeOut(250, resetCards);
            }, 660);

            scores[currentPlayer] += 1;
            console.log("Player", (currentPlayer+1), ": ", scores[currentPlayer]);
		}
		else
		{
            setTimeout(resetCards, 1000);
            currentPlayer = (currentPlayer + 1) % 2;
            console.log("Player " + (currentPlayer+1) + "'s turn");
		}

    }

    function resetCards()
    {
		$(".faceup").removeClass("faceup").addClass("facedown");
		gameState = GAME_STATE_READY;
    }

    function cardClicked(evt)
    {
    	// Flip if not faceup.

    	var $card = $(this).children(".card");

    	switch (gameState)
    	{
    		case GAME_STATE_READY:
	    		$card.removeClass("facedown").addClass("faceup");
    			gameState = GAME_STATE_ONE_CARD_FACE_UP;
	    		break;

    		case GAME_STATE_ONE_CARD_FACE_UP:
	    		$card.removeClass("facedown").addClass("faceup");
    			gameState = GAME_STATE_TWO_CARDS_FACE_UP;
    			checkForMatch();
	    		break;

    		case GAME_STATE_TWO_CARDS_FACE_UP:
	    		break;

    	}

    }
 
});