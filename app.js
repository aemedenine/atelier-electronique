const firebaseConfig = {
  apiKey: "AIzaSyD5Hrfk6tU22ITquRR3xt957WmlnvPTw5M",
  authDomain: "aem-site-4e030.firebaseapp.com",
  projectId: "aem-site-4e030",
  storageBucket: "aem-site-4e030.firebasestorage.app",
  messagingSenderId: "241838556898",
  appId: "1:241838556898:web:9eb591e3d05405894800bb",
  measurementId: "G-DTNBCK5H1F"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.querySelectorAll('.react-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const reaction = btn.dataset.reaction;
    const mediaId = btn.closest('.reactions').dataset.id;

    db.collection("reactions").add({
      mediaId,
      reaction,
      timestamp: new Date()
    });
  });
});

document.querySelectorAll('.comment-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const parent = btn.closest('.reactions');
    const commentInput = parent.querySelector('.comment-input');
    const mediaId = parent.dataset.id;
    const comment = commentInput.value.trim();

    if (comment !== "") {
      db.collection("comments").add({
        mediaId,
        comment,
        timestamp: new Date()
      });

      commentInput.value = "";
    }
  });
});