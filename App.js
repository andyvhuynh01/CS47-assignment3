import { StyleSheet, Text, Image, SafeAreaView, View, FlatList, Pressable, ImageStore, ProgressBarAndroidComponent } from "react-native";
import { useState, useEffect } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { myTopTracks, albumTracks } from "./utils/apiOptions";
import { REDIRECT_URI, SCOPES, CLIENT_ID, ALBUM_ID } from "./utils/constants";
import Colors from "./Themes/colors"
import Images from "./Themes/images"
import SongItem from "./SongComp";
import images from "./Themes/images";

// Endpoints for authorizing with Spotify
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token"
};

export default function App() {
   // Back-end
  //////////////
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: CLIENT_ID,
      scopes: SCOPES,
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: REDIRECT_URI
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      setToken(access_token);
    }
  }, [response]);

  useEffect(() => {
    if (token) {
      // TODO: Select which option you want: Top Tracks or Album Tracks
      // Comment out the one you are not using
      myTopTracks(setTracks, token);
      // albumTracks(ALBUM_ID, setTracks, token);
    }
  }, [token]);


  function renderItem(item, index) {
    let allArtists1 = []
    for (let i = 0; i < item.artists.length; i++) {
      allArtists1.push(item.artists[i].name)
    }
    let allArtists2 = allArtists1.join(', ')
    

    return (
      <SongItem
        index={index + 1}
        image={item.album.images[0].url}
        title={item.name}
        artists={allArtists2}
        album={item.album.name}
        duration={item.duration_ms}
      />
    );
  }



  // ON-SCREEN 
  //////////////
  let contentDisplayed = null;
  if (token) {
    contentDisplayed =
      <View style={styles.songsList}>
        <View style={styles.header}>
          <Image style={styles.abIcon} source={Images.spotify}/>
          <Text style={styles.headerText}>My Top Tracks</Text>
        </View>
        <FlatList
          data={tracks} // the array of data that the FlatList displays
          renderItem={({item, index}) => renderItem(item, index)} // function that renders each item
          keyExtractor={(item) => item.id} // unique key for each item
        />
      </View>
  } else {
    contentDisplayed = 
      <Pressable onPress={() => promptAsync()}>
        <View style={styles.authButton}>
          <Image style={styles.abIcon} source={Images.spotify}/>
          <Text style={styles.abText}>
            CONNECT WITH SPOTIFY
          </Text>
        </View>
      </Pressable>
  }


  return (
    <SafeAreaView style={styles.container}>
      {contentDisplayed}
    </SafeAreaView>
  );
}



// STYLES 
///////////
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  authButton: {
    height: 40,
    width: 215, 
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: Colors.spotify,
    borderRadius: 99999,
    flexDirection: 'row',
  },
  abIcon: {
    height: 17,
    width: 17
  },
  abText: {
    color: 'white'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  headerText: {
    color: 'white',
    paddingLeft: 10,
    fontSize: 17
  },
  songsList: {
    width: '100%'
  }
});
