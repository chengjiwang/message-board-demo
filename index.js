$(document).ready(function() {
    var ref = new Firebase('https://message-demo.firebaseio.com/')
    var data,like,unlike;
    var ractive = new Ractive({
       el: '#messagebox',
       template: '#template',
       data:{ comment: data}
    });


    function read(){
        ref.on('value', function(snapshot) {                                               
             var data= snapshot.val();  
             ractive.set('comment',data)          
        });  
    }
    read();

     function time(){
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        var Hours = date.getHours();
        var Minutes = date.getMinutes();
        var time =year+"-"+month+"-"+day +" "+Hours+":"+ Minutes;
        return time;
    }

    ractive.on( 'postMessage', function ( event ) {
        var newPostRef = ref.push({
                name: $('#name').val(),
                message:$('#message').val(),
                like:0,
                unlike:0,
                time: time()
        });
        $('#message').val("");
        var postID = newPostRef.key();
        ref.child(postID).update({key: postID });
         read();
    });

    ractive.on({
        like: function (event,item,key) {
            ref.once('value', function(snapshot) {               
                var like = snapshot.child(key).child("like").val() + 1;                
                ref.child(key).update({like: like });                                      
            });
            read(); 
        },
        unlike: function (event,item,key) {
            ref.once('value', function(snapshot) {               
                var unlike = snapshot.child(key).child("unlike").val() + 1;                      
                ref.child(key).update({unlike:unlike });                                      
            });
            read(); 
        }
    });

});

