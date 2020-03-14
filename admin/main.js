// Auth
const ui = new firebaseui.auth.AuthUI(firebase.auth());
const uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
        },
        uiShown: function() {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById("loader").style.display = "none";
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: "popup",
    signInSuccessUrl: "/admin",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
};
// The start method will wait until the DOM is loaded.
ui.start("#firebaseui-auth-container", uiConfig);

async function shortenUrl() {
    const longUrl = document.getElementById("url_input").value;
    const alias = document.getElementById("alias").value;
    try {
        await writeToFirebase(longUrl, alias);
        document.getElementById("done").innerHTML = "Done!";
    } catch (e) {
        document.getElementById("done").innerHTML = "Error: " + e;
    }
}

function writeToFirebase(longUrl, alias) {
    return new Promise((resolve, reject) => {
        db.collection("urls")
            .doc(alias)
            .set({
                longUrl
            })
            .then(() => {
                resolve();
            })
            .catch(e => {
                reject(e);
            });
    });
}
