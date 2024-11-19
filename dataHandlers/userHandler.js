//Denne handler er lavet da vi gerne ville reducere længden af js filerne
//Funktionerne får passet de nødvendige metoder fra firebase og bruger dem til at udføre de ønskede handlinger

//get the UID of the authenticated user
exports.getUID = async (auth) => {
    try {
        const currentUser = auth.currentUser;

        if (currentUser) {
            return currentUser.uid; // Return the UID of the authenticated user
        } else {
            throw new Error("No authenticated user found");
        }
    } catch (error) {
        console.error("Error getting UID:", error);
        throw error;
    }
};

//get the user from the database by uid
exports.getUserByUid = async ({ get, child, dbRef, uid }) => {
    const snapshot = await get(child(dbRef, `users/${uid}`));
    if (snapshot.exists()) {
        return snapshot.val();
    } else {
        throw new Error(`User with uid ${uid} not found`);
    }
};
//add a new user to the database on uid
exports.addUser = async ({ set, child, dbRef, uid }) => {
    console.log(1);
    const user = { 
        uid: uid,   
        offers: []
    };
    await set(child(dbRef, `users/${uid}`), user);
};


// returns all offers for a user with a given id
//Todo
exports.getAllOfferForId = (users, uid) => {
}

exports.addOfferToUser = async ({ref,get,child,update, database , uid, offer }) => {
    try {
        const userRef = ref(database , `users/${uid}`);
        console.log(userRef);

        // Get the current offers array
        const snapshot = await get(child(userRef, "offers"));
        let currentOffers = snapshot.exists() ? snapshot.val() : [];

        // Append the new offer
        currentOffers.push(offer);

        // Update the offers array in the database
        await update(userRef, { offers: currentOffers });

        console.log(`Offer ${offer} added to user ${uid}`);
        return true;
    } catch (error) {
        console.error("Error adding offer to user:", error);
        throw error;
    }
};

//todo
exports.removeOfferFromUser = (users, uid, offerId) => {
}