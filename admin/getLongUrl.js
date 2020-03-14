const alias = window.location.pathname.split("/")[1];

function readFromFirebase(alias) {
    const docRef = db.collection("urls").doc(alias);

    return new Promise((resolve, reject) => {
        docRef
            .get()
            .then(doc => {
                if (doc.exists) {
                    resolve(doc.data().longUrl);
                } else {
                    resolve("/");
                }
            })
            .catch(() => {
                resolve("/");
            });
    });
}

readFromFirebase(alias).then(longUrl => window.location.replace(longUrl));
