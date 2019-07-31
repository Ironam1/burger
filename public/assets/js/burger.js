$(function(){

    
    // Eat a burger
    $(".devour").on("click", function(evt){
        // evt.preventDefualt();

        let id = $(this).data("id");
        // let newDevoured = $(this).data("newdevoured")
        let newDevouredState = {
            devoured: 1
        };

        // put req
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevouredState
        }).then(function(){
            console.log("YUMMY!");
            location.reload();
        });
    });

})