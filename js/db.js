// offline data
db.enablePersistence()
    .catch(err => {
        if(err.code == 'failed-precondition')
        {
            console.log('persistence failed');
        }
        else if(err.code == 'unimplemented')
        {
            console.log('persistence is not available');
        }
    });

// real time listener
db.collection('projects').onSnapshot((snapshot) => {
    // console.log(snapshot.docChanges());
    snapshot.docChanges().forEach(change => {
        // console.log(change, change.doc.data(), change.doc.id);
        if(change.type === 'added')
        {
            // add
            renderProject(change.doc.data(), change.doc.id)
        }
        if(change.type === 'removed')
        {
            // remove
            removeProject(change.doc.id);
        }
    });
});

// add new project
function upload()
{
    // get image
    var image = document.getElementById('image').files[0];
    // get name and description
    var name = document.getElementById('name').value;
    var description = document.getElementById('description').value;
    // get image name
    var imageName = image.name;
    // get firebase storage
    var storageRef = firebase.storage().ref('images/' + imageName);
    // upload image
    var uploadTask = storageRef.put(image);
    // progress
    uploadTask.on('state_changed',function(snapshot){
        //task progress
        var progress = (snapshot.byteTransferred/snapshot.totalBytes)*100;
        console.log("upload is " + progress + " done");
    },function(error){
        //error
        console.log(error.message);
    },function(){
        // success
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
            // image URL
            firebase.database().ref('projects/').push().set({
                name: name,
                imageURL: downloadURL,
                description: description 
            },function(error){
                if(error)
                {
                    alert("Error While uploading");
                }
                else
                {
                    alert("Successfully Uploaded");
                    // reset
                    document.getElementById('post-form').reset();
                    getdata();
                }
            });
        });
    });
}

window.onload = function(){
    this.getdata();
}

function getdata()
{
    firebase.database().ref('projects/').once('value').then(function(snapshot){
        // get div projects
        var projects_div = document.getElementById('projects');
        // remove data
        projects_div.innerHTML = "";
        // get data
        var data = snapshot.val();
        console.log(data);
        // pass data to div
        // loop data
        for(let[key,value] of Object.entries(data)){
            projects_div.innerHTML = "<div class='col m4 s6'>" +
                                        "<div class='card'>" +
                                            "<div class='card-image'>" +
                                                "<img src='"+value.imageURL+"'></div>" +
                                            "<div class='card-content'>" +
                                                "<span class='card-title'>"+value.name+"</span>" +
                                                "<p class='flex flex-wrap'>"+value.description+"</p></div>" +
                                            "<div class='card-action'>" +
                                                "<a id='"+key+"' onclick='delete_project(this.id)'><i class='material-icons'>delete_outline</i></a>" +
                                        "</div></div></div>" + projects_div.innerHTML;
                                
        }
    });
}

function delete_project(key)
{
    firebase.database().ref('projects/' + key).remove();
    getdata();
}

// const form = document.querySelector('form');
// form.addEventListener('submit',evt => {
//     evt.preventDefault();

//     const project = {
//         name: form.name.value,
//         image: form.image.value, 
//         description: form.description.value
//     };

//     db.collection('projects').add(project)
//         .catch(err => console.log(err));
    
//     form.name.value = '';
//     form.image.value = '';
//     form.description.value = '';
// });

// // delete
// const projectContainer = document.querySelector('.projects');
// projectContainer.addEventListener('click', evt => {
//     // console.log(evt);
//     if(evt.target.tagName === 'I')
//     {
//         const id = evt.target.getAttribute('data-id');
//         db.collection('projects').doc(id).delete();
//     }
// });