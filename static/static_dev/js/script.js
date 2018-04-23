document.addEventListener('DOMContentLoaded', show_page);
function show_page() {
    //hide preloader
    document.getElementById('preloader').style.display = 'none';
    //show content
    document.getElementById('forum-container').style.display = 'block';
}
var post_vue = Vue.component('post', {
    template:
    `<div class="row post" :data-post-id="this.created_id"> 
        <div class="avatar">
            <nav>
                {{ this.get_first_letter() }}
            </nav>
        </div>
        <div class="col-11">
            <div class="post-title">
                <p class="post-name">{{ this.user_name }}</p>
                <p class="post-date">{{ this.date_post }}</p>
            </div>
            <p class="col-12 post-content">{{ this.post_content }}</p>
        </div>
        <div class="col-12 comment">
                <div class="col-8 comment-input hidden">
                    <div class="row">
                        <input class="col-10" type="text" placeholder="Comment...." @keyup.enter="vm.check_user_existing()" :data-post-id='this.created_id'>
                        <div class="col-1 send-comment">
                            <a href="#" @click.prevent="vm.$refs.check_user_existing()">
                                <i class="fas fa-paper-plane"></i>
                            </a>
                        </div>
                    </div>
                </div>
            <a href ="" @click.prevent="vm.show_input_field()" class="leave-comment">Comment</a>
        </div>
    </div>`,
    props: ['created_id', 'user_name', 'date_post', 'post_content'],
    methods:{
        get_first_letter: function(){
            return this.user_name[0];
        },
    }
});


var comment = Vue.component('comment', {
    template:
        `<div class="row col-12 justify-content-end">
            <div class="row col-11 comment-post">
                <div class="col-1 avatar">
                    <nav>{{ this.get_first_letter() }}</nav>
                </div>
                <div class="col-11">
                    <div class="post-title">
                        <p class="post-name">{{ this.user_name }}</p>
                        <p class="post-date">{{ this.date_post }}</p>
                    </div>
                    <p class="col-12 post-content">{{ this.post_content }}</p>
                </div>
            </div>
        </div>`,
    props: ['user_name', 'date_post', 'post_content'],
    methods:{
        get_first_letter: function(){
            return this.user_name[0];
        }
    }

});



var vm = new Vue({
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




                var comment_date =  new Date(message['date_time']);

                var date_options = {
                    day: "numeric", month: "short", year: "numeric",
                    hour: "2-digit", minute: "2-digit"
                };

                comment_date = comment_date.toLocaleString('en-GB', date_options);


                //check comment or post
                if(!message['post_id']){

                        var post_component = Vue.extend(post_vue);

                        var post_instance = new post_component({
                           propsData: {
                               user_name: message['user_name'],
                               date_post: comment_date,
                               post_content: message['message_text'],
                               created_id: message['created_id']
                           }
                        });

                        post_instance.$mount();

                        container_post.insertBefore(post_instance.$el, container_post.firstElementChild);
                }
                else{
                        var comment_component =  Vue.extend(comment);

                        var comment_instance = new comment_component({ propsData: {
                                    user_name: message['user_name'],
                                    date_post: comment_date,
                                    post_content: message['message_text']
                                }
                            });

                        comment_instance.$mount();

                        var answer_post = document.querySelector('div [data-post-id="' + message["post_id"] + '"');

                        //insert into DOM
                        answer_post.insertBefore(comment_instance.$el,answer_post.children[3]);
                }
            };


            this.chat_socket.onclose = function () {
                console.error('Chat socket closed unexpectedly');
            }
        }
        else{
            this.user_existing = 0;
        }
    }
});
