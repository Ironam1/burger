$(function() {
  // Eat a burger
  $(".devour").on("click", function(evt) {
    evt.preventDefault();

    let id = $(this).data("id");
    // let newDevoured = $(this).data("newdevoured")
    let newDevouredState = 1;

    // put req
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevouredState
    }).then(function() {
      console.log("YUMMY!");
      location.reload();
    });
  });

  // add a burger
  $("#add").on("click", function(evt) {
    evt.preventDefault();
    let newBurger = {
      burger_name: $("#burg")
        .val()
        .trim(),
      devoured: 0
    };

    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(function() {
      console.log("Added " + newBurger);
      location.reload();
    });
  });

  // delete the burger
  $(".eat").on("click", function(evt) {
    evt.preventDefault();
    let id = $(this).data("id");
    console.log(id);
    $.ajax("/api/burgers/" + id, {
      type: "DELETE",
      
    }).then(function() {
      console.log(evt);
      location.reload();
    });
  });
});
