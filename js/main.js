const APIController = (() => {
    

    const _getToken = async () => {
        const url = 'https://accounts.spotify.com/api/login';
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();
        return data.access_token;
    }

    const _searchTrack = async (token, name) => {
        const url = `https://api.spotify.com/v1/search?=${name.trim().split(' ').join('%20')}&type=track`;
        const result = await fetch(url, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });

        const data = await result.json();
        console.log(data);
        return data.items;
    }

    return {
        getToken() {
            return _getToken();
        },
        searchTrack(token, name) {
            return _searchTrack(token, name);
        }
    };
})();

const UIController = (() => {
    // html elements as input fields
    const DOMelements = {
        song: '#song_choice',
        // artist: '#artist_choice',
        tokenHidden: '#token_hidden'
    }

    // public methods
    return {
        inputFields() {
            return {
                song: document.querySelector(DOMelements.song),
                // artist: document.querySelector(elements.artist)
            };
        },
        storeToken(token) {
            document.querySelector(DOMelements.tokenHidden).value = value;
        }
    }
})();


const MainController = ((UICntrl, APICntrl) => {
    const input = UICntrl.inputField();

    const onload = async () => {
        const token = await APICntrl.getToken();
        UICntrl.storeToken(token);
    }
});
