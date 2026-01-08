// Todo Usual init
import express from "express";
import bodyParser  from "body-parser";
const app = express();
const port = 3000;

// Data Center
let posts = [];


// Post Constructor
function Post(title, content, time) {
    this.title = title;
    this.content = content;
    this.rawDate = new Date();
    this.date = this.rawDate.toLocaleString();
    if(time){
        this.date = time;
    }
}

// Edit Post
function editPost(index, title, content) {
    posts[index] = new Post(title, content);
}

// Delete Post
function deletePost(index) {
    posts.splice(index, 1);
}

// Add Post
function addPost(title, content, time) {
    let post = new Post(title, content , time);
    posts.push(post);
}

// Midleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));


// Todo All paths

// Home
app.get("/", (req, res) => {
    res.render("home.ejs", {posts: posts});
});

// View Post
app.get("/view/:id", (req, res) => {
    let index = req.params.id;
    let post = posts[index];
    res.render("view.ejs", {postId: index, title: post.title, content: post.content});
});

// Delete Post
app.post("/delete", (req, res) => {
    let index = req.body["postId"];
    deletePost(index);
    res.redirect("/");
});

// Edit Post Page
app.get("/edit/:id", (req, res) => {
    let index = req.params.id;
    let post = posts[index];
    res.render("create.ejs", {postId: index, title: post.title, content: post.content});
});

// Update
app.post("/update", (req, res) => {
    let title = req.body["title"];
    let content = req.body["content"];
    let index = req.body["index"];
    editPost(index, title, content);
    res.redirect("/");
});

// Create Post Page
app.get("/create", (req, res) => {
    res.render("create.ejs");
});

// Save Post
app.post("/save", (req, res) => {
    let title = req.body["title"];
    let content = req.body["content"];
    
    addPost(title, content);
    res.redirect("/");
});


// Todo Listen thing
app.listen(port, () => {
    addPost("Is There Such a Thing as Good Taste?", "When I was a kid, I'd have said there wasn't. My father told me so. Some people like some things, and other people like other things, and who's to say who's right? "
        + "It seemed so obvious that there was no such thing as good taste that it was only through indirect evidence that I realized my father was wrong. And that's what I'm going to give you here: a proof by reductio ad absurdum. "
        + "If we start from the premise that there's no such thing as good taste, we end up with conclusions that are obviously false, and therefore the premise must be wrong.We'd better start by saying what good taste is. There's a "
        + "narrow sense in which it refers to aesthetic judgements and a broader one in which it refers to preferences of any kind. The strongest proof would be to show that taste exists in the narrowest sense, so I'm going to talk about taste in art. You have better taste than me if the art you like is better than the art I like.",
        new Date("2024-07-05T10:15:45Z").toLocaleString())

    addPost("Write Like You Talk", "Here's a simple trick for getting more people to read what you write: write in spoken language.   Something comes over most people when they start writing. They write in a different language than they'd use if they were talking to a friend. The sentence structure and even the words are different. No one uses 'pen' as a verb in spoken English. You'd feel like an idiot using 'pen' instead of 'write' in a conversation with a friend.",
        new Date("2024-07-11T12:30:27Z").toLocaleString())

    addPost("Alien Truth","If there were intelligent beings elsewhere in the universe, they'd share certain truths in common with us. The truths of mathematics would be the same, because they're true by definition. Ditto for the truths of physics; the mass of a carbon atom would be the same on their planet. But I think we'd share other truths with aliens besides the truths of math and physics, and that it would be worthwhile to think about what these might be.",
        new Date("2024-07-12T03:43:31Z").toLocaleString())
    console.log(`Listening port on : ${port}`)
})

	




