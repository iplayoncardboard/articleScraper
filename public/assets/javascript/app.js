// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $('.scrape-button').on('click', function (event){
        $.ajax({
            method: "GET",
            url: "/scrape"
          }).then(
            function() {
            location.assign('/');
            console.log("Scrape Success");
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

    $('.btn-article-save').on('click', function (event){
        $.ajax({
            method: "PUT",
            url: "/articles/"+event.target.dataset.mongo
          }).then(
            (res)=> {
            //   location.assign('/saved');
              console.log(event.target.dataset.mongo);
              console.log(res);
              $('.ui.modal').modal('show');
            }
          )
    });

    $('.btn-article-delete').on('click', function (event){
        $.ajax({
            method: "POST",
            url: "/article"
          }).then(
            function() {
              location.assign('/saved');
            }
          )
    });

    $('.btn-save-note').on('click', function (event){
        $.ajax({
            method: "POST",
            url: "/"
          }).then(
            function() {
              location.assign('/saved');
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

    $(".header").on('click', (event)=>{
      $.ajax({
        method: 'GET',
        url: '/articles/'+ event.target.dataset.mongo
      }).then((res)=>{
        console.log(event.target.dataset.mongo);
        console.log(res);
        location.assign(`/articles/${event.target.dataset.mongo}`);
      });
    });

});