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
    

    $('.btn-article-save').on('click', function (event){
        $.ajax({
            method: "PUT",
            url: "/articles/"+event.target.dataset.mongo
          }).then(
            (res)=> {
            //   location.assign('/saved');
              // console.log(event.target.dataset.mongo);
              // console.log(res);
              $('#save-modal').modal('show');
            }
          )
    });

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

    $('.btn-delete-note').on('click', function (event){
        $.ajax({
            method: "POST",
            url: "/"
          }).then(
            function() {
              location.assign('/saved');
            }
          )
    });


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

  $('.btn-note-add').on('click',function (event){
    event.preventDefault();
    let thisId = event.target.dataset.id;
    // alert(JSON.stringify(event.target.dataset.id));
    $.ajax({
      method: "POST",
      url: "/articles/"+thisId,
      data: {
        // Value taken from title input
        content: $("#content").val()
      }
  }).then((data)=>{
    $('.notesContainer').append(`<h2>${data.title}</h2>`);
  });
});
    

    $(".header").on('click', (event)=>{
      $.ajax({
        method: 'GET',
        url: '/articles/'+ event.target.dataset.mongo
      }).then((res)=>{
        // console.log(event.target.dataset.mongo);
        console.log(res.notes);
        res.notes.forEach((note)=>{
          //create the note container div
          let noteDiv = $('<div></div>')
          noteDiv.addClass('noteDiv')
          //create note content
          let content = $(`<p> ${note.content}</p>`);
          content.appendTo(noteDiv);
          noteDiv.appendTo('.notesContainer');
        });
        $('.btn-note-add').attr('data-id', res._id);
        $('#form-modal').modal('show');
      });
    });


    $('.model-close').on("click",event=>{
      location.reload(true);
    })

});