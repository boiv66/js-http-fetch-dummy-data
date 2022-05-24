// get html element
const listEl = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const addBtn = document.querySelector('#new-post button');
const fetchBtn = document.querySelector('#available-posts button'); 
const form = document.querySelector('#new-post form');
const postList = document.querySelector('ul');


function sendHttpRequest(method, url, data) {
    
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300){
            resolve(JSON.parse(xhr.response)); 
        }
        else{
            reject(new Error('Something went wrong!'))
        }

        
      
    };

    xhr.onerror = function() {
       reject(new Error("Fail to send request"))
    }

    xhr.send(JSON.stringify(data));
  });
  return promise;
}

async function fetchPost(){
    const responseData = await sendHttpRequest('GET', 'https://jsonplaceholder.typicode.com/posts');  
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

async function createPost(title, content){
    const userId = parseInt(Math.random()*1000);
    const post = {
        title: title, 
        body: content, 
        userId: userId
    }; 
    sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', post);

}

fetchBtn.addEventListener('click', fetchPost); 
form.addEventListener('submit', event => {
    event.preventDefault(); 
    const inputTitle = event.currentTarget.querySelector('#title').value; 
    const inputContent = event.currentTarget.querySelector('#content').value;

    createPost(inputTitle, inputContent); 

})

postList.addEventListener('click', event => {
    if(event.target.tagName === 'BUTTON'){
        console.log('clicked btn !');
        const postId = event.target.closest('li').id;
        console.log(`https://jsonplaceholder.typicode.com/posts/${postId}`); 
        sendHttpRequest('DELETE', `https://jsonplaceholder.typicode.com/posts/${postId}`, null)
    }
} )


// createPost('Dummy', 'there is nothing here'); 