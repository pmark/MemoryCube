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
			class: "card facedown"
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

    var GAME_STATE_READY = 0;
    var GAME_STATE_ONE_CARD_FACE_UP = 1;
    var GAME_STATE_TWO_CARDS_FACE_UP = 2;
    var _gameState = GAME_STATE_READY;

    function cardsMatch(card1, card2)
    {
    	return ($(card1).attr('src') === $(card2).attr('src'));
    }

    function checkForMatch()
    {
		var faceupCards = $(".faceup");

		if (cardsMatch(faceupCards[0], faceupCards[1]))
		{
			console.log("match!");
		}
		else
		{
			console.log("no match");
		}

		setTimeout(resetCards, 1000);

    }

    function resetCards()
    {
		$(".faceup").removeClass("faceup").addClass("facedown");
		_gameState = GAME_STATE_READY;
    }

    function cardClicked(evt)
    {
    	// Flip if not faceup.

    	var $card = $(this).children(".card");

    	switch (_gameState)
    	{
    		case GAME_STATE_READY:
	    		$card.removeClass("facedown").addClass("faceup");
    			_gameState = GAME_STATE_ONE_CARD_FACE_UP;
	    		break;

    		case GAME_STATE_ONE_CARD_FACE_UP:
	    		$card.removeClass("facedown").addClass("faceup");
    			_gameState = GAME_STATE_TWO_CARDS_FACE_UP;
    			checkForMatch();
	    		break;

    		case GAME_STATE_TWO_CARDS_FACE_UP:
	    		break;

    	}

    }
 
});