// var comment = document.getElementsByClassName('leave-comment');
//
// for(var i = 0;i < comment.length;i++){
//     comment[i].addEventListener('click', show_input)
// }
//
// function show_input(e) {
//     e.preventDefault();
//
//
//     for(i = 0; i < comment.length; i++){
//
//     }
//     //show input field
//     this.previousElementSibling.classList.remove('hidden');
//
//
// }


new Vue({
    delimiters: ['[[', ']]'],
    el: '#forum-block',
    data: {
       comment_visib: false
    },
    computed: {
       show_input_comment: function(event) {
           this.component_visib = false;
           event.currentTarget
           
       }
    }
});