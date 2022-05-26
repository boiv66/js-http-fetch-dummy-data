// get html element
const listEl = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const addBtn = document.querySelector("#new-post button");
const fetchBtn = document.querySelector("#available-posts button");
const form = document.querySelector("#new-post form");
const postList = document.querySelector("ul");

function sendHttpRequest(method, url, data) {
  //   const promise = new Promise((resolve, reject) => {

  //fetch: deafault is get
  // and has default promise
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        return response.json().then(err => {
            console.log(err, "er"); 
            throw new Error("Something went wrong - server side");
        });
        
      }
    }
  )
  .catch(error => 
    {console.log("1");
    throw new Error('Something went wrong'); 
    })
}

async function fetchPost() {
    try{
        const responseData = await sendHttpRequest(
            "GET",
            "https://jsonplaceholder.typicode.com/posts"
          );
          const listOfPost = responseData;
        
          console.log(listOfPost);
          for (const post of listOfPost) {
            const postEl = document.importNode(postTemplate.content, true);
            postEl.querySelector("h2").textContent = post.title.toUpperCase();
            postEl.querySelector("p").textContent = post.body;
            postEl.querySelector("li").id = post.id;
            listEl.append(postEl);
          }

    }
    catch (error) {
        alert(error.message); 

    }
  
}

async function createPost(title, content) {
  const userId = parseInt(Math.random() * 1000);
  const post = {
    title: title,
    body: content,
    userId: userId,
  };
  sendHttpRequest("POST", "https://jsonplaceholder.typicode.com/posts", post);
}

fetchBtn.addEventListener("click", fetchPost);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputTitle = event.currentTarget.querySelector("#title").value;
  const inputContent = event.currentTarget.querySelector("#content").value;

  createPost(inputTitle, inputContent);
});

postList.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    console.log("clicked btn !");
    const postId = event.target.closest("li").id;
    console.log(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    sendHttpRequest(
      "DELETE",
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      null
    );
  }
});

// createPost('Dummy', 'there is nothing here');
