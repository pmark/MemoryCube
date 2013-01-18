$(function() {

    function tileClicked()
    {
        $(this).css("background-color", "red");
    }

    $('.tile').click(tileClicked)
});