import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";
import Constants from "expo-constants";
import { useEffect, useState } from "react";
import axios from "axios";

import { API_KEY } from "@env";

export default function PopularMovies() {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const token = API_KEY;
  //console.log("token: " + token);
  console.log("API_KEY: " + API_KEY);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/allocine/movies/popular",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        //console.log(data);
        setMovies(data.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator size="large" />
  ) : (
    <View style={styles.container}>
      <Text style={styles.title}>Popular movies</Text>
      <FlatList
        style={
          {
            //flexDirection: "column",
            //flexWrap: "no-wrap",
            //borderColor: "orange",
            //borderWidth: 2,
          }
        }
        data={movies}
        keyExtractor={(movie) => movie.id}
        renderItem={({ item }) => {
          //console.log(item);

          return (
            <View style={styles.containerMovie}>
              <Image
                style={styles.poster}
                source={{ uri: item.poster_path.w92 }}
              ></Image>

              <View style={styles.infosMovie}>
                <Text style={styles.movieTitle}>{item.original_title}</Text>
                <Text style={styles.overview} numberOfLines={5}>
                  {item.overview}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 10,
  },
  containerMovie: {
    flexDirection: "row",
    gap: 10,
    borderWidth: 2,
    borderColor: "red",
    marginBottom: 20,
    //flexWrap: "wrap",
  },
  poster: {
    width: 92,
    height: 138,
    borderWidth: 2,
    borderColor: "blue",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  movieTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  infosMovie: {
    borderWidth: 2,
    borderColor: "green",
  },
  overview: {
    //flexWrap: "wrap",
  },
});
