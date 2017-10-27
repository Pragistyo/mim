Vue.component('authentication-buttons', {
  template: `
    <button v-if="!facebookId" onclick="facebookLogin()" class="btn btn-primary">Login with Facebook</button>
    <button v-else id="logout-button" onclick="logout()" class="btn btn-danger">Logout</button>
  `,

  data: function () {
    return { facebookId: '' };
  },

  created () {
    if (localStorage.getItem('facebookId'))
      this.facebookId = localStorage.getItem('facebookId');
  }
});

Vue.component('upload-modal', {
  template: `
    <div id="myModal" class="modal fade" role="dialog">
      <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <legend>
              Upload File
            </legend>
          </div>
          <div class="modal-body">
            <form v-on:submit.prevent="createImage" class="form-horizontal">
              <fieldset>
                <div class="form-group">
                  <label for="input-image" class="col-lg-2 control-label">Picture</label>
                  <div class="col-md-8">
                    <input name="input-image" type="file" class="form-control" id="upload" placeholder="File Picture" v-model="imageName" @change="onFileChange" accept="image/*" required>
                  </div>
                </div>
                <div class="form-group">
                  <label for="caption" class="col-lg-2 control-label">Caption</label>
                  <div class="col-md-8">
                    <input name="caption" type="text" class="form-control" placeholder="Insert your caption" v-model="caption" required>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-lg-10 col-lg-offset-2">
                    <div class="modal-footer">
                      <button type="submit" class="btn btn-primary">Submit</button>
                      <button type="reset" class="btn btn-default" data-dismiss="modal" @click="removeImage">Cancel</button>
                    </div>
                  </div>
                </div>
                <p class="lead text-center">{{ caption }}</p>
                <a v-if="image !== ''" href="#" class="thumbnail">
                              <img :src="image" :alt="image" />
                            </a>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  data: function() {
    return {
      image: '',
      resultUpload: null,
      closeModal: null,
      caption: '',
      imageName: '',
    }
  },
  methods: {
    onFileChange(e) {
      // alert(JSON.stringify(e))
      console.log(e)
      var files = e.target.files || e.dataTransfer.files;

      if (!files.length) {
        return;
      }
      this.resultUpload = files[0]
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      // reader.readAsDataURL(file);
      reader.readAsDataURL(this.resultUpload);
      // this.createImage(files[0]);
    },
    createImage(file) {
      let data = new FormData();
      data.append('caption', this.caption);
      data.append('image', this.resultUpload);
      axios.post('http://api.mepawz.com/posts/add_post', data)
        .then(function(res) {
          location.reload();
        })
        .catch(function(err) {
          console.log(err);
        });
      $('#myModal').modal('hide');
    },
    removeImage: function(e) {
      this.image = '';
      this.imageName = '';
      this.caption = '';
    },
    dismissModal: function() {
      // this.closeModal = "modal"
    }
  }
});

Vue.component('upload-button', {
  template: `
    <button v-if="facebookId" type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal"><span class="fa fa-plus"></span> Upload</button>
    `,
  data: function() {
    return {
      facebookId: ''
    }
  },
  created () {
    if (localStorage.getItem('facebookId'))
      this.facebookId = localStorage.getItem('facebookId');
  }
})

Vue.component('post', {

  props: ['postId', 'postCaption', 'postImageUrl', 'postVotes', 'postVoted'],
  template: `

  <div class="col-xs-12 post">

    <div class="thumbnail">
      <h3>{{ postCaption }} <span class="badge badge-info"><span class="fa fa-thumbs-o-up"></span> {{ postVotes }}</span></h3>
      <img v-bind:src="postImageUrl" v-bind:alt="postCaption">
      <a v-on:click="vote(postId)" v-if="facebookId && !postVoted" href="#" class="btn btn-primary"><span class="fa fa-thumbs-o-up"></span></a>
      <a v-on:click="downvote(postId)" v-if="facebookId && postVoted" href="#" class="btn btn-danger"><span class="fa fa-thumbs-o-down"></span></a>
    </div>

  </div> <!-- /.col-xs-12.post -->

  `,

  data: function () {
    return { facebookId: '' };
  },

  methods: {
    vote (postId) {

      axios.put('http://api.mepawz.com/posts/upvote', {
        postId: postId,
        userId: localStorage.getItem('facebookId')
      })
        .then((response) => {
          this.postVoted = !this.postVoted;
          this.postVotes += 1;
        })
        .catch((err) => {
          console.error(err);
        });

    },

    downvote (postId) {

      axios.put('http://api.mepawz.com/posts/downvote', {
        postId: postId,
        userId: localStorage.getItem('facebookId')
      })
        .then((response) => {
          this.postVoted = !this.postVoted;
          this.postVotes -= 1;
        })
        .catch((err) => {
          console.error(err);
        });

    }
  },

  created () {
    if (localStorage.getItem('facebookId'))
      this.facebookId = localStorage.getItem('facebookId');
  }

});

Vue.component('posts-section', {

  template: `
  <div class="row">

    <post v-for="post in posts" :key="post._id" :postId="post._id" :postCaption="post.caption" :postImageUrl="post.imageUrl" :postVotes="post.votes" :postVoted="post.voted">

    </post>

  </div> <!-- /.row -->
  `,

  data: function () {
    return {
      posts: []
    }
  },

  methods: {

    fetchPosts () {

      let URI = `http://localhost:3000/posts/${ localStorage.getItem('facebookId') }`;

      axios
        .get(URI)
        .then((response) => {

          this.posts = response.data;

        })
        .catch((err) => {

          console.error(err);

        });

    }

  },

  created () {

    this.fetchPosts();

  }

});

Vue.component('search-form', {

  template: `
    <form class="navbar-form navbar-right">
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Search" v-model="keyword">
        <span class="input-group-btn">
          <button v-on:click.prevent="search" role="button" class="btn btn-primary"><span class="fa fa-search"></span></button>
        </span>
      </div>
    </form>
  `,

  data: function () {
    return {
      keyword: ''
    }
  },

  methods: {

    search () {

      let URI = `http://localhost:3000/posts/search?q=${this.keyword}`;

      axios
        .get(URI)
        .then((response) => {

          this.posts = response.data;

        })
        .catch((err) => {

          console.error(err);

        });

    }

  }

});

new Vue ({
  el: '#app'
});
