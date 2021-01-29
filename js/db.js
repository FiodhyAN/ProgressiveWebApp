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
// function upload()
// {
//     var image = document.getElementById('image').files[0];
//     var imageName = image.name;
//     var storageRef = firebase.storage().ref('images/' + imageName);
//     var uploadTask = storageRef.put(image);

//     uploadTask.on('state_changed', function(snapshot){
//         var progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
//         console.log("upload is " + progress + " done");
//     },function(error){
//         console.log(error.message);
//     },function(){
//         uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
//             console.log(downloadURL);
//         });
//     });

    
// }

const form = document.querySelector('form');
form.addEventListener('submit',evt => {
    evt.preventDefault();

    const project = {
        name: form.name.value,
        image: form.image.value, 
        description: form.description.value
    };

    db.collection('projects').add(project)
        .catch(err => console.log(err));
    
    form.name.value = '';
    form.image.value = '';
    form.description.value = '';
});

// delete
const projectContainer = document.querySelector('.projects');
projectContainer.addEventListener('click', evt => {
    // console.log(evt);
    if(evt.target.tagName === 'I')
    {
        const id = evt.target.getAttribute('data-id');
        db.collection('projects').doc(id).delete();
    }
});