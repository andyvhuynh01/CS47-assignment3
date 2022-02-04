
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import millisToMinutesAndSeconds from './utils/millisToMinuteSeconds';
import colors from './Themes/colors';

export default function SongItem({ index, image, title, artists, album, duration }) {
    return (
      <View style={styles.item}>
        <Text style={styles.indexPart}>{index}</Text>
        <Image
          style={styles.imagePart}
          source={{uri: image}}
        />
        <View style={styles.titleArtistPart}>
            <Text style={styles.titlePart}  numberOfLines={1}>{title}</Text>
            <Text style={styles.artistsPart} numberOfLines={1}>{artists}</Text>
        </View>
        <Text style={styles.albumPart} numberOfLines={1}>{album}</Text>
        <Text style={styles.durationPart}>{millisToMinutesAndSeconds(duration)}</Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    item: {
        margin: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: '5%'
    },
    indexPart: {
        color: colors.gray,
        flex: 0.5,
    },
    imagePart: {
        flex: 2,
        height: undefined,
        aspectRatio: 1/1,
    },
    titleArtistPart: {
        flex: 3.5,
        color: colors.gray,
        paddingLeft: 10
    },
    titlePart: {
        color: colors.gray,
    },
    artistsPart: {
        color: colors.gray,
    },
    albumPart: {
        flex: 3,
        color: colors.gray,
    },
    durationPart: {
        flex: 1,
        color: colors.gray,
    }
  });