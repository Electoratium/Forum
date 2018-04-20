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
document.addEventListener('DOMContentLoaded', show_page);
function show_page() {
    //hide preloader
    document.getElementById('preloader').style.display = 'none';
    //show content
    document.getElementById('forum-container').style.display = 'block';
}

new Vue({
    delimiters: ['[[', ']]'],
    el: '#forum-container',
    data: {
        show_login: false,
    },
    methods: {
        show_input_field: function (e) {

            //check for login




            e.currentTarget.previousElementSibling.classList.toggle('hidden');
              // this.$http.get('/').then((data,status,request) => {
              //
              //   // get body data
              //   console.log(data.user.username);
              //
              // }, response => {
              //   // error callback
              // });
        },
        check_user_existing: function (e) {
            if(document.getElementById('user-name')){

            }
            else{
                console.log(e.currentTarget);
                this.show_login = true;
            }

        },
        toggle_visib_login: function () {
            this.show_login = false;
        }
    }
});