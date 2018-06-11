// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $('.scrape-button').on('click', function (event){
        $.ajax({
            method: "GET",
            url: "/scrape"
          }).then(
            function() {
            location.reload(true);
            }
          )
    });

    //Navigate to saved articles page
    $('.saved-button').on('click', function (event){
        $.ajax({
            method: "GET",
            url: "/saved"
          }).then(
            function() {
              location.assign('/saved');
            }
          )
    });
//Navigate to home page
    $('.home-button').on('click', function (event){
      $.ajax({
          method: "GET",
          url: "/"
        }).then(
          function() {
            location.assign('/');
          }
        )
  });
    
//Add article to saved articles list
    $('.btn-article-save').on('click', function (event){
        $.ajax({
            method: "PUT",
            url: "/articles/"+event.target.dataset.mongo
          }).then(
            (res)=> {
              $('#save-modal').modal('show');
            }
          ) 
    });
//Remove article from saved articles
    $('.btn-article-delete').on('click', function (event){
        $.ajax({
            method: "PUT",
            url: "/articles/"+event.target.dataset.mongo+"/remove"
          }).then(
            () => {
              $('#remove-modal').modal('show');
            }
          )
    });


//Save a note
    $('.btn-note-save').on('click', function (event){
      $.ajax({
          method: "GET",
          url: "/articles/"+event.target.dataset.mongo+"/notes"
        }).then(
          function(response) {
            console.log(response);
            response.notes.forEach(note=>{
              let noteDiv = $("div")
              nodeDiv.addClass("noteID", note._id)
              noteDiv.text(note.content);
              $(".notesContainer").append(noteDiv);
            })
            $('.btn-note-add').attr('data-id', response._id);
            $('#form-modal').modal('show');
          }
        )
  });

  $('#make-note').on('click', function (event){
    // event.preventDefault();
    console.log("click");
    $.ajax({
        method: "POST",
        url: "/note/"+event.target.dataset.id
      }).then(
        function(response) {
          console.log(response);
        }
      )
});

//FINISH THIS
  $(document).on('click','.btn-note-add',()=>{
    $.ajax({
      method: "POST",
      url: "/note/"+event.target.dataset.id
  });


//When article title is clicked
    $(".header").on('click', (event)=>{
      $.ajax({
        method: 'GET',
        url: '/articles/'+ event.target.dataset.mongo
      }).then((res)=>{
        $('.btn-note-add').attr('data-id', res._id);
        $('#form-modal').modal('show');
      });
    });
   

    //close model
    $('.model-close').on("click",event=>{
      location.reload(true);
    })

});