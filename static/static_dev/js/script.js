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
        user_existing: 0,
        show_login: false,
        chat_socket:null,
    },
    methods: {
        show_input_field: function (e) {
            e.currentTarget.previousElementSibling.classList.toggle('hidden');
        },
        check_user_existing: function (e) {

            if(this.user_existing) {

                var message_text = '';

                //same effect for button and pressing enter
                if(e.currentTarget.tagName == 'TEXTAREA' || e.currentTarget.tagName =='INPUT'){
                                    //delete spaces in at the beginning and end string
                    message_text  = e.currentTarget.value.replace(/^\s*/,'').replace(/\s*$/,'');
                }
                else{
                    message_text = e.currentTarget.previousElementSibling.value.replace(/^\s*/,'').replace(/\s*$/,'');
                    console.log(message_text);
                }


                if (message_text != '') {


                    var message = {
                        'user_name': document.getElementById('user-name').innerHTML,
                        'message_text': message_text
                    };

                    //check for create new post or comment existing post
                    if (e.currentTarget.hasAttribute('data-post')) {

                    }
                    else {
                        message['post_id'] = e.currentTarget.getAttribute('data-post-id');
                    }


                    this.chat_socket.send(JSON.stringify({
                        'message': message
                    }));
                    e.currentTarget.value = ''
                }
            }
            else {
                this.show_login = true
            }

        },
        toggle_visib_login: function () {
            this.show_login = false;
        }
    },
    mounted: function () {
        if(document.getElementById('user-name')){
            this.user_existing = 1;

            this.chat_socket = new WebSocket(
                'ws://' + window.location.host + '/ws/'

            );


            this.chat_socket.onmessage = function(e) {
                var data = JSON.parse(e.data);
                var message = data['message'];

                var container_post = document.getElementById('commentaries-list');

                var post = document.createElement('div');


                //check comment or post
                if(!message['post_id']){
                    post.className = 'row post';
                    post.setAttribute('data-post-id', message['created_id']);

                    post.innerHTML =
                        '<div class="avatar">' +
                            '<nav>' +
                            '</nav>' +
                        '</div>' +
                        '<div class="col-11">' +
                            '<div class="post-title">' +
                                '<p class="post-name"></p>' +
                                '<p class="post-date"></p>' +
                            '</div>' +
                            '<p class="col-12 post-content"></p>' +
                        '</div>' +
                        '<div class="col-12 comment">' +
                                '<div class="col-8 comment-input hidden">' +
                                    '<div class="row">' +
                                        '<input class="col-10" type="text" placeholder="Comment...." v-on:keyup.enter="check_user_existing" data-post-id=' + message['created_id'] + '>' +
                                        '<div class="col-1 send-comment">' +
                                            '<a href="#" v-on:click.prevent="check_user_existing">' +
                                                '<i class="fas fa-paper-plane"></i>' +
                                            '</a>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '<a href ="" v-on:click.prevent="show_input_field" class="leave-comment">Comment</a>' +
                        '</div>';


                        fill_post(post, message);


                        container_post.insertBefore(post, container_post.firstElementChild);

                }
                else{
                    post.className = 'row col-12 justify-content-end';
                    post.innerHTML =
                        '<div class="row col-11 comment-post">' +
                            '<div class="col-1 avatar">' +
                                '<nav>'+
                                '</nav>' +
                            '</div>' +
                            '<div class="col-11">' +
                                '<div class="post-title">' +
                                    '<p class="post-name"></p>' +
                                    '<p class="post-date"></p>' +
                                '</div>' +
                                '<p class="col-12 post-content"></p>'+
                            '</div>' +
                        '</div>';

                        fill_post(post, message);

                        var answer_post = document.querySelector('div [data-post-id="' + message["post_id"] + '"');

                        //insert into DOM
                        answer_post.insertBefore(post,answer_post.children[3]);

                }

                function fill_post(post, websocket_data) {
                    //fill post data from websocket

                    var post_date =  new Date(websocket_data['date_time']);

                    var date_options = {
                        day: "numeric", month: "short", year: "numeric",
                        hour: "2-digit", minute: "2-digit"
                    };

                    post_date = post_date.toLocaleString('en-GB', date_options);


                    // console.log(post_date.getDate() + post_date.getMonth() + 1);


                    post.querySelector('nav').innerHTML = websocket_data['user_name'][0];

                    post.querySelector('.post-name').innerHTML = websocket_data['user_name'];

                    post.querySelector('.post-date').innerHTML = post_date;

                    post.querySelector('.post-content').innerHTML = websocket_data['message_text'];
                }


            };


            this.chat_socket.onclose = function () {
                console.error('Chat socket closed unexpectedly');
            }
        }
        else{
            this.user_existing = 0;
        }
    },
});
